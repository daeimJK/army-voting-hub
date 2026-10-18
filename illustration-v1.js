(() => {
  const positions = [[14,74],[30,51],[44,70],[56,42],[67,22],[79,48],[86,17]];

  function refineBrand(){
    const brand = document.querySelector('.brand');
    if(!brand || brand.dataset.illustratedLogo) return;
    brand.dataset.illustratedLogo = '1';
    brand.innerHTML = `
      <div class="bvw-logo-art" aria-hidden="true">
        <span class="bvw-logo-moon"></span>
        <span class="bvw-logo-cloud cloud-one"></span>
        <span class="bvw-logo-cloud cloud-two"></span>
        <span class="bvw-logo-star">✦</span>
      </div>
      <div class="bvw-logo-copy">
        <span class="bvw-logo-kicker">BANGTAN</span>
        <strong>V Warriors</strong>
        <small>voting mission world</small>
      </div>`;
  }

  function refineSidebar(){
    const side = document.querySelector('.side');
    if(!side || side.dataset.illustratedSide) return;
    side.dataset.illustratedSide = '1';
    side.insertAdjacentHTML('afterbegin', '<div class="side-art-layer" aria-hidden="true"><span class="side-star s1">✦</span><span class="side-star s2">✦</span><span class="side-orbit"></span></div>');
    const foot = side.querySelector('.side-foot');
    if(foot){
      foot.innerHTML = '<strong>Mission note</strong><span>Fan-made hub. Voting stays on official platforms.</span>';
    }
  }

  function refineMap(){
    const map = document.querySelector('.quest-map');
    if(!map) return;
    const canvas = map.querySelector('.quest-map-canvas');
    if(!canvas) return;

    if(!canvas.dataset.illustratedMap){
      canvas.dataset.illustratedMap = '1';
      canvas.insertAdjacentHTML('beforeend', `
        <div class="map-illustration-layer" aria-hidden="true">
          <span class="map-cloud cloud-left"></span>
          <span class="map-cloud cloud-right"></span>
          <span class="map-small-star ms1">✦</span>
          <span class="map-small-star ms2">✦</span>
        </div>`);
    }

    [...canvas.querySelectorAll('.mission')].forEach((node, i) => {
      const [x,y] = positions[i % positions.length];
      node.style.setProperty('--mx', x + '%');
      node.style.setProperty('--my', y + '%');
      node.classList.add('mission-cloud');
      if(!node.querySelector('.mission-cloud-accent')){
        node.insertAdjacentHTML('afterbegin', '<span class="mission-cloud-accent" aria-hidden="true">✦</span>');
      }
    });
  }

  function run(){
    refineBrand();
    refineSidebar();
    refineMap();
  }

  const observer = new MutationObserver(() => requestAnimationFrame(run));
  const start = () => { run(); observer.observe(document.body,{childList:true,subtree:true}); };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
