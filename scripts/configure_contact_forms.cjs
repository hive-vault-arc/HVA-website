const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const root = path.join(__dirname, "..", "public");
const client = fs.readFileSync(path.join(__dirname, "contact_forms_client.js"), "utf8");
const digest = crypto.createHash("sha256").update(client).digest("hex").slice(0, 20);
const clientPath = `/assets/js/hva-contact-${digest}.js`;
fs.writeFileSync(path.join(root, clientPath.slice(1)), client);
let pages = 0;
let endpoints = 0;
function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { visit(file); continue; }
    if (!/\.(?:html|js|mjs)$/.test(entry.name)) continue;
    const before = fs.readFileSync(file, "utf8");
    let after = before.replace(/https:\/\/api\.framer\.com\/forms\/v1\/forms\/[a-f0-9-]+\/submit/g, () => {
      endpoints++;
      return "mailto:contact@hivevaultarc.com";
    });
    // Load the adapter on every page: Framer can mount a contact form after
    // client navigation even when the initial document contains no form.
    if (entry.name.endsWith(".html")) {
      after = after.replace(/<script\b[^>]*data-hva-contact[^>]*><\/script>/g, "");
      after = after.replace("</head>", `<script src="${clientPath}" defer data-hva-contact></script></head>`);
      after = after.replace(/<form\b[^>]*class="framer-(?:txifz4|vswvir)"[^>]*>/g, (tag) => {
        const clean = tag.replace(/\s(?:action|method|enctype)="[^"]*"/g, "");
        return clean.slice(0, -1) + ' action="mailto:contact@hivevaultarc.com" method="post" enctype="text/plain">';
      });
      pages++;
    }
    if (after !== before) fs.writeFileSync(file, after);
  }
}
visit(root);
console.log(`Contact drafts: ${pages} pages configured, ${endpoints} inherited endpoint references replaced`);

