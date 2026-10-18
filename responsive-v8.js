(() => {
  const desktopPositions = [
    [15,76], [30,53], [46,72], [60,45], [77,28], [62,17], [31,20]
  ];

  function optimiseMap(){
    const map = document.querySelector('.quest-map');
    if(!map) return;
    const nodes = [...map.querySelectorAll('.mission, .map-node')];
    if(!nodes.length) return;

    nodes.forEach((node,i)=>{
      node.classList.add('responsive-node-v8');
      if(window.innerWidth > 900){
        const [x,y] = desktopPositions[i % desktopPositions.length];
        node.style.setProperty('--mx', x + '%');
        node.style.setProperty('--my', y + '%');
        node.style.setProperty('--x', x + '%');
        node.style.setProperty('--y', y + '%');
      }
    });
  }

  function optimiseNav(){
    document.querySelectorAll('.mobile-nav button').forEach(btn=>{
      btn.setAttribute('aria-label', btn.textContent.trim() || btn.dataset.route || 'Navigation');
    });
  }

  function apply(){
    optimiseMap();
    optimiseNav();
  }

  let timer;
  window.addEventListener('resize',()=>{
    clearTimeout(timer);
    timer=setTimeout(apply,120);
  });

  const mo=new MutationObserver(()=>requestAnimationFrame(apply));
  const start=()=>{apply();mo.observe(document.body,{childList:true,subtree:true})};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
