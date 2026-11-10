const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const root=path.join(__dirname,"..","public"),origin="https://hivevaultarc.com";
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const all=files(root),pages=all.filter(f=>f.endsWith(".html")),errors=[],canonicals=new Set();
let generated=0;
for(const file of pages){
 const html=fs.readFileSync(file,"utf8"),label=path.relative(root,file);
 const canonical=[...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
 if(canonical.length!==1||!canonical[0][1].startsWith(origin+"/"))errors.push(label+": canonical missing/invalid");
 else canonicals.add(canonical[0][1]);
 for(const match of html.matchAll(/(\/assets\/(?:styles|inline-svg|optimized)\/[A-Za-z0-9_.-]+\.(?:css|svg|webp)|\/assets\/js\/hva-contact-[a-f0-9]+\.js)/g)){
  const asset=path.join(root,match[1].slice(1));
  if(!fs.existsSync(asset)){errors.push(label+": missing "+match[1]);continue;}
  const hash=path.basename(asset).match(/^(?:framer-|hva-contact-)?([a-f0-9]{20})\.(?:css|svg|webp|js)$/)?.[1];
  if(hash&&crypto.createHash("sha256").update(fs.readFileSync(asset)).digest("hex").slice(0,20)!==hash)errors.push(label+": generated asset fingerprint mismatch "+match[1]);
  generated++;
 }
 if(!/data-hva-contact/.test(html))errors.push(label+": contact adapter missing");
 for(const match of html.matchAll(/<video\b[^>]*src="([^"]+)"/g)){
  const url=match[1].split("?")[0];
  if(/^(?:\/|\.\.?\/)/.test(url)){
   const asset=url.startsWith("/")?path.join(root,url.slice(1)):path.resolve(path.dirname(file),url);
   if(!fs.existsSync(asset))errors.push(label+": video source missing");
  }
 }
}
for(const file of all.filter(f=>/\.(html|js|mjs)$/.test(f))){
 if(/https:\/\/api\.framer\.com\/forms\/v1\/forms\//.test(fs.readFileSync(file,"utf8")))errors.push(path.relative(root,file)+": inherited form endpoint");
}
const sitemap=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
const locations=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
if(locations.length!==canonicals.size||locations.some(url=>!canonicals.has(url)))errors.push("Sitemap does not match canonical pages");
const robots=fs.readFileSync(path.join(root,"robots.txt"),"utf8");
if(!robots.includes(process.env.VERCEL_ENV==="production"?"Allow: /":"Disallow: /"))errors.push("Unexpected crawler policy for build environment");
const entry=fs.readdirSync(path.join(root,"assets","js")).find(n=>/^script_main.*\.js$/.test(n));
if(!entry)errors.push("Entry bundle missing");
else{
 const source=fs.readFileSync(path.join(root,"assets","js",entry),"utf8");
 const scroll=source.match(/\{autoResize:!0,duration:[^}]*id:`R1QXrDmH1`[^}]*\}/)?.[0]||"";
 if(!scroll.includes("duration:2.4")||!scroll.includes("wheelMultiplier:0.85"))errors.push("Approved smooth-scroll settings missing");
}
if(errors.length)throw new Error("Export validation failed:\n"+errors.slice(0,15).join("\n"));
console.log("Export validation passed: "+pages.length+" pages, "+generated+" generated asset references, canonical/sitemap consistency, contact destinations, video sources and scroll settings");

