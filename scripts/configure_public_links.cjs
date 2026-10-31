const fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"..","public");
const oldMap="https://maps.app.goo.gl/1GBTEfaXBSzjqjkd8";
const map="https://www.google.com/maps/search/?api=1&query=Tangier%2C%20Morocco";
let changed=0;
function visit(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
 const f=path.join(dir,e.name);if(e.isDirectory()){visit(f);continue;}if(!/\.(html|js|mjs)$/.test(e.name))continue;
 const before=fs.readFileSync(f,"utf8");
 const after=before.replaceAll(oldMap,map).replaceAll("Dronningens Gate 15, Oslo","Tangier, Morocco").replaceAll("DRONNINGENS GATE 15, OSLO","TANGIER, MOROCCO").replaceAll("Working globally — Remote first","Open worldwide");
 if(after!==before){fs.writeFileSync(f,after);changed++;}
}}
visit(root);console.log("Public links: "+changed+" source files updated to HVA location");
