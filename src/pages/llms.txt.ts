import type { APIRoute } from "astro";
import { listNews, newsPath } from "../news";
import { listProducts, productPath } from "../products";

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
  const origin = (site ?? new URL("https://hpf.kz")).toString().replace(/\/$/, "");

  const [enNews, zhNews, ruNews, enProducts, zhProducts, ruProducts] = await Promise.all([
    listNews("en", undefined, 12).catch(() => ({ entries: [] })),
    listNews("zh", undefined, 12).catch(() => ({ entries: [] })),
    listNews("ru", undefined, 12).catch(() => ({ entries: [] })),
    listProducts("en").catch(() => ({ entries: [] })),
    listProducts("zh").catch(() => ({ entries: [] })),
    listProducts("ru").catch(() => ({ entries: [] })),
  ]);

  const lines: string[] = [
    "# HPF.kz — HPF KZ Limited Liability Partnership (LLP)",
    "",
    "> Cross-border logistics, TIR road freight, pre-shipment customs compliance, Almaty warehousing and Kazakhstan local distribution connecting China, Central Asia and Europe via the Eurasian and Middle (Trans-Caspian) Corridors.",
    "",
    "## Verified Company Facts",
    "- Legal entity: HPF KZ Limited Liability Partnership (LLP)",
    "- Business Identification Number (BIN): 241040015643",
    "- Office address: Room 523, Stanitsa Business Park, 66 Khaliullina Street, Almaty, Kazakhstan",
    "- Coordinates (2GIS): 43.284122, 76.981999 (https://2gis.kz/almaty/geo/70000001060263869/76.981999,43.284122)",
    "- Business email: bd@hpf.kz",
    "- Business phone & WhatsApp: +7 776 702 1414",
    "- Languages: English (en), Simplified Chinese (zh-CN), Russian (ru), Kazakh news (kk)",
    "",
    "## Core Pages",
    `- [Home (English)](${origin}/): Overview of China–Kazakhstan–Europe TIR, customs, Almaty warehousing and delivery.`,
    `- [首页 (中文)](${origin}/zh/): 中国—哈萨克斯坦—欧洲跨境物流、清关合规预审、阿拉木图仓储分拨与哈萨克斯坦本地交付。`,
    `- [Главная (Русский)](${origin}/ru/): Международные перевозки Китай–Казахстан–Европа, таможенная подготовка, склад в Алматы и доставка по Казахстану.`,
    `- [Services & Freight FAQ (EN)](${origin}/services/): Customs & compliance coordination, TIR linehaul, Almaty warehousing & distribution, Kazakhstan local delivery, and freight FAQ.`,
    `- [服务与货运问答 (中文)](${origin}/zh/services/): 中哈欧跨境运输、发运前清关预审、阿拉木图仓配及常见询价问答。`,
    `- [Услуги и частые вопросы (RU)](${origin}/ru/services/): Перевозки, таможенная подготовка, склад в Алматы, доставка по Казахстану и ответы на вопросы.`,
    `- [Routes & Network](${origin}/routes/): Comparison of Northern, Middle (Trans-Caspian) and Southern Eurasian corridors, node ownership, and switch triggers.`,
    `- [Company & Freight Enquiry](${origin}/about/): Operating principles, legal ledger, and online freight enquiry form.`,
    `- [News & Corridor Insights (EN)](${origin}/news/): Verified updates and practical logistics guides across the Middle Corridor.`,
    `- [新闻与洞察 (中文)](${origin}/zh/news/): 中间走廊路线动态、口岸政策与跨境运输实务。`,
    `- [Новости и обзоры (Русский)](${origin}/ru/news/): Новости Срединного коридора и практические материалы по международным перевозкам.`,
    `- [Жаңалықтар (Қазақша)](${origin}/kk/news/): Орта дәліз және халықаралық логистика жаңалықтары.`,
  ];

  const productGroups = [
    { label: "Transport Products (EN)", lang: "en" as const, items: enProducts.entries },
    { label: "运输产品 (中文)", lang: "zh" as const, items: zhProducts.entries },
    { label: "Транспортные услуги (RU)", lang: "ru" as const, items: ruProducts.entries },
  ].filter((g) => g.items.length > 0);

  if (productGroups.length > 0) {
    lines.push("", "## Active Transport & Customs Products");
    for (const group of productGroups) {
      lines.push(`### ${group.label}`);
      for (const { data } of group.items) {
        const desc = data.summary ? `: ${data.summary.replace(/\s+/g, " ").trim()}` : "";
        lines.push(`- [${data.title}](${origin}${productPath(group.lang, data.slug)})${desc}`);
      }
    }
  }

  const newsGroups = [
    { label: "Latest Corridor Guides & Analysis (EN)", lang: "en" as const, items: enNews.entries },
    { label: "最新实务指南与行业分析 (中文)", lang: "zh" as const, items: zhNews.entries },
    { label: "Последние обзоры и руководства (RU)", lang: "ru" as const, items: ruNews.entries },
  ];

  lines.push("", "## Latest Corridor Insights");
  for (const group of newsGroups) {
    if (group.items.length === 0) continue;
    lines.push(`### ${group.label}`);
    for (const { data } of group.items.slice(0, 10)) {
      const desc = data.description ? `: ${data.description.replace(/\s+/g, " ").trim()}` : "";
      lines.push(`- [${data.title}](${origin}${newsPath(group.lang, data.slug)})${desc}`);
    }
  }

  lines.push(
    "",
    "## Machine-Readable Feeds",
    `- Sitemap: ${origin}/sitemap.xml`,
    `- RSS (EN): ${origin}/rss.xml`,
    `- RSS (ZH): ${origin}/zh/rss.xml`,
    `- RSS (RU): ${origin}/ru/rss.xml`,
    "",
    "## Editorial & Promise Boundaries",
    "- HPF.kz distinguishes verified company facts, public sources, and editorial analysis.",
    "- Transit times, port windows, permits, and rates are confirmed per shipment based on cargo profile and current conditions rather than blanket guarantees.",
    "",
  );

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
