const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..", "public");
const missing = new Set(["5fdef0d4","d75dfb33","d1a83d6f","5d514520","a812572e","0c87f467","bfdaba2b","d8319533","3f571c67","efec5797","b0a61922","0b8d48e2","3b43f477"]);
const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="#0b1726"/><g fill="none" stroke="#e8a838" stroke-opacity=".3"><path d="M0 150h600M0 300h600M0 450h600M150 0v600M300 0v600M450 0v600"/><circle cx="300" cy="300" r="210"/><circle cx="300" cy="300" r="150"/></g><rect x="175" y="245" width="250" height="110" rx="12" fill="#0b1726"/><text x="300" y="320" text-anchor="middle" fill="#e8a838" font-family="Arial,sans-serif" font-size="64" font-weight="700">HVA</text></svg>';
fs.writeFileSync(path.join(root, "assets/images/hva-gallery-placeholder.svg"), svg);
let references = 0;
function visit(dir) {
  for (const item of fs.readdirSync(dir, {withFileTypes:true})) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) { visit(file); continue; }
    if (!/\.(html|js|mjs)$/.test(item.name)) continue;
    const before = fs.readFileSync(file, "utf8");
    const after = before.replace(/image-([a-f0-9]{8})\.(?:png|jpg)/g, (name, id) => {
      if (!missing.has(id)) return name;
      references++;
      return "hva-gallery-placeholder.svg";
    });
    if (after !== before) fs.writeFileSync(file, after);
  }
}
visit(root);
console.log("HVA gallery placeholders: " + references + " references repaired");
