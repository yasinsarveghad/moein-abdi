const fs=require('fs');const path=require('path');const sharp=require('/opt/codex/cua_node/lib/node_modules/sharp');const root=path.resolve(__dirname,'..');
const headBounds=require('../src/subject-bounds.json');
const items=[
['sunset','44','Moein adjusting his helmet at sunset','معین يعدل خوذته عند الغروب','portrait','50% 38%'],
['coach','46 (2)','Portrait of Moein wearing his cycling helmet','صورة شخصية لمعین بخوذة الدراجات','portrait','50% 32%'],
['trail','46','Moein overlooking a rocky trail from his mountain bike','معین يطل على مسار صخري من دراجته الجبلية','training','50% 45%'],
['summit','47','Moein with his red mountain bike above the city','معین مع دراجته الجبلية الحمراء فوق المدينة','portrait','47% 40%'],
['forest-pause','48 (2)','Moein taking a pause on a forest trail','معین يستريح على مسار في الغابة','training','50% 45%'],
['forest-ride','49','Moein riding through a wooded mountain trail','معین يقود دراجته على مسار جبلي بين الأشجار','training','50% 56%'],
['road','50 (2)','An informal moment during a road ride','لحظة عفوية أثناء رحلة على الطريق','behind','50% 45%'],
['summit-mono','51 (2)','Moein standing with his mountain bike under a cloudy sky','معین يقف مع دراجته الجبلية تحت سماء غائمة','portrait','50% 42%'],
['training-ride','51','Moein riding his mountain bike on a sunlit trail','معین يقود دراجته الجبلية على مسار مشمس','training','50% 45%'],
['summit-sign','52 (2)','Moein beside his bike at a mountain trail sign','معین بجانب دراجته عند لافتة مسار جبلي','behind','50% 43%'],
['road-climb','52','Moein riding uphill on a paved road','معین يصعد بدراجته على طريق معبد','training','50% 45%'],
['race-dust','53 (2)','Moein descending a dry mountain-bike race course through dust','معین يهبط على مسار سباق جبلي جاف وسط الغبار','racing','50% 47%'],
['rider-portrait','53','Moein standing with his mountain bike in a black jacket','معین يقف مع دراجته الجبلية مرتدياً سترة سوداء','portrait','50% 40%'],
['race-moment','54','Moein on his bike during a competition','معین على دراجته أثناء منافسة','racing','50% 48%'],
['race-group','55','Cyclists together at a race event','دراجون معاً في حدث تنافسي','behind','50% 51%'],
['hero-rock','56 (2)','Moein descending a rocky cross-country course, race number 52','معین يهبط على مسار كروس كانتري صخري برقم السباق ٥٢','racing','50% 42%'],
['race-candid','56','Black-and-white portrait of Moein among fellow cyclists','صورة بالأبيض والأسود لمعین بين زملائه الدراجين','portrait','50% 48%'],
['finish','57','Moein riding beneath a finish banner, race number 52','معین يقود دراجته تحت لافتة النهاية برقم السباق ٥٢','racing','50% 43%'],
['race-start','58 (2)','Moein alongside cyclists preparing at a race event','معین بجانب دراجين يستعدون في حدث تنافسي','racing','50% 46%'],
['race-rock','58','Moein riding over rocks on a dry mountain-bike course','معین يقود دراجته فوق الصخور على مسار جبلي جاف','racing','50% 43%']
];
items.push(...require('../src/new-photo-catalog.json'));
(async()=>{fs.mkdirSync(path.join(root,'src/photos'),{recursive:true});let total=0;const photos=[];for(const [id,suffix,en,ar,category,position]of items){const source=path.join(root,'originals',suffix.startsWith('new/')?suffix:'photo_2026-10-31_03-40-'+suffix+'.jpg');const width=id==='hero-rock'?1600:1100;const result=await sharp(source).rotate().resize({width,withoutEnlargement:true}).webp({quality:78,effort:6}).toFile(path.join(root,'src/photos',id+'.webp'));const small=await sharp(source).rotate().resize({width:540,withoutEnlargement:true}).webp({quality:75,effort:6}).toFile(path.join(root,'src/photos',id+'-small.webp'));total+=result.size+small.size;photos.push({id,head:headBounds[id],src:'/assets/photos/'+id+'.webp',small:'/assets/photos/'+id+'-small.webp',width:result.width,height:result.height,alt:[en,ar],category,position,source:path.basename(source)})}const order=['hero-rock','forest-technique','technical-rock','summit','event-certificates','technical-stairs','race-dust','summit-sunset','coach','trail-duo','race-candid','national-kit','finish'];photos.sort((a,b)=>{const ai=order.indexOf(a.id),bi=order.indexOf(b.id);return (ai<0?100:ai)-(bi<0?100:bi)});fs.writeFileSync(path.join(root,'src/media.js'),'export const photos='+JSON.stringify(photos,null,2)+';\nexport const media=Object.fromEntries(photos.map(p=>[p.id,p]));\n');console.log(`Optimized ${photos.length} originals: ${(total/1024/1024).toFixed(2)} MiB including responsive variants.`)})();
