const fs=require('fs');
const path=require('path');
const sharp=require('/opt/codex/cua_node/lib/node_modules/sharp');
const root=path.resolve(__dirname,'..');
const directory=path.join(root,'src');
const raw=fs.readFileSync(path.join(directory,'moein-logo.svg'),'utf8');
const symbol=raw.match(/<g[\s\S]*<\/g>/)[0];
// The original MA silhouette on a genuinely transparent square canvas.
const favicon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g transform="translate(-15 153) scale(.264)">${symbol}</g></svg>`;
(async()=>{
 for(const file of ['favicon.svg','ma-icon.svg','ma-transparent.svg'])fs.writeFileSync(path.join(directory,file),favicon);
 for(const [size,names]of [[32,['favicon-32.png','ma-icon-32.png','ma-transparent-32.png']],[192,['favicon-192.png','ma-icon-192.png','ma-transparent-192.png']],[180,['apple-touch-icon.png','ma-apple-touch-icon.png','ma-transparent-touch.png']]]){
  const bytes=await sharp(Buffer.from(favicon)).resize(size,size).png().toBuffer();
  for(const name of names)fs.writeFileSync(path.join(directory,name),bytes);
 }
 const sizes=[16,32,48,64,256],images=[];
 for(const size of sizes)images.push(await sharp(Buffer.from(favicon)).resize(size,size).png().toBuffer());
 const header=Buffer.alloc(6+16*sizes.length);header.writeUInt16LE(1,2);header.writeUInt16LE(sizes.length,4);let offset=header.length;
 images.forEach((bytes,i)=>{const at=6+16*i;header[at]=sizes[i]===256?0:sizes[i];header[at+1]=header[at];header.writeUInt16LE(1,at+4);header.writeUInt16LE(32,at+6);header.writeUInt32LE(bytes.length,at+8);header.writeUInt32LE(offset,at+12);offset+=bytes.length});
 const ico=Buffer.concat([header,...images]);
 for(const name of ['favicon.ico','ma-transparent.ico'])fs.writeFileSync(path.join(directory,name),ico);
 console.log('Transparent MA SVG, PNG, touch and multi-resolution ICO generated.');
})();
