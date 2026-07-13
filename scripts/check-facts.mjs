import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/content/facts.yaml", import.meta.url), "utf8");
const records = source.split(/^\s*- id:\s*/m).slice(1);
const unresolved = records
  .filter((record) => /^\s*[\s\S]*?\n\s*verified:\s*false\s*$/m.test(record))
  .map((record) => record.split(/\r?\n/, 1)[0]?.trim())
  .filter(Boolean);

if (unresolved.length > 0) {
  console.warn(`[facts] ${unresolved.length} unresolved launch facts: ${unresolved.join(", ")}`);
} else {
  console.log("[facts] all launch facts are verified");
}
