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

// The rail reflects reading position, not project completion or skill ratings.
const workflowTrack = document.querySelector('.workflow-track');
if (workflowTrack) {
  const steps = [...workflowTrack.querySelectorAll('.workflow-step')];
  let pending = false;
  function updateWorkflow() {
    pending = false;
    const top = workflowTrack.getBoundingClientRect().top;
    const centers = steps.map(step => {
      const rect = step.querySelector('.step-number').getBoundingClientRect();
      return rect.top + rect.height / 2;
    });
    const length = centers.at(-1) - centers[0];
    const readingLine = innerHeight * .55;
    const fraction = (readingLine - centers[0]) / length;
    const progress = fraction < .005 ? 0 : fraction > .995 ? 1 : fraction;
    workflowTrack.style.setProperty('--rail-start', `${centers[0] - top}px`);
    workflowTrack.style.setProperty('--rail-height', `${length}px`);
    workflowTrack.style.setProperty('--workflow-progress', String(progress));
    steps.forEach((step, index) => step.classList.toggle('is-reached', centers[index] <= readingLine + 1));
    const current = Math.max(0, centers.findLastIndex(center => center <= readingLine + 1));
    steps.forEach((step, index) => step.classList.toggle('is-current', index === current));
  }
  function scheduleWorkflow() {
    if (!pending) { pending = true; requestAnimationFrame(updateWorkflow); }
  }
  addEventListener('scroll', scheduleWorkflow, { passive: true });
  addEventListener('resize', scheduleWorkflow);
  if ('ResizeObserver' in window) new ResizeObserver(scheduleWorkflow).observe(workflowTrack);
  document.fonts?.ready.then(scheduleWorkflow);
  updateWorkflow();
}
