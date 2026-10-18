(() => {
  const KEY = 'bvw-mascot';
  const mascots = ['rabbit','cat','bear','tiger','koala','squirrel','alpaca'];
  const mascotLabel = {rabbit:'Rabbit',cat:'Cat',bear:'Bear',tiger:'Tiger',koala:'Koala',squirrel:'Squirrel',alpaca:'Alpaca'};
  const badgeAccessories = ['starter','speed','collector','duo','raid','clock','utility','final','crown','scarf'];

  function currentMascot(){
    const m = localStorage.getItem(KEY);
    return mascots.includes(m) ? m : 'rabbit';
  }

  function svg(kind, accessory='default', cls='') {
    const art = {
      rabbit: {bg:'#efe3d2', fur:'#f6efe5', inner:'#ef9e96', dark:'#382c2a', ears:'<ellipse cx="35" cy="20" rx="9" ry="22"/><ellipse cx="65" cy="20" rx="9" ry="22"/><ellipse cx="35" cy="19" rx="3.5" ry="15" fill="#ef9e96"/><ellipse cx="65" cy="19" rx="3.5" ry="15" fill="#ef9e96"/>'},
      cat: {bg:'#d8cdc0', fur:'#323033', inner:'#d59b9b', dark:'#171719', ears:'<path d="M25 32 31 10 44 27Z"/><path d="M75 32 69 10 56 27Z"/><path d="M29 26 32 16 39 27Z" fill="#d59b9b"/><path d="M71 26 68 16 61 27Z" fill="#d59b9b"/>'},
      bear: {bg:'#d9b58a', fur:'#a96f3c', inner:'#83532f', dark:'#2d211b', ears:'<circle cx="29" cy="28" r="12"/><circle cx="71" cy="28" r="12"/><circle cx="29" cy="28" r="6" fill="#83532f"/><circle cx="71" cy="28" r="6" fill="#83532f"/>'},
      tiger: {bg:'#f0bf72', fur:'#e98b2a', inner:'#f3b0a0', dark:'#3b2821', ears:'<path d="M25 32 30 13 44 28Z"/><path d="M75 32 70 13 56 28Z"/><path d="M29 26 31 18 38 28Z" fill="#f3b0a0"/><path d="M71 26 69 18 62 28Z" fill="#f3b0a0"/>'},
      koala: {bg:'#b6c8c8', fur:'#8fa3a5', inner:'#dca7aa', dark:'#262d2f', ears:'<circle cx="25" cy="35" r="18"/><circle cx="75" cy="35" r="18"/><circle cx="25" cy="35" r="11" fill="#bfc8c6"/><circle cx="75" cy="35" r="11" fill="#bfc8c6"/>'},
      squirrel: {bg:'#d8b38a', fur:'#b8703d', inner:'#e0a393', dark:'#33251e', ears:'<path d="M29 31 32 14 43 29Z"/><path d="M71 31 68 14 57 29Z"/><path d="M32 26 33 19 39 28Z" fill="#e0a393"/><path d="M68 26 67 19 61 28Z" fill="#e0a393"/>'},
      alpaca: {bg:'#eadfce', fur:'#f1e7d6', inner:'#e8a8a3', dark:'#3e302b', ears:'<ellipse cx="34" cy="20" rx="6" ry="15"/><ellipse cx="66" cy="20" rx="6" ry="15"/><ellipse cx="34" cy="20" rx="2.5" ry="10" fill="#e8a8a3"/><ellipse cx="66" cy="20" rx="2.5" ry="10" fill="#e8a8a3"/>'}
    }[kind] || null;
    const stripes = kind === 'tiger' ? '<path d="M38 31 43 40M50 28 50 40M62 31 57 40" stroke="#503229" stroke-width="4" stroke-linecap="round"/>' : '';
    const fluff = kind === 'alpaca' ? '<circle cx="34" cy="39" r="11"/><circle cx="46" cy="34" r="12"/><circle cx="58" cy="34" r="12"/><circle cx="68" cy="40" r="10"/>' : '';
    const muzzle = kind === 'cat' ? '#efe9df' : kind === 'tiger' ? '#f8e5cf' : kind === 'koala' ? '#aebabb' : kind === 'squirrel' ? '#ecd0ad' : kind === 'alpaca' ? '#eee1cf' : '#efd9bd';
    const outfit = {
      starter:'<path d="M27 79 Q50 69 73 79 L69 94 H31Z" fill="#e62235"/><path d="M46 76 54 76 56 94H44Z" fill="#151515"/>',
      speed:'<path d="M23 48 Q50 40 77 48" stroke="#e62235" stroke-width="7"/><path d="M29 80 Q50 68 71 80L67 94H33Z" fill="#d92032"/>',
      collector:'<path d="M29 79Q50 68 71 79L67 94H33Z" fill="#1d1d1d"/><rect x="61" y="67" width="18" height="18" rx="5" fill="#e62235"/><circle cx="70" cy="76" r="4" fill="#f7d26a"/>',
      duo:'<path d="M25 78Q50 67 75 78L70 94H30Z" fill="#171717"/><path d="M31 83H69" stroke="#e62235" stroke-width="4"/><circle cx="36" cy="79" r="3" fill="#e62235"/>',
      raid:'<path d="M23 76Q50 63 77 76L72 95H28Z" fill="#171717"/><path d="M29 80 50 71 71 80" stroke="#e62235" stroke-width="5" fill="none"/>',
      clock:'<path d="M28 79Q50 69 72 79L68 94H32Z" fill="#171717"/><circle cx="70" cy="72" r="9" fill="#f4eee6" stroke="#e62235" stroke-width="3"/><path d="M70 72v-5m0 5 4 2" stroke="#161616" stroke-width="2"/>',
      utility:'<path d="M26 79Q50 67 74 79L70 94H30Z" fill="#e62235"/><path d="M35 79v15M65 79v15" stroke="#171717" stroke-width="5"/><rect x="43" y="80" width="14" height="7" rx="3" fill="#171717"/>',
      final:'<path d="M20 78Q50 62 80 78L74 95H26Z" fill="#111"/><path d="M29 79 50 68 71 79" stroke="#e62235" stroke-width="6"/><path d="M50 70v24" stroke="#e62235" stroke-width="3"/>',
      crown:'<path d="M34 20 40 7 50 18 60 7 67 20Z" fill="#f1be3b" stroke="#2e2215" stroke-width="2"/><path d="M25 78Q50 64 75 78L71 95H29Z" fill="#e62235"/>',
      scarf:'<path d="M26 69Q50 78 74 69" stroke="#e62235" stroke-width="8"/><path d="M62 72 70 92" stroke="#e62235" stroke-width="7"/>',
      default:'<path d="M27 80Q50 69 73 80L69 94H31Z" fill="#e62235"/>'
    }[accessory] || '';
    return `<svg class="mascot-svg ${cls}" viewBox="0 0 100 100" role="img" aria-label="${mascotLabel[kind]}">
      <rect width="100" height="100" rx="28" fill="${art.bg}"/>
      <g fill="${art.fur}">${art.ears}${fluff}<ellipse cx="50" cy="56" rx="31" ry="29"/></g>
      ${stripes}
      <ellipse cx="50" cy="62" rx="16" ry="12" fill="${muzzle}"/>
      <circle cx="39" cy="52" r="3" fill="${art.dark}"/><circle cx="61" cy="52" r="3" fill="${art.dark}"/>
      <ellipse cx="50" cy="61" rx="4" ry="3.5" fill="${art.dark}"/>
      <path d="M50 64c-3 5-8 5-11 2M50 64c3 5 8 5 11 2" stroke="${art.dark}" stroke-width="2" fill="none" stroke-linecap="round"/>
      ${outfit}
    </svg>`;
  }

  function replaceText(root, from, to){
    root.querySelectorAll('button,a,span,h1,h2,h3,div,p').forEach(el => {
      if (el.children.length === 0 && el.textContent.trim() === from) el.textContent = to;
    });
  }

  function decorateLogin(root){
    const art = root.querySelector('.login-art');
    if (!art || art.dataset.gameStyled) return;
    art.dataset.gameStyled = '1';
    art.innerHTML = `<div class="login-kicker">BTS voting game hub</div><h1>Bangtan V Warriors</h1><p>Pick up today’s voting quests, complete them on the official platforms and build your player collection.</p><div class="login-mascots">${mascots.map((m,i)=>`<div class="login-mascot" style="--delay:${i*70}ms">${svg(m,'default')}</div>`).join('')}</div><div class="login-mini-status"><span>Daily quests</span><span>Badge collection</span><span>Player streaks</span></div>`;
    const submit = root.querySelector('#auth-form .btn');
    if (submit) submit.textContent = submit.textContent.includes('Create') ? 'Create player' : 'Enter lobby';
    const tabs = root.querySelectorAll('.tabs button');
    tabs.forEach(b => { if (b.textContent.trim()==='Create account') b.textContent='Create player'; });
  }

  function decorateShell(root){
    const brand = root.querySelector('.brand');
    if (brand && !brand.dataset.gameStyled) {
      brand.dataset.gameStyled='1';
      brand.innerHTML = `<div class="brand-mark">BW</div><div><b>Bangtan V Warriors</b><small>Voting game hub</small></div>`;
    }
    const foot = root.querySelector('.side-foot');
    if (foot) foot.innerHTML = 'Fan-made mission hub.<br>Voting stays on official platforms.';

    replaceText(root,'Today','Lobby');
    replaceText(root,'Voting info','Quests');
    replaceText(root,'Voting','Quests');
    replaceText(root,'Credentials','Badge Vault');
    replaceText(root,'Badges','Badge Vault');
    replaceText(root,'Profile','Player');
    replaceText(root,'Admin','Control Room');
    replaceText(root,'Official vote','Enter quest');
    replaceText(root,'Rules & guide','Mission guide');
    replaceText(root,'Submit proof','Claim quest');
    replaceText(root,'Resubmit proof','Retry quest');
    replaceText(root,'Verified','Quest cleared');
    replaceText(root,'Pending review','Under review');
    replaceText(root,'Save profile','Save player');
    replaceText(root,'Sign out','Leave lobby');

    const title = root.querySelector('.title');
    if (title) {
      const t = title.textContent.trim();
      const map = {
        'Today’s missions':'Mission Lobby',
        'Voting information':'Active Quests',
        'Digital credentials':'Badge Vault',
        'Moderator queue':'Control Room'
      };
      if (map[t]) title.textContent = map[t];
    }
    root.querySelectorAll('.eyebrow').forEach(el => {
      const t = el.textContent.trim();
      const map = {'Daily mission board':'TODAY’S QUESTS','Voting centre':'QUEST DIRECTORY','Voting passport':'PLAYER COLLECTION','Profile':'PLAYER PROFILE','Admin':'CONTROL ROOM'};
      if(map[t]) el.textContent = map[t];
    });
  }

  function playerAvatar(root){
    const kind=currentMascot();
    root.querySelectorAll('.profile-pill .avatar').forEach(a => { a.innerHTML=svg(kind,'default'); a.classList.add('avatar-art'); });
  }

  function addLobbyHud(root){
    if (!root.querySelector('.title') || root.querySelector('.title').textContent.trim()!=='Mission Lobby' || root.querySelector('.player-hud')) return;
    const top = root.querySelector('.topbar');
    const hero = root.querySelector('.hero');
    if (!top || !hero) return;
    const nick = root.querySelector('.profile-pill span:last-child')?.textContent?.trim() || 'ARMY';
    const metrics=[...root.querySelectorAll('.metric')].map(x=>x.textContent.trim());
    const progress=metrics[0]||'0/0';
    const pct=metrics[1]||'0%';
    const streak=metrics[2]||'0 days';
    const verified = Number((progress.split('/')[0]||0));
    const level=Math.max(1,Math.floor(verified/3)+1);
    const xp=Math.min(100,(verified%3)*33 + (verified?12:0));
    top.insertAdjacentHTML('afterend',`<section class="player-hud game-panel"><div class="hud-avatar">${svg(currentMascot(),'default')}</div><div class="hud-player"><span class="hud-label">PLAYER</span><strong>${nick}</strong><span>Level ${level}</span></div><div class="hud-xp"><div class="hud-row"><span>XP</span><b>${xp}%</b></div><div class="xp-track"><span style="width:${xp}%"></span></div></div><div class="hud-stat"><span>Today</span><b>${progress}</b></div><div class="hud-stat"><span>Streak</span><b>${streak.replace(' days','d')}</b></div><div class="hud-stat"><span>Clear</span><b>${pct}</b></div></section>`);
    hero.classList.add('quest-progress-panel');
  }

  function decorateMissionCards(root){
    root.querySelectorAll('.mission').forEach((row,i)=>{
      if(row.dataset.gameStyled) return; row.dataset.gameStyled='1'; row.classList.add('quest-row');
      const dot=row.querySelector('.mission-dot');
      if(dot) dot.innerHTML=`<span class="quest-number">${String(i+1).padStart(2,'0')}</span>`;
      const btn=row.querySelector('.btn'); if(btn && /Claim quest|Retry quest/.test(btn.textContent)) btn.classList.add('quest-cta');
    });
    root.querySelectorAll('.award-card').forEach((card,i)=>{
      if(card.querySelector('.award-mascot')) return;
      const kind=mascots[i%mascots.length];
      card.insertAdjacentHTML('afterbegin',`<div class="award-mascot">${svg(kind, i%2?'scarf':'default')}</div>`);
      card.classList.add('quest-card');
    });
  }

  function decorateBadges(root){
    root.querySelectorAll('.badge').forEach((card,i)=>{
      if(card.dataset.gameStyled) return; card.dataset.gameStyled='1';
      const kind=mascots[i%mascots.length];
      const icon=card.querySelector('.badge-icon');
      if(icon){ icon.innerHTML=svg(kind,badgeAccessories[i%badgeAccessories.length]); icon.classList.add('badge-art'); }
      const h=card.querySelector('h3'); if(h) h.insertAdjacentHTML('beforeend',`<span class="badge-animal">${mascotLabel[kind]}</span>`);
    });
  }

  function addProfileMascots(root){
    const save=root.querySelector('#save-profile');
    if(!save || root.querySelector('.mascot-picker')) return;
    const form=save.closest('.form'); if(!form) return;
    const chosen=currentMascot();
    form.insertAdjacentHTML('afterbegin',`<div class="mascot-picker"><div class="picker-copy"><span class="eyebrow">Choose your player</span><p>Pick one of the seven mascots for your profile.</p></div><div class="mascot-options">${mascots.map(m=>`<button type="button" class="mascot-option ${m===chosen?'selected':''}" data-mascot="${m}" aria-label="Choose ${mascotLabel[m]}">${svg(m,'default')}<span>${mascotLabel[m]}</span></button>`).join('')}</div></div>`);
  }

  function decorateStatus(root){
    root.querySelectorAll('.status').forEach(s=>{
      const t=s.textContent.trim().toLowerCase();
      if(t==='verified') s.textContent='Quest cleared';
      if(t==='pending') s.textContent='Under review';
      if(t==='resubmit') s.textContent='Retry required';
      if(t==='rejected') s.textContent='Quest failed';
    });
  }

  function apply(){
    const root=document.getElementById('app'); if(!root) return;
    decorateLogin(root);
    decorateShell(root);
    playerAvatar(root);
    addLobbyHud(root);
    decorateMissionCards(root);
    decorateBadges(root);
    addProfileMascots(root);
    decorateStatus(root);
  }

  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-mascot]');
    if(!b) return;
    localStorage.setItem(KEY,b.dataset.mascot);
    document.querySelectorAll('.mascot-option').forEach(x=>x.classList.toggle('selected',x===b));
    apply();
    document.querySelectorAll('.profile-pill .avatar').forEach(a=>a.innerHTML=svg(b.dataset.mascot,'default'));
  });

  const obs=new MutationObserver(()=>requestAnimationFrame(apply));
  const start=()=>{apply(); obs.observe(document.body,{childList:true,subtree:true});};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();
