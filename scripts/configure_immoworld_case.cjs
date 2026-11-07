const fs = require("node:fs");
const path = require("node:path");
function transform(source) {
  const replacements = [
    ["NorthGrid Logistics", "Immoworld Real Estate"],
    ["Logistics &amp; Supply Chain", "Real Estate"],
    ["Logistics & Supply Chain", "Real Estate"],
    ["AI Workflow Analysis, AI Workflow Automation", "Custom CRM software"],
    ["Routing slowed as shipment volume increased", "Replacing existing software with a custom CRM"],
    ["Freight planning relied on spreadsheets and manual coordination", "Replacing existing software with a custom CRM"],
    ["Faster tasks planning", "Leads saved and notified"],
    ["decisions automated monthly", "Tasks tracked across all teams"],
    ["decisions automated", "Tasks tracked across all teams"],
    ["Route planning speed", "Efficiency"],
    ["Route planning", "Efficiency"],
    ["DELIVERABLE: AI freight planning system integrated with routing and scheduling workflows.", "A custom CRM tailored to client needs and workflows, simplifying lead management and data analysis."],
    ["DELIVERABLE: AI freight planning system integrated with routing workflows.", "A custom CRM tailored to client needs and workflows, simplifying lead management and data analysis."],
    ["AI freight planning system integrated with routing workflows.", "A custom CRM tailored to client needs and workflows, simplifying lead management and data analysis."]
  ];
  for (const [from,to] of replacements) source = source.split(from).join(to);
  source = source.replace(/(?:We redesigned|Redesigned) the company(?:’|'|�)s freight planning workflows(?: and|,) deployed AI systems\s+that automatically coordinate routes, capacity,(?: delivery schedules, and operational priorities| and delivery schedules| and scheduling workflows)\./g,
    "Replaced Immoworld’s Zoho CRM with a custom CRM tailored to its needs, features, and workflows, with instant delivery and AI-agent workflows.");
  source = source.replace(/(?:We redesigned|Redesigned) (?:the company(?:’|'|�)s )?freight planning workflows[^`<>]*?\./g,
    "Replaced Immoworld’s Zoho CRM with a custom CRM tailored to its needs, features, and workflows, with instant delivery and AI-agent workflows.")
    .split("AI routing system integrated.").join("A custom CRM tailored to client needs and workflows, simplifying lead management and data analysis.");
  // Props belong to the featured-case component, not unrelated counters.
  source = source.replace(/Bw_UoQwk8:42\b/g,"Bw_UoQwk8:100")
    .replace(/GkBaynz4l:13e3\b/g,"GkBaynz4l:100")
    .replace(/hjT2vYvQW:13\b/g,"hjT2vYvQW:10");
  return source;
}
function walk(dir) {
  for (const item of fs.readdirSync(dir,{withFileTypes:true})) {
    const file=path.join(dir,item.name);
    if(item.isDirectory()) walk(file);
    else if(/\.(html|mjs|js)$/.test(file)) {
      const before=fs.readFileSync(file,"utf8"),after=transform(before);
      if(after!==before) fs.writeFileSync(file,after);
    }
  }
}
if (!process.env.HVA_CASE_TEST) walk(path.join(__dirname,"../public"));
module.exports={transform};
