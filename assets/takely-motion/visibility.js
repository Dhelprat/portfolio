/* Start only when at least 70% of the phone is visible; the embedded player starts paused. */
(() => {
 const figures = [...document.querySelectorAll('[data-takely-motion]')];
 if (!figures.length || !('IntersectionObserver' in window)) return;
 const players = figures.map(figure => ({
  figure, frame: figure.querySelector('iframe'), poster: figure.querySelector('[data-motion-poster]'), ratio: 0
 })).filter(player => player.frame);
 let observer;

 function send(player) {
  const visible = player.ratio >= 0.7 && !document.hidden && !document.querySelector('dialog[open]');
  player.frame.contentWindow?.postMessage({ type: 'takely:visibility', visible }, location.origin);
 }
 function refresh() { players.forEach(send); }
 function observe() {
  observer?.disconnect();
  // Exclude the portfolio's sticky header and the mobile case navigation.
  const header = document.querySelector('.site-header');
  const contents = document.querySelector('.contents');
  let top = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
  if (contents && getComputedStyle(contents).position === 'sticky' && getComputedStyle(contents).display === 'flex') {
   top += contents.getBoundingClientRect().height;
  }
  top = Math.ceil(top);
  document.documentElement.style.setProperty('--takely-motion-top', top + 'px');
  players.forEach(player => { player.ratio = 0; send(player); });
  observer = new IntersectionObserver(entries => {
   for (const entry of entries) {
    const player = players.find(item => item.figure === entry.target);
    player.ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
    send(player);
   }
  }, { root: null, rootMargin: `-${top}px 0px 0px 0px`, threshold: [0, 0.7, 1] });
  players.forEach(player => observer.observe(player.figure));
 }
 window.addEventListener('message', event => {
  if (event.origin !== location.origin) return;
  const player = players.find(item => item.frame.contentWindow === event.source);
  if (!player) return;
  if (event.data?.type === 'takely:ready') send(player);
  if (event.data?.ready && player.poster) player.poster.hidden = true;
  if (event.data?.type === 'takely:state') player.figure.dataset.playing = String(event.data.playing);
 });
 players.forEach(player => player.frame.addEventListener('load', () => send(player)));
 document.addEventListener('visibilitychange', refresh);
 window.addEventListener('pagehide', () => {
  players.forEach(player => player.frame.contentWindow?.postMessage({ type: 'takely:visibility', visible: false }, location.origin));
 });
 window.addEventListener('pageshow', observe);
 window.addEventListener('resize', observe);
 const resize = new ResizeObserver(observe);
 for (const element of [document.querySelector('.site-header'), document.querySelector('.contents')]) if (element) resize.observe(element);
 const dialog = document.querySelector('dialog');
 if (dialog) new MutationObserver(refresh).observe(dialog, { attributes: true, attributeFilter: ['open'] });
 observe();
})();
