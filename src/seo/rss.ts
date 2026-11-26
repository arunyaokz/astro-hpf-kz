import { listNews, newsPath, NEWS_COPY, type NewsLang } from "../news";

const RSS_META: Record<Exclude<NewsLang, "kk">, { title: string; description: string; language: string; selfPath: string }> = {
  en: {
    title: "HPF.kz | Middle Corridor & Cross-Border Logistics News",
    description: NEWS_COPY.en.lead,
    language: "en",
    selfPath: "/rss.xml",
  },
  zh: {
    title: "HPF.kz｜中哈欧跨境物流与中间走廊资讯",
    description: NEWS_COPY.zh.lead,
    language: "zh-CN",
    selfPath: "/zh/rss.xml",
  },
  ru: {
    title: "HPF.kz | Новости Срединного коридора и международной логистики",
    description: NEWS_COPY.ru.lead,
    language: "ru",
    selfPath: "/ru/rss.xml",
  },
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function renderNewsRss(lang: Exclude<NewsLang, "kk">, site: URL | undefined): Promise<Response> {
  const origin = (site?.toString() ?? "https://hpf.kz").replace(/\/$/, "");
  const meta = RSS_META[lang];
  const { entries } = await listNews(lang);

  const itemsXml = entries
    .map(({ data }) => {
      const link = `${origin}${newsPath(lang, data.slug)}`;
      const pubDate = data.publishedAt ? new Date(data.publishedAt).toUTCString() : new Date().toUTCString();
      return [
        "    <item>",
        `      <title>${escapeXml(data.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <description>${escapeXml(data.description ?? "")}</description>`,
        `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
        data.category ? `      <category>${escapeXml(data.category)}</category>` : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(meta.title)}</title>`,
    `    <description>${escapeXml(meta.description)}</description>`,
    `    <link>${escapeXml(`${origin}${newsPath(lang)}`)}</link>`,
    `    <atom:link href="${escapeXml(`${origin}${meta.selfPath}`)}" rel="self" type="application/rss+xml" />`,
    `    <language>${escapeXml(meta.language)}</language>`,
    itemsXml,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=900",
    },
  });
}
