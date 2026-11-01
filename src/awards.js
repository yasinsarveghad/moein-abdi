const number = i => String(i + 1).padStart(2, '0');
const choose = ar => (en, aa) => ar ? aa : en;
const src = id => `/assets/awards/${id}.webp`;
export const awardItems = {
  trophies: [
    {id:'trophy-2', title:['The flame trophy','كأس الشعلة']},
    {id:'trophy-3', title:['The cycling trophy','كأس الدراجات']},
    {id:'trophy-1', title:['The victory statuette','تمثال النصر']}
  ],
  medals: Array.from({length:9}, (_, i) => ({id:`medal-${i+1}`, title:[`Medal ${number(i)}`,`الميدالية ${number(i)}`]}))
};
const arrow = direction => `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="${direction<0?'M15 6l-6 6 6 6':'M9 6l6 6-6 6'}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const expandIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const awardImage = (item, ar, thumb=false) => `<img src="${thumb?src(item.id).replace('.webp','-thumb.webp'):src(item.id)}" alt="${thumb?'':item.title[ar?1:0]}" loading="lazy" decoding="async" width="760" height="880" draggable="false">`;
function controls(ar, length){const t=choose(ar);return `<div class="award-controls"><output class="award-count" aria-live="polite">01 / ${number(length-1)}</output><div><button type="button" data-award-step="-1" aria-label="${t('Previous award','الجائزة السابقة')}">${arrow(-1)}</button><button type="button" data-award-step="1" aria-label="${t('Next award','الجائزة التالية')}">${arrow(1)}</button></div></div>`;}
export function awardsSection(kind, ar=false){
  const t=choose(ar),medal=kind==='medals',items=awardItems[kind];
  const header=`<div class="awards-heading"><div><span class="awards-eyebrow">${t('The collection','المجموعة')}</span><h2>${t(medal?'Every effort. A milestone.':'Recognition, earned.',medal?'كل جهد. إنجاز.':'تكريم يستحقه الجهد.')}</h2></div><span class="awards-total">${items.length.toString().padStart(2,'0')} ${t(medal?'medals':'trophies',medal?'ميداليات':'كؤوس')}</span></div>`;
  const body=medal?`<div class="award-collector"><div class="award-stage" aria-busy="false"><div class="award-object">${awardImage(items[0],ar)}</div></div><div class="award-details"><span class="awards-eyebrow">${t('Moein Abdi','معین عبدی')}</span><h3>${t('Medal collection','مجموعة الميداليات')}</h3><p>${t('Nine medals. Each with its own story.','تسع ميداليات. لكل واحدة حكايتها.')}</p><div class="award-selectors" role="group" aria-label="${t('Choose a medal','اختر ميدالية')}">${items.map((item,i)=>`<button type="button" data-award-index="${i}" aria-pressed="${i===0}" aria-label="${item.title[ar?1:0]}">${awardImage(item,ar,true)}<span>${number(i)}</span></button>`).join('')}</div>${controls(ar,items.length)}<button type="button" class="award-view" data-award-open>${t('View medal','عرض الميدالية')}${expandIcon}</button></div></div>`:
  `<div class="trophy-gallery" role="group" aria-label="${t('Three trophies','ثلاثة كؤوس')}">${items.map((item,i)=>`<article class="trophy-card"><div class="trophy-image">${awardImage(item,ar)}</div><div class="trophy-caption"><div><span class="awards-eyebrow">${t('Trophy','كأس')} ${number(i)}</span><h3>${item.title[ar?1:0]}</h3></div><button type="button" data-award-open="${i}" aria-label="${t('View','عرض')} ${item.title[ar?1:0]}">${expandIcon}</button></div></article>`).join('')}</div><div class="trophy-navigation">${controls(ar,items.length)}</div>`;
  return `<section class="section awards-section" data-awards="${kind}" aria-label="${t(medal?'Medal collection':'Trophy collection',medal?'مجموعة الميداليات':'مجموعة الكؤوس')}"><div class="wrap">${header}${body}</div></section>`;
}
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function openAward(item, ar, trigger){
  const t=choose(ar),dialog=document.createElement('dialog');
  dialog.className='award-dialog';dialog.setAttribute('aria-label',item.title[ar?1:0]);
  dialog.innerHTML=`<form method="dialog"><button autofocus aria-label="${t('Close image','أغلق الصورة')}">×</button></form><div class="award-dialog-image">${awardImage(item,ar)}</div><h2>${item.title[ar?1:0]}</h2><p>${t('From Moein Abdi’s personal collection.','من مجموعة معین عبدی الشخصية.')}</p>`;
  document.body.append(dialog);const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
  dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;dialog.remove();trigger.focus({preventScroll:true})},{once:true});
  dialog.addEventListener('click',e=>{const b=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom))dialog.close()});
  dialog.showModal();if(!reduced())dialog.animate([{opacity:0,transform:'translateY(16px) scale(.98)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.16,1,.3,1)'});
}
export function initializeAwards(ar=false){
  const t=choose(ar);
  document.querySelectorAll('[data-awards]').forEach(root=>{
    const kind=root.dataset.awards,items=awardItems[kind],stage=root.querySelector('.award-stage'),gallery=root.querySelector('.trophy-gallery');
    const selectors=[...root.querySelectorAll('[data-award-index]')];
    let selected=0,revision=0,pointer=null,scrollFrame;
    const count=root.querySelector('.award-count');
    const setControls=()=>{count.textContent=`${number(selected)} / ${number(items.length-1)}`;selectors.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)))};
    async function select(index,direction=1,retry=false){
      const next=(index+items.length)%items.length;
      if(next===selected)return;
      selected=next;setControls();
      if(gallery){const card=gallery.children[selected];gallery.scrollTo({left:card.offsetLeft-gallery.children[0].offsetLeft,behavior:reduced()?'instant':'smooth'});return;}
      const token=++revision,img=new Image();img.src=src(items[selected].id)+(retry?`?retry=${Date.now()}`:'');img.alt=items[selected].title[ar?1:0];img.draggable=false;stage.setAttribute('aria-busy','true');
      let failed=false;await img.decode().catch(()=>failed=true);if(token!==revision)return;
      if(failed){stage.setAttribute('aria-busy','false');let error=stage.querySelector('.award-error');if(!error){error=document.createElement('button');error.type='button';error.className='award-error';stage.append(error)}error.textContent=t('Image unavailable. Tap to retry.','تعذر تحميل الصورة. اضغط للمحاولة مجدداً.');error.onclick=()=>{const target=selected;selected=-1;select(target,direction,true)};return;}
      stage.querySelector('.award-error')?.remove();
      // Rapid input retains only the most recent outgoing layer and decoded image.
      const layers=[...stage.querySelectorAll('.award-object')];const previous=layers.pop();layers.forEach(n=>n.remove());previous?.getAnimations().forEach(a=>a.cancel());
      const node=document.createElement('div');node.className='award-object';node.append(img);stage.append(node);stage.setAttribute('aria-busy','false');
      if(reduced()){previous?.remove();return;}
      const offset=direction*(ar?-1:1)*44;
      const incoming=node.animate([{opacity:0,transform:`translateX(${offset}px) scale(.97)`},{opacity:1,transform:'translateX(0) scale(1)'}],{duration:600,easing:'cubic-bezier(.16,1,.3,1)'});
      previous?.animate([{opacity:1,transform:'translateX(0) scale(1)'},{opacity:0,transform:`translateX(${-offset*.6}px) scale(.98)`}],{duration:280,easing:'ease-out',fill:'forwards'});
      incoming.finished.then(()=>previous?.remove()).catch(()=>previous?.remove());
    }
    root.addEventListener('click',e=>{
      const button=e.target.closest('button');if(!button)return;
      if(button.hasAttribute('data-award-index')){const next=Number(button.dataset.awardIndex);select(next,next>selected?1:-1)}
      if(button.hasAttribute('data-award-step')){const delta=Number(button.dataset.awardStep);select(selected+delta,delta)}
      if(button.hasAttribute('data-award-open'))openAward(items[gallery?Number(button.dataset.awardOpen):selected],ar,button);
    });
    root.addEventListener('keydown',e=>{
      if(!e.target.closest('.award-selectors,.trophy-gallery'))return;
      let next;if(e.key==='ArrowRight')next=selected+(ar?-1:1);if(e.key==='ArrowLeft')next=selected+(ar?1:-1);if(e.key==='Home')next=0;if(e.key==='End')next=items.length-1;
      if(next!==undefined){e.preventDefault();const delta=next>selected?1:-1;select(next,delta);(selectors[(next+items.length)%items.length]||gallery?.children[(next+items.length)%items.length].querySelector('button'))?.focus({preventScroll:true})}
    });
    if(stage){
      stage.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0||e.target.closest('button'))return;pointer={id:e.pointerId,x:e.clientX,y:e.clientY};stage.setPointerCapture(e.pointerId)});
      stage.addEventListener('pointerup',e=>{if(!pointer||pointer.id!==e.pointerId)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;pointer=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.4){const delta=(dx<0?1:-1)*(ar?-1:1);select(selected+delta,delta)}});
      stage.addEventListener('pointercancel',()=>pointer=null);
    }
    if(gallery){gallery.addEventListener('scroll',()=>{clearTimeout(scrollFrame);scrollFrame=setTimeout(()=>{const box=gallery.getBoundingClientRect();let nearest=0,distance=Infinity;[...gallery.children].forEach((card,i)=>{const b=card.getBoundingClientRect(),d=Math.abs((ar?b.right:b.left)-(ar?box.right:box.left));if(d<distance){distance=d;nearest=i}});selected=nearest;setControls()},140)},{passive:true})}
  });
}
