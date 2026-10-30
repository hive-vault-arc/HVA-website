const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const file = path.join(__dirname, "..", "public", "index.html");
const html = fs.readFileSync(file, "utf8");
let imageIndex = 0;
let changed = 0;

let optimized = html.replace(/<img\b[^>]*>/g, (tag) => {
  imageIndex += 1;
  // Keep the initial hero media eager; let the browser request later sections
  // when they approach the viewport. Do not rewrite inline SVG data images.
  if (imageIndex <= 12 || /\bloading\s*=/.test(tag) || /src="data:/.test(tag)) {
    return tag;
  }
  changed += 1;
  return tag.slice(0, -1) + ' loading="lazy">';
});

// The export also preloads copied .js bundles while its entrypoint imports
// byte-identical .mjs files. Those URLs have distinct cache keys and cause
// redundant network transfers. Only discard a link when its target matches
// an actual animation module byte for byte.
const directory = path.join(__dirname, "..", "public", "assets", "animate");
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const moduleHashes = new Set(fs.readdirSync(directory)
  .filter((name) => name.endsWith(".mjs"))
  .map((name) => hash(fs.readFileSync(path.join(directory, name)))));
let duplicatePreloads = 0;
optimized = optimized.replace(/<link\b[^>]*\brel="modulepreload"[^>]*>/g, (tag) => {
  const href = tag.match(/\bhref="\.\/assets\/js\/([^"?]+)"/);
  if (!href) return tag;
  const jsFile = path.join(__dirname, "..", "public", "assets", "js", href[1]);
  if (!fs.existsSync(jsFile) || !moduleHashes.has(hash(fs.readFileSync(jsFile)))) return tag;
  duplicatePreloads += 1;
  return "";
});

if (optimized !== html) fs.writeFileSync(file, optimized);
console.log(`Homepage: ${changed} images set to lazy loading`);
console.log(`Homepage: ${duplicatePreloads} redundant module preloads removed`);

