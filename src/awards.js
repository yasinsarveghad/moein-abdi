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
const awardImage = (item, ar) => `<img src="${src(item.id)}" alt="${item.title[ar?1:0]}" loading="lazy" decoding="async" width="760" height="880" draggable="false">`;
const pauseIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6v12M15 6v12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const playIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 6 9 6-9 6V6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
function controls(ar, length, initial=0){const t=choose(ar);return `<div class="award-controls"><output class="award-count" aria-live="off">${number(initial)} / ${number(length-1)}</output><div><button type="button" class="award-playback" data-award-playback aria-pressed="false" aria-label="${t('Pause slideshow','إيقاف العرض التلقائي')}">${pauseIcon}</button><button type="button" data-award-step="-1" aria-label="${t('Previous award','الجائزة السابقة')}">${arrow(-1)}</button><button type="button" data-award-step="1" aria-label="${t('Next award','الجائزة التالية')}">${arrow(1)}</button></div></div>`;}
export function awardsSection(kind, ar=false){
  const t=choose(ar),medal=kind==='medals',items=awardItems[kind];
  const header=`<div class="awards-heading"><div><span class="awards-eyebrow">${t('The collection','المجموعة')}</span><h2>${t(medal?'Every effort. A milestone.':'Recognition, earned.',medal?'كل جهد. إنجاز.':'تكريم يستحقه الجهد.')}</h2></div><span class="awards-total">${items.length.toString().padStart(2,'0')} ${t(medal?'medals':'trophies',medal?'ميداليات':'كؤوس')}</span></div>`;
  const body=medal?`<div class="award-collector"><div class="award-stage" aria-busy="false"><div class="award-object">${awardImage(items[0],ar)}</div></div><div class="award-details"><span class="awards-eyebrow">${t('Moein Abdi','معین عبدی')}</span><h3>${t('Medal collection','مجموعة الميداليات')}</h3><p>${t('Nine medals. Each with its own story.','تسع ميداليات. لكل واحدة حكايتها.')}</p><div class="award-selectors" role="group" aria-label="${t('Choose a medal','اختر ميدالية')}">${items.map((item,i)=>`<button type="button" data-award-index="${i}" aria-pressed="${i===0}" aria-label="${item.title[ar?1:0]}"><span>${number(i)}</span></button>`).join('')}</div>${controls(ar,items.length)}</div></div>`:
  `<div class="trophy-gallery" role="group" aria-roledescription="${t('carousel','عرض شرائح')}" aria-label="${t('Three trophies','ثلاثة كؤوس')}">${items.map((item,i)=>`<article class="trophy-card" data-trophy-index="${i}" data-slot="${i-1}" role="button" tabindex="0" aria-pressed="${i===1}" aria-label="${item.title[ar?1:0]}"><div class="trophy-image">${awardImage(item,ar)}</div><div class="trophy-caption"><span class="awards-eyebrow">${t('Trophy','كأس')} ${number(i)}</span><h3>${item.title[ar?1:0]}</h3></div></article>`).join('')}</div><div class="trophy-navigation">${controls(ar,items.length,1)}</div>`;
  return `<section class="section awards-section" data-awards="${kind}" aria-label="${t(medal?'Medal collection':'Trophy collection',medal?'مجموعة الميداليات':'مجموعة الكؤوس')}"><div class="wrap">${header}${body}</div></section>`;
}
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
// Each collection owns one timer; passive sections and reduced-motion users never auto-advance.
export function initializeAwards(ar=false){
  const t=choose(ar),motion=matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-awards]').forEach(root=>{
    const kind=root.dataset.awards,items=awardItems[kind],stage=root.querySelector('.award-stage'),gallery=root.querySelector('.trophy-gallery');
    const selectors=[...root.querySelectorAll('[data-award-index]')],cards=[...root.querySelectorAll('[data-trophy-index]')];
    const count=root.querySelector('.award-count'),playback=root.querySelector('[data-award-playback]');
    let selected=gallery?1:0,revision=0,pointer=null,timer=0,visible=false,hovered=false,focused=false,paused=false,suppressCardClickUntil=0;
    const stop=()=>{clearTimeout(timer);timer=0};
    const schedule=()=>{
      stop();if(paused||motion.matches||!visible||hovered||focused||document.hidden)return;
      timer=setTimeout(()=>select(selected+1,1,false,true),6000);
    };
    const setControls=(automatic=false)=>{
      count.setAttribute('aria-live',automatic?'off':'polite');
      count.textContent=`${number(selected)} / ${number(items.length-1)}`;
      selectors.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));
      cards.forEach((card,i)=>{
        const relative=(i-selected+items.length)%items.length;
        card.dataset.slot=String(relative===2?-1:relative);
        card.setAttribute('aria-pressed',String(i===selected));
      });
    };
    async function select(index,direction=1,retry=false,automatic=false){
      stop();const next=(index+items.length)%items.length;
      if(next===selected&&!retry){schedule();return;}
      selected=next;setControls(automatic);
      if(gallery){schedule();return;}
      const token=++revision,img=new Image();img.src=src(items[selected].id)+(retry?`?retry=${Date.now()}`:'');img.alt=items[selected].title[ar?1:0];img.draggable=false;stage.setAttribute('aria-busy','true');
      let failed=false;await img.decode().catch(()=>failed=true);if(token!==revision)return;
      if(failed){
        stage.setAttribute('aria-busy','false');let error=stage.querySelector('.award-error');
        if(!error){error=document.createElement('button');error.type='button';error.className='award-error';stage.append(error)}
        error.textContent=t('Image unavailable. Tap to retry.','تعذر تحميل الصورة. اضغط للمحاولة مجدداً.');
        error.onclick=()=>select(selected,direction,true);return;
      }
      stage.querySelector('.award-error')?.remove();
      const layers=[...stage.querySelectorAll('.award-object')],previous=layers.pop();
      layers.forEach(n=>n.remove());previous?.getAnimations().forEach(a=>a.cancel());
      const node=document.createElement('div');node.className='award-object';node.append(img);stage.append(node);stage.setAttribute('aria-busy','false');
      if(reduced()){previous?.remove();schedule();return;}
      const offset=direction*(ar?-1:1)*52;
      const incoming=node.animate([{opacity:0,transform:`translate3d(${offset}px,8px,0) scale(.96)`,filter:'blur(4px)'},{opacity:1,transform:'translate3d(0,0,0) scale(1)',filter:'blur(0px)'}],{duration:1000,easing:'cubic-bezier(.22,1,.36,1)'});
      previous?.animate([{opacity:1,transform:'translate3d(0,0,0) scale(1)',filter:'blur(0px)'},{opacity:0,transform:`translate3d(${-offset*.65}px,-4px,0) scale(.96)`,filter:'blur(3px)'}],{duration:550,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
      incoming.finished.then(()=>previous?.remove()).catch(()=>previous?.remove());schedule();
    }
    root.addEventListener('click',e=>{
      const card=e.target.closest('[data-trophy-index]');
      if(card&&performance.now()<suppressCardClickUntil)return;
      if(card){const next=Number(card.dataset.trophyIndex);select(next,card.dataset.slot==='-1'?-1:1);return;}
      const button=e.target.closest('button');if(!button)return;
      if(button.hasAttribute('data-award-index')){const next=Number(button.dataset.awardIndex);select(next,next>selected?1:-1)}
      if(button.hasAttribute('data-award-step')){const delta=Number(button.dataset.awardStep);select(selected+delta,delta)}
      if(button.hasAttribute('data-award-playback')){
        paused=!paused;button.setAttribute('aria-pressed',String(paused));button.innerHTML=paused?playIcon:pauseIcon;
        button.setAttribute('aria-label',paused?t('Play slideshow','تشغيل العرض التلقائي'):t('Pause slideshow','إيقاف العرض التلقائي'));schedule();
      }
    });
    root.addEventListener('keydown',e=>{
      if(!e.target.closest('.award-selectors,.trophy-gallery'))return;
      if(gallery&&['Enter',' '].includes(e.key)){e.preventDefault();select(Number(e.target.closest('[data-trophy-index]').dataset.trophyIndex));return;}
      let next;if(e.key==='ArrowRight')next=selected+(ar?-1:1);if(e.key==='ArrowLeft')next=selected+(ar?1:-1);if(e.key==='Home')next=0;if(e.key==='End')next=items.length-1;
      if(next!==undefined){e.preventDefault();select(next,next>selected?1:-1);(selectors[(next+items.length)%items.length]||cards[(next+items.length)%items.length])?.focus({preventScroll:true})}
    });
    const surface=stage||gallery;
    surface.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0||e.target.closest('button'))return;stop();pointer={id:e.pointerId,x:e.clientX,y:e.clientY};if(stage)surface.setPointerCapture(e.pointerId)});
    surface.addEventListener('pointerup',e=>{
      if(!pointer||pointer.id!==e.pointerId)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;pointer=null;
      if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.4){suppressCardClickUntil=performance.now()+350;const delta=(dx<0?1:-1)*(ar?-1:1);select(selected+delta,delta)}else schedule();
    });
    surface.addEventListener('pointercancel',()=>{pointer=null;schedule()});
    // Mouse hover and keyboard focus pause without changing the user's explicit playback choice.
    root.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;stop()}});
    root.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){hovered=false;schedule()}});
    root.addEventListener('focusin',()=>{focused=true;stop()});
    root.addEventListener('focusout',()=>{queueMicrotask(()=>{focused=root.contains(document.activeElement);schedule()})});
    document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',schedule);
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.3;schedule()},{threshold:.3}).observe(surface);
    setControls(true);
  });
}
