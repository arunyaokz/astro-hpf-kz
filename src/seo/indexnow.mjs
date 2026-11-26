// Automated IndexNow submission for newly published / updated HPF.kz news URLs.
// Fans out to Yandex, Bing, Seznam, and Naver via https://api.indexnow.org/indexnow.

export const INDEXNOW_KEY = "hpfkz8d4e9a2c1b6f3057e4a9c2d8b1f6a3e0";
const SITE_HOST = "hpf.kz";
const SITE_ORIGIN = `https://${SITE_HOST}`;
const KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;
const VALID_LOCALES = new Set(["en", "zh", "ru", "kk"]);

function buildNewsUrl(locale, slug) {
  const cleanLocale = VALID_LOCALES.has(locale) ? locale : "en";
  const prefix = cleanLocale === "en" ? "" : `/${cleanLocale}`;
  return `${SITE_ORIGIN}${prefix}/news/${encodeURIComponent(slug)}/`;
}

export async function runIndexNowSweep(env) {
  if (!env?.DB) return { skipped: "no-db" };

  try {
    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS hpf_seo_indexnow_sent (
        url TEXT PRIMARY KEY,
        updated_at TEXT NOT NULL,
        pushed_at INTEGER NOT NULL
      )`
    ).run();

    const candidates = await env.DB.prepare(
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

    const rows = candidates?.results ?? [];
    if (rows.length === 0) return { pushed: 0 };

    const existing = await env.DB.prepare(
      `SELECT url, updated_at FROM hpf_seo_indexnow_sent`
    ).all();
    const sentMap = new Map((existing?.results ?? []).map((r) => [r.url, r.updated_at]));

    const toPush = [];
    for (const row of rows) {
      const url = buildNewsUrl(row.locale, row.slug);
      const stamp = String(row.updated_at || "");
      if (sentMap.get(url) !== stamp) {
        toPush.push({ url, stamp });
      }
      if (toPush.length >= 50) break;
    }

    if (toPush.length === 0) return { pushed: 0 };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: toPush.map((item) => item.url),
      }),
    });

    if (res.status === 200 || res.status === 202) {
      const now = Date.now();
      const stmt = env.DB.prepare(
        `INSERT INTO hpf_seo_indexnow_sent (url, updated_at, pushed_at)
         VALUES (?, ?, ?)
         ON CONFLICT(url) DO UPDATE SET updated_at = excluded.updated_at, pushed_at = excluded.pushed_at`
      );
      await env.DB.batch(toPush.map((item) => stmt.bind(item.url, item.stamp, now)));
      console.log(`[seo:indexnow] Pushed ${toPush.length} URLs (HTTP ${res.status})`);
      return { pushed: toPush.length, status: res.status };
    }

    console.warn(`[seo:indexnow] Submission returned HTTP ${res.status}`);
    return { pushed: 0, status: res.status };
  } catch (error) {
    console.error("[seo:indexnow] Sweep error:", error);
    return { error: String(error) };
  }
}
