// Automated IndexNow submission for newly published / updated HPF.kz URLs.
// Fixes HTTP 429 retry loops via:
// 1) Small incremental batches (max 10 URLs per run)
// 2) Multi-endpoint failover (Yandex -> Bing -> api.indexnow.org; IndexNow shares across engines)
// 3) Per-endpoint exponential backoff persisted in D1 (hpf_seo_indexnow_state)

export const INDEXNOW_KEY = "hpfkz8d4e9a2c1b6f3057e4a9c2d8b1f6a3e0";
const SITE_HOST = "hpf.kz";
const SITE_ORIGIN = `https://${SITE_HOST}`;
const KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;
const VALID_LOCALES = new Set(["en", "zh", "ru", "kk"]);
const MAX_BATCH_SIZE = 10;

// Direct engine endpoints are far less likely to share CF Worker egress IP 429 buckets
// than the shared api.indexnow.org aggregator, and submitting to any one fans out to all.
const ENDPOINTS = [
  "https://yandex.com/indexnow",
  "https://www.bing.com/indexnow",
  "https://api.indexnow.org/indexnow",
];

function buildContentUrl(section, locale, slug) {
  const cleanLocale = VALID_LOCALES.has(locale) ? locale : "en";
  const prefix = cleanLocale === "en" ? "" : `/${cleanLocale}`;
  return `${SITE_ORIGIN}${prefix}/${section}/${encodeURIComponent(slug)}/`;
}

function computeBackoffMs(consecutive429, retryAfterHeader) {
  const retryAfterSec = Number(retryAfterHeader);
  if (Number.isFinite(retryAfterSec) && retryAfterSec > 0) {
    return Math.min(24 * 3600_000, Math.max(3600_000, retryAfterSec * 1000));
  }
  // Exponential backoff: 1h -> 2h -> 4h -> 8h -> 16h -> cap 24h
  const hours = Math.min(24, Math.pow(2, Math.max(0, consecutive429 - 1)));
  return hours * 3600_000;
}

export async function runIndexNowSweep(env) {
  if (!env?.DB) return { skipped: "no-db" };

  try {
    await env.DB.batch([
      env.DB.prepare(
        `CREATE TABLE IF NOT EXISTS hpf_seo_indexnow_sent (
          url TEXT PRIMARY KEY,
          updated_at TEXT NOT NULL,
          pushed_at INTEGER NOT NULL
        )`
      ),
      env.DB.prepare(
        `CREATE TABLE IF NOT EXISTS hpf_seo_indexnow_state (
          endpoint TEXT PRIMARY KEY,
          next_retry_at INTEGER NOT NULL DEFAULT 0,
          consecutive_429 INTEGER NOT NULL DEFAULT 0,
          last_status INTEGER,
          last_run_at INTEGER NOT NULL DEFAULT 0,
          last_pushed INTEGER NOT NULL DEFAULT 0
        )`
      ),
    ]);

    const now = Date.now();
    const stateRows = await env.DB.prepare(
      `SELECT endpoint, next_retry_at, consecutive_429 FROM hpf_seo_indexnow_state`
    ).all();
    const stateMap = new Map((stateRows?.results ?? []).map((r) => [r.endpoint, r]));

    const readyEndpoints = ENDPOINTS.filter((ep) => {
      const st = stateMap.get(ep);
      return !st || Number(st.next_retry_at || 0) <= now;
    });

    if (readyEndpoints.length === 0) {
      return { skipped: "cooldown", nextRetryAt: Math.min(...ENDPOINTS.map((ep) => Number(stateMap.get(ep)?.next_retry_at || 0))) };
    }

    // Collect published news + products candidates (newest first).
    const newsCandidates = await env.DB.prepare(
      `SELECT c.slug AS slug, c.locale AS locale, COALESCE(c.updated_at, c.published_at, '') AS updated_at
       FROM ec_news c
       LEFT JOIN _emdash_seo s ON s.collection = 'news' AND s.content_id = c.id
       WHERE c.status = 'published'
         AND c.deleted_at IS NULL
         AND c.slug IS NOT NULL
         AND TRIM(c.slug) <> ''
         AND (s.seo_no_index IS NULL OR s.seo_no_index = 0)
       ORDER BY COALESCE(c.updated_at, c.published_at) DESC
       LIMIT 200`
    ).all();

    let productRows = [];
    try {
      const prodCandidates = await env.DB.prepare(
        `SELECT c.slug AS slug, c.locale AS locale, COALESCE(c.updated_at, c.published_at, '') AS updated_at
         FROM ec_products c
         LEFT JOIN _emdash_seo s ON s.collection = 'products' AND s.content_id = c.id
         WHERE c.status = 'published'
           AND c.deleted_at IS NULL
           AND c.slug IS NOT NULL
           AND TRIM(c.slug) <> ''
           AND (s.seo_no_index IS NULL OR s.seo_no_index = 0)
         ORDER BY COALESCE(c.updated_at, c.published_at) DESC
         LIMIT 50`
      ).all();
      productRows = prodCandidates?.results ?? [];
    } catch {
      // ec_products may not exist in older local dev snapshots.
    }

    const existing = await env.DB.prepare(
      `SELECT url, updated_at FROM hpf_seo_indexnow_sent`
    ).all();
    const sentMap = new Map((existing?.results ?? []).map((r) => [r.url, r.updated_at]));

    const toPush = [];
    for (const row of productRows) {
      const url = buildContentUrl("products", row.locale, row.slug);
      const stamp = String(row.updated_at || "");
      if (sentMap.get(url) !== stamp) toPush.push({ url, stamp });
      if (toPush.length >= MAX_BATCH_SIZE) break;
    }
    if (toPush.length < MAX_BATCH_SIZE) {
      for (const row of newsCandidates?.results ?? []) {
        const url = buildContentUrl("news", row.locale, row.slug);
        const stamp = String(row.updated_at || "");
        if (sentMap.get(url) !== stamp) toPush.push({ url, stamp });
        if (toPush.length >= MAX_BATCH_SIZE) break;
      }
    }

    if (toPush.length === 0) return { pushed: 0 };

    const payload = JSON.stringify({
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: toPush.map((item) => item.url),
    });

    const upsertState = env.DB.prepare(
      `INSERT INTO hpf_seo_indexnow_state (endpoint, next_retry_at, consecutive_429, last_status, last_run_at, last_pushed)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(endpoint) DO UPDATE SET
         next_retry_at = excluded.next_retry_at,
         consecutive_429 = excluded.consecutive_429,
         last_status = excluded.last_status,
         last_run_at = excluded.last_run_at,
         last_pushed = excluded.last_pushed`
    );

    for (const endpoint of readyEndpoints) {
      let res;
      try {
        res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "HPF.kz-IndexNow/2.0 (+https://hpf.kz)",
          },
          body: payload,
        });
      } catch (netErr) {
        const prev = Number(stateMap.get(endpoint)?.consecutive_429 || 0) + 1;
        await upsertState.bind(endpoint, now + 3600_000, prev, 0, now, 0).run();
        console.warn(`[seo:indexnow] ${endpoint} network error: ${netErr}`);
        continue;
      }

      if (res.status === 200 || res.status === 202) {
        const sentStmt = env.DB.prepare(
          `INSERT INTO hpf_seo_indexnow_sent (url, updated_at, pushed_at)
           VALUES (?, ?, ?)
           ON CONFLICT(url) DO UPDATE SET updated_at = excluded.updated_at, pushed_at = excluded.pushed_at`
        );
        await env.DB.batch([
          ...toPush.map((item) => sentStmt.bind(item.url, item.stamp, now)),
          upsertState.bind(endpoint, 0, 0, res.status, now, toPush.length),
        ]);
        console.log(`[seo:indexnow] Pushed ${toPush.length} URLs via ${endpoint} (HTTP ${res.status})`);
        return { pushed: toPush.length, status: res.status, endpoint };
      }

      if (res.status === 429) {
        const prev = Number(stateMap.get(endpoint)?.consecutive_429 || 0) + 1;
        const backoffMs = computeBackoffMs(prev, res.headers.get("Retry-After"));
        await upsertState.bind(endpoint, now + backoffMs, prev, 429, now, 0).run();
        console.warn(`[seo:indexnow] ${endpoint} HTTP 429 (#${prev}), cooling down ${Math.round(backoffMs / 60000)}m`);
        continue;
      }

      // Other 4xx/5xx: cool down 2 hours before retrying this endpoint.
      const prev = Number(stateMap.get(endpoint)?.consecutive_429 || 0) + 1;
      await upsertState.bind(endpoint, now + 2 * 3600_000, prev, res.status, now, 0).run();
      console.warn(`[seo:indexnow] ${endpoint} returned HTTP ${res.status}`);
    }

    return { pushed: 0, status: 429 };
  } catch (error) {
    console.error("[seo:indexnow] Sweep error:", error);
    return { error: String(error) };
  }
}
