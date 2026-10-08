function getPortfolioProgress(offsets, position, atBottom) {
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
    const rail = document.querySelector('.scroll-rail');
    if (!rail) return;
    const links = Array.from(rail.querySelectorAll('a[href^="#"]'));
    const sections = links.map(link => document.getElementById(link.hash.slice(1)));
    if (sections.some(section => !section)) return;
    const progressbar = rail.querySelector('[role="progressbar"]');
    let offsets = [];
    let maxScroll = 0;
    let frame = 0;

    function render() {
      frame = 0;
      const scroll = window.scrollY;
      const position = scroll + window.innerHeight * .28;
      const state = scroll <= 1 ? { active: 0, progress: 0 } : getPortfolioProgress(offsets, position, maxScroll > 0 && scroll >= maxScroll - 2);
      rail.style.setProperty('--rail-progress', String(state.progress));
      progressbar.setAttribute('aria-valuenow', String(Math.round(state.progress * 100)));
      progressbar.setAttribute('aria-valuetext', `${links[state.active].textContent.trim()}, Abschnitt ${state.active + 1} von ${links.length}`);
      links.forEach((link, index) => {
        link.classList.toggle('is-complete', index < state.active);
        link.classList.toggle('is-active', index === state.active);
        if (index === state.active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(render);
    }

    function measure() {
      offsets = sections.map(section => section.getBoundingClientRect().top + window.scrollY);
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
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
    }
    measure();
  })();
}
