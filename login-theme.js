(() => {
  const logoMarkup = `
    <svg class="login-bts-logo" viewBox="0 0 220 250" role="img" aria-label="BTS logo" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor">
        <path d="M32 20 L102 74 L102 178 L32 204 Z" />
        <path d="M118 74 L188 20 L188 204 L118 178 Z" />
      </g>
      <text x="110" y="238" text-anchor="middle" fill="currentColor" font-family="Poppins, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="18">BTS</text>
    </svg>`;

  function applyLoginTheme(root = document) {
    const art = root.querySelector('.login-art');
    if (!art || art.dataset.bvwStyled === '1') return;

    art.dataset.bvwStyled = '1';
    art.innerHTML = `
      ${logoMarkup}
      <div class="eyebrow">ARMY voting hub</div>
      <h1 class="login-title">Bangtan V Warriors</h1>
      <p class="login-description">Your ARMY voting space for daily missions, official guides, proof tracking and digital credentials. Complete your votes on the official platforms, return with the confirmation screen, and keep your participation organised in one place.</p>
    `;
  }

  const start = () => {
    applyLoginTheme();
    const observer = new MutationObserver(() => applyLoginTheme());
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
