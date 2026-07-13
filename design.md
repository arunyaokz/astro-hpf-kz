# Design — HPF.kz Corporate Website

Locked multi-page design system. Future Hallmark work reads this file first and
defers to it. Amend intentionally; this file is the rule.

## System
- Genre · modern enterprise / industrial corporate
- Macrostructure · Split Studio for marketing pages; Workbench for platform; Long Document for news
- Theme · custom (vibe: "calm logistics authority, evidence first")
- Axes · cool-blue paper / engineered sans / saturated cobalt signal
- Navigation · corporate utility rail + N11 grouped mega-menu; mobile disclosure drawer
- Footer · genuine site index with operating contact, not a generic SaaS directory

## Design principles
- Evidence precedes adjectives. Asset claims remain distinct from delivery outcomes.
- Photography is documentary and may illustrate the industry; stock imagery never represents HPF-owned assets.
- Route diagrams are geographically ordered west-to-east from left to right: Europe on the left, Central Asia in the middle, China on the right. China-to-Europe cargo direction therefore reads right-to-left.
- No ornamental maps, giant luxury serif, floating AI graphics, glass panels, gradient text, or equal three-card feature grids.
- Chinese, English, and Russian share structure and interaction; allow 40% expansion for Russian.
- The brand is a blue system: navy carries trust, cool paper carries density, saturated cobalt marks decisions and operating status. Cobalt is an accent, not a full-screen wash.

## Tokens (canonical · `tokens.css` is the source of truth)
```css
:root {
  --color-paper: oklch(98% 0.008 252);
  --color-paper-2: oklch(95% 0.018 250);
  --color-paper-3: oklch(91% 0.030 248);
  --color-ink: oklch(19% 0.060 258);
  --color-ink-2: oklch(30% 0.055 256);
  --color-rule: oklch(84% 0.034 248);
  --color-muted: oklch(48% 0.040 252);
  --color-accent: oklch(52% 0.235 258);
  --color-accent-ink: oklch(98% 0.008 252);
  --color-focus: oklch(76% 0.155 242);
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
  --color-paper: oklch(98% 0.008 252);
  --color-paper-2: oklch(95% 0.018 250);
  --color-paper-3: oklch(91% 0.030 248);
  --color-ink: oklch(19% 0.060 258);
  --color-ink-2: oklch(30% 0.055 256);
  --color-rule: oklch(84% 0.034 248);
  --color-muted: oklch(48% 0.040 252);
  --color-accent: oklch(52% 0.235 258);
  --color-focus: oklch(76% 0.155 242);
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
    "paper": { "$value": "oklch(98% 0.008 252)", "$type": "color" },
    "paper-2": { "$value": "oklch(95% 0.018 250)", "$type": "color" },
    "ink": { "$value": "oklch(19% 0.060 258)", "$type": "color" },
    "accent": { "$value": "oklch(52% 0.235 258)", "$type": "color" },
    "focus": { "$value": "oklch(76% 0.155 242)", "$type": "color" }
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
  --background: 98% 0.008 252; --foreground: 19% 0.060 258;
  --card: 95% 0.018 250; --card-foreground: 19% 0.060 258;
  --popover: 98% 0.008 252; --popover-foreground: 19% 0.060 258;
  --primary: 19% 0.060 258; --primary-foreground: 98% 0.008 252;
  --secondary: 91% 0.030 248; --secondary-foreground: 30% 0.055 256;
  --muted: 91% 0.030 248; --muted-foreground: 48% 0.040 252;
  --accent: 52% 0.235 258; --accent-foreground: 98% 0.008 252;
  --border: 84% 0.034 248; --input: 84% 0.034 248; --ring: 76% 0.155 242;
  --radius: 0.375rem;
}
```

## Content governance
- `HPF_KZ_BRAND_LANGUAGE_ZH_V2.md` is the approved Chinese brand-language source.
- News remains file-based Astro Content Collections, reviewed and maintained by the AI workflow in `AI_NEWS_WORKFLOW.md`; no CMS is required for the present operating model.
