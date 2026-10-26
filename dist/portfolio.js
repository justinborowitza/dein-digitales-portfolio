document.documentElement.classList.remove('no-js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.topnav');
if (menu && nav) {
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  }
  menu.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menu.focus();
    }
  });
  matchMedia('(min-width:701px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
  });
}
const motion = document.querySelector('.motion-toggle');
if (motion) motion.addEventListener('click', () => {
  const paused = document.body.classList.toggle('motion-paused');
  motion.setAttribute('aria-pressed', String(paused));
  motion.innerHTML = paused
    ? 'Bewegung fortsetzen <span aria-hidden="true">▷</span>'
    : 'Bewegung pausieren <span aria-hidden="true">Ⅱ</span>';
});
