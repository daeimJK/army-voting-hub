(() => {
  const animals = [
    {key:'rabbit',label:'Rabbit',bg:'#f4d8d0',fur:'#f7eee5',inner:'#e6a29d',dark:'#2c2421'},
    {key:'cat',label:'Cat',bg:'#e1b641',fur:'#171616',inner:'#be7c7c',dark:'#0b0b0b',eyes:'#f4d55d'},
    {key:'bear',label:'Bear',bg:'#ddb369',fur:'#a56b3d',inner:'#7e4f31',dark:'#2b221e'},
    {key:'tiger',label:'Tiger',bg:'#f2c765',fur:'#e78628',inner:'#eda197',dark:'#35251f'},
    {key:'koala',label:'Koala',bg:'#79a9bb',fur:'#919da0',inner:'#c2cccd',dark:'#252a2b'},
    {key:'squirrel',label:'Squirrel',bg:'#dda254',fur:'#b46838',inner:'#d69487',dark:'#30231d'},
    {key:'alpaca',label:'Alpaca',bg:'#d8c6a9',fur:'#efe4d1',inner:'#e8aca4',dark:'#3d312b'}
  ];

  function miniAnimal(a){
    const ear = a.key==='rabbit'
      ? '<ellipse cx="18" cy="12" rx="5" ry="10"/><ellipse cx="30" cy="12" rx="5" ry="10"/><ellipse cx="18" cy="12" rx="2" ry="7" fill="'+a.inner+'"/><ellipse cx="30" cy="12" rx="2" ry="7" fill="'+a.inner+'"/>'
      : a.key==='bear'
      ? '<circle cx="15" cy="15" r="6"/><circle cx="33" cy="15" r="6"/><circle cx="15" cy="15" r="3" fill="'+a.inner+'"/><circle cx="33" cy="15" r="3" fill="'+a.inner+'"/>'
      : a.key==='koala'
      ? '<circle cx="12" cy="17" r="8"/><circle cx="36" cy="17" r="8"/><circle cx="12" cy="17" r="4.5" fill="'+a.inner+'"/><circle cx="36" cy="17" r="4.5" fill="'+a.inner+'"/>'
      : a.key==='alpaca'
      ? '<ellipse cx="18" cy="11" rx="3.5" ry="8"/><ellipse cx="30" cy="11" rx="3.5" ry="8"/><circle cx="17" cy="18" r="6"/><circle cx="24" cy="16" r="7"/><circle cx="31" cy="18" r="6"/>'
      : '<path d="M10 18 14 8 21 17Z"/><path d="M38 18 34 8 27 17Z"/>';
    const eyes = a.key==='cat'
      ? '<ellipse cx="18" cy="25" rx="4.8" ry="6" fill="'+a.eyes+'"/><ellipse cx="30" cy="25" rx="4.8" ry="6" fill="'+a.eyes+'"/><ellipse cx="18" cy="25" rx="1.5" ry="3.2" fill="#111"/><ellipse cx="30" cy="25" rx="1.5" ry="3.2" fill="#111"/>'
      : '<circle cx="18" cy="25" r="2.2" fill="'+a.dark+'"/><circle cx="30" cy="25" r="2.2" fill="'+a.dark+'"/>';
    const stripes = a.key==='tiger' ? '<path d="M19 17 21 22M24 16v6M29 17 27 22" stroke="#553226" stroke-width="2" stroke-linecap="round"/>' : '';
    const tail = a.key==='squirrel' ? '<path d="M37 28c8-9 12-2 8 4-3 4-7 2-8 0" fill="#98552f"/>' : '';
    const nose = a.key==='koala' ? '<ellipse cx="24" cy="30" rx="4.3" ry="5.4" fill="#2d3132"/>' : '<ellipse cx="24" cy="30" rx="2.7" ry="2.1" fill="'+a.dark+'"/>';
    const muzzle = a.key==='cat' ? '#c48c5b' : a.key==='tiger' ? '#f2dbc3' : a.key==='koala' ? '#aab5b8' : a.key==='alpaca' ? '#e5d6c1' : '#ead2b4';
    return `<svg class="bvw-mini-animal ${a.key}" viewBox="0 0 48 48" role="img" aria-label="${a.label}">
      <rect width="48" height="48" rx="16" fill="${a.bg}"/>
      ${tail}
      <g fill="${a.fur}">${ear}<ellipse cx="24" cy="27" rx="13" ry="12"/></g>
      ${stripes}
      <ellipse cx="24" cy="31" rx="7" ry="5.5" fill="${muzzle}"/>
      ${eyes}${nose}
      <path d="M24 33c-1.7 2.2-4.3 2.4-6 1m6-1c1.7 2.2 4.3 2.4 6 1" stroke="${a.dark}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    </svg>`;
  }

  function buildLogo(){
    const brand = document.querySelector('.brand');
    if(!brand || brand.dataset.iv2Logo) return;
    brand.dataset.iv2Logo='1';
    brand.innerHTML = `
      <div class="bvw-logo-v2">
        <div class="bvw-logo-v2-title">
          <div class="bvw-logo-v2-mark" aria-hidden="true"><span></span><span></span></div>
          <div class="bvw-logo-v2-copy">
            <small>BANGTAN</small>
            <strong>V Warriors</strong>
          </div>
        </div>
        <div class="bvw-logo-v2-animals">${animals.map(a=>miniAnimal(a)).join('')}</div>
        <div class="bvw-logo-v2-tag">voting mission world</div>
      </div>`;
  }

  function polishSidebar(){
    const side = document.querySelector('.side');
    if(!side || side.dataset.iv2Side) return;
    side.dataset.iv2Side='1';
    if(!side.querySelector('.iv2-side-art')) side.insertAdjacentHTML('afterbegin','<div class="iv2-side-art" aria-hidden="true"><span class="iv2-moon"></span><span class="iv2-star s1">✦</span><span class="iv2-star s2">✦</span><span class="iv2-star s3">✦</span></div>');
    const foot = side.querySelector('.side-foot');
    if(foot) foot.innerHTML='<strong>Mission note</strong><span>Fan-made hub. Voting stays on official platforms.</span>';
  }

  function cloudCards(){
    const map = document.querySelector('.quest-map');
    if(!map) return;
    const canvas = map.querySelector('.quest-map-canvas') || map;
    if(!canvas.querySelector('.iv2-map-texture')) canvas.insertAdjacentHTML('afterbegin','<div class="iv2-map-texture" aria-hidden="true"><span class="ring r1"></span><span class="ring r2"></span><span class="dot d1"></span><span class="dot d2"></span><span class="dot d3"></span></div>');
    const nodes=[...canvas.querySelectorAll('.mission')];
    nodes.forEach((node,i)=>{
      node.classList.add('mission-cloud-v2');
      if(!node.querySelector('.cloud-v2-accent')) node.insertAdjacentHTML('afterbegin','<span class="cloud-v2-accent" aria-hidden="true">✦</span>');
      const dot=node.querySelector('.mission-dot');
      if(dot && !dot.dataset.iv2){dot.dataset.iv2='1';dot.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span>`}
    });
  }

  function mobilePositions(){
    const nodes=[...document.querySelectorAll('.quest-map .mission')];
    if(!nodes.length) return;
    let coords=null;
    if(window.innerWidth<=620) coords=[[50,10],[25,25],[70,39],[30,54],[70,68],[28,82],[71,92]];
    else if(window.innerWidth<=900) coords=[[17,72],[32,49],[48,69],[63,44],[78,22],[56,18],[26,18]];
    if(!coords) return;
    nodes.forEach((n,i)=>{n.style.setProperty('--mx',coords[i%coords.length][0]+'%');n.style.setProperty('--my',coords[i%coords.length][1]+'%')});
  }

  function run(){buildLogo();polishSidebar();cloudCards();mobilePositions()}
  let timer;
  window.addEventListener('resize',()=>{clearTimeout(timer);timer=setTimeout(run,120)});
  const observer=new MutationObserver(()=>requestAnimationFrame(run));
  const start=()=>{run();observer.observe(document.body,{childList:true,subtree:true})};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
