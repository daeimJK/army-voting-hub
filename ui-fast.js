(() => {
  const APP = document.getElementById('app');
  if (!APP) return;

  const animals = ['🐰','🐱','🐻','🐯','🐨','🐿️','🦙'];
  const textMap = new Map([
    ['Today','Lobby'],['Voting info','Missions'],['Voting','Missions'],['Credentials','Badge Vault'],['Badges','Badge Vault'],['Profile','Player'],['Admin','Control Room'],['Official vote','Enter quest'],['Rules & guide','Mission guide'],['Verified','Quest cleared'],['Pending review','Under review'],['Save profile','Save player'],['Sign out','Leave lobby']
  ]);
  const titleMap = new Map([
    ['Today’s missions','Mission Map'],['Voting information','Active Missions'],['Digital credentials','Badge Vault'],['Moderator queue','Control Room']
  ]);

  function renameText(){
    APP.querySelectorAll('button,a,span,h1,h2,h3,p').forEach(el=>{
      if(el.children.length) return;
      const next = textMap.get(el.textContent.trim());
      if(next) el.textContent = next;
    });
    const title = APP.querySelector('.title');
    if(title){
      const next = titleMap.get(title.textContent.trim());
      if(next) title.textContent = next;
    }
  }

  function brand(){
    const el = APP.querySelector('.brand');
    if(!el || el.dataset.lite) return;
    el.dataset.lite='1';
    el.innerHTML = `<div class="lite-brand"><div class="lite-brand-head"><div class="lite-mark"><i></i><i></i></div><div><small>Bangtan mission world</small><b>Bangtan V Warriors</b></div></div><div class="lite-animals">${animals.map(a=>`<span>${a}</span>`).join('')}</div></div>`;
    const foot = APP.querySelector('.side-foot');
    if(foot) foot.innerHTML='<strong>Mission note</strong>Fan-made hub. Voting stays on official platforms.';
  }

  function mobileBrand(){
    const main = APP.querySelector('.main');
    if(!main || main.querySelector('.lite-mobile-brand')) return;
    main.insertAdjacentHTML('afterbegin', `<div class="lite-mobile-brand"><div class="lite-mark"><i></i><i></i></div><div><b>Bangtan V Warriors</b><span>mission world</span></div></div>`);
  }

  function map(){
    const title = APP.querySelector('.title');
    if(!title || title.textContent.trim()!=='Mission Map') return;
    const heading=[...APP.querySelectorAll('.section-title')].find(x=>/mission board|today.?s route|quest/i.test(x.textContent));
    if(!heading) return;
    heading.textContent='Today’s route';
    const section=heading.nextElementSibling;
    if(!section || section.dataset.liteRoute) return;
    const missions=[...section.querySelectorAll('.mission')];
    if(!missions.length) return;
    section.dataset.liteRoute='1';
    section.classList.add('lite-route');
    const list=document.createElement('div');
    list.className='lite-route-list';
    missions.forEach(m=>{ m.classList.add('lite-route-card'); list.appendChild(m); });
    section.replaceChildren(list);
  }

  function decorate(){
    renameText();
    brand();
    mobileBrand();
    map();
  }

  const observer = new MutationObserver(decorate);
  observer.observe(APP,{childList:true});
  decorate();
})();