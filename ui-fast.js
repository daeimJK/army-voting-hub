(() => {
  const APP = document.getElementById('app');
  const TOASTS = document.getElementById('toast-root');
  if (!APP) return;

  const ANIMALS = ['rabbit','cat','bear','tiger','koala','squirrel','alpaca'];
  const COLORS = {
    rabbit:['#f8d8d8','#fff7f2','#d99a9d'],
    cat:['#f3c655','#171717','#f7d86a'],
    bear:['#e1b66b','#a76b3e','#e6c59d'],
    tiger:['#f7c96a','#eb8928','#5b3925'],
    koala:['#93b6c8','#9ca9ab','#2b3234'],
    squirrel:['#e3a15e','#b66a39','#e7c19c'],
    alpaca:['#e0d1ba','#f2e8d8','#e4d4bd']
  };
  const labels = {rabbit:'Rabbit',cat:'Cat',bear:'Bear',tiger:'Tiger',koala:'Koala',squirrel:'Squirrel',alpaca:'Alpaca'};
  const navIcons = {
    today:'<svg viewBox="0 0 24 24"><path d="M4 19V9l8-5 8 5v10h-5v-6H9v6Z"/></svg>',
    voting:'<svg viewBox="0 0 24 24"><path d="M6 4h12v16H6zM9 8h6M9 12h6M9 16h4"/></svg>',
    badges:'<svg viewBox="0 0 24 24"><path d="M12 3 15 8l6 1-4 4 .8 6L12 16l-5.8 3L7 13 3 9l6-1Z"/></svg>',
    profile:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M5 20c1-4 3.5-6 7-6s6 2 7 6"/></svg>',
    admin:'<svg viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6Z"/></svg>'
  };
  const positions = [[15,76],[30,53],[46,72],[60,45],[77,28],[62,17],[31,20]];
  let scheduled = false;
  let decorating = false;

  function animalSvg(kind, cls='') {
    const [bg,fur,accent] = COLORS[kind] || COLORS.rabbit;
    let ears = '';
    let extras = '';
    let eyes = '<circle cx="21" cy="27" r="2.2"/><circle cx="35" cy="27" r="2.2"/>';
    if (kind === 'rabbit') ears = '<ellipse cx="20" cy="12" rx="5" ry="11"/><ellipse cx="36" cy="12" rx="5" ry="11"/><ellipse cx="20" cy="12" rx="2" ry="7" fill="#e8a5aa"/><ellipse cx="36" cy="12" rx="2" ry="7" fill="#e8a5aa"/>';
    else if (kind === 'bear') ears = '<circle cx="18" cy="18" r="6"/><circle cx="38" cy="18" r="6"/>';
    else if (kind === 'koala') ears = '<circle cx="15" cy="23" r="9"/><circle cx="41" cy="23" r="9"/><circle cx="15" cy="23" r="5" fill="#c5cfd0"/><circle cx="41" cy="23" r="5" fill="#c5cfd0"/>';
    else if (kind === 'alpaca') { ears = '<ellipse cx="21" cy="11" rx="4" ry="9"/><ellipse cx="35" cy="11" rx="4" ry="9"/>'; extras += '<circle cx="18" cy="21" r="6" fill="#faf4ea"/><circle cx="28" cy="18" r="7" fill="#faf4ea"/><circle cx="38" cy="21" r="6" fill="#faf4ea"/>'; }
    else ears = '<path d="M13 22 18 9l9 11ZM43 22 38 9l-9 11Z"/>';
    if (kind === 'cat') eyes = '<ellipse cx="21" cy="27" rx="4" ry="5" fill="#f6d76b"/><ellipse cx="35" cy="27" rx="4" ry="5" fill="#f6d76b"/><ellipse cx="21" cy="27" rx="1.2" ry="2.8" fill="#111"/><ellipse cx="35" cy="27" rx="1.2" ry="2.8" fill="#111"/>';
    if (kind === 'tiger') extras += '<path d="M20 17l2 5M28 15v7M36 17l-2 5" stroke="#5b3925" stroke-width="2" stroke-linecap="round" fill="none"/>';
    if (kind === 'squirrel') extras += '<path d="M41 19c9-7 13 4 7 9-3 3-6 3-8 2 4 3 5 7 2 10" fill="#96552f"/>';
    const muzzle = kind==='cat' ? '#c7925d' : kind==='koala' ? '#adb8bb' : kind==='tiger' ? '#f3dec8' : kind==='squirrel' ? '#e8c29e' : accent;
    return `<svg class="fast-animal ${cls}" viewBox="0 0 56 56" role="img" aria-label="${labels[kind]}"><rect width="56" height="56" rx="18" fill="${bg}"/><g fill="${fur}">${ears}${extras}<ellipse cx="28" cy="31" rx="16" ry="14"/></g><ellipse cx="28" cy="34" rx="8.5" ry="6.4" fill="${muzzle}"/><g fill="${kind==='cat'?'#111':'#28211d'}">${eyes}<ellipse cx="28" cy="32.5" rx="2.4" ry="2"/></g><path d="M28 35c-2.2 2.5-5 2.7-7 1.4m7-1.4c2.2 2.5 5 2.7 7 1.4" stroke="${kind==='cat'?'#eee0c3':'#332824'}" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>`;
  }

  function replaceLeafText(from, to) {
    APP.querySelectorAll('button,a,span,h1,h2,h3,p').forEach(el => {
      if (!el.children.length && el.textContent.trim() === from) el.textContent = to;
    });
  }

  function decorateBrand() {
    const brand = APP.querySelector('.brand');
    if (!brand || brand.dataset.fast) return;
    brand.dataset.fast = '1';
    brand.innerHTML = `<div class="fast-brand"><div class="fast-brand-head"><div class="fast-mark"><i></i><i></i></div><div><span>BANGTAN MISSION WORLD</span><b>Bangtan V Warriors</b></div></div><div class="fast-brand-animals">${ANIMALS.map(a=>animalSvg(a)).join('')}</div></div>`;
    const foot = APP.querySelector('.side-foot');
    if (foot) foot.innerHTML = '<strong>Mission note</strong><span>Fan-made hub. Voting stays on official platforms.</span>';
  }

  function decorateShell() {
    decorateBrand();
    [['Today','Lobby'],['Voting info','Missions'],['Voting','Missions'],['Credentials','Badge Vault'],['Badges','Badge Vault'],['Profile','Player'],['Admin','Control Room'],['Official vote','Enter quest'],['Rules & guide','Mission guide'],['Submit proof','Claim quest'],['Resubmit proof','Retry quest'],['Verified','Quest cleared'],['Pending review','Under review'],['Save profile','Save player'],['Sign out','Leave lobby']].forEach(([a,b])=>replaceLeafText(a,b));
    const title = APP.querySelector('.title');
    if (title) {
      const map = {'Today’s missions':'Mission Map','Voting information':'Active Missions','Digital credentials':'Badge Vault','Moderator queue':'Control Room'};
      if (map[title.textContent.trim()]) title.textContent = map[title.textContent.trim()];
    }
  }

  function decorateLogin() {
    const art = APP.querySelector('.login-art');
    if (!art || art.dataset.fast) return;
    art.dataset.fast = '1';
    art.innerHTML = `<div class="fast-login-kicker">BTS voting mission world</div><h1>Bangtan V Warriors</h1><p>Complete today’s voting quests on official platforms and build your ARMY mission record.</p><div class="fast-login-animals">${ANIMALS.map(a=>animalSvg(a)).join('')}</div>`;
  }

  function decorateMobileBrand() {
    const main = APP.querySelector('.main');
    if (!main || main.querySelector('.fast-mobile-brand')) return;
    main.insertAdjacentHTML('afterbegin', `<div class="fast-mobile-brand"><div class="fast-mark"><i></i><i></i></div><div><b>Bangtan V Warriors</b><span>mission world</span></div></div>`);
  }

  function decorateNav() {
    APP.querySelectorAll('.mobile-nav button').forEach(btn => {
      if (btn.dataset.fast) return;
      btn.dataset.fast = '1';
      const route = btn.dataset.route || 'voting';
      const label = btn.textContent.trim();
      btn.innerHTML = `<span class="fast-nav-icon">${navIcons[route] || navIcons.voting}</span><span class="fast-nav-label">${label}</span>`;
    });
  }

  function addHud() {
    const title = APP.querySelector('.title');
    if (!title || title.textContent.trim() !== 'Mission Map' || APP.querySelector('.fast-hud')) return;
    const top = APP.querySelector('.topbar');
    const metrics = [...APP.querySelectorAll('.metric')].map(x => x.textContent.trim());
    if (!top) return;
    const nick = APP.querySelector('.profile-pill span:last-child')?.textContent?.trim() || 'ARMY';
    const saved = localStorage.getItem('bvw-mascot');
    const mascot = ANIMALS.includes(saved) ? saved : 'rabbit';
    top.insertAdjacentHTML('afterend', `<section class="fast-hud"><div class="fast-hud-avatar">${animalSvg(mascot)}</div><div class="fast-hud-player"><span>PLAYER</span><b>${nick}</b><small>${metrics[0]||'0/0'} cleared</small></div><div class="fast-hud-streak"><span>Streak</span><b>${(metrics[2]||'0 days').replace(' days','d')}</b></div></section>`);
  }

  function buildMap() {
    const title = APP.querySelector('.title');
    if (!title || title.textContent.trim() !== 'Mission Map') return;
    const heading = [...APP.querySelectorAll('.section-title')].find(x => /mission board|quest|today.?s route/i.test(x.textContent));
    if (!heading) return;
    heading.textContent = 'Today’s route';
    let section = heading.nextElementSibling;
    if (!section) return;
    if (section.classList.contains('fast-quest-map')) return;
    if (!section.classList.contains('card')) return;
    const missions = [...section.querySelectorAll('.mission')];
    if (!missions.length) return;
    section.classList.add('fast-quest-map');
    const canvas = document.createElement('div');
    canvas.className = 'fast-map-canvas';
    canvas.innerHTML = '<div class="fast-map-moon"></div><div class="fast-map-stars">✦　·　✦</div><div class="fast-map-route" aria-hidden="true"></div>';
    missions.forEach((m,i) => {
      m.classList.add('fast-cloud');
      const [x,y] = positions[i % positions.length];
      m.style.setProperty('--fx', x + '%');
      m.style.setProperty('--fy', y + '%');
      const dot = m.querySelector('.mission-dot');
      if (dot && !dot.querySelector('span')) dot.innerHTML = `<span>${dot.textContent.trim() || String(i+1).padStart(2,'0')}</span>`;
      m.insertAdjacentHTML('afterbegin','<div class="fast-cloud-puffs" aria-hidden="true"><i></i><i></i><i></i></div>');
      canvas.appendChild(m);
    });
    section.replaceChildren(canvas);
  }

  function decorateAwards() {
    APP.querySelectorAll('.award-card').forEach((card,i) => {
      if (card.dataset.fast) return;
      card.dataset.fast = '1';
      card.insertAdjacentHTML('afterbegin', `<div class="fast-award-mascot">${animalSvg(ANIMALS[i % ANIMALS.length])}</div>`);
    });
  }

  function decorateBadges() {
    APP.querySelectorAll('.badge').forEach((card,i) => {
      if (card.dataset.fast) return;
      card.dataset.fast = '1';
      const icon = card.querySelector('.badge-icon');
      if (icon) {
        icon.classList.add('fast-badge-art');
        icon.innerHTML = animalSvg(ANIMALS[i % ANIMALS.length]);
      }
      if (!card.querySelector('.fast-badge-animal')) card.querySelector('h3')?.insertAdjacentHTML('afterend', `<span class="fast-badge-animal">${labels[ANIMALS[i % ANIMALS.length]]}</span>`);
    });
  }

  function decorateProfileAvatar() {
    const saved = localStorage.getItem('bvw-mascot');
    const mascot = ANIMALS.includes(saved) ? saved : 'rabbit';
    APP.querySelectorAll('.profile-pill .avatar').forEach(a => {
      if (a.dataset.fast) return;
      a.dataset.fast = '1';
      a.innerHTML = animalSvg(mascot);
    });
  }

  function decorate() {
    if (decorating) return;
    decorating = true;
    decorateLogin();
    decorateShell();
    decorateMobileBrand();
    decorateNav();
    decorateProfileAvatar();
    addHud();
    buildMap();
    decorateAwards();
    decorateBadges();
    decorating = false;
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; decorate(); });
  }

  const observer = new MutationObserver(schedule);
  observer.observe(APP, { childList:true });
  if (TOASTS) observer.observe(TOASTS, { childList:true });
  APP.addEventListener('click', e => {
    const b = e.target.closest('[data-route],[data-auth],[data-close]');
    if (b) setTimeout(schedule, 0);
  });
  window.addEventListener('hashchange', schedule, { passive:true });
  schedule();
})();
