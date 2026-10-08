function getTimelineProgress(offsets, position, atBottom) {
  const last = offsets.length - 1;
  if (last <= 0) return { active: 0, progress: 0 };
  if (atBottom) return { active: last, progress: 1 };
  let active = 0;
  for (let i = 1; i <= last; i += 1) {
    if (position >= offsets[i]) active = i;
    else break;
  }
  const distance = active < last ? Math.max(1, offsets[active + 1] - offsets[active]) : 1;
  const fraction = active < last ? Math.min(1, Math.max(0, (position - offsets[active]) / distance)) : 0;
  return { active, progress: Math.min(1, Math.max(0, (active + fraction) / last)) };
}

if (typeof document !== 'undefined') {
  (() => {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    const rows = Array.from(timeline.querySelectorAll('.timeline-row'));
    const markers = rows.map(row => row.querySelector('.timeline-index'));
    if (!rows.length || markers.some(marker => !marker)) return;
    const progressbar = timeline.querySelector('[role="progressbar"]');
    let offsets = [];
    let frame = 0;

    function render() {
      frame = 0;
      const scroll = window.scrollY;
      const position = scroll + window.innerHeight * .65;
      const state = getTimelineProgress(offsets, position, false);
      const started = position >= offsets[0];
      timeline.style.setProperty('--timeline-progress', String(state.progress));
      progressbar.setAttribute('aria-valuenow', String(Math.round(state.progress * 100)));
      const label = rows[state.active].querySelector('.timeline-kind').textContent.trim();
      progressbar.setAttribute('aria-valuetext', started ? `${label}, Station ${state.active + 1} von ${rows.length}` : 'Werdegang noch nicht erreicht');
      rows.forEach((row, index) => {
        row.classList.toggle('is-complete', started && index < state.active);
        row.classList.toggle('is-active', started && index === state.active);
      });
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(render);
    }

    function measure() {
      offsets = markers.map(marker => {
        const rect = marker.getBoundingClientRect();
        return rect.top + rect.height / 2 + window.scrollY;
      });
      const top = timeline.getBoundingClientRect().top + window.scrollY;
      timeline.style.setProperty('--timeline-start', `${offsets[0] - top}px`);
      timeline.style.setProperty('--timeline-length', `${Math.max(0, offsets[offsets.length - 1] - offsets[0])}px`);
      schedule();
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('pageshow', measure);
    window.addEventListener('load', measure, { once: true });
    if (document.fonts) document.fonts.ready.then(measure);
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(measure);
      observer.observe(document.querySelector('main'));
      observer.observe(timeline);
    }
    measure();
  })();
}
