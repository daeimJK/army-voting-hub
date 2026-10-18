(() => {
  const labels = ['rabbit','cat','bear','tiger','koala','squirrel','alpaca'];

  function furryAvatar(kind){
    const defs = `<defs>
      <filter id="soft"><feGaussianBlur stdDeviation="0.15"/></filter>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity=".24"/></filter>
      <pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M1 6 2 3m2 3 1-4m1 5 1-2" stroke="#111" stroke-width=".45" opacity=".13"/></pattern>
    </defs>`;
    const frame = `<rect width="140" height="140" rx="34" fill="var(--mascot-bg,#ead9ad)"/><rect width="140" height="140" rx="34" fill="url(#grain)" opacity=".4"/>`;
    const hairs = (paths, c='#111', op=.35) => `<g stroke="${c}" stroke-width="1.1" stroke-linecap="round" opacity="${op}">${paths}</g>`;

    const art = {
      cat: () => {
        const fur = '#161515', gold = '#f6d66a', tan='#c98d4b';
        return `<svg class="mascot-svg mascot-furry" viewBox="0 0 140 140" role="img" aria-label="Cat">${defs}${frame}
          <g filter="url(#shadow)">
            <path d="M36 36 46 11 61 35M104 36 94 11 79 35" fill="${fur}"/>
            <path d="M28 103c2-49 18-76 42-76 24 0 40 27 42 76 1 20-9 29-42 29s-43-9-42-29Z" fill="${fur}"/>
            <path d="M101 90c19 1 24 15 23 28" fill="none" stroke="${fur}" stroke-width="12" stroke-linecap="round"/>
            <ellipse cx="52" cy="59" rx="14" ry="17" fill="${gold}"/><ellipse cx="88" cy="59" rx="14" ry="17" fill="${gold}"/>
            <ellipse cx="52" cy="61" rx="4.4" ry="8" fill="#111"/><ellipse cx="88" cy="61" rx="4.4" ry="8" fill="#111"/>
            <circle cx="49" cy="55" r="2.2" fill="#fff"/><circle cx="85" cy="55" r="2.2" fill="#fff"/>
            <path d="M66 74q4-5 8 0l-4 4Z" fill="${tan}"/>
            <path d="M70 78c-4 7-11 8-16 4m16-4c4 7 11 8 16 4" stroke="#f4e6c9" stroke-width="2.2" fill="none" stroke-linecap="round"/>
            ${hairs('<path d="M33 48 16 42m18 15-19-1m21 10-18 6M107 48l17-6m-18 15 19-1m-21 10 18 6M43 35l-5-14m16 10-2-15m44 19 5-14m-16 10 2-15M37 83l-17 4m20 5-18 9m80-18 17 4m-20 5 18 9"/>','#f1d5a4',.5)}
            ${hairs('<path d="M43 87l-4 20m11-17-2 24m11-21 0 24m12-26 1 26m11-24 2 22m10-28 5 19"/>','#f0d3a4',.28)}
          </g></svg>`;
      },
      rabbit: () => `<svg class="mascot-svg mascot-furry" viewBox="0 0 140 140" role="img" aria-label="Rabbit">${defs}${frame}
        <g filter="url(#shadow)"><ellipse cx="48" cy="30" rx="13" ry="28" fill="#f5eee3"/><ellipse cx="92" cy="30" rx="13" ry="28" fill="#f5eee3"/><ellipse cx="48" cy="29" rx="5" ry="20" fill="#e7a39e"/><ellipse cx="92" cy="29" rx="5" ry="20" fill="#e7a39e"/><path d="M31 104c0-40 14-68 39-68 25 0 39 28 39 68 0 18-10 29-39 29s-39-11-39-29Z" fill="#f6efe5"/><circle cx="54" cy="63" r="5" fill="#241e1b"/><circle cx="86" cy="63" r="5" fill="#241e1b"/><circle cx="55" cy="61" r="1.4" fill="#fff"/><circle cx="87" cy="61" r="1.4" fill="#fff"/><ellipse cx="70" cy="75" rx="5" ry="4" fill="#b88476"/><path d="M70 79c-5 5-10 4-14 0m14 0c5 5 10 4 14 0" stroke="#3b2d28" stroke-width="2" fill="none" stroke-linecap="round"/>${hairs('<path d="M36 51 22 45m14 14-16-1m17 10-15 7m82-24 14-6m-14 14 16-1m-17 10 15 7M45 92l-11 17m20-14-7 23m19-21-2 25m19-25 3 24m12-27 8 19"/>','#8d7b6a',.32)}</g></svg>`,
      bear: () => `<svg class="mascot-svg mascot-furry" viewBox="0 0 140 140" role="img" aria-label="Bear">${defs}${frame}<g filter="url(#shadow)"><circle cx="41" cy="43" r="17" fill="#996139"/><circle cx="99" cy="43" r="17" fill="#996139"/><path d="M26 105c0-45 16-72 44-72s44 27 44 72c0 18-11 28-44 28s-44-10-44-28Z" fill="#a96e3f"/><ellipse cx="70" cy="79" rx="24" ry="20" fill="#e4c39e"/><circle cx="53" cy="62" r="4" fill="#2a211d"/><circle cx="87" cy="62" r="4" fill="#2a211d"/><ellipse cx="70" cy="73" rx="6" ry="5" fill="#2a211d"/><path d="M70 78c-5 6-11 6-16 2m16-2c5 6 11 6 16 2" stroke="#2a211d" stroke-width="2" fill="none" stroke-linecap="round"/>${hairs('<path d="M39 55 26 49m15 13-17 2m18 8-14 8m73-25 13-6m-15 13 17 2m-18 8 14 8M47 101l-8 18m20-16-4 22m21-21 1 22m17-24 7 20"/>','#4a2f20',.35)}</g></svg>`,
      tiger: () => `<svg class="mascot-svg mascot-furry" viewBox="0 0 140 140" role="img" aria-label="Tiger">${defs}${frame}<g filter="url(#shadow)"><path d="M35 44 41 18 57 40M105 44 99 18 83 40" fill="#e88a28"/><path d="M27 105c0-43 16-71 43-71s43 28 43 71c0 19-11 28-43 28s-43-9-43-28Z" fill="#e88a28"/><path d="M48 39 54 53M70 35v19m22-15-6 14M36 74l14 5m54-5-14 5M41 91l14-3m44 3-14-3" stroke="#2d211c" stroke-width="5" stroke-linecap="round"/><ellipse cx="70" cy="80" rx="22" ry="18" fill="#f3dfc8"/><circle cx="53" cy="63" r="4" fill="#241b18"/><circle cx="87" cy="63" r="4" fill="#241b18"/><ellipse cx="70" cy="75" rx="5" ry="4" fill="#241b18"/>${hairs('<path d="M35 61 20 57m16 12-18 3m19 6-16 8m84-25 15-4m-16 12 18 3m-19 6 16 8M51 104l-5 18m18-17-1 21m17-20 2 20m14-23 7 18"/>','#6a3c22',.34)}</g></svg>`,
      koala: () => `<svg class="mascot-svg mascot-furry" viewBox="0 0 140 140" role="img" aria-label="Koala">${defs}${frame}<g filter="url(#shadow)"><circle cx="35" cy="58" r="27" fill="#87979a"/><circle cx="105" cy="58" r="27" fill="#87979a"/><circle cx="35" cy="58" r="16" fill="#c1cbca"/><circle cx="105" cy="58" r="16" fill="#c1cbca"/><path d="M31 106c0-44 14-72 39-72s39 28 39 72c0 18-10 27-39 27s-39-9-39-27Z" fill="#939fa1"/><ellipse cx="70" cy="78" rx="12" ry="16" fill="#2b3031"/><circle cx="53" cy="63" r="4" fill="#202526"/><circle cx="87" cy="63" r="4" fill="#202526"/><path d="M70 93c-5 5-10 4-14 1m14-1c5 5 10 4 14 1" stroke="#303637" stroke-width="2" fill="none"/>${hairs('<path d="M35 41 23 31m17 16-17-4m19 12-20 3m83-17 12-10m-17 16 17-4m-19 12 20 3M48 102l-7 18m19-16-3 21m18-20 2 21m15-24 7 19"/>','#435053',.35)}</g></svg>`,
      squirrel: () => `<svg class="mascot-svg mascot-furry" viewBox="0 0 140 140" role="img" aria-label="Squirrel">${defs}${frame}<g filter="url(#shadow)"><path d="M94 56c22-28 42-12 35 12-5 17-20 18-27 12 11 8 13 21 4 31-9 10-22 7-29 0" fill="#9a562f" opacity=".95"/><path d="M35 105c0-42 13-70 35-70s35 28 35 70c0 18-9 28-35 28s-35-10-35-28Z" fill="#b56838"/><path d="M42 43 46 21 60 40M98 43 94 21 80 40" fill="#b56838"/><ellipse cx="70" cy="81" rx="20" ry="17" fill="#e7c29d"/><circle cx="54" cy="63" r="4" fill="#2b1f19"/><circle cx="86" cy="63" r="4" fill="#2b1f19"/><ellipse cx="70" cy="76" rx="4.5" ry="3.5" fill="#2b1f19"/>${hairs('<path d="M42 54 27 49m16 13-17 1m18 8-15 8m72-25 13-4M47 102l-8 18m20-15-4 21m19-21 2 21m16-24 8 18"/>','#5b3423',.35)}</g></svg>`,
      alpaca: () => `<svg class="mascot-svg mascot-furry" viewBox="0 0 140 140" role="img" aria-label="Alpaca">${defs}${frame}<g filter="url(#shadow)"><ellipse cx="53" cy="22" rx="8" ry="18" fill="#efe3cf"/><ellipse cx="87" cy="22" rx="8" ry="18" fill="#efe3cf"/><path d="M48 45c0-13 10-22 22-22s22 9 22 22v49c0 25-8 39-22 39s-22-14-22-39Z" fill="#eee3d2"/><circle cx="48" cy="47" r="13" fill="#f5ecdf"/><circle cx="61" cy="40" r="14" fill="#f5ecdf"/><circle cx="76" cy="40" r="14" fill="#f5ecdf"/><circle cx="91" cy="47" r="13" fill="#f5ecdf"/><ellipse cx="70" cy="73" rx="18" ry="15" fill="#e5d4bc"/><circle cx="58" cy="58" r="3.5" fill="#342923"/><circle cx="82" cy="58" r="3.5" fill="#342923"/><ellipse cx="70" cy="69" rx="4" ry="3" fill="#342923"/>${hairs('<path d="M43 52 29 48m15 12-16 2m15 7-14 9m68-26 14-4m-15 12 16 2m-15 7 14 9M55 96l-4 20m14-18-1 23m11-23 2 23m8-26 7 20"/>','#857466',.27)}</g></svg>`
    };
    return (art[kind] || art.rabbit)();
  }

  function replaceMascots(){
    document.querySelectorAll('.mascot-svg').forEach(old => {
      if (old.dataset.polished) return;
      const aria = (old.getAttribute('aria-label') || 'Rabbit').toLowerCase();
      const kind = labels.includes(aria) ? aria : 'rabbit';
      const wrap = document.createElement('div');
      wrap.innerHTML = furryAvatar(kind);
      const fresh = wrap.firstElementChild;
      fresh.dataset.polished = '1';
      old.replaceWith(fresh);
    });
  }

  function frameMap(){
    const map = document.querySelector('.quest-map');
    if(!map || map.dataset.polished) return;
    map.dataset.polished='1';
    const missions=[...map.querySelectorAll('.mission')];
    if(!missions.length) return;

    const canvas=document.createElement('div');
    canvas.className='quest-map-canvas';
    const route=document.createElementNS('http://www.w3.org/2000/svg','svg');
    route.setAttribute('class','quest-route');
    route.setAttribute('viewBox','0 0 1000 620');
    route.setAttribute('preserveAspectRatio','none');
    route.innerHTML='<path d="M140 520 C235 520, 260 392, 335 400 S470 485, 555 365 S680 220, 760 255 S825 155, 860 120" fill="none" stroke="#df3b35" stroke-width="12" stroke-linecap="round" stroke-dasharray="8 18"/>';
    canvas.appendChild(route);
    canvas.insertAdjacentHTML('beforeend','<div class="map-orbit one"></div><div class="map-orbit two"></div><div class="map-stars">✦　·　✦　·　✦　·　✦</div><div class="map-sun"></div><div class="map-hill hill-a"></div><div class="map-hill hill-b"></div>');

    const coords=[[14,74],[29,50],[43,68],[55,38],[67,20],[79,45],[86,16]];
    missions.forEach((m,i)=>{
      m.style.setProperty('--mx',`${coords[i%coords.length][0]}%`);
      m.style.setProperty('--my',`${coords[i%coords.length][1]}%`);
      canvas.appendChild(m);
    });
    [...map.children].forEach(ch=>{if(ch!==canvas && !ch.classList.contains('map-legend')) ch.remove()});
    map.prepend(canvas);
  }

  function addSidebarTexture(){
    const side=document.querySelector('.side');
    if(side && !side.querySelector('.side-sky-mark')) side.insertAdjacentHTML('afterbegin','<div class="side-sky-mark"><span>✦</span><span>✦</span><span>✦</span></div>');
  }

  function run(){ replaceMascots(); frameMap(); addSidebarTexture(); }
  const obs=new MutationObserver(()=>requestAnimationFrame(run));
  const start=()=>{run();obs.observe(document.body,{childList:true,subtree:true})};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();
