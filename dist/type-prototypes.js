document.documentElement.classList.remove('no-js');
const descriptions = {
  1: 'Geist Sans · weiches Lavendellicht · ruhiges Einblenden.',
  2: 'Manrope · silbriger Lichtreflex · einmaliger Lichtdurchlauf.',
  3: 'Space Grotesk · feine Lichtkante · versetzter Aufbau der Zeilen.',
};
const buttons = document.querySelectorAll('[data-direction]');
function select(direction) {
  for (let i=1;i<=3;i++) document.body.classList.remove('direction-'+i);
  void document.querySelector('.lit-heading').offsetWidth;
  document.body.classList.add('direction-'+direction);
  document.querySelector('#direction-description').textContent=descriptions[direction];
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.direction===String(direction))));
  history.replaceState(null,'','#'+direction);
}
buttons.forEach(b=>b.addEventListener('click',()=>select(b.dataset.direction)));
document.querySelector('#replay').addEventListener('click',()=>select(document.querySelector('[data-direction][aria-pressed=true]').dataset.direction));
document.querySelector('.motion-toggle').addEventListener('click',e=>{
  const paused=document.body.classList.toggle('motion-paused');
  e.currentTarget.setAttribute('aria-pressed',String(paused));
  e.currentTarget.textContent=paused?'Bewegung fortsetzen ▷':'Bewegung pausieren Ⅱ';
});
if (/^[123]$/.test(location.hash.slice(1))) select(location.hash.slice(1));
