const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..", "public");
let removed = 0;
function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { visit(file); continue; }
    if (!entry.name.endsWith(".html")) continue;
    const before = fs.readFileSync(file, "utf8");
    const after = before.replace(/<link\b[^>]*>/g, (tag) => {
      if (!/\brel=["']alternate["']/i.test(tag) || !/\bhreflang=/i.test(tag)) return tag;
      const href = tag.match(/\bhref=["']([^"']+)["']/i);
      if (!href) return tag;
      let url;
      try { url = new URL(href[1]); } catch { return tag; }
      if (url.hostname !== "quantumflux.framer.ai") return tag;
      removed++;
      return "";
    });
    if (after !== before) fs.writeFileSync(file, after);
  }
}
visit(root);
console.log("SEO: " + removed + " inherited template language links removed");
