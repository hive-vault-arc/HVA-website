// Load the React/WebGL island only as the existing gallery approaches the viewport.
const selector = '.framer-b0D5J > .framer-cbw253';
for (const href of ['/assets/css/hva-project-gallery-layout.css', '/assets/js/hva-project-gallery.css']) {
  const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; document.head.append(link);
}
const initialized = new WeakSet();
const mounted = new Map();
let modulePromise;
const projects = [
  ['immoworld-pipeline', 'Immoworld lead pipeline'],
  ['calbook-calendar', 'CalBook availability'],
  ['hva-platform', 'HVA digital experience']
];
function fallback(host) {
  const grid = document.createElement('div');
  grid.className = 'hva-project-fallback';
  grid.setAttribute('aria-label', 'Illustrative project interface previews');
  projects.forEach(([file, title]) => {
    const img = document.createElement('img');
    img.src = `/assets/images/projects/${file}.svg`;
    img.alt = `${title} — interface concept`;
    img.width = 800; img.height = 600;
    img.loading = 'lazy'; img.decoding = 'async';
    grid.append(img);
  });
  host.append(grid);
}
const visibility = new IntersectionObserver(entries => entries.forEach(async entry => {
  const host = entry.target;
  if (!entry.isIntersecting || !host.getBoundingClientRect().width || mounted.has(host)) return;
  // Reduced motion and data-saving preferences use the static preview instead of a GPU scene.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return;
  mounted.set(host, null);
  try {
    const module = await (modulePromise ||= import('./hva-project-gallery.js'));
    if (!host.isConnected || !host.getBoundingClientRect().width) { mounted.delete(host); return; }
    const island = document.createElement('div');
    island.className = 'hva-project-island';
    host.append(island);
    mounted.set(host, module.mount(island));
  } catch (error) {
    mounted.delete(host);
    console.warn('Project gallery unavailable; showing interface previews.');
  }
}), {rootMargin: '120px 0px', threshold: 0});
function scan() {
  mounted.forEach((dispose, host) => {
    if (!host.isConnected || !host.getBoundingClientRect().width) {
      dispose?.(); host.querySelector('.hva-project-island')?.remove(); mounted.delete(host);
    }
  });
  document.querySelectorAll(selector).forEach(host => {
    if (initialized.has(host)) return;
    initialized.add(host); host.dataset.hvaProjectGallery = 'true'; host.replaceChildren(); fallback(host); visibility.observe(host);
  });
}
scan();
new MutationObserver(records => {
  if (records.some(record => [...record.addedNodes].some(node => node.nodeType === 1 &&
    !node.closest?.('.hva-project-island') && (node.matches?.(selector) || node.querySelector?.(selector))))) scan();
}).observe(document.body, {childList:true, subtree:true});
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(scan, 200); }, {passive:true});
