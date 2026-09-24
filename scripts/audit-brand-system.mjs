import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const strict = process.argv.includes("--strict");

const approvedHex = new Set([
  "#ffffff",
  "#fcfbf8",
  "#f1f3f6",
  "#1a2535",
  "#0d1824",
  "#536174",
  "#dde3ea",
  "#e8a838",
  "#dbaa4d",
  "#cd9f40",
  "#f0c15a",
  "#f8e9c8",
]);

const scanRoots = ["src", "tailwind.config.js", "postcss.config.js"];
const sourceExtensions = new Set([".css", ".js", ".jsx", ".json", ".mjs", ".ts", ".tsx"]);
const legacyLogoPatterns = [
  /hva-logo-number-3\.webp/gi,
  /hva-logo-number-4\.webp/gi,
  /hva-icon-lockup-(?:micro|wide)-(?:dark|navy)\.svg/gi,
  /hva-icon-static-(?:dark|light)-surface\.svg/gi,
  /hva-wordmark-wide-(?:dark|navy)\.svg/gi,
];

function normalizeHex(value) {
  const normalized = value.toLowerCase();
  if (normalized.length === 4) {
    return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
  }
  return normalized;
}

function hexToRgb(value) {
  const normalized = normalizeHex(value);
  return [
    Number.parseInt(normalized.slice(1, 3), 16),
    Number.parseInt(normalized.slice(3, 5), 16),
    Number.parseInt(normalized.slice(5, 7), 16),
  ].join(",");
}

const approvedRgb = new Set([...approvedHex].map(hexToRgb));

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

function addFinding(map, key, location) {
  const current = map.get(key) ?? [];
  current.push(location);
  map.set(key, current);
}

const files = (await Promise.all(scanRoots.map(collectFiles))).flat();
const colorFindings = new Map();
const legacyLogoFindings = new Map();
const advisoryFindings = new Map();

for (const relativeFile of files) {
  const absoluteFile = path.join(root, relativeFile);
  const content = await readFile(absoluteFile, "utf8");

  for (const match of content.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
    const normalized = normalizeHex(match[0]);
    if (!approvedHex.has(normalized)) {
      addFinding(
        colorFindings,
        normalized,
        `${relativeFile}:${lineNumberAt(content, match.index ?? 0)}`,
      );
    }
  }

  for (const match of content.matchAll(/\brgba?\s*\(([^)]*)\)/gi)) {
    const channels = match[1].match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number);
    const location = `${relativeFile}:${lineNumberAt(content, match.index ?? 0)}`;

    if (channels?.length === 3 && channels.every((channel) => channel >= 0 && channel <= 255)) {
      const rgbKey = channels.map((channel) => Math.round(channel)).join(",");
      if (!approvedRgb.has(rgbKey)) {
        addFinding(colorFindings, `rgb(${rgbKey})`, location);
      }
    } else {
      addFinding(advisoryFindings, "dynamic-rgb-color", location);
    }
  }

  for (const match of content.matchAll(/\b(?:hsl|hsla|color-mix)\s*\([^;\n]*/gi)) {
    addFinding(
      colorFindings,
      "unsupported-functional-color",
      `${relativeFile}:${lineNumberAt(content, match.index ?? 0)}`,
    );
  }

  for (const pattern of legacyLogoPatterns) {
    for (const match of content.matchAll(pattern)) {
      addFinding(
        legacyLogoFindings,
        match[0].toLowerCase(),
        `${relativeFile}:${lineNumberAt(content, match.index ?? 0)}`,
      );
    }
  }

  const advisories = [
    ["legacy-font-satoshi", /\bSatoshi\b/gi],
    ["section-brand-mark", /\bSectionBrandMark\b/g],
  ];

  for (const [name, pattern] of advisories) {
    for (const match of content.matchAll(pattern)) {
      addFinding(
        advisoryFindings,
        name,
        `${relativeFile}:${lineNumberAt(content, match.index ?? 0)}`,
      );
    }
  }
}

function printGroup(title, findings, maxKeys = 40, maxLocations = 4) {
  console.log(`\n${title}: ${findings.size}`);
  const sorted = [...findings.entries()].sort((a, b) => b[1].length - a[1].length);

  for (const [key, locations] of sorted.slice(0, maxKeys)) {
    const preview = locations.slice(0, maxLocations).join(", ");
    const remainder = locations.length > maxLocations ? `, +${locations.length - maxLocations} more` : "";
    console.log(`- ${key}: ${locations.length} occurrence(s) at ${preview}${remainder}`);
  }

  if (sorted.length > maxKeys) {
    console.log(`- ... ${sorted.length - maxKeys} more unique value(s)`);
  }
}

console.log(`Hive Vault Arc brand audit (${strict ? "strict" : "report"} mode)`);
console.log(`Scanned ${files.length} source files.`);
printGroup("Unapproved hexadecimal colors", colorFindings);
printGroup("Legacy logo references", legacyLogoFindings);
printGroup("Advisories for manual review", advisoryFindings, 20);

const blockingCount = [...colorFindings.values(), ...legacyLogoFindings.values()]
  .reduce((sum, locations) => sum + locations.length, 0);

if (blockingCount === 0) {
  console.log("\nPASS: no blocking brand violations found.");
} else if (strict) {
  console.error(`\nFAIL: ${blockingCount} blocking brand violation(s) found.`);
  process.exitCode = 1;
} else {
  console.log(`\nBASELINE: ${blockingCount} blocking violation(s) remain. Run strict mode only after migration.`);
}
