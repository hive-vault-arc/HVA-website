import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceExtensions = new Set([".css", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);

async function collectFiles(target) {
  const absoluteTarget = path.join(root, target);

  try {
    const entries = await readdir(absoluteTarget, { withFileTypes: true });
    const nested = await Promise.all(
      entries.map((entry) => collectFiles(path.join(target, entry.name))),
    );
    return nested.flat();
  } catch {
    return sourceExtensions.has(path.extname(target).toLowerCase()) ? [target] : [];
  }
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split("\n").length;
}

const patterns = [
  {
    name: "CSS font-size clamp",
    pattern: /font-size\s*:\s*clamp\([^;\n]*(?:vw|vh)/gi,
  },
  {
    name: "Tailwind arbitrary text clamp",
    pattern: /text-\[clamp\([^\]\n]*(?:vw|vh)/gi,
  },
];

const findings = [];
const files = await collectFiles("src");

for (const relativeFile of files) {
  const content = await readFile(path.join(root, relativeFile), "utf8");

  for (const { name, pattern } of patterns) {
    for (const match of content.matchAll(pattern)) {
      findings.push({
        name,
        location: `${relativeFile}:${lineNumberAt(content, match.index ?? 0)}`,
      });
    }
  }
}

console.log(`Hive Vault Arc responsive audit: scanned ${files.length} source files.`);

if (findings.length === 0) {
  console.log("PASS: capped typography has no viewport-relative font-size clamps.");
} else {
  console.error(
    "FAIL: viewport-relative fluid type can rewrap after a content frame reaches its max width.",
  );
  for (const finding of findings) {
    console.error(`- ${finding.name}: ${finding.location}`);
  }
  process.exitCode = 1;
}
