import { getEmDashEntry, type ImageValue } from 'emdash';
import type { Lang } from '../site-v2';
import type { SERVICES_COPY } from '../services-content';
import type { ROUTE_NETWORK_COPY } from '../routes-content';
import type { PAGE_COPY, COMPANY_STORY, CONTACT_COPY } from '../site-v2';
import { baseline, decodePage, PAGE_COLLECTIONS, PAGE_SLUGS } from './page-model.mjs';

type Hero = { heroImage?: ImageValue };
export interface CorporatePages {
  services: { page: typeof SERVICES_COPY.en } & Hero;
  routes: Omit<typeof baseline.routes.en, 'page'> & { page: typeof ROUTE_NETWORK_COPY.en } & Hero;
  company: Omit<typeof baseline.company.en, 'page' | 'story' | 'contact'> & {
    page: typeof PAGE_COPY.about.en; story: typeof COMPANY_STORY.en; contact: typeof CONTACT_COPY.en;
  } & Hero;
}

export async function loadCorporatePage<K extends keyof CorporatePages>(kind: K, lang: Lang): Promise<CorporatePages[K] | null> {
  const { entry, error, isPreview } = await getEmDashEntry(PAGE_COLLECTIONS[kind], PAGE_SLUGS[kind], { locale: lang });
  if (error) throw error;
  if (!entry || (!isPreview && (entry.data.status !== 'published' || entry.data.locale !== lang))) return null;
  return decodePage(kind, lang, entry.data) as CorporatePages[K];
}
