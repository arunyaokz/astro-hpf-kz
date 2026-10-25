import { cp, mkdir, access } from "node:fs/promises";

// Keep previously published URLs working while visitors still have older HTML
// cached. These files were rebuilt from the production source commit abf88a5.
const source = new URL("../ops/legacy-assets/_astro/", import.meta.url);
const target = new URL("../dist/client/_astro/", import.meta.url);
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true, force: false });
for (const name of [
  "CardVisual.DNLtalji.css", "ContactPage.PyosbEx1.css",
  "ContentPage.B3iiBExS.css", "HomePage.uPL8c1fB.css",
  "RouteMap.9RB_wBtj.css", "RouteMap.astro_astro_type_script_index_0_lang.5AYxfbx2.js",
]) await access(new URL(name, target));
console.log("[assets] Restored six legacy URLs and their dependencies.");
