const fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"..","public","assets");
let files=0;
for(const directory of ["animate","js"]){
 const dir=path.join(root,directory);
 for(const name of fs.readdirSync(dir).filter(n=>/^script_main.*\.(?:js|mjs)$/.test(n))){
  const file=path.join(dir,name),before=fs.readFileSync(file,"utf8");
  const after=before.replace(/\{autoResize:!0,duration:[^}]*id:`R1QXrDmH1`[^}]*\}/g,props=>props.replace(/\bduration:[\d.]+/,"duration:2.4").replace(/\bwheelMultiplier:[\d.]+/,"wheelMultiplier:0.85"));
  if(after!==before){fs.writeFileSync(file,after);files++;}
 }
}
console.log("Scroll feel: "+files+" bundles set to duration 2.4, wheel multiplier 0.85; touch settings preserved");
