(() => {
  const KEY='bvw-mascot';
  const BADGE_KEY='bvw-seen-badges';
  const mascots=['rabbit','cat','bear','tiger','koala','squirrel','alpaca'];
  const label={rabbit:'Rabbit',cat:'Cat',bear:'Bear',tiger:'Tiger',koala:'Koala',squirrel:'Squirrel',alpaca:'Alpaca'};
  const badgeAccessories=['starter','speed','collector','duo','raid','clock','utility','final','crown','scarf'];
  const submitLines=['Borahae. Proof received 💜','ARMY mission sent.','Quest claimed for Bangtan.','One more for our seven.','Proof in. Mission moving.','Bangtan quest submitted.','Another step for BTS.'];
  const clearLines=['Mission cleared for Bangtan!','Verified. Nice one, ARMY.','Bangtan mission complete.','Another win for the seven.','ARMY mission: cleared.','Seven steps closer.'];
  const badgeLines=['Badge unlocked! Borahae 💜','New badge for your ARMY shelf.','Bangtan badge unlocked!','Another one for the vault.','ARMY achievement unlocked.','Your mascot brought home a badge.'];
  const pick = a => a[Math.floor(Math.random()*a.length)];
  const currentMascot=()=>{const m=localStorage.getItem(KEY);return mascots.includes(m)?m:'rabbit'};

  function svg(kind, accessory='default', cls=''){
    const a={
      rabbit:{bg:'#f4dfb7',fur:'#f6eee4',inner:'#e99d95',dark:'#27201d',ears:'<ellipse cx="34" cy="20" rx="10" ry="23"/><ellipse cx="66" cy="20" rx="10" ry="23"/><ellipse cx="34" cy="19" rx="4" ry="16" fill="#e99d95"/><ellipse cx="66" cy="19" rx="4" ry="16" fill="#e99d95"/>'},
      cat:{bg:'#e5b642',fur:'#1b1a1a',inner:'#d98d8d',dark:'#0b0b0b',ears:'<path d="M24 33 30 9 44 28Z"/><path d="M76 33 70 9 56 28Z"/><path d="M29 27 32 16 39 28Z" fill="#d98d8d"/><path d="M71 27 68 16 61 28Z" fill="#d98d8d"/>'},
      bear:{bg:'#e0b46b',fur:'#a96e3b',inner:'#7f4e2d',dark:'#2a211d',ears:'<circle cx="28" cy="28" r="12"/><circle cx="72" cy="28" r="12"/><circle cx="28" cy="28" r="6" fill="#7f4e2d"/><circle cx="72" cy="28" r="6" fill="#7f4e2d"/>'},
      tiger:{bg:'#f3ca67',fur:'#e88325',inner:'#eda095',dark:'#33231e',ears:'<path d="M24 33 30 12 44 29Z"/><path d="M76 33 70 12 56 29Z"/><path d="M29 27 31 18 39 29Z" fill="#eda095"/><path d="M71 27 69 18 61 29Z" fill="#eda095"/>'},
      koala:{bg:'#75a8bb',fur:'#909da0',inner:'#d8a1a5',dark:'#23292b',ears:'<circle cx="24" cy="35" r="18"/><circle cx="76" cy="35" r="18"/><circle cx="24" cy="35" r="10" fill="#bcc6c7"/><circle cx="76" cy="35" r="10" fill="#bcc6c7"/>'},
      squirrel:{bg:'#e0a455',fur:'#b66a38',inner:'#dc9a8c',dark:'#30221c',ears:'<path d="M28 31 31 14 43 29Z"/><path d="M72 31 69 14 57 29Z"/><path d="M31 26 33 19 39 28Z" fill="#dc9a8c"/><path d="M69 26 67 19 61 28Z" fill="#dc9a8c"/>'},
      alpaca:{bg:'#d7c6a7',fur:'#f1e6d2',inner:'#e7aaa3',dark:'#3c302a',ears:'<ellipse cx="34" cy="20" rx="6" ry="15"/><ellipse cx="66" cy="20" rx="6" ry="15"/><ellipse cx="34" cy="20" rx="2.5" ry="10" fill="#e7aaa3"/><ellipse cx="66" cy="20" rx="2.5" ry="10" fill="#e7aaa3"/>'}
    }[kind]||null;
    const muzzle=kind==='cat'?'#c7925d':kind==='tiger'?'#f5dec5':kind==='koala'?'#adb9bb':kind==='squirrel'?'#ebc9a3':kind==='alpaca'?'#eee1cf':'#ecd4b7';
    const eye=kind==='cat'?'<circle cx="38" cy="51" r="7" fill="#f7d34a"/><circle cx="62" cy="51" r="7" fill="#f7d34a"/><circle cx="38" cy="51" r="2.5" fill="#111"/><circle cx="62" cy="51" r="2.5" fill="#111"/>':'<circle cx="39" cy="52" r="3.5" fill="'+a.dark+'"/><circle cx="61" cy="52" r="3.5" fill="'+a.dark+'"/><circle cx="40" cy="51" r="1" fill="#fff"/><circle cx="62" cy="51" r="1" fill="#fff"/>';
    const furLines='<g stroke="'+a.dark+'" stroke-width=".8" opacity=".18" stroke-linecap="round"><path d="M24 47l-5-3m7 10-7 1m9 7-6 4M76 47l5-3m-7 10 7 1m-9 7 6 4M35 35l-3-5m11 3-1-6m15 6 2-6m7 8 3-5"/></g>';
    const tiger=kind==='tiger'?'<path d="M38 31 43 40M50 28 50 40M62 31 57 40" stroke="#503229" stroke-width="4" stroke-linecap="round"/>':'';
    const whisk=kind==='cat'?'<g stroke="#171717" stroke-width="1.2"><path d="M30 61 12 58M31 65 11 67M70 61 88 58M69 65 89 67"/></g>':'';
    const fluff=kind==='alpaca'?'<circle cx="34" cy="39" r="11"/><circle cx="46" cy="34" r="12"/><circle cx="58" cy="34" r="12"/><circle cx="68" cy="40" r="10"/>':'';
    const outfit={
      starter:'<path d="M27 79Q50 69 73 79L69 95H31Z" fill="#e63232"/><circle cx="50" cy="82" r="4" fill="#f6cb55"/>',
      speed:'<path d="M22 47Q50 39 78 47" stroke="#e63232" stroke-width="7"/><path d="M29 80Q50 68 71 80L67 95H33Z" fill="#173a66"/>',
      collector:'<path d="M29 79Q50 68 71 79L67 95H33Z" fill="#151515"/><rect x="61" y="67" width="18" height="18" rx="5" fill="#e63232"/><circle cx="70" cy="76" r="4" fill="#f6cb55"/>',
      duo:'<path d="M25 78Q50 67 75 78L70 95H30Z" fill="#171717"/><path d="M31 83H69" stroke="#e63232" stroke-width="4"/>',
      raid:'<path d="M23 76Q50 63 77 76L72 95H28Z" fill="#173a66"/><path d="M29 80 50 71 71 80" stroke="#e63232" stroke-width="5" fill="none"/>',
      clock:'<path d="M28 79Q50 69 72 79L68 95H32Z" fill="#171717"/><circle cx="70" cy="72" r="9" fill="#f5e7c8" stroke="#e63232" stroke-width="3"/><path d="M70 72v-5m0 5 4 2" stroke="#161616" stroke-width="2"/>',
      utility:'<path d="M26 79Q50 67 74 79L70 95H30Z" fill="#e63232"/><path d="M35 79v16M65 79v16" stroke="#173a66" stroke-width="5"/><rect x="43" y="80" width="14" height="7" rx="3" fill="#f6cb55"/>',
      final:'<path d="M20 78Q50 62 80 78L74 95H26Z" fill="#111"/><path d="M29 79 50 68 71 79" stroke="#e63232" stroke-width="6"/>',
      crown:'<path d="M34 20 40 7 50 18 60 7 67 20Z" fill="#f6cb55" stroke="#2e2215" stroke-width="2"/><path d="M25 78Q50 64 75 78L71 95H29Z" fill="#173a66"/>',
      scarf:'<path d="M26 69Q50 78 74 69" stroke="#e63232" stroke-width="8"/><path d="M62 72 70 92" stroke="#e63232" stroke-width="7"/>',
      default:'<path d="M27 80Q50 69 73 80L69 95H31Z" fill="#e63232"/>'
    }[accessory]||'';
    return `<svg class="mascot-svg ${cls}" viewBox="0 0 100 100" role="img" aria-label="${label[kind]}"><rect width="100" height="100" rx="28" fill="${a.bg}"/><circle cx="16" cy="16" r="2" fill="#f6cb55" opacity=".8"/><circle cx="83" cy="22" r="1.5" fill="#173a66" opacity=".7"/><g fill="${a.fur}">${a.ears}${fluff}<ellipse cx="50" cy="56" rx="31" ry="29"/></g>${furLines}${tiger}<ellipse cx="50" cy="62" rx="16" ry="12" fill="${muzzle}"/>${eye}<ellipse cx="50" cy="61" rx="4" ry="3.5" fill="${a.dark}"/><path d="M50 64c-3 5-8 5-11 2M50 64c3 5 8 5 11 2" stroke="${a.dark}" stroke-width="2" fill="none" stroke-linecap="round"/>${whisk}${outfit}</svg>`;
  }

  function replaceText(root,from,to){root.querySelectorAll('button,a,span,h1,h2,h3,div,p').forEach(el=>{if(el.children.length===0&&el.textContent.trim()===from)el.textContent=to})}

  function decorateLogin(root){
    const art=root.querySelector('.login-art'); if(!art||art.dataset.v2)return; art.dataset.v2='1';
    art.innerHTML=`<div class="login-kicker">BTS voting mission world</div><h1>Bangtan V Warriors</h1><p>Enter the map, complete today’s voting quests and collect achievements for our seven.</p><div class="login-sky"><span class="moon"></span><span class="star s1">✦</span><span class="star s2">✦</span><span class="star s3">✦</span></div><div class="login-mascots">${mascots.map((m,i)=>`<div class="login-mascot" style="--delay:${i*70}ms">${svg(m)}</div>`).join('')}</div>`;
    const submit=root.querySelector('#auth-form .btn'); if(submit)submit.textContent=submit.textContent.includes('Create')?'Create player':'Enter lobby';
    root.querySelectorAll('.tabs button').forEach(b=>{if(b.textContent.trim()==='Create account')b.textContent='Create player'})
  }

  function decorateShell(root){
    const brand=root.querySelector('.brand'); if(brand&&!brand.dataset.v2){brand.dataset.v2='1';brand.innerHTML='<div class="brand-mark">BW</div><div><b>Bangtan V Warriors</b><small>Voting mission world</small></div>'}
    const foot=root.querySelector('.side-foot'); if(foot)foot.innerHTML='Fan-made mission hub.<br>Voting stays on official platforms.';
    [['Today','Lobby'],['Voting info','Missions'],['Voting','Missions'],['Credentials','Badge Vault'],['Badges','Badge Vault'],['Profile','Player'],['Admin','Control Room'],['Official vote','Enter quest'],['Rules & guide','Mission guide'],['Submit proof','Claim quest'],['Resubmit proof','Retry quest'],['Verified','Quest cleared'],['Pending review','Under review'],['Save profile','Save player'],['Sign out','Leave lobby']].forEach(([a,b])=>replaceText(root,a,b));
    const title=root.querySelector('.title'); if(title){const map={'Today’s missions':'Mission Map','Voting information':'Active Missions','Digital credentials':'Badge Vault','Moderator queue':'Control Room'}; if(map[title.textContent.trim()])title.textContent=map[title.textContent.trim()]}
  }

  function playerAvatar(root){const kind=currentMascot();root.querySelectorAll('.profile-pill .avatar').forEach(a=>{a.innerHTML=svg(kind);a.classList.add('avatar-art')})}

  function addLobbyHud(root){
    const title=root.querySelector('.title'); if(!title||title.textContent.trim()!=='Mission Map'||root.querySelector('.player-hud'))return;
    const top=root.querySelector('.topbar'),hero=root.querySelector('.hero'); if(!top||!hero)return;
    const nick=root.querySelector('.profile-pill span:last-child')?.textContent?.trim()||'ARMY'; const metrics=[...root.querySelectorAll('.metric')].map(x=>x.textContent.trim());
    const progress=metrics[0]||'0/0',pct=metrics[1]||'0%',streak=metrics[2]||'0 days'; const verified=Number(progress.split('/')[0]||0); const level=Math.max(1,Math.floor(verified/3)+1),xp=Math.min(100,(verified%3)*33+(verified?12:0));
    top.insertAdjacentHTML('afterend',`<section class="player-hud game-panel"><div class="hud-avatar">${svg(currentMascot())}</div><div class="hud-player"><span class="hud-label">PLAYER</span><strong>${nick}</strong><span>Level ${level}</span></div><div class="hud-xp"><div class="hud-row"><span>XP</span><b>${xp}%</b></div><div class="xp-track"><span style="width:${xp}%"></span></div></div><div class="hud-stat"><span>Today</span><b>${progress}</b></div><div class="hud-stat"><span>Streak</span><b>${streak.replace(' days','d')}</b></div></section>`);
    hero.classList.add('quest-progress-panel');
  }

  function buildMap(root){
    const title=root.querySelector('.title'); if(!title||title.textContent.trim()!=='Mission Map')return;
    const heading=[...root.querySelectorAll('.section-title')].find(x=>/mission board|quest/i.test(x.textContent)); if(!heading)return;
    const section=heading.nextElementSibling; if(!section||!section.classList.contains('card')||section.classList.contains('quest-map'))return;
    section.classList.add('quest-map'); heading.textContent='Today’s route';
    const missions=[...section.querySelectorAll('.mission')];
    section.insertAdjacentHTML('afterbegin','<div class="map-sky"><span class="map-moon"></span><span class="map-star ms1">✦</span><span class="map-star ms2">✦</span><span class="map-star ms3">✦</span><span class="map-star ms4">✦</span><svg class="map-path" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true"><path d="M80 560 C220 500 160 365 340 360 S520 470 610 300 S790 120 930 150"/></svg></div>');
    const positions=[[7,74],[28,49],[49,67],[68,37],[84,18],[54,17],[18,18]];
    missions.forEach((row,i)=>{row.classList.add('map-node');row.style.setProperty('--x',positions[i%positions.length][0]+'%');row.style.setProperty('--y',positions[i%positions.length][1]+'%'); const dot=row.querySelector('.mission-dot');if(dot)dot.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span>`; const p=row.querySelector('p');if(p)p.textContent=p.textContent.replace(' · resets ',' · ');});
    section.insertAdjacentHTML('beforeend',`<div class="map-guide"><span><i class="legend available"></i>Ready</span><span><i class="legend review"></i>Under review</span><span><i class="legend clear"></i>Cleared</span></div>`);
  }

  function decorateMissionCards(root){
    root.querySelectorAll('.award-card').forEach((card,i)=>{if(card.querySelector('.award-mascot'))return;const kind=mascots[i%mascots.length];card.insertAdjacentHTML('afterbegin',`<div class="award-mascot">${svg(kind,i%2?'scarf':'default')}</div>`);card.classList.add('quest-card')});
  }

  function decorateBadges(root){
    root.querySelectorAll('.badge').forEach((card,i)=>{if(card.dataset.v2)return;card.dataset.v2='1';const kind=mascots[i%mascots.length];const icon=card.querySelector('.badge-icon');if(icon){icon.innerHTML=svg(kind,badgeAccessories[i%badgeAccessories.length]);icon.classList.add('badge-art')}const h=card.querySelector('h3');if(h)h.insertAdjacentHTML('beforeend',`<span class="badge-animal">${label[kind]}</span>`)});
  }

  function addProfileMascots(root){
    const save=root.querySelector('#save-profile'); if(!save||root.querySelector('.mascot-picker'))return; const form=save.closest('.form');if(!form)return;const chosen=currentMascot();
    form.insertAdjacentHTML('afterbegin',`<div class="mascot-picker"><div class="picker-copy"><span class="eyebrow">Choose your player</span><p>Pick one of the seven mascots for your profile.</p></div><div class="mascot-options">${mascots.map(m=>`<button type="button" class="mascot-option ${m===chosen?'selected':''}" data-mascot="${m}">${svg(m)}<span>${label[m]}</span></button>`).join('')}</div></div>`);
  }

  function restyleToasts(){
    document.querySelectorAll('#toast-root .toast:not([data-bvw])').forEach(t=>{t.dataset.bvw='1';const s=t.textContent.trim();if(s==='Proof submitted for review.')t.textContent=pick(submitLines);else if(s==='Proof verified.')t.textContent=pick(clearLines);else if(s==='Profile saved.')t.textContent='Player saved. Ready for the next quest.';});
  }

  function badgeCelebration(root){
    const unlocked=[...root.querySelectorAll('.badge:not(.locked) h3')].map(h=>h.childNodes[0]?.textContent?.replace('✓','').trim()).filter(Boolean); if(!unlocked.length)return;
    let seen=[];try{seen=JSON.parse(localStorage.getItem(BADGE_KEY)||'[]')}catch{}
    const fresh=unlocked.filter(x=>!seen.includes(x));
    if(fresh.length){const name=fresh[fresh.length-1];localStorage.setItem(BADGE_KEY,JSON.stringify([...new Set([...seen,...unlocked])]));showAchievement(name)}
  }

  function showAchievement(name){
    if(document.querySelector('.achievement-pop'))return; const d=document.createElement('div');d.className='achievement-pop';d.innerHTML=`<div class="achievement-mascot">${svg(currentMascot(),'crown')}</div><div><span>BADGE UNLOCKED</span><strong>${name}</strong><p>${pick(badgeLines)}</p></div>`;document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add('show'));setTimeout(()=>{d.classList.remove('show');setTimeout(()=>d.remove(),250)},4200)
  }

  function decorateStatus(root){root.querySelectorAll('.status').forEach(s=>{const t=s.textContent.trim().toLowerCase();if(t==='verified')s.textContent='Quest cleared';if(t==='pending')s.textContent='Under review';if(t==='resubmit')s.textContent='Retry required';if(t==='rejected')s.textContent='Quest failed'})}

  function apply(){const root=document.getElementById('app');if(!root)return;decorateLogin(root);decorateShell(root);playerAvatar(root);addLobbyHud(root);decorateMissionCards(root);decorateBadges(root);addProfileMascots(root);decorateStatus(root);buildMap(root);restyleToasts();badgeCelebration(root)}

  document.addEventListener('click',e=>{const b=e.target.closest('[data-mascot]');if(!b)return;localStorage.setItem(KEY,b.dataset.mascot);document.querySelectorAll('.mascot-option').forEach(x=>x.classList.toggle('selected',x===b));document.querySelectorAll('.profile-pill .avatar').forEach(a=>a.innerHTML=svg(b.dataset.mascot));apply()});
  const obs=new MutationObserver(()=>requestAnimationFrame(apply)); const start=()=>{apply();obs.observe(document.body,{childList:true,subtree:true})}; if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
