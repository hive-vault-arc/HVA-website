const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..", "public");
const origin = "https://hivevaultarc.com";
function files(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]); }
const all = files(root);
const pages = all.filter(f=>f.endsWith(".html"));
const route = file => "/" + path.relative(root,file).split(path.sep).join("/").replace(/\.html$/,"").replace(/^index$/,"");
const routes = new Set(pages.map(route));
const escape = value => value.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
for (const file of all.filter(f=>/\.(?:js|mjs)$/.test(f))) {
  const before=fs.readFileSync(file,"utf8"), after=before.replaceAll("https://quantumflux.framer.ai/","/").replaceAll("https://quantumflux.framer.ai",origin);
  if(before!==after)fs.writeFileSync(file,after);
}
for(const file of pages){
  const current=route(file), french=current==="/fr"||current.startsWith("/fr/");
  const english=french?(current==="/fr"?"/":current.slice(3)):current;
  const translated=english==="/"?"/fr":"/fr"+english;
  let html=fs.readFileSync(file,"utf8");
  html=html.replace(/<link\b[^>]*>/g,tag=>{
    if(/\brel=["']canonical["']/i.test(tag)||/\bhreflang=/i.test(tag))return "";
    return tag.includes("quantumflux.framer.ai")&&/\brel=["']alternate["']/i.test(tag)?"":tag;
  });
  html=html.replace(/\bhref="https:\/\/quantumflux\.framer\.ai([^" ]*)"/g,(_,suffix)=>'href="'+(suffix||'/')+'"');
  html=html.replace(/<meta\b[^>]*>/g,tag=>{
    if(/(?:property|name)=["'](?:og:url|og:locale|og:locale:alternate)["']/i.test(tag))return "";
    if(/(?:property|name)=["'](?:og:image|twitter:image)["']/i.test(tag)){
      return tag.replace(/content=["']([^"']*)["']/i,(_,value)=>{
        try { return 'content="'+escape(new URL(value.replace(/&amp;/g,"&"),origin+current).href)+'"'; } catch { return 'content="'+origin+'/assets/images/hive-vault-arc-logo.png"'; }
      });
    }
    return tag;
  });
  const metadata=['<link rel="canonical" href="'+origin+current+'">','<meta property="og:url" content="'+origin+current+'">','<meta property="og:locale" content="'+(french?"fr_FR":"en_GB")+'">'];
  if(routes.has(english)&&routes.has(translated)){
    metadata.push('<link rel="alternate" hreflang="en" href="'+origin+english+'">','<link rel="alternate" hreflang="fr" href="'+origin+translated+'">','<link rel="alternate" hreflang="x-default" href="'+origin+english+'">');
  }
  html=html.replace("</head>",metadata.join("\n")+"</head>");
  fs.writeFileSync(file,html);
}
const entries=[...routes].sort().map(p=>"<url><loc>"+escape(origin+p)+"</loc></url>").join("\n");
fs.writeFileSync(path.join(root,"sitemap.xml"),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+entries+'\n</urlset>\n');
fs.writeFileSync(path.join(root,"robots.txt"),"User-agent: *\n"+(process.env.VERCEL_ENV==="production"?"Allow: /":"Disallow: /")+"\nSitemap: "+origin+"/sitemap.xml\n");
console.log("HVA metadata: "+pages.length+" canonical pages; "+routes.size+" sitemap URLs");

