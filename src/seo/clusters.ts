import type { ContentEntry } from "emdash";
import type { NewsData } from "../news";

export type SeoClusterId =
  | "tir-freight"
  | "border-corridor"
  | "customs-compliance"
  | "equipment-coldchain"
  | "warehousing-ops";

const CLUSTER_RULES: { id: SeoClusterId; keywords: string[] }[] = [
  {
    id: "customs-compliance",
    keywords: [
      "customs", "compliance", "eaeu", "weight", "weights", "wood-packaging",
      "packaging", "documents", "document", "permit", "certificate", "tax",
    ],
  },
  {
    id: "equipment-coldchain",
    keywords: [
      "equipment", "oversize", "mining", "solar", "farm", "dairy", "brick",
      "particleboard", "wind-blade", "water-project", "cold-chain", "cold",
      "flower", "frozen", "temperature", "plant", "factory", "machinery",
    ],
  },
  {
    id: "border-corridor",
    keywords: [
      "khorgos", "border", "corridor", "caspian", "ferry", "hamzabeyli",
      "georgia", "japan", "oman", "shanghai", "intermodal", "transit",
      "staggered", "handoff", "handoffs", "appointment", "booking",
    ],
  },
  {
    id: "tir-freight",
    keywords: [
      "tir", "truck", "trucking", "quote", "winter", "freight", "road",
      "delivery", "infrastructure", "capacity", "address",
    ],
  },
  {
    id: "warehousing-ops",
    keywords: [
      "warehouse", "almaty", "distribution", "scheduling", "robot", "robots",
      "ai", "alert", "approval", "oversight", "error", "evidence",
    ],
  },
];

const STOP_TOKENS = new Set([
  "kazakhstan", "china", "and", "the", "for", "with", "from", "to", "in",
  "of", "on", "by", "2026", "2027", "logistics", "supply", "chain",
]);

function tokenizeSlug(slug: string): Set<string> {
  return new Set(
    slug
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length >= 3 && !STOP_TOKENS.has(t)),
  );
}

export function classifyNewsCluster(slug: string, category?: string): SeoClusterId {
  const lower = slug.toLowerCase();
  let bestId: SeoClusterId = category === "路线动态" ? "border-corridor" : "tir-freight";
  let bestScore = 0;

  for (const rule of CLUSTER_RULES) {
    let score = 0;
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) score += kw.includes("-") ? 3 : 2;
    }
    if (score > bestScore) {
      bestScore = score;
      bestId = rule.id;
    }
  }
  return bestId;
}

export function pickRelatedClusterNews(
  current: ContentEntry<NewsData>,
  candidates: ContentEntry<NewsData>[],
  count = 3,
): ContentEntry<NewsData>[] {
  const currentCluster = classifyNewsCluster(current.data.slug, current.data.category);
  const currentTokens = tokenizeSlug(current.data.slug);

  const scored = candidates
    .filter((item) => item.data.slug !== current.data.slug)
    .map((item, idx) => {
      const itemCluster = classifyNewsCluster(item.data.slug, item.data.category);
      const itemTokens = tokenizeSlug(item.data.slug);
      let overlap = 0;
      for (const t of currentTokens) {
        if (itemTokens.has(t)) overlap += 1;
      }

      let score = 0;
      if (itemCluster === currentCluster) score += 10;
      if (item.data.category === current.data.category) score += 2;
      score += overlap * 4;
      // Gentle recency bonus so equally relevant newer articles surface first.
      score += Math.max(0, 2 - idx * 0.05);

      return { item, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.item);
}
