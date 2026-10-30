const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const root = path.join(__dirname, "..", "public");
const directory = path.join(root, "assets", "animate");
const hash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const modules = fs.readdirSync(directory).filter((name) => name.endsWith(".mjs"))
  .map((name) => fs.readFileSync(path.join(directory, name)));
const hashes = new Set(modules.map(hash));
const jsDirectory = path.join(root, "assets", "js");
const entries = fs.readdirSync(jsDirectory).filter((name) => /^script_main.*\.js$/.test(name))
  .map((name) => fs.readFileSync(path.join(jsDirectory, name), "utf8"));
const imports = modules.map((bytes) => bytes.toString("utf8")).concat(entries).join("\n");
const verified = new Map();
let pages = 0;
let removed = 0;

function redundant(name) {
  if (verified.has(name)) return verified.get(name);
  const file = path.join(root, "assets", "js", name);
  const result = fs.existsSync(file) && hashes.has(hash(fs.readFileSync(file))) && !imports.includes(name);
  verified.set(name, result);
  return result;
}

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { visit(file); continue; }
    if (!entry.name.endsWith(".html")) continue;
    const html = fs.readFileSync(file, "utf8");
    const after = html.replace(/<link\b[^>]*\brel="modulepreload"[^>]*>/g, (tag) => {
      const href = tag.match(/\bhref="(?:(?:\.{1,2}\/)+|\/)assets\/js\/([^"/?#]+)"/);
      if (!href || !redundant(href[1])) return tag;
      removed++;
      return "";
    });
    if (after !== html) { fs.writeFileSync(file, after); pages++; }
  }
}
visit(root);
console.log(`Duplicate preloads: ${removed} links removed across ${pages} pages`);

