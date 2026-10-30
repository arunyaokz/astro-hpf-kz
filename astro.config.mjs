// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import fs from "node:fs";
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
  // Kazakh is available for linked CMS content and public news pages.
  i18n: { defaultLocale: "en", locales: ["en", "zh", "ru", "kk"] },
  integrations: [mdx(), sitemap({ customPages: ["", "/zh", "/ru"].flatMap((prefix) => ["", "services/", "routes/", "about/", "privacy/"].map((page) => `https://hpf.kz${prefix}/${page}`)).concat(["https://hpf.kz/blog/", ...fs.readdirSync("src/content/blog").filter(file=>/\.mdx?$/.test(file)).map(file=>`https://hpf.kz/blog/${file.replace(/\.mdx?$/, "")}/`)]), filter: (page) => !/\/(?:cms|_emdash)\//.test(new URL(page).pathname) }), react(), emdash({
    database: d1({ binding: "DB" }),
    storage: r2({ binding: "MEDIA" }),
    plugins: [{ id: "hpf-corporate-pages", version: "1.0.0", entrypoint: new URL("./src/cms/page-policy.mjs", import.meta.url).pathname }],
    fonts: false,
    toolbar: false,
    admin: {
      siteName: "华鹏飞 · 官网管理",
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
