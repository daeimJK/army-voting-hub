(() => {
  const LOGO_ANIMALS = [
    {key:'rabbit', bg:'#f8d8d8'},
    {key:'cat', bg:'#f3c655'},
    {key:'bear', bg:'#e1b66b'},
    {key:'tiger', bg:'#f7c96a'},
    {key:'koala', bg:'#93b6c8'},
    {key:'squirrel', bg:'#e3a15e'},
    {key:'alpaca', bg:'#e0d1ba'}
  ];

  function miniFace(kind, bg){
    const face = {
      rabbit:`<svg viewBox="0 0 56 56" class="v6-face rabbit" aria-hidden="true"><rect width="56" height="56" rx="18" fill="${bg}"/><ellipse cx="18" cy="13" rx="5" ry="12" fill="#fff5f0"/><ellipse cx="38" cy="13" rx="5" ry="12" fill="#fff5f0"/><ellipse cx="18" cy="13" rx="2" ry="8" fill="#ecb0b4"/><ellipse cx="38" cy="13" rx="2" ry="8" fill="#ecb0b4"/><ellipse cx="28" cy="30" rx="16" ry="14" fill="#fff8f3"/><circle cx="22" cy="27" r="2.1" fill="#241f1b"/><circle cx="34" cy="27" r="2.1" fill="#241f1b"/><ellipse cx="28" cy="32" rx="2.6" ry="2" fill="#c78b84"/><path d="M28 34c-2.3 2.8-5 3-7 1.6m7-1.6c2.3 2.8 5 3 7 1.6" stroke="#3a2d2a" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`,
      cat:`<svg viewBox="0 0 56 56" class="v6-face cat" aria-hidden="true"><rect width="56" height="56" rx="18" fill="${bg}"/><path d="M14 20 18 8l8 10M42 20 38 8l-8 10" fill="#151515"/><ellipse cx="28" cy="31" rx="16" ry="14" fill="#151515"/><ellipse cx="22" cy="27" rx="5" ry="6" fill="#f8dc72"/><ellipse cx="34" cy="27" rx="5" ry="6" fill="#f8dc72"/><ellipse cx="22" cy="27.5" rx="1.4" ry="3" fill="#121212"/><ellipse cx="34" cy="27.5" rx="1.4" ry="3" fill="#121212"/><ellipse cx="28" cy="33" rx="3" ry="2.2" fill="#c89663"/><path d="M28 35c-2.3 2.4-5.2 2.6-7.6 1.3m7.6-1.3c2.3 2.4 5.2 2.6 7.6 1.3" stroke="#f0e0c2" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M18 33h-8m8 3h-9m20-3h8m-8 3h9" stroke="#f0e0c2" stroke-width="1" stroke-linecap="round"/></svg>`,
      bear:`<svg viewBox="0 0 56 56" class="v6-face bear" aria-hidden="true"><rect width="56" height="56" rx="18" fill="${bg}"/><circle cx="18" cy="17" r="6" fill="#a36a40"/><circle cx="38" cy="17" r="6" fill="#a36a40"/><ellipse cx="28" cy="31" rx="16" ry="14" fill="#af7141"/><ellipse cx="28" cy="33" rx="8.6" ry="6.5" fill="#e7c59d"/><circle cx="22" cy="27" r="2.2" fill="#261f1b"/><circle cx="34" cy="27" r="2.2" fill="#261f1b"/><ellipse cx="28" cy="31.5" rx="2.7" ry="2.3" fill="#261f1b"/><path d="M28 34.5c-2.4 2.4-5.1 2.6-7 1.4m7-1.4c2.4 2.4 5.1 2.6 7 1.4" stroke="#261f1b" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`,
      tiger:`<svg viewBox="0 0 56 56" class="v6-face tiger" aria-hidden="true"><rect width="56" height="56" rx="18" fill="${bg}"/><path d="M14 20 18 9l7 9M42 20 38 9l-7 9" fill="#ee8c2b"/><ellipse cx="28" cy="31" rx="16" ry="14" fill="#ee8c2b"/><path d="M20 17l2 5M28 15v6M36 17l-2 5M14 32l6 2m22-2-6 2" stroke="#603b24" stroke-width="2" stroke-linecap="round"/><ellipse cx="28" cy="33" rx="8.2" ry="6.1" fill="#f4dfc8"/><circle cx="22" cy="27" r="2.2" fill="#261f1b"/><circle cx="34" cy="27" r="2.2" fill="#261f1b"/><ellipse cx="28" cy="31.5" rx="2.5" ry="2" fill="#261f1b"/></svg>`,
      koala:`<svg viewBox="0 0 56 56" class="v6-face koala" aria-hidden="true"><rect width="56" height="56" rx="18" fill="${bg}"/><circle cx="16" cy="24" r="8" fill="#95a4a8"/><circle cx="40" cy="24" r="8" fill="#95a4a8"/><circle cx="16" cy="24" r="4.2" fill="#c5cfd0"/><circle cx="40" cy="24" r="4.2" fill="#c5cfd0"/><ellipse cx="28" cy="31" rx="14" ry="13" fill="#9ea9ab"/><ellipse cx="28" cy="32" rx="4.3" ry="5.7" fill="#2b3234"/><circle cx="22" cy="27" r="2" fill="#202526"/><circle cx="34" cy="27" r="2" fill="#202526"/><path d="M28 38c-2 1.8-4.8 2.2-6.5 1.1m6.5-1.1c2 1.8 4.8 2.2 6.5 1.1" stroke="#343b3d" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>`,
      squirrel:`<svg viewBox="0 0 56 56" class="v6-face squirrel" aria-hidden="true"><rect width="56" height="56" rx="18" fill="${bg}"/><path d="M40 18c7-6 11 2 7 7-2 2-4 3-6 2 3 2 4 5 2 8-2 3-6 3-8 1" fill="#9e5d34"/><path d="M15 20 18 10l7 9M41 20 38 10l-7 9" fill="#b76b39"/><ellipse cx="25" cy="31" rx="14" ry="13" fill="#b76b39"/><ellipse cx="25" cy="33" rx="7.8" ry="5.8" fill="#e8c29e"/><circle cx="20" cy="27" r="2" fill="#2b211c"/><circle cx="30" cy="27" r="2" fill="#2b211c"/><ellipse cx="25" cy="31.8" rx="2.3" ry="1.9" fill="#2b211c"/></svg>`,
      alpaca:`<svg viewBox="0 0 56 56" class="v6-face alpaca" aria-hidden="true"><rect width="56" height="56" rx="18" fill="${bg}"/><ellipse cx="21" cy="12" rx="4" ry="9" fill="#f3ebdf"/><ellipse cx="35" cy="12" rx="4" ry="9" fill="#f3ebdf"/><circle cx="18" cy="22" r="5.5" fill="#faf4ea"/><circle cx="28" cy="19" r="7" fill="#faf4ea"/><circle cx="38" cy="22" r="5.5" fill="#faf4ea"/><path d="M18 25c0-7 4-11 10-11s10 4 10 11v10c0 6-4 10-10 10s-10-4-10-10Z" fill="#f2e8d8"/><ellipse cx="28" cy="32" rx="7.5" ry="6" fill="#e5d5bf"/><circle cx="23" cy="28" r="1.9" fill="#342a25"/><circle cx="33" cy="28" r="1.9" fill="#342a25"/><ellipse cx="28" cy="31" rx="2.2" ry="1.8" fill="#342a25"/></svg>`
    };
    return face[kind];
  }

  function rebuildBrand(){
    const brand = document.querySelector('.brand');
    if(!brand || brand.dataset.v6logo === '1') return;
    brand.dataset.v6logo = '1';
    brand.innerHTML = `<div class="v6-logo-shell"><div class="v6-logo-top"><div class="v6-logo-mark" aria-hidden="true"><span class="door left"></span><span class="door right"></span><span class="star">✦</span></div><div class="v6-logo-copy"><span class="kicker">bangtan mission world</span><strong>Bangtan V Warriors</strong><small>vote, clear quests, collect badges</small></div></div><div class="v6-logo-animals">${LOGO_ANIMALS.map(a=>`<span class="v6-animal-chip ${a.key}">${miniFace(a.key,a.bg)}</span>`).join('')}</div></div>`;
  }

  function upgradeCloudNodes(){
    document.querySelectorAll('.quest-map .mission, .quest-map .map-node').forEach((node) => {
      if(node.dataset.v6cloud) return;
      node.dataset.v6cloud = '1';
      node.classList.add('v6-cloud-node');
      if(!node.querySelector('.v6-cloud-puffs')) node.insertAdjacentHTML('afterbegin','<div class="v6-cloud-puffs" aria-hidden="true"><span class="puff p1"></span><span class="puff p2"></span><span class="puff p3"></span><span class="puff p4"></span><span class="puff p5"></span></div>');
      if(!node.querySelector('.v6-cloud-shine')) node.insertAdjacentHTML('beforeend','<span class="v6-cloud-shine" aria-hidden="true"></span>');
      const dot = node.querySelector('.mission-dot');
      if(dot && !dot.querySelector('span')) dot.innerHTML = `<span>${dot.textContent.trim()}</span>`;
    });
  }

  function cleanSidebar(){
    const side = document.querySelector('.side');
    if(!side || side.dataset.v6side) return;
    side.dataset.v6side = '1';
    const foot = side.querySelector('.side-foot');
    if(foot) foot.innerHTML = '<strong>Mission note</strong><span>Fan-made hub. Voting stays on official platforms.</span>';
  }

  function run(){ rebuildBrand(); upgradeCloudNodes(); cleanSidebar(); }
  const mo = new MutationObserver(() => requestAnimationFrame(run));
  const start = () => { run(); mo.observe(document.body,{childList:true,subtree:true}); };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true}); else start();
})();
