import { getEmDashCollection, getEmDashEntry, type ImageValue } from "emdash";
import type { Lang } from "./site-v2";

export interface ProductData {
  id: string;
  title: string;
  summary?: string;
  price_minor?: string;
  currency?: string;
  sku_id?: string;
  pricing_mode?: string;
  service_scope?: string;
  service_area?: string;
  service_lead_time?: string;
  pricing_method?: string;
  category?: string;
  highlights?: string;
  hero_image?: ImageValue;
  slug: string;
  locale: string;
  status: string;
}

export const productPath = (lang: Lang, slug?: string) =>
  `${lang === "en" ? "" : `/${lang}`}/products/${slug ? `${encodeURIComponent(slug)}/` : ""}`;

/** 询价跳到公司介绍页的联系表单，并把产品名带进「货物」一栏 */
export const productInquiryPath = (lang: Lang, title: string) =>
  `${lang === "en" ? "" : `/${lang}`}/about/?product=${encodeURIComponent(title)}#contact`;

export async function listProducts(lang: Lang, cursor?: string) {
  const result = await getEmDashCollection<"products", ProductData>("products", {
    locale: lang, status: "published", limit: 50, cursor, orderBy: { title: "asc" },
  });
  if (result.error) throw result.error;
  return result;
}

export async function loadProductEntry(lang: Lang, slug: string) {
  const { entry, error, isPreview } = await getEmDashEntry<"products", ProductData>("products", slug, { locale: lang });
  if (error) throw error;
  return entry && (isPreview || (entry.data.status === "published" && entry.data.locale === lang)) ? entry : null;
}

export const PRODUCT_COPY = {
  zh: { eyebrow: "HPF KZ · 运输产品", title: "运输与海关服务产品", lead: "按线路和货物类型选择运输产品；价格随货物、时间和条款变化，提交询价后由我们核对后报价。", empty: "暂时没有已上线的运输产品。", quote: "按需报价", inquire: "询价", details: "查看详情", back: "返回产品列表", route: "服务区域", scope: "服务范围", leadTime: "时效", method: "计价方式", highlights: "服务要点", next: "下一页", price: "参考价格" },
  en: { eyebrow: "HPF KZ · TRANSPORT PRODUCTS", title: "Transport and customs services", lead: "Choose a service by route and cargo type. Rates depend on the cargo, timing and terms, so we confirm every quote after reviewing your request.", empty: "No transport products are online yet.", quote: "Quote on request", inquire: "Request a quote", details: "View details", back: "All products", route: "Area / route", scope: "Scope", leadTime: "Transit time", method: "Pricing", highlights: "What is included", next: "Next page", price: "Indicative price" },
  ru: { eyebrow: "HPF KZ · ТРАНСПОРТНЫЕ УСЛУГИ", title: "Перевозки и таможенные услуги", lead: "Выберите услугу по маршруту и типу груза. Стоимость зависит от груза, сроков и условий поставки, поэтому цену мы называем после проверки заявки.", empty: "Услуги пока не опубликованы.", quote: "Цена по запросу", inquire: "Запросить цену", details: "Подробнее", back: "Все услуги", route: "Маршрут / регион", scope: "Состав услуги", leadTime: "Срок", method: "Расчёт стоимости", highlights: "Что входит", next: "Следующая страница", price: "Ориентировочная цена" },
} as const;

export function productCategory(value: string | undefined, lang: Lang): string {
  const labels: Record<string, Record<Lang, string>> = {
    "跨境运输": { zh: "跨境运输", en: "Cross-border freight", ru: "Международные перевозки" },
    "危险品运输": { zh: "危险品运输", en: "Dangerous goods", ru: "Опасные грузы" },
    "冷链运输": { zh: "冷链运输", en: "Cold chain", ru: "Рефрижераторные перевозки" },
    "海关服务": { zh: "海关服务", en: "Customs", ru: "Таможенное оформление" },
  };
  return value ? labels[value]?.[lang] ?? value : "";
}

/** price_minor 是最小货币单位的整数字符串；留空或格式不对一律显示「按需报价」 */
export function productPrice(data: Pick<ProductData, "price_minor" | "currency" | "pricing_mode">, lang: Lang): string | null {
  if (data.pricing_mode === "quote" || !data.price_minor || !/^\d{1,12}$/.test(data.price_minor) || !/^[A-Z]{3}$/.test(data.currency ?? "")) return null;
  try {
    return new Intl.NumberFormat(lang === "zh" ? "zh-CN" : lang === "ru" ? "ru-RU" : "en-GB", { style: "currency", currency: data.currency! })
      .format(Number(data.price_minor) / 100);
  } catch {
    return null;
  }
}

export const lines = (value?: string) => (value ?? "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
