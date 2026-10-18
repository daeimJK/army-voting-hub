(() => {
  const icons = {
    today:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9l8-5 8 5v10h-5v-6H9v6Z"/></svg>',
    voting:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v16H6zM9 8h6M9 12h6M9 16h4"/></svg>',
    badges:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 15 8l6 1-4 4 .8 6L12 16l-5.8 3L7 13 3 9l6-1Z"/></svg>',
    profile:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 20c1-4 3.5-6 7-6s6 2 7 6"/></svg>',
    admin:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6Z"/><path d="m9 12 2 2 4-4"/></svg>'
  };

  function mobileBrand(){
    const main = document.querySelector('.main');
    if(!main || main.querySelector('.mobile-brand-v7')) return;
    main.insertAdjacentHTML('afterbegin', `
      <div class="mobile-brand-v7">
        <div class="mobile-brand-mark"><span></span><span></span></div>
        <div class="mobile-brand-copy"><b>Bangtan V Warriors</b><small>mission world</small></div>
        <div class="mobile-brand-stars">✦</div>
      </div>`);
  }

  function mobileRoute(){
    const map = document.querySelector('.quest-map');
    if(!map) return;
    if(!map.querySelector('.mobile-route-line-v7')) map.insertAdjacentHTML('afterbegin','<div class="mobile-route-line-v7" aria-hidden="true"></div>');
    [...map.querySelectorAll(':scope > .mission, :scope > .map-node')].forEach((node,i)=>{
      node.classList.add('mobile-mission-v7');
      node.style.setProperty('--mobile-step', i);
    });
  }

  function mobileNav(){
    const nav = document.querySelector('.mobile-nav');
    if(!nav) return;
    nav.querySelectorAll('button').forEach(btn=>{
      if(btn.dataset.v7nav) return;
      btn.dataset.v7nav='1';
      const route=btn.dataset.route || 'today';
      const label=btn.textContent.trim();
      btn.innerHTML=`<span class="mobile-nav-icon">${icons[route] || icons.voting}</span><span class="mobile-nav-label">${label}</span>`;
    });
  }

  function markTopbar(){
    document.querySelectorAll('.topbar').forEach(x=>x.classList.add('mobile-topbar-v7'));
  }

  function apply(){
    mobileBrand();
    mobileRoute();
    mobileNav();
    markTopbar();
  }

  const mo=new MutationObserver(()=>requestAnimationFrame(apply));
  const start=()=>{apply();mo.observe(document.body,{childList:true,subtree:true})};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();
