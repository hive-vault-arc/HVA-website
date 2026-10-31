const fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"..","public");let pages=0;
for(const name of ["index.html","fr.html"]){
 const file=path.join(root,name);if(!fs.existsSync(file))continue;
 let html=fs.readFileSync(file,"utf8");
 const rules=html.match(/@font-face\s*\{[^}]+\}/g)||[];
 const rule=rules.find(r=>/font-family:\s*"Plus Jakarta Sans"/.test(r)&&/font-style:\s*normal/.test(r)&&/font-weight:\s*700(?:\s|[;}])/.test(r));
 const source=rule?.match(/url\("([^"]+\.woff2)"\)/)?.[1];
 if(!source||!source.startsWith("/assets/fonts/")||!fs.existsSync(path.join(root,source.slice(1))))continue;
 html=html.replace(/<link\b[^>]*data-hva-hero-font[^>]*>/g,"");
 const tag='<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="'+source+'" data-hva-hero-font>';
 html=html.replace(/<meta charset="utf-8">/,m=>m+"\n"+tag);
 fs.writeFileSync(file,html);pages++;
}
console.log("Hero font: one existing font preloaded on "+pages+" homepages");
