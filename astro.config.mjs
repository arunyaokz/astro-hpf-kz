// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://hpf.kz",
  integrations: [mdx(), sitemap()],
  adapter: cloudflare({
    configPath: "./.wrangler-build.json",
    imageService: "passthrough",
    inspectorPort: false,
    prerenderEnvironment: "node",
  }),
});
