const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const root=path.join(__dirname,"..","public"),dir=path.join(root,"assets","inline-svg");
fs.mkdirSync(dir,{recursive:true});
let occurrences=0,saved=0;const unique=new Set();
function entities(s){return s.replace(/&(?:quot|apos|lt|gt|amp|#\d+|#x[a-f0-9]+);/gi,x=>{
 const named={"&quot;":'"',"&apos;":"'","&lt;":"<","&gt;":">","&amp;":"&"};
 if(named[x])return named[x];
 return String.fromCodePoint(x[2].toLowerCase()==="x"?parseInt(x.slice(3,-1),16):parseInt(x.slice(2,-1),10));
});}
function visit(directory){for(const e of fs.readdirSync(directory,{withFileTypes:true})){
 const f=path.join(directory,e.name);if(e.isDirectory()){visit(f);continue;}if(!e.name.endsWith(".html"))continue;
 const before=fs.readFileSync(f,"utf8");
 const after=before.replace(/\bsrc="(data:image\/svg\+xml,([^"]*))"/g,(whole,uri,payload)=>{
  if(uri.length<4096)return whole;
  let svg=entities(payload);
  if(/%[a-f0-9]{2}/i.test(svg)){try{svg=decodeURIComponent(svg);}catch{return whole;}}
  if(!svg.trimStart().startsWith("<svg"))return whole;
  const name=crypto.createHash("sha256").update(svg).digest("hex").slice(0,20)+".svg";
  fs.writeFileSync(path.join(dir,name),svg);unique.add(name);occurrences++;
  const replacement='src="/assets/inline-svg/'+name+'"';saved+=whole.length-replacement.length;return replacement;
 });
 if(after!==before)fs.writeFileSync(f,after);
}}
visit(root);console.log("Inline SVG: "+occurrences+" images externalized, "+unique.size+" files, "+saved+" HTML characters removed");
