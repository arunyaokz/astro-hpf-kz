#!/usr/bin/env node
/**
 * HPF.kz Weekly SEO & GEO Operational Digest Generator
 * Aggregates real D1 production metrics (content inventory, native review rate,
 * _emdash_seo coverage, IndexNow push health, contact click attribution, real 404s).
 *
 * Usage:
 *   node scripts/seo-weekly-digest.mjs [--write-report]
 * Optional env:
 *   WECOM_SEO_WEBHOOK=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=...
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";

const execFileAsync = promisify(execFile);
const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [k, v] = arg.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const WRITE_REPORT = Boolean(args["write-report"]);

async function runD1(sql) {
  const { stdout } = await execFileAsync(
    "npx",
    ["wrangler", "d1", "execute", "hpf-website-cms", "--remote", "--json", "--command", sql],
    { maxBuffer: 8 * 1024 * 1024 },
  );
  const parsed = JSON.parse(stdout);
  return parsed.map((blk) => blk.results ?? []);
}

async function safeSingleQuery(sql) {
  try {
    const [rows] = await runD1(sql);
    return rows;
  } catch {
    return [];
  }
}

const [
  newsStats,
  newsLast7d,
  seoCoverage,
  productsStats,
  clicks7d,
  clicks30d,
  inquiries,
  indexnowSent,
  real404s,
] = await runD1(`
SELECT locale,
  COUNT(*) AS published,
  SUM(CASE WHEN native_reviewed = 1 THEN 1 ELSE 0 END) AS reviewed,
  ROUND(AVG(LENGTH(title)), 1) AS avg_title_len,
  ROUND(AVG(LENGTH(description)), 1) AS avg_desc_len
FROM ec_news WHERE status = 'published' AND deleted_at IS NULL
GROUP BY locale ORDER BY locale;

SELECT locale, COUNT(*) AS cnt
FROM ec_news
WHERE status = 'published' AND deleted_at IS NULL
  AND published_at >= datetime('now', '-7 days')
GROUP BY locale ORDER BY locale;

SELECT n.locale, COUNT(*) AS total,
  SUM(CASE WHEN s.seo_title IS NOT NULL AND TRIM(s.seo_title) <> '' THEN 1 ELSE 0 END) AS has_seo_title,
  SUM(CASE WHEN s.seo_description IS NOT NULL AND TRIM(s.seo_description) <> '' THEN 1 ELSE 0 END) AS has_seo_desc
FROM ec_news n
LEFT JOIN _emdash_seo s ON s.collection = 'news' AND s.content_id = n.id
WHERE n.status = 'published' AND n.deleted_at IS NULL
GROUP BY n.locale ORDER BY n.locale;

SELECT locale, COUNT(*) AS published
FROM ec_products WHERE status = 'published' AND deleted_at IS NULL
GROUP BY locale ORDER BY locale;

SELECT event, SUM(count) AS total
FROM hpf_contact_clicks
WHERE day >= date('now', '+5 hours', '-7 days')
GROUP BY event ORDER BY total DESC;

SELECT event, SUM(count) AS total
FROM hpf_contact_clicks
WHERE day >= date('now', '+5 hours', '-30 days')
GROUP BY event ORDER BY total DESC;

SELECT COUNT(*) AS queued_7d
FROM hpf_farsail_inquiries
WHERE received_at >= (strftime('%s', 'now') - 7 * 86400) * 1000;

SELECT COUNT(*) AS total_sent,
  SUM(CASE WHEN pushed_at >= (strftime('%s', 'now') - 7 * 86400) * 1000 THEN 1 ELSE 0 END) AS sent_7d
FROM hpf_seo_indexnow_sent;

SELECT path, hits, last_seen_at
FROM _emdash_404_log
WHERE (path LIKE '/zh/%' OR path LIKE '/ru/%' OR path LIKE '/kk/%' OR path LIKE '/news/%'
   OR path LIKE '/services%' OR path LIKE '/routes%' OR path LIKE '/about%' OR path LIKE '/products%')
  AND path NOT LIKE '%wp-%' AND path NOT LIKE '%.php%'
  AND last_seen_at >= datetime('now', '-7 days')
ORDER BY hits DESC LIMIT 10;
`);

// Optional newly-added tables (may not exist before first write)
const indexnowState = await safeSingleQuery(
  `SELECT endpoint, last_status, consecutive_429, last_pushed, last_run_at, next_retry_at FROM hpf_seo_indexnow_state ORDER BY endpoint;`,
);
const clicksDetail7d = await safeSingleQuery(
  `SELECT event, lang, path, source_ref, SUM(count) AS total
   FROM hpf_contact_clicks_detail
   WHERE day >= date('now', '+5 hours', '-7 days')
   GROUP BY event, lang, path, source_ref
   ORDER BY total DESC LIMIT 15;`,
);

// Compute ISO week label in Asia/Almaty
const nowAlmaty = new Date(Date.now() + 5 * 3600_000);
const dateStr = nowAlmaty.toISOString().slice(0, 10);
const startOfYear = new Date(Date.UTC(nowAlmaty.getUTCFullYear(), 0, 1));
const weekNo = Math.ceil((((nowAlmaty - startOfYear) / 86400_000) + startOfYear.getUTCDay() + 1) / 7);
const weekLabel = `${nowAlmaty.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;

const totalNews = newsStats.reduce((s, r) => s + Number(r.published || 0), 0);
const totalReviewed = newsStats.reduce((s, r) => s + Number(r.reviewed || 0), 0);
const totalProducts = productsStats.reduce((s, r) => s + Number(r.published || 0), 0);
const totalClicks7d = clicks7d.reduce((s, r) => s + Number(r.total || 0), 0);
const totalClicks30d = clicks30d.reduce((s, r) => s + Number(r.total || 0), 0);
const idxTotal = Number(indexnowSent[0]?.total_sent || 0);
const idx7d = Number(indexnowSent[0]?.sent_7d || 0);
const inq7d = Number(inquiries[0]?.queued_7d || 0);

// Auto-generate top priorities for next week
const priorities = [];
if (totalProducts === 0) {
  priorities.push("在后台上线首批 4–6 个核心运输产品页（`/products/` 当前 0 条处于 noindex），并在顶部导航露出入口。");
}
if (totalReviewed < Math.max(10, Math.round(totalNews * 0.2))) {
  priorities.push(`加速俄/哈核心商业文章母语校对（当前仅 ${totalReviewed}/${totalNews} 篇标记 native_reviewed=1）。`);
}
if (idxTotal === 0) {
  priorities.push("检查 IndexNow 推送端点状态（当前累计成功 0 条），确认新退避逻辑上线后已开始入账。");
}
const missingSeo = seoCoverage.reduce((acc, r) => acc + (Number(r.total) - Number(r.has_seo_title)), 0);
if (missingSeo > 0) {
  priorities.push(`补齐 ${missingSeo} 篇缺失自定义 seo_title/seo_description 的已发布新闻，并将 EN/RU 标题控制在 60 字符以内。`);
}
if (real404s.length > 0) {
  priorities.push(`核查近 7 天新增的 ${real404s.length} 条真实业务路径 404，按需在 worker-seo.mjs 补充 301 跳转。`);
}
if (priorities.length === 0) {
  priorities.push("保持每周二/五固定发布 2 篇高意图商业实务深稿，并复盘 GSC 与 Yandex 查询词。");
}

const reportMd = [
  `# HPF.kz SEO & GEO 每周运营复盘（${weekLabel} · ${dateStr}）`,
  "",
  "## 1. 核心数据总览",
  `- **已发布新闻总量**：${totalNews} 篇（母语已校对：${totalReviewed} 篇，占比 ${totalNews ? ((totalReviewed / totalNews) * 100).toFixed(1) : "0.0"}%）`,
  `- **已发布运输产品**：${totalProducts} 条${totalProducts === 0 ? "（⚠️ 空页 noindex，待上线）" : ""}`,
  `- **IndexNow 推送健康**：累计成功 ${idxTotal} 条 ｜ 近 7 天新增推送 ${idx7d} 条`,
  `- **转化点击**：近 7 天 ${totalClicks7d} 次 ｜ 近 30 天 ${totalClicks30d} 次 ｜ 近 7 天 Farsail 入库 ${inq7d} 条`,
  "",
  "## 2. 分语种内容与 SEO 元数据审计",
  "| 语种 | 已发布 | 近7天新增 | 母语已校对 | 平均标题长度 | 平均摘要长度 | 已填自定义 SEO |",
  "|---|---:|---:|---:|---:|---:|---:|",
  ...newsStats.map((r) => {
    const add7 = newsLast7d.find((x) => x.locale === r.locale)?.cnt ?? 0;
    const seo = seoCoverage.find((x) => x.locale === r.locale);
    return `| \`${r.locale}\` | ${r.published} | +${add7} | ${r.reviewed} | ${r.avg_title_len} | ${r.avg_desc_len} | ${seo?.has_seo_title ?? 0}/${r.published} |`;
  }),
  "",
  "## 3. 近 7 天联系转化明细",
  ...(clicksDetail7d.length > 0
    ? [
        "| 事件 | 语种 | 页面路径 | 来源归因 | 次数 |",
        "|---|---|---|---|---:|",
        ...clicksDetail7d.map((r) => `| \`${r.event}\` | \`${r.lang}\` | \`${r.path}\` | \`${r.source_ref || "-"}\` | ${r.total} |`),
      ]
    : clicks7d.length > 0
      ? clicks7d.map((r) => `- \`${r.event}\`：${r.total} 次（注：页面级细分表将在新 Worker 上线后开始累积）`)
      : ["- 近 7 天暂无联系点击记录。"]),
  "",
  "## 4. IndexNow 端点运行状态",
  ...(indexnowState.length > 0
    ? [
        "| 端点 | 最近状态码 | 连续 429 | 最近推送数 |",
        "|---|---:|---:|---:|",
        ...indexnowState.map((r) => `| \`${r.endpoint}\` | ${r.last_status ?? "-"} | ${r.consecutive_429} | ${r.last_pushed} |`),
      ]
    : ["- 状态表尚未初始化（需部署新版 IndexNow Worker 并待整点 :05 触发）。"]),
  "",
  "## 5. 近 7 天真实业务路径 404（已排除扫描器）",
  ...(real404s.length > 0
    ? [
        "| 路径 | 命中次数 | 最近出现 |",
        "|---|---:|---|",
        ...real404s.map((r) => `| \`${r.path}\` | ${r.hits} | ${r.last_seen_at} |`),
      ]
    : ["- 近 7 天无新增真实业务路径 404 🎉"]),
  "",
  "## 6. 下周优先行动清单（系统自动生成）",
  ...priorities.slice(0, 5).map((p, i) => `${i + 1}. ${p}`),
  "",
].join("\n");

console.log(reportMd);

if (WRITE_REPORT) {
  const dir = path.resolve(process.cwd(), "ops/seo-reports");
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `weekly-${weekLabel}.md`);
  await fs.writeFile(filePath, reportMd, "utf8");
  console.log(`[seo:weekly] Saved ops/seo-reports/weekly-${weekLabel}.md`);
}

if (process.env.WECOM_SEO_WEBHOOK) {
  const push = await fetch(process.env.WECOM_SEO_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ msgtype: "markdown", markdown: { content: reportMd.slice(0, 3900) } }),
  });
  console.log(`[seo:weekly] WeCom webhook status: ${push.status}`);
}
