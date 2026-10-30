const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..", "public");
const base = process.argv[2] || "http://127.0.0.1:3092";
const url = new URL(base);
if (!["127.0.0.1", "localhost", "[::1]"].includes(url.hostname)) {
  throw new Error("This checker is restricted to a local preview server.");
}
function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}
const jobs = [{ route: "/", status: 200, type: "text/html" }];
for (const file of files(root).filter((file) => file.endsWith(".html"))) {
  const route = "/" + path.relative(root, file).split(path.sep).join("/");
  jobs.push({ route, status: 200, type: "text/html" });
  jobs.push({ route: route.replace(/\.html$/, ""), status: 200, type: "text/html" });
}
for (const name of fs.readdirSync(path.join(root, "assets", "styles"))) {
  if (/^framer-[a-f0-9]+\.css$/.test(name)) jobs.push({ route: `/assets/styles/${name}`, status: 200, type: "text/css", immutable: true });
}
for (const name of fs.readdirSync(path.join(root, "assets", "fonts"))) {
  if (/^font-[a-f0-9-]+\.woff2$/.test(name)) jobs.push({ route: `/assets/fonts/${name}`, status: 200, type: "font/woff2", immutable: true });
}
jobs.push({ route: "/_hva_route_check_missing", status: 404, type: "text/html" });
const failures = [];
let next = 0;
async function worker() {
  while (next < jobs.length) {
    const job = jobs[next++];
    try {
      const response = await fetch(new URL(job.route, base), { method: "HEAD", redirect: "manual", signal: AbortSignal.timeout(10000) });
      const type = response.headers.get("content-type") || "";
      const cache = response.headers.get("cache-control") || "";
      if (response.status !== job.status || !type.startsWith(job.type) || (job.immutable && !cache.includes("immutable"))) {
        failures.push({ route: job.route, status: response.status, type, cache });
      }
    } catch (error) { failures.push({ route: job.route, error: error.message }); }
  }
}
Promise.all(Array.from({ length: 4 }, worker)).then(() => {
  console.log(JSON.stringify({ checks: jobs.length, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
});

