#!/usr/bin/env node
/**
 * HPF.kz Daily SEO Health Audit, Edge Cache Warmer & Chinese Morning Briefing
 * Usage:
 *   node scripts/seo-daily-audit.mjs [--base=https://hpf.kz] [--warm-cache] [--write-report]
 * Optional env:
 *   WECOM_SEO_WEBHOOK=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=...
 */
import fs from "node:fs/promises";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [k, v] = arg.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const BASE = String(args.base || "https://hpf.kz").replace(/\/$/, "");
const WRITE_REPORT = Boolean(args["write-report"]);
const WARM_CACHE = Boolean(args["warm-cache"]);
const INDEXNOW_KEY = "hpfkz8d4e9a2c1b6f3057e4a9c2d8b1f6a3e0";

const CORE_PAGES = [
  "/", "/zh/", "/ru/",
  "/services/", "/zh/services/", "/ru/services/",
  "/routes/", "/zh/routes/", "/ru/routes/",
  "/about/", "/zh/about/", "/ru/about/",
  "/news/", "/zh/news/", "/ru/news/", "/kk/news/",
];

const RETIRED_PAGES = [
  "/blog/",
  "/blog/first-post/",
  "/colors/",
  "/sitemap-index.xml",
  "/news/insights/legacy-check/",
];

const SLASH_REDIRECTS = ["/zh", "/ru", "/about", "/services", "/routes", "/news"];

const LEGACY_REDIRECTS = [
  { from: "/about-us", status: 301, endsWith: "/about/" },
  { from: "/contacts/", status: 301, endsWith: "/about/#contact" },
  { from: "/kk/", status: 302, endsWith: "/kk/news/" },
];

const SCANNER_PROBES = ["/.git/config", "/wp-login.php", "/.env"];

async function timedFetch(pathname, init = {}) {
  const url = pathname.startsWith("http") ? pathname : `${BASE}${pathname}`;
  const start = performance.now();
  const res = await fetch(url, { redirect: "manual", ...init });
  const text = init.method === "HEAD" ? "" : await res.text();
  const ms = Math.round(performance.now() - start);
  return { url, pathname, status: res.status, headers: res.headers, text, ms };
}

function extractAttr(html, regex) {
  return html.match(regex)?.[1]?.trim() ?? null;
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(re)) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch (err) {
      blocks.push({ __parseError: String(err) });
    }
  }
  return blocks;
}

const failures = [];
const warnings = [];
const pageMetrics = [];

function fail(scope, detail) {
  failures.push({ scope, detail });
}
function warn(scope, detail) {
  warnings.push({ scope, detail });
}

// 0. Optional edge cache warm-up (eliminates cold-start TTFB spikes on core pages)
if (WARM_CACHE) {
  await Promise.allSettled(
    CORE_PAGES.map((p) => fetch(`${BASE}${p}`, { redirect: "follow" }).then((r) => r.arrayBuffer())),
  );
}

// 1. Core pages audit
for (const p of CORE_PAGES) {
  const res = await timedFetch(p);
  const canonical = extractAttr(res.text, /<link rel="canonical" href="([^"]+)"/i);
  const ogImage = extractAttr(res.text, /<meta property="og:image" content="([^"]+)"/i);
  const title = extractAttr(res.text, /<title>([^<]+)<\/title>/i);
  const desc = extractAttr(res.text, /<meta name="description" content="([^"]+)"/i);
  const cc = res.headers.get("cache-control") || "";
  const schemas = extractJsonLd(res.text);

  pageMetrics.push({ path: p, status: res.status, ms: res.ms, cacheControl: cc, titleLen: title?.length ?? 0 });

  if (res.status !== 200) fail(p, `HTTP ${res.status} (expected 200)`);
  if (canonical !== `${BASE}${p}`) fail(p, `Canonical mismatch: ${canonical}`);
  if (!title || !desc) fail(p, "Missing <title> or <meta description>");
  if (!ogImage || ogImage.endsWith(".svg")) fail(p, `Invalid og:image: ${ogImage}`);
  if (!cc.includes("public")) warn(p, `Not edge-cached (Cache-Control: ${cc})`);
  if (res.ms > 1200) warn(p, `Slow TTFB: ${res.ms}ms`);

  for (const s of schemas) {
    if (s.__parseError) fail(p, `Invalid JSON-LD: ${s.__parseError}`);
    const types = Array.isArray(s["@type"]) ? s["@type"] : [s["@type"]];
    if (types.includes("LogisticsBusiness")) fail(p, "Invalid Schema.org type LogisticsBusiness");
  }
  if (p.endsWith("/services/")) {
    const hasFaq = schemas.some((s) => s["@type"] === "FAQPage");
    if (!hasFaq) fail(p, "Missing FAQPage JSON-LD");
  }
}

// 2. Retired starter & broken legacy routes must return 410
for (const p of RETIRED_PAGES) {
  const res = await timedFetch(p);
  if (res.status !== 410) fail(p, `Expected 410 Gone, got HTTP ${res.status}`);
}

// 3. Trailing-slash 301 canonicalization & legacy redirects
for (const p of SLASH_REDIRECTS) {
  const res = await timedFetch(p);
  const loc = res.headers.get("location") || "";
  if (res.status !== 301 || !loc.endsWith(`${p}/`)) {
    fail(p, `Expected 301 -> ${p}/, got HTTP ${res.status} (${loc})`);
  }
}
for (const rule of LEGACY_REDIRECTS) {
  const res = await timedFetch(rule.from);
  const loc = res.headers.get("location") || "";
  if (res.status !== rule.status || !loc.endsWith(rule.endsWith)) {
    fail(rule.from, `Expected ${rule.status} -> *${rule.endsWith}, got HTTP ${res.status} (${loc})`);
  }
}

// 4. Scanner probes blocked cleanly at edge with X-Robots-Tag: noindex
for (const p of SCANNER_PROBES) {
  const res = await timedFetch(p);
  const xRobots = res.headers.get("x-robots-tag") || "";
  if (res.status !== 404 || !xRobots.includes("noindex")) {
    warn(p, `Expected edge 404 + noindex, got HTTP ${res.status} (X-Robots-Tag: ${xRobots || "none"})`);
  }
}

// 5. robots.txt (must allow public media images + include Yandex Host & Sitemap)
const robots = await timedFetch("/robots.txt");
if (robots.status !== 200 || !robots.text.includes("/sitemap.xml")) {
  fail("/robots.txt", "Missing Sitemap directive or non-200");
}
if (!robots.text.includes("Allow: /_emdash/api/media/file/")) {
  fail("/robots.txt", "Missing Allow: /_emdash/api/media/file/ (blocks news cover images!)");
}
if (!/^Host:\s*https?:\/\//im.test(robots.text)) {
  warn("/robots.txt", "Missing Host directive for Yandex");
}

// 6. Sitemaps, RSS, dynamic llms.txt, IndexNow key, OG image asset
const sitemapIndex = await timedFetch("/sitemap.xml");
if (sitemapIndex.status !== 200) fail("/sitemap.xml", `HTTP ${sitemapIndex.status}`);
for (const forbidden of ["footer_settings", "contact_settings", "header_settings"]) {
  if (sitemapIndex.text.includes(forbidden)) fail("/sitemap.xml", `Leaks ${forbidden}`);
}
if (!sitemapIndex.text.includes("/sitemap-pages.xml")) fail("/sitemap.xml", "Missing sitemap-pages.xml");

const newsSitemap = await timedFetch("/sitemap-news.xml");
if (newsSitemap.status !== 200) fail("/sitemap-news.xml", `HTTP ${newsSitemap.status}`);
if (newsSitemap.text.includes('hreflang="zh"')) fail("/sitemap-news.xml", 'Found hreflang="zh" instead of zh-CN');

const newsLocs = [...newsSitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const nonSlashLocs = newsLocs.filter((u) => !u.endsWith("/"));
if (nonSlashLocs.length > 0) fail("/sitemap-news.xml", `${nonSlashLocs.length} URLs missing trailing slash`);

for (const rssPath of ["/rss.xml", "/zh/rss.xml", "/ru/rss.xml"]) {
  const rss = await timedFetch(rssPath);
  if (rss.status !== 200 || !rss.text.includes("<rss")) fail(rssPath, `Invalid RSS (HTTP ${rss.status})`);
  if (/lorem ipsum|first post/i.test(rss.text)) fail(rssPath, "Starter template text leaked in RSS");
}

const llms = await timedFetch("/llms.txt");
if (llms.status !== 200 || !llms.text.includes("241040015643")) {
  fail("/llms.txt", "Missing or incomplete /llms.txt");
} else if (!llms.text.includes("## Latest Corridor Insights")) {
  warn("/llms.txt", "Static /llms.txt detected (missing dynamic Latest Corridor Insights)");
}

const keyFile = await timedFetch(`/${INDEXNOW_KEY}.txt`);
if (keyFile.status !== 200 || keyFile.text.trim() !== INDEXNOW_KEY) fail(`/${INDEXNOW_KEY}.txt`, "IndexNow key verification failed");

const ogAsset = await timedFetch("/og-hpf-kz.png", { method: "HEAD" });
if (ogAsset.status !== 200) fail("/og-hpf-kz.png", `HTTP ${ogAsset.status}`);

// 7. Sample live news articles (up to 4 across locales) + verify og:image accessibility
const sampleUrls = [];
for (const prefix of ["/news/", "/zh/news/", "/ru/news/", "/kk/news/"]) {
  const found = newsLocs.find((u) => new URL(u).pathname.startsWith(prefix));
  if (found) sampleUrls.push(new URL(found).pathname);
}
for (const p of sampleUrls) {
  const res = await timedFetch(p);
  if (res.status !== 200) {
    fail(p, `HTTP ${res.status}`);
    continue;
  }
  const ogType = extractAttr(res.text, /<meta property="og:type" content="([^"]+)"/i);
  const ogImg = extractAttr(res.text, /<meta property="og:image" content="([^"]+)"/i);
  const schemas = extractJsonLd(res.text);
  if (ogType !== "article") fail(p, `Expected og:type=article, got ${ogType}`);
  if (!ogImg || ogImg.endsWith(".svg")) {
    fail(p, `Invalid article og:image: ${ogImg}`);
  } else {
    const imgCheck = await timedFetch(ogImg, { method: "HEAD" });
    if (imgCheck.status !== 200) fail(p, `Article og:image unreachable (HTTP ${imgCheck.status}): ${ogImg}`);
  }
  if (!schemas.some((s) => s["@type"] === "Article")) fail(p, "Missing Article JSON-LD");
  if (!schemas.some((s) => s["@type"] === "BreadcrumbList")) fail(p, "Missing BreadcrumbList JSON-LD");
  if (!res.text.includes("?from=news")) warn(p, "Missing attributed Farsail CTA link");
}

// 8. Pending/thin pages noindex check
for (const p of ["/green-channel/", "/zh/green-channel/", "/ru/green-channel/"]) {
  const res = await timedFetch(p);
  if (res.status === 200 && !/noindex/i.test(res.text)) warn(p, "Pending green-channel page missing noindex");
}

// Build summary
const almatyDate = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Almaty" }).format(new Date());
const avgMs = Math.round(pageMetrics.reduce((acc, m) => acc + m.ms, 0) / Math.max(1, pageMetrics.length));
const statusLabel = failures.length === 0 ? (warnings.length === 0 ? "🟢 健康" : "🟡 正常（含提醒）") : "🔴 发现异常";

const reportMd = [
  `# HPF.kz 每日 SEO 巡检晨报（${almatyDate}）`,
  "",
  `- **站点**：${BASE}${WARM_CACHE ? "（已预热边缘缓存）" : ""}`,
  `- **健康状态**：${statusLabel}`,
  `- **已收录新闻条目数（Sitemap）**：${newsLocs.length} 条`,
  `- **核心 16 页平均响应时间**：${avgMs} ms`,
  `- **严重错误**：${failures.length} 项 ｜ **提醒**：${warnings.length} 项`,
  "",
  ...(failures.length > 0
    ? ["## ❌ 严重错误（需立即处理）", ...failures.map((f) => `- \`${f.scope}\`：${f.detail}`), ""]
    : []),
  ...(warnings.length > 0
    ? ["## ⚠️ 提醒事项", ...warnings.map((w) => `- \`${w.scope}\`：${w.detail}`), ""]
    : []),
  "## ✅ 核心页面巡检明细",
  "| 页面 | 状态 | 耗时 | Cache-Control |",
  "|---|---:|---:|---|",
  ...pageMetrics.map((m) => `| \`${m.path}\` | ${m.status} | ${m.ms}ms | \`${m.cacheControl}\` |`),
  "",
].join("\n");

console.log(reportMd);

if (WRITE_REPORT) {
  const dir = path.resolve(process.cwd(), "ops/seo-reports");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${almatyDate}.md`), reportMd, "utf8");
  await fs.writeFile(
    path.join(dir, "latest.json"),
    JSON.stringify({ date: almatyDate, base: BASE, warmCache: WARM_CACHE, status: statusLabel, newsCount: newsLocs.length, avgMs, failures, warnings, pageMetrics }, null, 2),
    "utf8",
  );
  console.log(`[seo:audit] Saved ops/seo-reports/${almatyDate}.md`);
}

if (process.env.WECOM_SEO_WEBHOOK) {
  const push = await fetch(process.env.WECOM_SEO_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ msgtype: "markdown", markdown: { content: reportMd.slice(0, 3900) } }),
  });
  console.log(`[seo:audit] WeCom webhook status: ${push.status}`);
}

if (failures.length > 0) process.exit(1);
