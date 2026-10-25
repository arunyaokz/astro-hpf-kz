// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import emdash from "emdash/astro";
import { d1, r2 } from "@emdash-cms/cloudflare";
import chineseUI from "./src/cms/chinese-ui.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://hpf.kz",
  output: "server",
  vite: { plugins: [chineseUI()] },
  i18n: { defaultLocale: "en", locales: ["en", "zh", "ru"] },
  integrations: [mdx(), sitemap({ filter: (page) => !/\/(?:cms|_emdash)\//.test(new URL(page).pathname) }), react(), emdash({
    database: d1({ binding: "DB" }),
    storage: r2({ binding: "MEDIA" }),
    fonts: false,
    toolbar: false,
    admin: {
      siteName: "华鹏飞 · 新闻管理",
      logo: "/brand/hpf-mark.svg",
      favicon: "/favicon.svg",
      locales: ["zh-CN"],
    },
    middleware: { outer: new URL("./src/cms-gate.ts", import.meta.url) },
  })],
  adapter: cloudflare({
    configPath: "./.wrangler-build.json",
    imageService: "passthrough",
    inspectorPort: false,
  }),
});
