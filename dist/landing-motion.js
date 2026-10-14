// One lifecycle for each Figma timeline. CSS carries the authoritative motion.
const stage = document.querySelector('.platform-stage');
if (stage && 'ResizeObserver' in window) {
  new ResizeObserver(([entry]) => {
    const scale = Math.min(entry.contentRect.width / 720, (entry.contentRect.height - 28) / 720);
    stage.style.setProperty('--platform-scale', String(scale));
  }).observe(stage);
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.classList.toggle('motion-offscreen', !entry.isIntersecting);
  });
  document.querySelectorAll('.platform-scene, .electro-art').forEach(node => observer.observe(node));
}
document.addEventListener('visibilitychange', () => {
  document.querySelectorAll('.platform-scene, .electro-art').forEach(node => {
    if (document.hidden) node.classList.add('motion-offscreen');
    else {
      const rect = node.getBoundingClientRect();
      node.classList.toggle('motion-offscreen', rect.bottom < 0 || rect.top > innerHeight);
    }
  });
});
