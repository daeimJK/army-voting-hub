(() => {
  const cfg = window.APP_CONFIG || {};
  const fallback = window.APP_DATA || { awards: [], missions: [], badges: [] };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v = '') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const state = {
    route: (location.hash || '#today').slice(1),
    user: null,
    profile: null,
    proofs: [],
    awards: fallback.awards || [],
    missions: fallback.missions || [],
    badges: fallback.badges || [],
    authMode: 'signin',
    isStaff: false,
    avatarUrl: null,
    selectedAvatar: null,
  };
  let sb = null;

  const animals = ['rabbit','cat','bear','tiger','koala','squirrel','alpaca'];
  const animalLabels = {rabbit:'Rabbit',cat:'Cat',bear:'Bear',tiger:'Tiger',koala:'Koala',squirrel:'Squirrel',alpaca:'Alpaca'};
  const award = id => state.awards.find(a => a.id === id);
  const mission = id => state.missions.find(m => m.id === id);
  const region = () => state.profile?.region || 'INTL';
  const visibleMissions = () => state.missions.filter(m => m.regions?.includes(region()));

  function cleanDescription(v='') {
    return String(v).replace(/\s*[—–]\s*/g, '. ').replace(/\s+-\s+/g, '. ').replace(/\s{2,}/g, ' ').replace(/\.\s*\./g, '.').trim();
  }

  function dayKey(kind='local') {
    const tz = kind === 'kst' ? 'Asia/Seoul' : kind === 'aedt' ? 'Australia/Sydney' : Intl.DateTimeFormat().resolvedOptions().timeZone;
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year:'numeric', month:'2-digit', day:'2-digit' }).formatToParts(new Date());
    const o = Object.fromEntries(parts.map(p => [p.type,p.value]));
    return `${o.year}-${o.month}-${o.day}`;
  }

  function latestProof(m) {
    if (!m) return null;
    const key = dayKey(m.reset);
    return state.proofs.filter(p => p.mission_id === m.id && p.mission_day === key).sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0] || null;
  }

  function stats() {
    const verified = state.proofs.filter(p => p.status === 'verified');
    const uniqueAwards = new Set(verified.map(p => mission(p.mission_id)?.awardId).filter(Boolean)).size;
    const aaaVotes = verified.filter(p => p.mission_id === 'aaa-vote').reduce((n,p) => n + (Number(p.quantity)||0), 0);
    const byDay = {};
    verified.forEach(p => {
      const m = mission(p.mission_id);
      if (!m) return;
      (byDay[p.mission_day] ??= new Set()).add(m.awardId);
    });
    const maxSameDay = Math.max(0, ...Object.values(byDay).map(s => s.size));
    const days = [...new Set(verified.map(p => p.mission_day))].sort();
    let streak = 0;
    if (days.length) {
      let cursor = new Date(days.at(-1) + 'T12:00:00');
      for (let i=days.length-1; i>=0; i--) {
        const d = new Date(days[i] + 'T12:00:00');
        if (Math.round((cursor-d)/86400000) === 0) { streak++; cursor.setDate(cursor.getDate()-1); }
        else break;
      }
    }
    return { verified: verified.length, uniqueAwards, aaaVotes, maxSameDay, streak };
  }

  function badgeUnlocked(b,s) {
    const r=b.rule||{};
    return !!((r.verified&&s.verified>=r.verified)||(r.streak&&s.streak>=r.streak)||(r.awardsSameDay&&s.maxSameDay>=r.awardsSameDay)||(r.aaaVotes&&s.aaaVotes>=r.aaaVotes)||(r.uniqueAwards&&s.uniqueAwards>=r.uniqueAwards));
  }

  function toast(msg) {
    const root = $('#toast-root');
    if (!root) return;
    const n = document.createElement('div');
    n.className = 'toast';
    n.textContent = msg;
    root.appendChild(n);
    setTimeout(() => n.remove(), 3200);
  }

  function animalSvg(kind='rabbit', accessory='plain', cls='') {
    const palette = {
      rabbit:['#f6dfda','#fff7f0','#e7a5a7','#372d29'],
      cat:['#f0c45c','#171717','#f5d769','#111111'],
      bear:['#ddb36d','#aa6e40','#e5c39c','#2d241f'],
      tiger:['#f4c868','#e98929','#f4dec6','#573825'],
      koala:['#91b2c0','#98a5a8','#c6cfd0','#293033'],
      squirrel:['#e0a25d','#b76c3a','#e5c09b','#34261f'],
      alpaca:['#e0d1b8','#f1e7d7','#e4d4bc','#3a302b']
    }[kind] || ['#f6dfda','#fff7f0','#e7a5a7','#372d29'];
    const [bg,fur,muzzle,dark] = palette;
    let ears = '';
    let extra = '';
    let eyes = `<circle cx="38" cy="49" r="3.2" fill="${dark}"/><circle cx="62" cy="49" r="3.2" fill="${dark}"/>`;
    if (kind==='rabbit') ears='<ellipse cx="35" cy="24" rx="8" ry="20" fill="'+fur+'"/><ellipse cx="65" cy="24" rx="8" ry="20" fill="'+fur+'"/><ellipse cx="35" cy="24" rx="3" ry="13" fill="#e9aaa9"/><ellipse cx="65" cy="24" rx="3" ry="13" fill="#e9aaa9"/>';
    else if (kind==='bear') ears='<circle cx="30" cy="31" r="10" fill="'+fur+'"/><circle cx="70" cy="31" r="10" fill="'+fur+'"/>';
    else if (kind==='koala') ears='<circle cx="26" cy="38" r="16" fill="'+fur+'"/><circle cx="74" cy="38" r="16" fill="'+fur+'"/><circle cx="26" cy="38" r="9" fill="#c8d0d1"/><circle cx="74" cy="38" r="9" fill="#c8d0d1"/>';
    else if (kind==='alpaca') { ears='<ellipse cx="36" cy="22" rx="5" ry="13" fill="'+fur+'"/><ellipse cx="64" cy="22" rx="5" ry="13" fill="'+fur+'"/>'; extra+='<circle cx="34" cy="36" r="11" fill="#faf4e9"/><circle cx="50" cy="31" r="13" fill="#faf4e9"/><circle cx="66" cy="36" r="11" fill="#faf4e9"/>'; }
    else ears='<path d="M24 38 30 14l16 19Z" fill="'+fur+'"/><path d="M76 38 70 14 54 33Z" fill="'+fur+'"/>';
    if (kind==='cat') eyes='<ellipse cx="38" cy="49" rx="8" ry="10" fill="#f6d66c"/><ellipse cx="62" cy="49" rx="8" ry="10" fill="#f6d66c"/><ellipse cx="38" cy="50" rx="2.4" ry="5" fill="#111"/><ellipse cx="62" cy="50" rx="2.4" ry="5" fill="#111"/>';
    if (kind==='tiger') extra+='<path d="M38 31l5 10M50 27v13M62 31l-5 10M28 52l11 4M72 52l-11 4" stroke="#5b3925" stroke-width="4" stroke-linecap="round" fill="none"/>';
    if (kind==='squirrel') extra+='<path d="M75 38c18-18 27 2 16 14-5 5-11 6-15 3 7 6 7 15 2 20" fill="#975833"/>';
    const whisk = kind==='cat' ? '<path d="M31 61 12 57m19 9-20 2m58-7 19-4m-19 9 20 2" stroke="#eee1c5" stroke-width="1.4" stroke-linecap="round"/>' : '';
    const accessorySvg = {
      plain:'',
      starter:'<path d="M28 78Q50 70 72 78" stroke="#d94239" stroke-width="8" stroke-linecap="round"/>',
      headband:'<path d="M27 39Q50 31 73 39" stroke="#d94239" stroke-width="7" stroke-linecap="round"/><path d="M69 39l11 10" stroke="#d94239" stroke-width="5"/>',
      calendar:'<rect x="61" y="68" width="23" height="22" rx="5" fill="#f7efdc" stroke="#d94239" stroke-width="3"/><path d="M65 75h15" stroke="#173a66" stroke-width="3"/>',
      double:'<path d="M31 78 37 66l6 12M57 78l6-12 6 12" fill="#f2c654" stroke="#6d5315" stroke-width="2"/>',
      triple:'<circle cx="35" cy="78" r="5" fill="#f2c654"/><circle cx="50" cy="73" r="5" fill="#f2c654"/><circle cx="65" cy="78" r="5" fill="#f2c654"/>',
      cape:'<path d="M25 73Q50 62 75 73L82 96H18Z" fill="#d94239" opacity=".95"/><path d="M34 74Q50 69 66 74" stroke="#f2c654" stroke-width="4"/>',
      bronze:'<circle cx="70" cy="78" r="10" fill="#b67844" stroke="#684326" stroke-width="2"/><path d="M64 67 68 58h5l4 9" fill="#d94239"/>',
      silver:'<circle cx="70" cy="78" r="10" fill="#d8dde2" stroke="#68717a" stroke-width="2"/><path d="M64 67 68 58h5l4 9" fill="#d94239"/>',
      gold:'<circle cx="70" cy="78" r="10" fill="#f2c654" stroke="#8d6f1f" stroke-width="2"/><path d="M64 67 68 58h5l4 9" fill="#d94239"/>',
      crown:'<path d="M34 27 40 12l10 12 10-12 7 15Z" fill="#f2c654" stroke="#6e5414" stroke-width="2"/>'
    }[accessory] || '';
    return `<svg class="animal-avatar ${cls}" viewBox="0 0 100 100" role="img" aria-label="${animalLabels[kind]}"><rect width="100" height="100" rx="28" fill="${bg}"/><g>${ears}${extra}<ellipse cx="50" cy="57" rx="31" ry="29" fill="${fur}"/><ellipse cx="50" cy="63" rx="17" ry="12" fill="${muzzle}"/>${eyes}<ellipse cx="50" cy="61" rx="4" ry="3.4" fill="${dark}"/><path d="M50 65c-3 5-8 5-12 2m12-2c3 5 8 5 12 2" stroke="${dark}" stroke-width="2" fill="none" stroke-linecap="round"/>${whisk}${accessorySvg}</g></svg>`;
  }

  function badgeLook(name='') {
    const n = name.toLowerCase();
    if (n.includes('first vote')) return ['rabbit','starter'];
    if (n.includes('seven-day')) return ['bear','calendar'];
    if (n.includes('streaker')) return ['squirrel','headband'];
    if (n.includes('double')) return ['tiger','double'];
    if (n.includes('triple')) return ['cat','triple'];
    if (n.includes('full attack')) return ['alpaca','cape'];
    if (n.includes('collector i') && !n.includes('ii')) return ['koala','bronze'];
    if (n.includes('collector ii') && !n.includes('iii')) return ['koala','silver'];
    if (n.includes('collector iii')) return ['koala','gold'];
    if (n.includes('all-rounder')) return ['cat','crown'];
    return ['rabbit','plain'];
  }

  function avatarMarkup(sizeClass='') {
    if (state.profile?.avatar_kind === 'custom' && state.avatarUrl) return `<img class="custom-avatar ${sizeClass}" src="${esc(state.avatarUrl)}" alt="${esc(state.profile.nickname)} profile picture">`;
    return animalSvg(state.profile?.avatar_kind || 'rabbit','plain',sizeClass);
  }

  function nav(route,label,icon) {
    return `<button data-route="${route}" class="nav-btn ${state.route===route?'active':''}"><span class="nav-ico">${icon}</span><span>${label}</span></button>`;
  }

  function shell(content) {
    return `<div class="shell">
      <aside class="side">
        <div class="brand-lockup"><div class="brand-symbol"><i></i><i></i></div><div><div class="brand-kicker">BANGTAN MISSION WORLD</div><div class="brand-name">Bangtan V Warriors</div></div></div>
        <div class="brand-animals">${animals.map(a=>animalSvg(a)).join('')}</div>
        <nav class="nav">${nav('today','Lobby','⌂')}${nav('voting','Missions','▣')}${nav('badges','Badge Vault','☆')}${nav('profile','Player','◯')}${state.isStaff?nav('admin','Control Room','◇'):''}</nav>
        <div class="side-note"><b>Mission note</b><span>Fan made hub. Voting stays on official platforms.</span></div>
      </aside>
      <main class="main">
        <div class="mobile-brand"><div class="brand-symbol"><i></i><i></i></div><div><div class="brand-kicker">BANGTAN MISSION WORLD</div><div class="brand-name">Bangtan V Warriors</div></div></div>
        ${content}
      </main>
      <nav class="mobile-nav">${nav('today','Lobby','⌂')}${nav('voting','Missions','▣')}${nav('badges','Badges','☆')}${nav('profile','Player','◯')}${state.isStaff?nav('admin','Admin','◇'):nav('voting','Info','i')}</nav>
    </div>`;
  }

  function top(title,sub,eyebrow='Bangtan V Warriors') {
    return `<div class="topbar"><div class="topcopy"><div class="eyebrow">${esc(eyebrow)}</div><h1 class="title">${esc(title)}</h1><p class="sub">${esc(sub)}</p></div><button class="profile-pill" data-route="profile">${avatarMarkup('profile-avatar')}<span>${esc(state.profile?.nickname || 'ARMY')}</span></button></div>`;
  }

  function loginView() {
    return `<div class="login-wrap"><section class="login-card"><div class="login-art"><div class="eyebrow">BTS VOTING MISSION WORLD</div><h1>Bangtan V Warriors</h1><p>Vote on official platforms, return with your confirmation, and build your ARMY mission record.</p><div class="login-animals">${animals.map(a=>animalSvg(a)).join('')}</div></div><div class="login-form"><div class="tabs"><button data-auth="signin" class="${state.authMode==='signin'?'active':''}">Sign in</button><button data-auth="signup" class="${state.authMode==='signup'?'active':''}">Create account</button></div><form id="auth-form" class="form">${state.authMode==='signup'?`<div class="field"><label>Nickname</label><input name="nickname" required maxlength="32"></div><div class="field"><label>Region</label><select name="region"><option value="AU">Australia</option><option value="INTL">International</option></select></div>`:''}<div class="field"><label>Email</label><input name="email" type="email" required autocomplete="email"></div><div class="field"><label>Password</label><input name="password" type="password" minlength="8" required autocomplete="${state.authMode==='signup'?'new-password':'current-password'}"></div><button class="btn" type="submit">${state.authMode==='signup'?'Create account':'Sign in'}</button><div class="notice">We never ask for your voting platform passwords.</div></form></div></section></div>`;
  }

  function missionCard(m,index) {
    const a = award(m.awardId);
    const p = latestProof(m);
    const st = p?.status || 'new';
    const action = st==='verified' ? '<span class="status verified">Quest cleared</span>' : st==='pending' ? '<span class="status pending">Under review</span>' : `<button class="btn small" data-proof="${esc(m.id)}">${st==='resubmit'?'Retry quest':'Claim quest'}</button>`;
    return `<article class="mission-card"><div class="mission-step">${String(index+1).padStart(2,'0')}</div><div class="mission-copy"><h3>${esc(m.title)}</h3><p>${esc(cleanDescription(a?.name||''))}</p><div class="mission-meta"><span>${esc((m.reset||'local').toUpperCase())} reset</span></div></div><div class="mission-action">${action}</div></article>`;
  }

  function renderToday() {
    const ms = visibleMissions();
    const done = ms.filter(m => latestProof(m)?.status === 'verified').length;
    const pct = ms.length ? Math.round(done/ms.length*100) : 0;
    const s = stats();
    return shell(`${top('Lobby','Your progress and today’s active voting missions.','Daily mission board')}
      <section class="progress-panel">
        <div class="progress-main"><div class="eyebrow">TODAY’S PROGRESS</div><div class="progress-number">${done}<span> / ${ms.length}</span></div><div class="progress-track"><span style="width:${pct}%"></span></div><p>${pct}% complete today</p></div>
        <div class="progress-stat"><span>Current streak</span><b>${s.streak}</b><small>days</small></div>
        <div class="progress-stat"><span>Verified missions</span><b>${s.verified}</b><small>total</small></div>
      </section>
      <div class="section-head"><div><div class="eyebrow">ACTIVE QUESTS</div><h2 class="section-title">Today’s missions</h2></div><span class="section-count">${ms.length} quests</span></div>
      <section class="mission-route">${ms.length?ms.map(missionCard).join(''):'<div class="empty">No active missions for your region.</div>'}</section>`);
  }

  function renderVoting() {
    const cards = state.awards.map(a => `<article class="award-card"><div class="award-head"><span class="award-code">${esc(a.short)}</span><span class="chip">Open</span></div><h3>${esc(a.name)}</h3><p>${esc(cleanDescription(a.summary||''))}</p><div class="award-actions"><button class="btn secondary small" data-award="${esc(a.id)}">Mission guide</button>${a.links?.[0]?`<a class="btn small" target="_blank" rel="noopener" href="${esc(a.links[0].url)}">Enter quest</a>`:''}</div></article>`).join('');
    return shell(`${top('Missions','Current campaigns, official links and proof requirements.','Voting centre')}<div class="award-grid">${cards}</div>`);
  }

  function renderBadges() {
    const s=stats();
    const cards=state.badges.map(b=>{
      const unlocked=badgeUnlocked(b,s);
      const [animal,accessory]=badgeLook(b.name);
      return `<article class="badge-card ${unlocked?'unlocked':'locked'}"><div class="badge-character">${animalSvg(animal,accessory)}</div><div class="badge-copy"><div class="badge-animal">${esc(animalLabels[animal])}</div><h3>${esc(b.name)}${unlocked?' ✓':''}</h3><p>${esc(cleanDescription(b.description||''))}</p></div></article>`;
    }).join('');
    return shell(`${top('Badge Vault','Your achievement collection, represented by the seven warriors.','Player achievements')}
      <section class="badge-summary"><div><span>Verified missions</span><b>${s.verified}</b></div><div><span>AAA votes</span><b>${s.aaaVotes}</b></div><div><span>Campaigns</span><b>${s.uniqueAwards}</b></div></section>
      <div class="badge-grid">${cards}</div>`);
  }

  function renderProfile() {
    const s=stats();
    const selected = state.selectedAvatar || state.profile.avatar_kind || 'rabbit';
    const avatarOptions = animals.map(a => `<button type="button" class="avatar-option ${selected===a?'selected':''}" data-avatar-choice="${a}">${animalSvg(a)}<span>${animalLabels[a]}</span></button>`).join('');
    const customPreview = state.profile.avatar_kind==='custom' && state.avatarUrl ? `<img src="${esc(state.avatarUrl)}" alt="Current custom profile picture">` : '<span>Upload your own image</span>';
    return shell(`${top('Player','Choose your profile picture and update your account details.','Player profile')}
      <section class="profile-hero"><div class="profile-big-avatar">${avatarMarkup()}</div><div><div class="eyebrow">PLAYER</div><h2>${esc(state.profile.nickname)}</h2><p>${s.verified} verified missions · ${s.streak} day streak</p></div></section>
      <div class="profile-grid">
        <section class="profile-section"><div class="section-head compact"><div><div class="eyebrow">PROFILE PICTURE</div><h2 class="section-title">Choose your warrior</h2></div></div><div class="avatar-options">${avatarOptions}</div><div class="custom-avatar-box"><div class="custom-preview" id="custom-avatar-preview">${customPreview}</div><div><label class="file-label" for="profile-avatar-file">Upload custom picture</label><input id="profile-avatar-file" type="file" accept="image/png,image/jpeg,image/webp"><small>PNG, JPG or WebP. Maximum 3 MB.</small></div></div></section>
        <section class="profile-section"><div class="eyebrow">PROFILE EDIT</div><h2 class="section-title">Edit profile</h2><form id="profile-form" class="form"><input type="hidden" id="avatar-kind" value="${esc(selected)}"><div class="field"><label>Nickname</label><input id="profile-nick" maxlength="32" required value="${esc(state.profile.nickname)}"></div><div class="field"><label>Region</label><select id="profile-region"><option value="AU" ${region()==='AU'?'selected':''}>Australia</option><option value="INTL" ${region()==='INTL'?'selected':''}>International</option></select></div><button class="btn" type="submit">Save profile</button></form><div class="password-block"><div class="eyebrow">SECURITY</div><h3>Change password</h3><form id="password-form" class="form"><div class="field"><label>Current password</label><input id="current-password" type="password" autocomplete="current-password" required></div><div class="field"><label>New password</label><input id="new-password" type="password" minlength="8" autocomplete="new-password" required></div><button class="btn secondary" type="submit">Update password</button></form></div><button class="btn ghost" id="logout" type="button">Sign out</button></section>
      </div>`);
  }

  function renderAdmin() {
    if(!state.isStaff) return renderToday();
    const pending=state.proofs.filter(p=>p.status==='pending');
    const rows=pending.map(p=>`<div class="proof"><div class="proof-head"><div><b>${esc(mission(p.mission_id)?.title||p.mission_id)}</b><div class="muted">${esc(p.mission_day)}${p.quantity?` · ${p.quantity} votes`:''}</div></div><span class="status pending">Pending</span></div>${p.post_url?`<p><a target="_blank" rel="noopener" href="${esc(p.post_url)}">Open submitted X post</a></p>`:''}${p.evidence_path?`<p><button class="btn secondary small" data-evidence="${esc(p.evidence_path)}">Open proof image</button></p>`:''}<div class="proof-actions"><button class="btn small" data-review="verified" data-proofid="${p.id}">Verify</button><button class="btn secondary small" data-review="resubmit" data-proofid="${p.id}">Needs resubmission</button><button class="btn ghost small" data-review="rejected" data-proofid="${p.id}">Reject</button></div></div>`).join('');
    return shell(`${top('Control Room','Review submitted voting confirmations.','Moderator queue')}<section class="profile-section">${rows||'<div class="empty">No pending proofs.</div>'}</section>`);
  }

  function modal(html){
    const x=document.createElement('div'); x.className='modal-back'; x.innerHTML=`<div class="modal"><button class="modal-close" data-close>×</button>${html}</div>`; document.body.appendChild(x);
    x.addEventListener('click',e=>{if(e.target===x||e.target.closest('[data-close]'))x.remove()});
  }

  function awardModal(id){
    const a=award(id); if(!a)return;
    modal(`<div class="eyebrow">${esc(a.short)} MISSION GUIDE</div><h2>${esc(a.name)}</h2><p class="sub">${esc(cleanDescription(a.summary||''))}</p>${a.nominations?.length?`<h3>BTS nominations</h3><ul class="rule-list">${a.nominations.map(x=>`<li>${esc(cleanDescription(x))}</li>`).join('')}</ul>`:''}<h3>Rules</h3><ul class="rule-list">${(a.rules||[]).map(x=>`<li>${esc(cleanDescription(x))}</li>`).join('')}</ul><h3>Proof accepted</h3><p>${esc(cleanDescription(a.proof||''))}</p><div class="link-row">${(a.links||[]).map(l=>`<a class="btn secondary small" target="_blank" rel="noopener" href="${esc(l.url)}">${esc(l.label)}</a>`).join('')}</div>`);
  }

  function proofModal(id){
    const m=mission(id),a=award(m.awardId),old=latestProof(m); if(!m||!a)return;
    modal(`<div class="eyebrow">SUBMIT EVIDENCE</div><h2>${esc(m.title)}</h2><p>${esc(cleanDescription(a.proof||''))}</p><form id="proof-form" class="form" data-mission="${m.id}">${m.kind.includes('image')?`<div class="field"><label>Voting confirmation or certificate</label><input type="file" name="evidence" accept="image/png,image/jpeg,image/webp" ${old?.status==='resubmit'?'':'required'}><small>Crop or cover personal information first. Maximum 5 MB.</small></div>`:''}${m.kind==='url'?`<div class="field"><label>Public X post URL</label><input name="post_url" type="url" required placeholder="https://x.com/..."></div>`:''}${m.kind==='image-quantity'?`<div class="field"><label>Votes cast in this submission</label><input name="quantity" type="number" min="1" step="1" required value="5"></div>`:''}<button class="btn" type="submit">Submit for verification</button></form>`);
  }

  async function loadContent(){
    try{
      const [aw,mi,ba]=await Promise.all([sb.from('awards').select('content').eq('active',true),sb.from('missions').select('content').eq('active',true),sb.from('badge_definitions').select('content').eq('active',true)]);
      if(aw.data?.length)state.awards=aw.data.map(x=>x.content);
      if(mi.data?.length)state.missions=mi.data.map(x=>x.content);
      if(ba.data?.length)state.badges=ba.data.map(x=>x.content);
    }catch{}
  }

  async function loadUser(user){
    const [profileRes,proofRes]=await Promise.all([
      sb.from('profiles').select('*').eq('id',user.id).single(),
      sb.from('proofs').select('*').order('created_at',{ascending:false})
    ]);
    if(profileRes.error)throw profileRes.error;
    if(proofRes.error)throw proofRes.error;
    state.user=user; state.profile=profileRes.data; state.proofs=proofRes.data||[]; state.isStaff=['admin','moderator'].includes(state.profile.role); state.selectedAvatar=state.profile.avatar_kind||'rabbit'; state.avatarUrl=null;
    if(state.profile.avatar_kind==='custom'&&state.profile.avatar_path){
      const {data}=await sb.storage.from('avatars').createSignedUrl(state.profile.avatar_path,3600);
      state.avatarUrl=data?.signedUrl||null;
    }
  }

  async function init(){
    if(!cfg.supabaseUrl||!cfg.supabaseAnonKey||cfg.demoMode||!window.supabase){ $('#app').innerHTML='<div class="loading-screen">Configuration incomplete.</div>'; return; }
    sb=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
    const {data:{session}}=await sb.auth.getSession();
    if(session?.user) await loadUser(session.user);
    render();
    loadContent().then(()=>{ if(state.user) render(); });
    sb.auth.onAuthStateChange((_event,session)=>{
      setTimeout(async()=>{
        if(session?.user){ if(!state.user||state.user.id!==session.user.id) await loadUser(session.user); }
        else { state.user=null; state.profile=null; state.proofs=[]; state.avatarUrl=null; state.isStaff=false; }
        render();
      },0);
    });
  }

  async function authSubmit(form){
    const fd=new FormData(form),email=fd.get('email'),password=fd.get('password');
    if(state.authMode==='signup'){
      const {error,data}=await sb.auth.signUp({email,password,options:{data:{nickname:fd.get('nickname'),region:fd.get('region')}}});
      if(error)return toast(error.message); toast(data.session?'Account created.':'Check your email to confirm your account.');
    }else{ const {error}=await sb.auth.signInWithPassword({email,password}); if(error)return toast(error.message); }
  }

  async function submitProof(form){
    const fd=new FormData(form),mid=form.dataset.mission,m=mission(mid),existing=latestProof(m),file=fd.get('evidence');
    if(file?.size>5*1024*1024)return toast('Please keep proof images under 5 MB.');
    const payload={user_id:state.user.id,mission_id:mid,mission_day:dayKey(m.reset),quantity:Number(fd.get('quantity')||0)||null,post_url:fd.get('post_url')||null,status:'pending'};
    let path=existing?.evidence_path||null;
    if(file&&file.size){ path=`${state.user.id}/${mid}/${payload.mission_day}-${Date.now()}.${(file.name.split('.').pop()||'jpg').toLowerCase()}`; const {error}=await sb.storage.from(cfg.proofBucket||'proofs').upload(path,file,{upsert:false}); if(error)return toast(error.message); }
    payload.evidence_path=path;
    const result=existing?.status==='resubmit' ? await sb.from('proofs').update({...payload,review_note:null,reviewed_at:null,reviewed_by:null,updated_at:new Date().toISOString()}).eq('id',existing.id) : await sb.from('proofs').insert(payload);
    if(result.error)return toast(result.error.message); $('.modal-back')?.remove(); await loadUser(state.user); toast('Proof submitted for review.'); render();
  }

  async function reviewProof(id,status){ const {error}=await sb.rpc('review_proof',{proof_id:id,new_status:status,note:null}); if(error)return toast(error.message); await loadUser(state.user); toast(status==='verified'?'Proof verified.':'Proof updated.'); render(); }
  async function openEvidence(path){ const {data,error}=await sb.storage.from(cfg.proofBucket||'proofs').createSignedUrl(path,120); if(error)return toast(error.message); window.open(data.signedUrl,'_blank','noopener'); }

  async function saveProfile(){
    const nickname=$('#profile-nick').value.trim(),newRegion=$('#profile-region').value,chosen=$('#avatar-kind').value;
    if(!nickname)return toast('Nickname is required.');
    const file=$('#profile-avatar-file')?.files?.[0];
    let avatarKind=chosen,avatarPath=state.profile.avatar_path||null;
    if(file&&file.size){
      if(file.size>3*1024*1024)return toast('Please keep profile pictures under 3 MB.');
      const ext=(file.name.split('.').pop()||'jpg').toLowerCase(); avatarPath=`${state.user.id}/avatar.${ext}`;
      const {error}=await sb.storage.from('avatars').upload(avatarPath,file,{upsert:true,contentType:file.type}); if(error)return toast(error.message);
      avatarKind='custom';
    } else if(chosen!=='custom') {
      if(state.profile.avatar_path) await sb.storage.from('avatars').remove([state.profile.avatar_path]);
      avatarPath=null;
    }
    const {error}=await sb.from('profiles').update({nickname,region:newRegion,avatar_kind:avatarKind,avatar_path:avatarPath}).eq('id',state.user.id);
    if(error)return toast(error.message);
    await loadUser(state.user); toast('Profile saved.'); render();
  }

  async function changePassword(){
    const current=$('#current-password').value,newPassword=$('#new-password').value;
    if(newPassword.length<8)return toast('New password must be at least 8 characters.');
    const {error}=await sb.auth.updateUser({password:newPassword,current_password:current});
    if(error)return toast(error.message); toast('Password updated.'); $('#password-form').reset();
  }

  async function logout(){ await sb.auth.signOut(); }

  function render(){
    if(!state.user){ $('#app').innerHTML=loginView(); return; }
    if(state.route==='voting')$('#app').innerHTML=renderVoting();
    else if(state.route==='badges')$('#app').innerHTML=renderBadges();
    else if(state.route==='profile')$('#app').innerHTML=renderProfile();
    else if(state.route==='admin')$('#app').innerHTML=renderAdmin();
    else $('#app').innerHTML=renderToday();
  }

  document.addEventListener('click',e=>{
    const r=e.target.closest('[data-route]'); if(r){state.route=r.dataset.route;location.hash=state.route;render();return;}
    const a=e.target.closest('[data-award]'); if(a){awardModal(a.dataset.award);return;}
    const p=e.target.closest('[data-proof]'); if(p){proofModal(p.dataset.proof);return;}
    const au=e.target.closest('[data-auth]'); if(au){state.authMode=au.dataset.auth;render();return;}
    const rv=e.target.closest('[data-review]'); if(rv){reviewProof(rv.dataset.proofid,rv.dataset.review);return;}
    const ev=e.target.closest('[data-evidence]'); if(ev){openEvidence(ev.dataset.evidence);return;}
    const av=e.target.closest('[data-avatar-choice]'); if(av){state.selectedAvatar=av.dataset.avatarChoice; const h=$('#avatar-kind'); if(h)h.value=state.selectedAvatar; $$('.avatar-option').forEach(x=>x.classList.toggle('selected',x.dataset.avatarChoice===state.selectedAvatar)); return;}
    if(e.target.closest('#logout'))logout();
  });

  document.addEventListener('change',e=>{
    if(e.target.id==='profile-avatar-file'&&e.target.files?.[0]){
      const file=e.target.files[0]; if(file.size>3*1024*1024){toast('Please keep profile pictures under 3 MB.');e.target.value='';return;}
      const url=URL.createObjectURL(file); const preview=$('#custom-avatar-preview'); if(preview){preview.innerHTML=`<img src="${url}" alt="Custom profile picture preview">`;}
      const h=$('#avatar-kind'); if(h)h.value='custom'; state.selectedAvatar='custom'; $$('.avatar-option').forEach(x=>x.classList.remove('selected'));
    }
  });

  document.addEventListener('submit',e=>{
    if(e.target.id==='auth-form'){e.preventDefault();authSubmit(e.target);}
    if(e.target.id==='proof-form'){e.preventDefault();submitProof(e.target);}
    if(e.target.id==='profile-form'){e.preventDefault();saveProfile();}
    if(e.target.id==='password-form'){e.preventDefault();changePassword();}
  });

  window.addEventListener('hashchange',()=>{state.route=(location.hash||'#today').slice(1);render();});
  init().catch(err=>{console.error(err);toast('The app could not connect to the backend.');$('#app').innerHTML='<div class="loading-screen">The app could not connect. Please refresh.</div>';});
})();