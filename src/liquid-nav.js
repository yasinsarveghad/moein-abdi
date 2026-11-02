import {routes} from '/assets/content.js';
// Adapted from yasinsarveghad/yasin: concept-02/design.js and design.css.
// Preserve its liquidSlots geometry, optical lens, and critically damped sheet.
const svg=body=>`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${body}</svg>`;
const icons={
 home:svg('<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>'),
 bike:svg('<circle cx="5.5" cy="17" r="4"/><circle cx="18.5" cy="17" r="4"/><path d="m5.5 17 5-10 5 10h-10L9 10h8m-1-6h3l-1 6M8 7h5"/>'),
 trophy:svg('<path d="M8 3h8v6a4 4 0 0 1-8 0V3Zm4 10v5m-4 3h8m-7-3h6M8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4"/>'),
 training:svg('<circle cx="12" cy="14" r="8"/><path d="M9 2h6m-3 0v4m6 2 2-2m-8 5v4l3 2"/>'),
 more:svg('<circle cx="5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="19" cy="12" r="1.3" fill="currentColor"/>'),
 person:svg('<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>'),
 team:svg('<circle cx="9" cy="8" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M16 5a3 3 0 0 1 0 6m2 3a6 6 0 0 1 4 6"/>'),
 chart:svg('<path d="M4 3v17h17M8 14l4-4 4 2 5-7"/>'),
 calendar:svg('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 5h2m4 0h2"/>'),
 partner:svg('<path d="m3 8 4-4 5 2 5-2 4 4-5 10-4 3-4-3Zm4-4 5 8 4-3m-8 9 3-3m1 6 3-5"/>'),
 gallery:svg('<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 6-6 4 4 3-3 5 5"/>'),
 journal:svg('<path d="M5 3h14v18H5Zm4 5h6m-6 4h6m-6 4h4"/>'),
 mail:svg('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>'),
 close:svg('<path d="m6 6 12 12M18 6 6 18"/>')
};
const primary=[['/','Home','الرئيسية','home'],['/racing','Racing','السباقات','bike'],['/achievements','Awards','الإنجازات','trophy'],['/coaching','Coaching','التدريب','training']];
const routeIcons={'/about':'person','/national-team':'team','/performance':'chart','/coaching/plans':'training','/book':'calendar','/sponsorship':'partner','/gallery':'gallery','/journal':'journal','/contact':'mail'};
export function liquidNavigation(ar,path){
 const t=(en,aa)=>ar?aa:en,url=p=>(ar?'/ar':'')+(p==='/'?'/':p);
 return `<div class="athlete-dock" data-visible="false" inert aria-hidden="true"><nav class="liquid-nav" aria-label="${t('Quick navigation','التنقل السريع')}" data-ready="false"><div class="liquid-lens" aria-hidden="true"></div>${primary.map(([p,en,aa,ic],i)=>`<a class="liquid-nav-item" data-dock-index="${i}" href="${url(p)}" aria-label="${t(en,aa)}" ${path===p?'aria-current="page"':''}><span class="nav-icon">${icons[ic]}</span><span class="liquid-label" aria-hidden="true"><span>${t(en,aa)}</span></span></a>`).join('')}<button type="button" class="liquid-nav-item" data-dock-index="4" aria-label="${t('More pages','صفحات أخرى')}" aria-controls="athlete-more" aria-expanded="false"><span class="nav-icon">${icons.more}</span><span class="liquid-label" aria-hidden="true"><span>${t('More','المزيد')}</span></span></button></nav></div><dialog class="athlete-more" id="athlete-more" aria-labelledby="athlete-more-title"><div class="dock-card-drag" aria-hidden="true"><span></span></div><button class="dock-card-close" type="button" aria-label="${t('Close navigation','أغلق التنقل')}">${icons.close}</button><div class="dock-panel-heading"><img src="/assets/moein-logo.svg" width="98" height="28" alt=""><h2 id="athlete-more-title">${t('Explore Moein’s world','اكتشف عالم معین')}</h2><p>${t('Every part of the journey.','كل جانب من الرحلة.')}</p></div><div class="dock-more-links">${routes.filter(([p])=>!primary.some(([x])=>x===p)).map(([p,en,aa])=>`<a href="${url(p)}" ${path===p?'aria-current="page"':''}><span>${icons[routeIcons[p]||'journal']}</span><span>${t(en,aa)}</span></a>`).join('')}</div><button class="dock-card-done" type="button">${t('Done','تم')}</button></dialog>`;
}
// Original Yasin/Titana geometry, adapted to a horizontal dock on every viewport.
function liquidSlots(width,count,active,labelWidth,rtl=false){
 const pad=6,gap=2,inner=Math.max(0,width-pad*2-gap*Math.max(0,count-1)),base=inner/Math.max(1,count);
 const selected=active<0?base:Math.min(Math.max(92,labelWidth+54),Math.max(base,inner-Math.max(0,count-1)*40));
 const other=count>1?(inner-(active>=0?selected:base))/(count-1):inner;let cursor=pad;
 return Array.from({length:count},(_,i)=>{const w=active<0?base:i===active?selected:other,left=rtl?width-cursor-w:cursor;cursor+=w+gap;return {left,width:w}});
}
export function initializeLiquidNavigation(ar,path){
 const shell=document.querySelector('.athlete-dock');if(!shell)return;
 const dock=shell.querySelector('nav'),lens=dock.querySelector('.liquid-lens'),items=[...dock.querySelectorAll('.liquid-nav-item')],more=items[4],card=document.querySelector('#athlete-more'),header=document.querySelector('.site-header'),footer=document.querySelector('.footer'),mobileMenu=document.querySelector('#mobile-menu');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');let current=primary.findIndex(([p])=>p===path);if(current<0)current=4;
 let preview=null,visible=false,scrollFrame=0,y=0,velocity=0,target=0,frame=0,last=0,closing=false,drag=null,previousOverflow='';
 function layout(){const active=card.open?4:preview??current,label=items[active].querySelector('.liquid-label>span').scrollWidth,slots=liquidSlots(dock.clientWidth,5,active,label,ar);
  lens.style.width=slots[active].width+'px';lens.style.transform=`translateX(${slots[active].left}px)`;
  items.forEach((item,i)=>{item.dataset.selected=String(i===active);item.style.width=slots[i].width+'px';item.style.transform=`translateX(${slots[i].left}px)`});dock.dataset.ready='true';
 }
 function refresh(){scrollFrame=0;const top=header.getBoundingClientRect().bottom,bottom=footer.getBoundingClientRect().top,menuOpen=mobileMenu&&!mobileMenu.hidden,typing=document.activeElement?.matches('input,textarea,select,[contenteditable="true"]');
  const next=!menuOpen&&!typing&&(visible?top<-72&&bottom>innerHeight+96:top<-128&&bottom>innerHeight+160);
  if(next!==visible){visible=next;shell.dataset.visible=String(next);shell.inert=!next;shell.setAttribute('aria-hidden',String(!next));if(!next&&card.open)dismiss();if(!next&&shell.contains(document.activeElement))document.activeElement.blur()}
 }
 function queue(){if(!scrollFrame)scrollFrame=requestAnimationFrame(refresh)}
 document.addEventListener('focusin',queue);document.addEventListener('focusout',queue);
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
 new ResizeObserver(()=>{layout();queue()}).observe(dock);new ResizeObserver(queue).observe(document.querySelector('main'));
 new MutationObserver(queue).observe(mobileMenu,{attributes:true,attributeFilter:['hidden','class']});
 document.fonts.ready.then(()=>{layout();queue()});layout();refresh();
 items.forEach((item,i)=>{item.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){preview=i;layout()}});item.addEventListener('focus',()=>{preview=i;layout()})});
 dock.addEventListener('pointerleave',()=>{preview=dock.contains(document.activeElement)?items.indexOf(document.activeElement):null;if(preview===-1)preview=null;layout()});
 dock.addEventListener('focusout',()=>queueMicrotask(()=>{if(!dock.contains(document.activeElement)){preview=null;layout()}}));
 dock.addEventListener('keydown',e=>{const i=items.indexOf(e.target);if(i<0)return;let next;
  if(e.key==='Home')next=0;if(e.key==='End')next=4;if(e.key==='ArrowRight')next=(i+(ar?-1:1)+5)%5;if(e.key==='ArrowLeft')next=(i+(ar?1:-1)+5)%5;
  if(next!==undefined){e.preventDefault();items[next].focus()}
 });
 function paint(){card.style.transform=`translateY(${y}px)`;card.style.setProperty('--card-progress',Math.max(0,Math.min(1,1-y/(card.offsetHeight+30))))}
 function tick(now){const dt=Math.min((now-last)/1000,.032);last=now;const displacement=y-target,c=velocity+21*displacement,decay=Math.exp(-21*dt);y=target+(displacement+c*dt)*decay;velocity=(velocity-21*c*dt)*decay;paint();
  if(Math.abs(y-target)<.3&&Math.abs(velocity)<3){y=target;velocity=0;paint();frame=0;if(closing)card.close();return}frame=requestAnimationFrame(tick);
 }
 function spring(to,close=false){target=to;closing=close;if(reduce.matches){cancelAnimationFrame(frame);frame=0;y=target;velocity=0;paint();if(close)card.close();return}if(!frame){last=performance.now();frame=requestAnimationFrame(tick)}}
 function dismiss(){if(card.open)spring(card.offsetHeight+30,true)}
 more.addEventListener('click',()=>{if(card.open){dismiss();return}previousOverflow=document.body.style.overflow;card.showModal();document.body.style.overflow='hidden';more.setAttribute('aria-expanded','true');cancelAnimationFrame(frame);frame=0;y=card.offsetHeight+30;velocity=0;paint();spring(0);layout()});
 card.addEventListener('cancel',e=>{e.preventDefault();dismiss()});card.querySelector('.dock-card-close').addEventListener('click',dismiss);card.querySelector('.dock-card-done').addEventListener('click',dismiss);
 card.addEventListener('click',e=>{const r=card.getBoundingClientRect();if(e.target===card&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dismiss()});
 card.addEventListener('close',()=>{cancelAnimationFrame(frame);frame=0;closing=false;drag=null;document.body.style.overflow=previousOverflow;more.setAttribute('aria-expanded','false');preview=null;layout();if(visible)more.focus({preventScroll:true});queue()});
 const handle=card.querySelector('.dock-card-drag');handle.addEventListener('pointerdown',e=>{if(e.button!==0)return;cancelAnimationFrame(frame);frame=0;closing=false;handle.setPointerCapture(e.pointerId);drag={id:e.pointerId,start:e.clientY,offset:y,last:e.clientY,time:e.timeStamp};velocity=0});
 handle.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const next=drag.offset+e.clientY-drag.start;y=next<0?next*.18:next;const dt=(e.timeStamp-drag.time)/1000;if(dt>0)velocity=(e.clientY-drag.last)/dt;drag.last=e.clientY;drag.time=e.timeStamp;paint()});
 function release(e){if(!drag||drag.id!==e.pointerId)return;if(e.timeStamp-drag.time>90)velocity=0;const close=e.type!=='pointercancel'&&y+velocity*.18>card.offsetHeight*.23;drag=null;spring(close?card.offsetHeight+30:0,close)}
 handle.addEventListener('pointerup',release);handle.addEventListener('pointercancel',release);
}
