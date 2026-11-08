# HPF.kz AI News Workflow

> 历史方案：2026-10-25 起，官网新闻以 EmDash 为准。Codex 生图、媒体入库和中俄哈关联草稿流程见 `ops/EmDash与Codex图文草稿流程.md`；下面的 Git 文件发布约定不再作为当前入库步骤。

HPF.kz uses Git and Astro Content Collections as its editorial system. No traditional CMS is required for the current publishing volume.

## Publishing contract

Every story is stored as three sibling files in `src/content/news/`:

- `<translationKey>.zh.md`
- `<translationKey>.en.md`
- `<translationKey>.ru.md`

Only entries with `draft: false` are rendered. The AI editor must not publish a translation set until all three files exist and the factual status is explicit.

## Required frontmatter

```yaml
---
title: ""
description: ""
pubDate: 2026-07-13
updatedDate: 2026-07-13
lang: zh
translationKey: example-story
category: company
author: HPF.kz Editorial
draft: true
verificationStatus: company-source
sourceUrls: []
aiMaintained: true
---
```

## Editorial gates

1. Company claims require an internal company source or written management confirmation.
2. Market and regulatory claims require public source URLs.
3. Facts, public claims and editorial analysis must remain distinguishable.
4. Chinese, English and Russian versions must express the same factual claims.
5. Build with `npm run build` before publishing; Git history is the audit and rollback trail.
