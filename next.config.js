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
    // Generated assets contain content hashes; browser reuse is safe across deploys.
    return [
      {
        source: "/assets/js/:asset*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/assets/optimized/:asset*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async rewrites() {
    // Framer changes links to clean paths after hydration. Serve the matching
    // export on a direct visit or refresh while retaining existing .html URLs.
    return exportedHtmlPages(path.join(__dirname, "public")).map((page) => ({
      source: `/${page.replace(/\.html$/, "")}`,
      destination: `/${page}`,
    }));
  },
};

module.exports = nextConfig;
