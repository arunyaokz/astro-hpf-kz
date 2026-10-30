import { getEmDashCollection, getEmDashEntry, type ImageValue, type PortableTextBlock } from "emdash";
import type { Lang } from "./site-v2";

export type NewsLang = Lang | "kk";

export interface NewsData {
  id: string;
  title: string;
  description: string;
  content: PortableTextBlock[];
  hero_image?: ImageValue;
  category: string;
  verification_status: string;
  source_urls?: string;
  author_name?: string;
  native_reviewed: boolean;
  slug: string;
  locale: string;
  publishedAt: Date;
  status: string;
}

export const newsPath = (lang: NewsLang, slug?: string) =>
  `${lang === "en" ? "" : `/${lang}`}/news/${slug ? `${encodeURIComponent(slug)}/` : ""}`;

export async function listNews(lang: NewsLang, cursor?: string) {
  const result = await getEmDashCollection<"news", NewsData>("news", {
    locale: lang, status: "published", limit: 20, cursor,
    orderBy: { published_at: "desc" },
  });
  if (result.error) throw result.error;
  return result;
}

export async function loadNewsEntry(lang: NewsLang, slug: string) {
  const { entry, error, isPreview } = await getEmDashEntry<"news", NewsData>("news", slug, { locale: lang });
  if (error) throw error;
  return entry && (isPreview || (entry.data.status === "published" && entry.data.locale === lang)) ? entry : null;
}

export const NEWS_COPY = {
  kk: { title: "Компания және маршрут жаңалықтары", lead: "Компания, маршрут және Орталық Азия нарығы туралы жаңалықтар.", empty: "Әзірге жарияланған жаңалық жоқ.", back: "Жаңалықтарға оралу", next: "Келесі бет", sources: "Дереккөздер", verification: "Тексеру мәртебесі", category: "Санат" },
  zh: { title: "公司与路线动态", lead: "公司进展、路线变化与中亚市场观察。每篇新闻保留来源与核验状态。", empty: "暂时没有已发布的新闻。", back: "返回新闻", next: "下一页", sources: "信息来源", verification: "核验状态", category: "新闻分类" },
  en: { title: "Company and route updates", lead: "Company news, route updates and Central Asia market observations, with sources and verification status.", empty: "No news has been published yet.", back: "Back to news", next: "Next page", sources: "Sources", verification: "Verification", category: "Category" },
  ru: { title: "Новости компании и маршрутов", lead: "Новости компании, изменения маршрутов и обзоры рынка Центральной Азии с указанием источников и статуса проверки.", empty: "Опубликованных новостей пока нет.", back: "Все новости", next: "Следующая страница", sources: "Источники", verification: "Проверка", category: "Категория" },
} as const;

export function newsLabel(value: string, lang: NewsLang): string {
  const labels: Record<string, Record<NewsLang, string>> = {
    "公司动态": { kk: "Компания жаңалықтары", zh: "公司动态", en: "Company", ru: "Компания" },
    "路线动态": { kk: "Маршрут жаңалықтары", zh: "路线动态", en: "Routes", ru: "Маршруты" },
    "市场观察": { kk: "Нарық шолуы", zh: "市场观察", en: "Market", ru: "Рынок" },
    "行业分析": { kk: "Салалық талдау", zh: "行业分析", en: "Analysis", ru: "Аналитика" },
    "待核验": { kk: "Тексерілуде", zh: "待核验", en: "Pending verification", ru: "Ожидает проверки" },
    "公司一手信息": { kk: "Компания дерегі", zh: "公司一手信息", en: "Company source", ru: "Информация компании" },
    "公开来源已核验": { kk: "Ашық дереккөз тексерілді", zh: "公开来源已核验", en: "Verified public source", ru: "Проверенный открытый источник" },
    "分析观点": { kk: "Талдау", zh: "分析观点", en: "Analysis", ru: "Аналитическое мнение" },
  };
  return labels[value]?.[lang] ?? value;
}

export function sourceUrls(value?: string): string[] {
  return (value ?? "").split(/\r?\n/).map((url) => url.trim()).filter((url) => {
    try { return ["https:", "http:"].includes(new URL(url).protocol); } catch { return false; }
  });
}
