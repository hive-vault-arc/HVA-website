const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const root = path.join(__dirname, "..", "public");
const output = path.join(root, "assets", "styles");
fs.mkdirSync(output, { recursive: true });
let pages = 0;
let extractedBytes = 0;
const files = new Set();

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { visit(file); continue; }
    if (!entry.name.endsWith(".html")) continue;
    const html = fs.readFileSync(file, "utf8");
    const after = html.replace(/(<style\b[^>]*data-framer-css-ssr-minified[^>]*>)([\s\S]*?)<\/style>/g, (original, opening, css) => {
      if (!css.trim()) return original;
      // Moving relative URLs to another directory would change their meaning.
      // Leave such blocks inline until their URLs are explicitly resolved.
      const urls = [...css.matchAll(/url\(\s*["']?([^"')\s]+)/g)].map((match) => match[1]);
      if (urls.some((url) => !/^(?:\/|#|data:|https?:)/.test(url))) return original;
      const digest = crypto.createHash("sha256").update(css).digest("hex").slice(0, 20);
      const name = `framer-${digest}.css`;
      fs.writeFileSync(path.join(output, name), css);
      files.add(name);
      extractedBytes += Buffer.byteLength(css);
      // Framer reads data-framer-components from this style element to avoid
      // injecting CSS again. Preserve the marker and all its attributes.
      // The blocking stylesheet remains at the same position in cascade order.
      return `<link rel="stylesheet" href="/assets/styles/${name}">${opening}</style>`;
    });
    if (after !== html) { fs.writeFileSync(file, after); pages++; }
  }
}
visit(root);
console.log(`Export styles: ${pages} pages, ${files.size} cacheable stylesheets, ${extractedBytes} inline bytes extracted`);

