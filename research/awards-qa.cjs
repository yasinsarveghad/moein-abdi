const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});let checks=0;
for(const width of [320,390,768,1024,1440])for(const ar of [false,true])for(const theme of ['light','dark']){
 const page=await browser.newPage({viewport:{width,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(v=>localStorage.setItem('moein-theme',v),theme);await page.goto('http://localhost:3000'+(ar?'/ar':'')+'/achievements');
 const medals=page.locator('[data-awards=medals]'),trophies=page.locator('[data-awards=trophies]');await medals.scrollIntoViewIfNeeded();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow ${width} ${ar}`);
 assert.deepEqual(await page.locator('main > section').evaluateAll(s=>s.slice(1,3).map(n=>n.dataset.awards)),['trophies','medals']);
 assert.equal(await medals.locator('.award-selectors img').count(),0);assert.equal(await page.locator('[data-award-open],.award-view,.trophy-caption button').count(),0);
 for(const index of [8,3,7,1])await medals.locator(`[data-award-index="${index}"]`).click();await page.waitForTimeout(1100);
 assert.equal(await medals.locator('.award-count').textContent(),'2 / 9');assert.match(await medals.locator('.award-object img').last().getAttribute('src'),/medal-2.webp/);assert.equal(await medals.locator('.award-object').count(),1);
 await medals.locator('[data-award-index="1"]').focus();await page.keyboard.press('End');await medals.locator('[data-award-step="1"]').click();await page.waitForTimeout(1100);assert.equal(await medals.locator('.award-count').textContent(),'1 / 9');
 await trophies.scrollIntoViewIfNeeded();await trophies.locator('[data-award-step="1"]').click();await page.waitForTimeout(1200);assert.equal(await trophies.locator('.award-count').textContent(),'03 / 03');
 assert.equal(await trophies.locator('[data-trophy-index="2"]').getAttribute('data-slot'),'0');
 const active=await trophies.locator('[data-slot="0"]').evaluate(n=>({filter:getComputedStyle(n).filter,width:n.getBoundingClientRect().width}));const side=await trophies.locator('[data-slot="-1"]').evaluate(n=>({filter:getComputedStyle(n).filter,width:n.getBoundingClientRect().width}));assert.ok(side.width<active.width);assert.equal(active.filter,'blur(0px)');assert.notEqual(side.filter,'blur(0px)');
 if(!ar&&[390,768,1440].includes(width)){await medals.screenshot({path:`research/awards-${theme}-${width}.png`});await trophies.screenshot({path:`research/trophies-${theme}-${width}.png`})}
 assert.deepEqual(errors,[]);checks++;await page.close();
}
const p=await browser.newPage({viewport:{width:390,height:900},reducedMotion:'reduce'});await p.goto('http://localhost:3000/');const m=p.locator('[data-awards=medals]');await m.scrollIntoViewIfNeeded();await m.locator('[data-award-index="7"]').click();await p.waitForFunction(()=>document.querySelector('.award-stage[aria-busy=false] img')?.src.endsWith('medal-8.webp'));assert.equal(await m.locator('.award-object').count(),1);assert.equal(await m.locator('.award-object').evaluate(n=>n.getAnimations().length),0);await browser.close();console.log(`${checks} responsive language/theme scenarios plus reduced-motion homepage passed`);})();
