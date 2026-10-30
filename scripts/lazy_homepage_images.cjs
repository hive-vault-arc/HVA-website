const fs = require("node:fs");
const path = require("node:path");

const file = path.join(__dirname, "..", "public", "index.html");
const html = fs.readFileSync(file, "utf8");
let imageIndex = 0;
let changed = 0;

const optimized = html.replace(/<img\b[^>]*>/g, (tag) => {
  imageIndex += 1;
  // Keep the initial hero media eager; let the browser request later sections
  // when they approach the viewport. Do not rewrite inline SVG data images.
  if (imageIndex <= 12 || /\bloading\s*=/.test(tag) || /src="data:/.test(tag)) {
    return tag;
  }
  changed += 1;
  return tag.slice(0, -1) + ' loading="lazy">';
});

if (changed) fs.writeFileSync(file, optimized);
console.log(`Homepage: ${changed} images set to lazy loading`);

