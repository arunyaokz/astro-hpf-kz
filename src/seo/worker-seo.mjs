// Production SEO guards:
// - Edge block for vulnerability scanner probes (saves Worker/D1 quota & keeps 404 logs clean)
// - Retired starter / broken legacy routes (410 Gone)
// - Real legacy/guessed URL redirects (301) and temporary /kk/ -> /kk/news/ (302)
// - Trailing-slash 301 canonicalization
// - robots.txt normalization (explicitly Allow /_emdash/api/media/file/ + Yandex Host directive)
// - Clean unified sitemap normalization (excluding CMS settings collections)

const RETIRED_PATH_RE = /^\/(?:blog(?:\/.*)?|colors\/?|sitemap-index\.xml|sitemap-0\.xml|news\/insights(?:\/.*)?)$/;
const BLOCKED_SITEMAP_RE = /^\/sitemap-(?:footer_settings|contact_settings|header_settings)(?:-\d+)?\.xml$/;
const SKIP_SLASH_PREFIX_RE = /^\/(?:_emdash|_hpf|_astro|cms|api|cdn-cgi)(?:\/|$)/;
const HAS_FILE_EXT_RE = /\/[^/]+\.[a-z0-9]{1,8}$/i;

// Common exploit/CMS vulnerability scanner paths that should never reach EmDash/D1.
const SCANNER_PROBE_RE =
  /^\/(?:\.(?:git|env|aws|hg|svn|DS_Store|htaccess|well-known\/(?:apple-app-site-association|security\.txt)|vscode)|wp-(?:login|admin|json|includes|content|cron|config)|wordpress(?:\/|$)|wp(?:\/|$)|xmlrpc\.php|phpinfo|_profiler(?:\/|$)|actuator(?:\/|$)|livewire(?:\/|$)|telescope(?:\/|$)|vendor(?:\/|$)|server-(?:status|info)|api\/(?:session|config|gql|fs|console|system)(?:\/|$)|___proxy_subdomain|ecp\/Current\/|@vite(?:\/|$)|_next(?:\/|$)|phpmyadmin|cgi-bin(?:\/|$)|config\/production\.json|graphql(?:\/|$)|swagger(?:\/|$)|api-docs(?:\/|$)|playground(?:\/|$)|credentials(?:\/|$)|site\/|press\/|cms\/wp-json)|\/[^/]+\.(?:php|sql|bak|env|ini|asp|aspx|jsp)(?:\/|$)/i;

const LEGACY_301_MAP = new Map([
  ["/about-us", "/about/"],
  ["/about-us/", "/about/"],
  ["/contacts", "/about/#contact"],
  ["/contacts/", "/about/#contact"],
  ["/contact-us", "/about/#contact"],
  ["/contact-us/", "/about/#contact"],
  ["/zh/contact", "/zh/about/#contact"],
  ["/zh/contact/", "/zh/about/#contact"],
  ["/zh/contacts", "/zh/about/#contact"],
  ["/zh/contacts/", "/zh/about/#contact"],
  ["/ru/contact", "/ru/about/#contact"],
  ["/ru/contact/", "/ru/about/#contact"],
  ["/ru/contacts", "/ru/about/#contact"],
  ["/ru/contacts/", "/ru/about/#contact"],
]);

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildStaticPagesSitemap(origin) {
  const groups = [
    [
      { hreflang: "en", path: "/news/" },
      { hreflang: "zh-CN", path: "/zh/news/" },
      { hreflang: "ru", path: "/ru/news/" },
      { hreflang: "kk", path: "/kk/news/" },
    ],
    [
      { hreflang: "en", path: "/privacy/" },
      { hreflang: "zh-CN", path: "/zh/privacy/" },
      { hreflang: "ru", path: "/ru/privacy/" },
    ],
  ];

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const alternates of groups) {
    const xDefault = alternates.find((a) => a.hreflang === "en") ?? alternates[0];
    for (const item of alternates) {
      lines.push("  <url>");
      lines.push(`    <loc>${escapeXml(`${origin}${item.path}`)}</loc>`);
      for (const alt of alternates) {
        lines.push(`    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(`${origin}${alt.path}`)}" />`);
      }
      lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${origin}${xDefault.path}`)}" />`);
      lines.push("  </url>");
    }
  }

  lines.push("</urlset>");
  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function ensureTrailingSlashOnSiteUrl(rawUrl, origin) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.origin !== origin) return rawUrl;
    if (parsed.pathname === "/" || parsed.pathname.endsWith("/")) return rawUrl;
    if (HAS_FILE_EXT_RE.test(parsed.pathname)) return rawUrl;
    if (parsed.pathname.startsWith("/_emdash/")) return rawUrl;
    parsed.pathname = `${parsed.pathname}/`;
    return parsed.toString();
  } catch {
    return rawUrl;
  }
}

export function handleSeoPre(request) {
  const method = request.method;
  if (method !== "GET" && method !== "HEAD") return null;

  const url = new URL(request.url);
  const { pathname, origin } = url;

  // 1. Block exploit/scanner noise at the edge so it never hits EmDash/D1.
  if (SCANNER_PROBE_RE.test(pathname)) {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // 2. Retired starter & broken legacy URLs -> 410 Gone.
  if (RETIRED_PATH_RE.test(pathname)) {
    return new Response("Gone", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // 3. Real legacy/guessed contact/about paths -> 301 permanent redirect.
  const legacyTarget = LEGACY_301_MAP.get(pathname.toLowerCase());
  if (legacyTarget) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: `${origin}${legacyTarget}`,
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  // 4. Temporary Kazakh landing fallback until full /kk/ corporate home launches (302, not permanent).
  if (pathname === "/kk" || pathname === "/kk/") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${origin}/kk/news/`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  if (BLOCKED_SITEMAP_RE.test(pathname)) {
    return new Response("<!-- Sitemap excluded -->", {
      status: 404,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  if (pathname === "/sitemap-pages.xml") {
    return buildStaticPagesSitemap(origin);
  }

  // 5. Canonicalize public HTML URLs to trailing slash (matches <link rel="canonical">).
  if (
    pathname !== "/" &&
    !pathname.endsWith("/") &&
    !SKIP_SLASH_PREFIX_RE.test(pathname) &&
    !HAS_FILE_EXT_RE.test(pathname)
  ) {
    const target = new URL(url.toString());
    target.pathname = `${pathname}/`;
    return new Response(null, {
      status: 301,
      headers: {
        Location: target.toString(),
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return null;
}

export async function transformSeoResponse(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  if (response.status !== 200) return response;

  const url = new URL(request.url);
  const { pathname, origin } = url;

  // Ensure public news cover images / OG images under /_emdash/api/media/file/ are crawlable,
  // while keeping /_emdash/admin and all other internal CMS APIs blocked. Add Host for Yandex.
  if (pathname === "/robots.txt") {
    const body = [
      "User-agent: *",
      "Allow: /",
      "Allow: /_emdash/api/media/file/",
      "",
      "# Disallow CMS admin and internal API routes (public media files explicitly allowed above)",
      "Disallow: /_emdash/",
      "Disallow: /_hpf/",
      "Disallow: /cms/",
      "",
      `Host: ${origin}`,
      `Sitemap: ${origin}/sitemap.xml`,
      "",
    ].join("\n");
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "text/plain; charset=utf-8");
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
    return new Response(body, { status: 200, headers });
  }

  if (pathname === "/sitemap.xml") {
    const xml = await response.text();
    // Strip non-page CMS settings collections from the sitemap index.
    let cleaned = xml.replace(
      /\s*<sitemap>\s*<loc>[^<]*\/sitemap-(?:footer_settings|contact_settings|header_settings)(?:-\d+)?\.xml<\/loc>[\s\S]*?<\/sitemap>/g,
      "",
    );
    const pagesEntry = `\n  <sitemap>\n    <loc>${escapeXml(`${origin}/sitemap-pages.xml`)}</loc>\n  </sitemap>\n</sitemapindex>`;
    if (!cleaned.includes("/sitemap-pages.xml")) {
      cleaned = cleaned.replace("</sitemapindex>", pagesEntry);
    }
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "application/xml; charset=utf-8");
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
    return new Response(cleaned, { status: 200, headers });
  }

  if (/^\/sitemap-[^/]+\.xml$/.test(pathname) && pathname !== "/sitemap-pages.xml") {
    const xml = await response.text();
    const normalized = xml
      .replace(/<loc>([^<]+)<\/loc>/g, (_, loc) => `<loc>${escapeXml(ensureTrailingSlashOnSiteUrl(loc, origin))}</loc>`)
      .replace(/href="([^"]+)"/g, (_, href) => `href="${escapeXml(ensureTrailingSlashOnSiteUrl(href, origin))}"`)
      .replaceAll('hreflang="zh"', 'hreflang="zh-CN"');
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "application/xml; charset=utf-8");
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
    return new Response(normalized, { status: 200, headers });
  }

  return response;
}
