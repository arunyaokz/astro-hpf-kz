# Design — HPF.kz Corporate Website

Locked multi-page design system. Future Hallmark work reads this file first and
defers to it. Amend intentionally; this file is the rule.

## System
- Genre · modern enterprise / industrial corporate
- Macrostructure · Split Studio for marketing pages; Workbench for platform; Long Document for news
- Theme · custom (vibe: "calm logistics authority, evidence first")
- Axes · cool-white paper / engineered sans / Caspian teal signal
- Navigation · corporate utility rail + N11 grouped mega-menu; mobile disclosure drawer
- Footer · genuine site index with operating contact, not a generic SaaS directory

## Design principles
- Evidence precedes adjectives. Asset claims remain distinct from delivery outcomes.
- Photography is documentary and may illustrate the industry; stock imagery never represents HPF-owned assets.
- Route diagrams are geographically ordered west-to-east from left to right: Europe on the left, Central Asia in the middle, China on the right. China-to-Europe cargo direction therefore reads right-to-left.
- No ornamental maps, giant luxury serif, floating AI graphics, glass panels, gradient text, or equal three-card feature grids.
- Chinese, English, and Russian share structure and interaction; allow 40% expansion for Russian.

## Tokens (canonical · `tokens.css` is the source of truth)
```css
:root {
  --color-paper: oklch(98% 0.006 238);
  --color-paper-2: oklch(95% 0.010 235);
  --color-paper-3: oklch(91% 0.014 232);
  --color-ink: oklch(20% 0.036 247);
  --color-ink-2: oklch(31% 0.032 245);
  --color-rule: oklch(84% 0.018 235);
  --color-muted: oklch(49% 0.022 240);
  --color-accent: oklch(48% 0.095 186);
  --color-accent-ink: oklch(98% 0.006 238);
  --color-focus: oklch(57% 0.14 190);
  --font-display: "IBM Plex Sans", "Noto Sans SC", sans-serif;
  --font-body: "Noto Sans SC", "IBM Plex Sans", sans-serif;
  --font-outlier: "IBM Plex Mono", monospace;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-micro: 120ms; --dur-short: 220ms; --dur-long: 420ms;
  --radius-card: 0.375rem; --radius-pill: 999px; --radius-input: 0.25rem;
}
```

## CTA voice
- Primary · deep navy fill · 4px radius · compact horizontal rhythm · concrete verb
- Secondary · transparent with visible rule · same radius
- Clickable labels remain one line at every supported viewport.

## Motion stance
- Composed by default. One restrained first-fold entrance and button/menu state feedback only.
- No universal scroll reveals or parallax.
- Reduced-motion fallback · instant state change or opacity crossfade at 150ms or less.

## Exports

### Tailwind v4 `@theme`
```css
@theme {
  --color-paper: oklch(98% 0.006 238);
  --color-paper-2: oklch(95% 0.010 235);
  --color-paper-3: oklch(91% 0.014 232);
  --color-ink: oklch(20% 0.036 247);
  --color-ink-2: oklch(31% 0.032 245);
  --color-rule: oklch(84% 0.018 235);
  --color-muted: oklch(49% 0.022 240);
  --color-accent: oklch(48% 0.095 186);
  --color-focus: oklch(57% 0.14 190);
  --font-display: "IBM Plex Sans", "Noto Sans SC", sans-serif;
  --font-body: "Noto Sans SC", "IBM Plex Sans", sans-serif;
  --font-outlier: "IBM Plex Mono", monospace;
  --spacing-3xs: 0.125rem; --spacing-2xs: 0.25rem; --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem; --spacing-md: 1rem; --spacing-lg: 1.5rem;
  --spacing-xl: 2.5rem; --spacing-2xl: 4rem; --spacing-3xl: 6rem;
  --radius-card: 0.375rem; --radius-pill: 999px; --radius-input: 0.25rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG `tokens.json`
```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "paper": { "$value": "oklch(98% 0.006 238)", "$type": "color" },
    "paper-2": { "$value": "oklch(95% 0.010 235)", "$type": "color" },
    "ink": { "$value": "oklch(20% 0.036 247)", "$type": "color" },
    "accent": { "$value": "oklch(48% 0.095 186)", "$type": "color" },
    "focus": { "$value": "oklch(57% 0.14 190)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "IBM Plex Sans, Noto Sans SC, sans-serif", "$type": "fontFamily" },
    "body": { "$value": "Noto Sans SC, IBM Plex Sans, sans-serif", "$type": "fontFamily" },
    "outlier": { "$value": "IBM Plex Mono, monospace", "$type": "fontFamily" }
  },
  "duration": {
    "micro": { "$value": "120ms", "$type": "duration" },
    "short": { "$value": "220ms", "$type": "duration" },
    "long": { "$value": "420ms", "$type": "duration" }
  }
}
```

### shadcn/ui variables
```css
:root {
  --background: 98% 0.006 238; --foreground: 20% 0.036 247;
  --card: 95% 0.010 235; --card-foreground: 20% 0.036 247;
  --popover: 98% 0.006 238; --popover-foreground: 20% 0.036 247;
  --primary: 20% 0.036 247; --primary-foreground: 98% 0.006 238;
  --secondary: 91% 0.014 232; --secondary-foreground: 31% 0.032 245;
  --muted: 91% 0.014 232; --muted-foreground: 49% 0.022 240;
  --accent: 48% 0.095 186; --accent-foreground: 98% 0.006 238;
  --border: 84% 0.018 235; --input: 84% 0.018 235; --ring: 57% 0.14 190;
  --radius: 0.375rem;
}
```

## Content governance
- `HPF_KZ_BRAND_LANGUAGE_ZH_V2.md` is the approved Chinese brand-language source.
- News remains file-based Astro Content Collections, reviewed and maintained by the AI workflow in `AI_NEWS_WORKFLOW.md`; no CMS is required for the present operating model.
