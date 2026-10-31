const fs = require("node:fs");
const path = require("node:path");

function exportedHtmlPages(directory, prefix = "") {
  return fs.readdirSync(directory, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      return entry.isDirectory()
        ? exportedHtmlPages(path.join(directory, entry.name), relative)
        : entry.name.endsWith(".html") ? [relative] : [];
    });
}

const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    const fonts = fs.readdirSync(path.join(__dirname, "public/assets/fonts"))
      .filter((name) => /^font-[a-f0-9]+(?:-[a-f0-9]+)?\.woff2$/.test(name))
      .map((name) => ({ source: `/assets/fonts/${name}`, headers: cache }));
    return [{ source: "/assets/optimized/:asset*", headers: cache }, { source: "/assets/styles/:asset*", headers: cache }, { source: "/assets/inline-svg/:asset*", headers: cache }, ...fonts];
  },
  async rewrites() {
    // Framer changes links to clean paths after hydration. Serve the matching
    // export on a direct visit or refresh while retaining existing .html URLs.
    return [{ source: "/", destination: "/index.html" }, ...exportedHtmlPages(path.join(__dirname, "public")).map((page) => ({
      source: `/${page.replace(/\.html$/, "")}`,
      destination: `/${page}`,
    }))];
  },
};

module.exports = nextConfig;

