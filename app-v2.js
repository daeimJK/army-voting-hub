(() => {
  const cfg = window.APP_CONFIG || {};
  const fallback = window.APP_DATA || { awards: [], missions: [], badges: [] };
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (v = '') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const state = {
    route: (location.hash || '#today').slice(1),
    user: null,
    profile: null,
    proofs: [],
    awards: fallback.awards,
    missions: fallback.missions,
    badges: fallback.badges,
    authMode: 'signin',
    isStaff: false,
  };
  let sb = null;

  const award = id => state.awards.find(a => a.id === id);
  const mission = id => state.missions.find(m => m.id === id);
  const region = () => state.profile?.region || 'INTL';
  const visibleMissions = () => state.missions.filter(m => m.regions?.includes(region()));

  function dayKey(kind = 'local') {
    const tz = kind === 'kst' ? 'Asia/Seoul' : kind === 'aedt' ? 'Australia/Sydney' : Intl.DateTimeFormat().resolvedOptions().timeZone;
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const o = Object.fromEntries(parts.map(p => [p.type, p.value]));
    return `${o.year}-${o.month}-${o.day}`;
  }

  function latestProof(m) {
    const key = dayKey(m.reset);
    return state.proofs.filter(p => p.mission_id === m.id && p.mission_day === key)
      .sort((a,b) => new Date(b.created_at) - new Date(a.created_at))[0];
  }

  function toast(msg) {
    const n = document.createElement('div');
    n.className = 'toast';
    n.textContent = msg;
    $('#toast-root')?.appendChild(n);
    setTimeout(() => n.remove(), 3000);
  }

  function stats() {
    const verified = state.proofs.filter(p => p.status === 'verified');
    const uniqueAwards = new Set(verified.map(p => mission(p.mission_id)?.awardId).filter(Boolean)).size;
    const aaaVotes = verified.filter(p => p.mission_id === 'aaa-vote').reduce((n,p) => n + (Number(p.quantity) || 0), 0);
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
      for (let i = days.length - 1; i >= 0; i--) {
        const d = new Date(days[i] + 'T12:00:00');
        if (Math.round((cursor - d) / 86400000) === 0) {
          streak++;
          cursor.setDate(cursor.getDate() - 1);
        } else break;
      }
    }
    return { verified: verified.length, uniqueAwards, aaaVotes, maxSameDay, streak };
  }

  function badgeUnlocked(b, s) {
    const r = b.rule || {};
    return !!(
      (r.verified && s.verified >= r.verified) ||
      (r.streak && s.streak >= r.streak) ||
      (r.awardsSameDay && s.maxSameDay >= r.awardsSameDay) ||
      (r.aaaVotes && s.aaaVotes >= r.aaaVotes) ||
      (r.uniqueAwards && s.uniqueAwards >= r.uniqueAwards)
    );
  }

  function nav(route, label) {
    return `<button data-route="${route}" class="${state.route === route ? 'active' : ''}">${label}</button>`;
  }

  function shell(content) {
    return `<div class="shell">
      <aside class="side">
        <div class="brand"><div class="brand-mark">V</div><div><b>ARMY Voting Hub</b><small>Voting passport</small></div></div>
        <nav class="nav">${nav('today','Today')}${nav('voting','Voting info')}${nav('badges','Credentials')}${nav('profile','Profile')}${state.isStaff ? nav('admin','Admin') : ''}</nav>
        <div class="side-foot">Unofficial fan coordination hub.<br>Always follow official voting rules.</div>
      </aside>
      <main class="main">${content}</main>
      <nav class="mobile-nav">${nav('today','Today')}${nav('voting','Voting')}${nav('badges','Badges')}${nav('profile','Profile')}${state.isStaff ? nav('admin','Admin') : nav('voting','Info')}</nav>
    </div>`;
  }

  function top(title, sub, eyebrow = 'ARMY Voting Hub') {
    const initial = (state.profile?.nickname || 'A').slice(0,1).toUpperCase();
    return `<div class="topbar"><div><div class="eyebrow">${esc(eyebrow)}</div><h1 class="title">${esc(title)}</h1><div class="sub">${esc(sub)}</div></div><button class="profile-pill" data-route="profile"><span class="avatar">${esc(initial)}</span><span>${esc(state.profile?.nickname || 'ARMY')}</span></button></div>`;
  }

  function loginView() {
    return `<div class="login-wrap"><section class="login-card">
      <div class="login-art"><div class="eyebrow">Voting passport</div><h1>One place for today’s ARMY voting missions.</h1><p>Vote on official platforms, return with the confirmation screen, and build a verified record of participation.</p></div>
      <div class="login-form">
        <div class="tabs"><button data-auth="signin" class="${state.authMode==='signin'?'active':''}">Sign in</button><button data-auth="signup" class="${state.authMode==='signup'?'active':''}">Create account</button></div>
        <form id="auth-form" class="form">
          ${state.authMode==='signup' ? `<div class="field"><label>Nickname</label><input name="nickname" required maxlength="32"></div><div class="field"><label>Voting region</label><select name="region"><option value="AU">Australia</option><option value="INTL">International</option></select></div>` : ''}
          <div class="field"><label>Email</label><input name="email" type="email" required autocomplete="email"></div>
          <div class="field"><label>Password</label><input name="password" type="password" minlength="8" required autocomplete="${state.authMode==='signup'?'new-password':'current-password'}"></div>
          <button class="btn" type="submit">${state.authMode==='signup'?'Create account':'Sign in'}</button>
          <div class="notice">We never ask for your Mnet Plus, X, Spotify, IDOLCHAMP or Nickelodeon password.</div>
        </form>
      </div>
    </section></div>`;
  }

  function renderToday() {
    const ms = visibleMissions();
    const done = ms.filter(m => latestProof(m)?.status === 'verified').length;
    const pct = ms.length ? Math.round(done / ms.length * 100) : 0;
    const s = stats();
    const rows = ms.map(m => {
      const a = award(m.awardId);
      const p = latestProof(m);
      const st = p?.status || 'new';
      return `<div class="mission"><div class="mission-dot">${esc(a?.short || '')}</div><div><h3>${esc(m.title)}</h3><p>${esc(a?.name || '')} · resets ${esc((m.reset||'local').toUpperCase())}</p></div>${st==='verified'?'<span class="status verified">Verified</span>':st==='pending'?'<span class="status pending">Pending review</span>':`<button class="btn small" data-proof="${m.id}">${st==='resubmit'?'Resubmit proof':'Submit proof'}</button>`}</div>`;
    }).join('');
    return shell(`${top('Today’s missions','Complete what you can. One verified contribution still counts.','Daily mission board')}
      <div class="grid grid-3"><section class="card hero" style="grid-column:span 2"><div class="progress-row"><div><div class="eyebrow">Daily progress</div><div class="metric">${done}/${ms.length}</div></div><div class="metric">${pct}%</div></div><div class="progress"><span style="width:${pct}%"></span></div><p class="muted">Verified missions count toward your streak and credentials.</p></section><section class="card"><div class="eyebrow">Current streak</div><div class="metric">${s.streak} days</div><p class="muted">At least one verified mission per day.</p></section></div>
      <h2 class="section-title">Your mission board</h2><section class="card">${rows || '<div class="empty">No active missions for your region.</div>'}</section>`);
  }

  function renderVoting() {
    const cards = state.awards.map(a => `<article class="card award-card"><div class="award-top"><span class="award-code">${esc(a.short)}</span><span class="chip">Open</span></div><h3>${esc(a.name)}</h3><p>${esc(a.summary)}</p><div class="award-actions"><button class="btn secondary small" data-award="${a.id}">Rules & guide</button>${a.links?.[0]?`<a class="btn small" target="_blank" rel="noopener" href="${esc(a.links[0].url)}">Official vote</a>`:''}</div></article>`).join('');
    return shell(`${top('Voting information','Current campaigns, rules, official links and proof requirements.','Voting centre')}<div class="grid grid-2">${cards}</div>`);
  }

  function renderBadges() {
    const s = stats();
    const cards = state.badges.map(b => { const u = badgeUnlocked(b,s); return `<article class="badge ${u?'':'locked'}"><div class="badge-icon">${esc(b.icon)}</div><h3>${esc(b.name)} ${u?'✓':''}</h3><p>${esc(b.description)}</p></article>`; }).join('');
    return shell(`${top('Digital credentials','Badges recognise participation, consistency and verified contribution.','Voting passport')}<div class="grid grid-3"><div class="card"><div class="eyebrow">Verified missions</div><div class="metric">${s.verified}</div></div><div class="card"><div class="eyebrow">AAA verified votes</div><div class="metric">${s.aaaVotes}</div></div><div class="card"><div class="eyebrow">Campaigns supported</div><div class="metric">${s.uniqueAwards}/4</div></div></div><h2 class="section-title">Credential collection</h2><div class="badge-grid">${cards}</div>`);
  }

  function renderProfile() {
    const s = stats();
    const rows = state.proofs.map(p => `<tr><td>${esc(mission(p.mission_id)?.title || p.mission_id)}</td><td>${esc(p.mission_day)}</td><td><span class="status ${esc(p.status)}">${esc(p.status)}</span></td><td>${p.quantity || '—'}</td></tr>`).join('');
    return shell(`${top(state.profile.nickname,'Your voting passport and account settings.','Profile')}<div class="grid grid-2"><section class="card"><div class="form"><div class="field"><label>Nickname</label><input id="profile-nick" maxlength="32" value="${esc(state.profile.nickname)}"></div><div class="field"><label>Voting region</label><select id="profile-region"><option value="AU" ${region()==='AU'?'selected':''}>Australia</option><option value="INTL" ${region()==='INTL'?'selected':''}>International</option></select></div><button class="btn" id="save-profile">Save profile</button><button class="btn ghost" id="logout">Sign out</button></div></section><section class="card"><div class="eyebrow">Passport summary</div><div class="metric">${s.verified} verified</div><p class="muted">${s.streak}-day streak · ${s.uniqueAwards} campaigns · ${s.aaaVotes} AAA votes</p><div class="notice">Crop or cover usernames, emails and other personal information before uploading proof.</div></section></div><h2 class="section-title">Submission history</h2><div class="card" style="overflow:auto"><table class="table"><thead><tr><th>Mission</th><th>Day</th><th>Status</th><th>Qty</th></tr></thead><tbody>${rows || '<tr><td colspan="4">No submissions yet.</td></tr>'}</tbody></table></div>`);
  }

  function renderAdmin() {
    if (!state.isStaff) return renderToday();
    const pending = state.proofs.filter(p => p.status === 'pending');
    const rows = pending.map(p => `<div class="proof"><div class="proof-head"><div><b>${esc(mission(p.mission_id)?.title || p.mission_id)}</b><div class="muted">${esc(p.user_id)} · ${esc(p.mission_day)} ${p.quantity?`· ${p.quantity} votes`:''}</div></div><span class="status pending">Pending</span></div>${p.post_url?`<p><a target="_blank" rel="noopener" href="${esc(p.post_url)}">Open submitted X post</a></p>`:''}${p.evidence_path?`<p><button class="btn secondary small" data-evidence="${esc(p.evidence_path)}">Open proof image</button></p>`:''}<div class="proof-actions"><button class="btn small" data-review="verified" data-proofid="${p.id}">Verify</button><button class="btn secondary small" data-review="resubmit" data-proofid="${p.id}">Needs resubmission</button><button class="btn ghost small" data-review="rejected" data-proofid="${p.id}">Reject</button></div></div>`).join('');
    return shell(`${top('Moderator queue','Review submitted voting confirmations.','Admin')}<section class="card"><div class="proof-list">${rows || '<div class="empty">No pending proofs.</div>'}</div></section>`);
  }

  function modal(html) {
    const x = document.createElement('div');
    x.className = 'modal-back';
    x.innerHTML = `<div class="modal"><button class="btn ghost small" data-close style="float:right">Close</button>${html}</div>`;
    document.body.appendChild(x);
    x.addEventListener('click', e => { if (e.target === x || e.target.closest('[data-close]')) x.remove(); });
  }

  function awardModal(id) {
    const a = award(id); if (!a) return;
    modal(`<div class="eyebrow">${esc(a.short)} voting guide</div><h2>${esc(a.name)}</h2><p class="sub">${esc(a.summary)}</p>${a.nominations?.length?`<h3>BTS nominations</h3><ul class="rule-list">${a.nominations.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}<h3>Rules</h3><ul class="rule-list">${(a.rules||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${a.hashtags?.length?`<h3>Hashtags</h3><div class="link-row">${a.hashtags.map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div>`:''}<h3>Proof accepted</h3><p class="muted">${esc(a.proof)}</p><div class="link-row">${(a.links||[]).map(l=>`<a class="btn secondary small" target="_blank" rel="noopener" href="${esc(l.url)}">${esc(l.label)}</a>`).join('')}</div>`);
  }

  function proofModal(id) {
    const m = mission(id), a = award(m.awardId), old = latestProof(m);
    modal(`<div class="eyebrow">Submit evidence</div><h2>${esc(m.title)}</h2><p class="muted">${esc(a.proof)}</p><form id="proof-form" class="form" data-mission="${m.id}">${m.kind.includes('image')?`<div class="field"><label>Voting confirmation / certificate</label><input type="file" name="evidence" accept="image/png,image/jpeg,image/webp" ${old?.status==='resubmit'?'':'required'}><small class="muted">Crop or cover personal information first. Max 5 MB.</small></div>`:''}${m.kind==='url'?`<div class="field"><label>Public X post URL</label><input name="post_url" type="url" required placeholder="https://x.com/..."></div>`:''}${m.kind==='image-quantity'?`<div class="field"><label>Votes cast in this submission</label><input name="quantity" type="number" min="1" step="1" required value="5"></div>`:''}<button class="btn" type="submit">Submit for verification</button></form>`);
  }

  async function loadContent() {
    const [aw, mi, ba] = await Promise.all([
      sb.from('awards').select('content').eq('active', true),
      sb.from('missions').select('content').eq('active', true),
      sb.from('badge_definitions').select('content').eq('active', true),
    ]);
    if (aw.data?.length) state.awards = aw.data.map(x => x.content);
    if (mi.data?.length) state.missions = mi.data.map(x => x.content);
    if (ba.data?.length) state.badges = ba.data.map(x => x.content);
  }

  async function loadUser(user) {
    const { data: profile, error: pe } = await sb.from('profiles').select('*').eq('id', user.id).single();
    if (pe) throw pe;
    state.user = user;
    state.profile = profile;
    state.isStaff = ['admin','moderator'].includes(profile.role);
    const { data: proofs, error } = await sb.from('proofs').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    state.proofs = proofs || [];
  }

  async function init() {
    if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || cfg.demoMode || !window.supabase) {
      $('#app').innerHTML = '<div class="login-wrap"><section class="card"><h2>Configuration incomplete</h2><p>Supabase production configuration is required.</p></section></div>';
      return;
    }
    sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    await loadContent();
    const { data: { session } } = await sb.auth.getSession();
    if (session?.user) await loadUser(session.user);
    sb.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) await loadUser(session.user); else { state.user = null; state.profile = null; state.proofs = []; state.isStaff = false; }
      render();
    });
    render();
  }

  async function authSubmit(form) {
    const fd = new FormData(form), email = fd.get('email'), password = fd.get('password');
    if (state.authMode === 'signup') {
      const { error, data } = await sb.auth.signUp({ email, password, options: { data: { nickname: fd.get('nickname'), region: fd.get('region') } } });
      if (error) return toast(error.message);
      toast(data.session ? 'Account created.' : 'Check your email to confirm your account.');
    } else {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) return toast(error.message);
    }
  }

  async function submitProof(form) {
    const fd = new FormData(form), mid = form.dataset.mission, m = mission(mid), existing = latestProof(m);
    const file = fd.get('evidence');
    if (file?.size > 5 * 1024 * 1024) return toast('Please keep proof images under 5 MB.');
    const payload = {
      user_id: state.user.id,
      mission_id: mid,
      mission_day: dayKey(m.reset),
      quantity: Number(fd.get('quantity') || 0) || null,
      post_url: fd.get('post_url') || null,
      status: 'pending'
    };
    let path = existing?.evidence_path || null;
    if (file && file.size) {
      path = `${state.user.id}/${mid}/${payload.mission_day}-${Date.now()}.${(file.name.split('.').pop() || 'jpg').toLowerCase()}`;
      const { error } = await sb.storage.from(cfg.proofBucket || 'proofs').upload(path, file, { upsert: false });
      if (error) return toast(error.message);
    }
    payload.evidence_path = path;
    if (existing?.status === 'resubmit') {
      const { error } = await sb.from('proofs').update({ ...payload, review_note: null, reviewed_at: null, reviewed_by: null, updated_at: new Date().toISOString() }).eq('id', existing.id);
      if (error) return toast(error.message);
    } else {
      const { error } = await sb.from('proofs').insert(payload);
      if (error) return toast(error.message);
    }
    $('.modal-back')?.remove();
    await loadUser(state.user);
    toast('Proof submitted for review.');
    render();
  }

  async function reviewProof(id, status) {
    const { error } = await sb.rpc('review_proof', { proof_id: id, new_status: status, note: null });
    if (error) return toast(error.message);
    await loadUser(state.user);
    toast(status === 'verified' ? 'Proof verified.' : 'Proof updated.');
    render();
  }

  async function openEvidence(path) {
    const { data, error } = await sb.storage.from(cfg.proofBucket || 'proofs').createSignedUrl(path, 120);
    if (error) return toast(error.message);
    window.open(data.signedUrl, '_blank', 'noopener');
  }

  async function saveProfile() {
    const nickname = $('#profile-nick').value.trim(), newRegion = $('#profile-region').value;
    if (!nickname) return toast('Nickname is required.');
    const { error } = await sb.from('profiles').update({ nickname, region: newRegion }).eq('id', state.user.id);
    if (error) return toast(error.message);
    state.profile.nickname = nickname; state.profile.region = newRegion;
    toast('Profile saved.'); render();
  }

  async function logout() { await sb.auth.signOut(); }

  function render() {
    if (!state.user) { $('#app').innerHTML = loginView(); return; }
    if (state.route === 'voting') $('#app').innerHTML = renderVoting();
    else if (state.route === 'badges') $('#app').innerHTML = renderBadges();
    else if (state.route === 'profile') $('#app').innerHTML = renderProfile();
    else if (state.route === 'admin') $('#app').innerHTML = renderAdmin();
    else $('#app').innerHTML = renderToday();
  }

  document.addEventListener('click', e => {
    const r = e.target.closest('[data-route]'); if (r) { state.route = r.dataset.route; location.hash = state.route; render(); }
    const a = e.target.closest('[data-award]'); if (a) awardModal(a.dataset.award);
    const p = e.target.closest('[data-proof]'); if (p) proofModal(p.dataset.proof);
    const au = e.target.closest('[data-auth]'); if (au) { state.authMode = au.dataset.auth; render(); }
    const rv = e.target.closest('[data-review]'); if (rv) reviewProof(rv.dataset.proofid, rv.dataset.review);
    const ev = e.target.closest('[data-evidence]'); if (ev) openEvidence(ev.dataset.evidence);
    if (e.target.closest('#save-profile')) saveProfile();
    if (e.target.closest('#logout')) logout();
  });

  document.addEventListener('submit', e => {
    if (e.target.id === 'auth-form') { e.preventDefault(); authSubmit(e.target); }
    if (e.target.id === 'proof-form') { e.preventDefault(); submitProof(e.target); }
  });

  window.addEventListener('hashchange', () => { state.route = (location.hash || '#today').slice(1); render(); });
  init().catch(err => { console.error(err); toast('The app could not connect to the backend.'); render(); });
})();