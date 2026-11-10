const fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"..","public");let pages=0;
function visit(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,e.name);if(e.isDirectory()){visit(file);continue;}if(!e.name.endsWith(".html"))continue;
 let html=fs.readFileSync(file,"utf8");const main=html.match(/<main\b[^>]*>/);if(!main)continue;
 const existing=main[0].match(/\bid="([^"]+)"/);const id=existing?existing[1]:"hva-main-content";
 let tag=main[0];if(!existing)tag=tag.slice(0,-1)+' id="'+id+'">';
 if(!/\btabindex=/i.test(tag))tag=tag.slice(0,-1)+' tabindex="-1">';
 html=html.replace(main[0],tag).replace(/<a\b[^>]*id="hva-skip-link"[^>]*>[\s\S]*?<\/a>/g,"");
 const relative=path.relative(root,file).split(path.sep).join("/");const fr=relative==="fr.html"||relative.startsWith("fr/");
 const link='<a id="hva-skip-link" href="#'+encodeURIComponent(id)+'">'+(fr?"Aller au contenu principal":"Skip to main content")+'</a>';
 html=html.replace(/<body\b[^>]*>/,body=>body+link);fs.writeFileSync(file,html);pages++;
}}
visit(root);console.log("Skip navigation: "+pages+" pages configured");
