// Locally hosted Three.js r180. No runtime CDN or image-generated fake rotation.
const stage = document.querySelector('.cube-stage');
if (stage) initCube().catch(() => { /* Keep the static image if WebGL is unavailable. */ });

async function initCube() {
  const [THREE, { RoundedBoxGeometry }] = await Promise.all([
    import('./vendor/three/three.module.min.js'),
    import('./vendor/three/RoundedBoxGeometry.js'),
  ]);
  const canvas = stage.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0x08070b, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 30);
  camera.position.z = 7.5;
  const cube = new THREE.Mesh(
    new RoundedBoxGeometry(2, 2, 2, 5, .09),
    new THREE.MeshStandardMaterial({ color: 0x605a6a, metalness: .4, roughness: .3 }),
  );
  scene.add(cube);
  scene.add(new THREE.HemisphereLight(0xb6b8ca, 0x100b19, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 4.5);
  key.position.set(-3, 5, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9862ef, 3.4);
  rim.position.set(4, 1, -2); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xb6a9cf, .9);
  fill.position.set(1, -2, 4); scene.add(fill);

  const rest = { x: .43, y: -.64 };
  let target = { ...rest }, current = { ...rest };
  let hover = { x: 0, y: 0 }, drag = null, visible = true, frame = 0, previous = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const paused = () => document.body.classList.contains('motion-paused');
  const automatic = () => !paused() && !reduced.matches;
  function requestRender() { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw); }
  function draw(now) {
    frame = 0;
    if (!visible || document.hidden) return;
    const delta = Math.min((now - previous) / 1000 || .016, .05); previous = now;
    const alpha = reduced.matches ? 1 : 1 - Math.exp(-10 * delta);
    const tx = target.x + (automatic() && !drag ? hover.x : 0);
    const ty = target.y + (automatic() && !drag ? hover.y : 0);
    current.x += (tx - current.x) * alpha; current.y += (ty - current.y) * alpha;
    cube.rotation.set(current.x, current.y, 0);
    cube.position.y = automatic() ? Math.sin(now / 2200) * .045 : 0;
    renderer.render(scene, camera);
    if (automatic() || Math.abs(tx-current.x) + Math.abs(ty-current.y) > .0001) requestRender();
  }
  function resize() {
    const { width, height } = stage.getBoundingClientRect();
    renderer.setSize(width, height, false); camera.aspect = width / height;
    camera.updateProjectionMatrix(); requestRender();
  }
  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) { cancelAnimationFrame(frame); frame = 0; } else requestRender();
  }).observe(stage);
  stage.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    stage.classList.remove('keyboard-focus');
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, rx: target.x, ry: target.y };
    stage.setPointerCapture(e.pointerId); stage.classList.add('is-dragging');
    stage.focus({ preventScroll: true }); requestRender();
  });
  stage.addEventListener('pointermove', e => {
    if (drag && drag.id === e.pointerId) {
      target.x = drag.rx + (e.clientY-drag.y) * .009;
      target.y = drag.ry + (e.clientX-drag.x) * .009;
    } else if (e.pointerType === 'mouse') {
      const b = stage.getBoundingClientRect();
      hover = { x: (e.clientY-b.top-b.height/2)/b.height*.32, y: (e.clientX-b.left-b.width/2)/b.width*.45 };
    }
    requestRender();
  });
  function release(e) {
    if (drag?.id !== e.pointerId) return;
    drag = null; stage.classList.remove('is-dragging'); hover = { x: 0, y: 0 };
    if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
    requestRender();
  }
  for (const event of ['pointerup','pointercancel','lostpointercapture']) stage.addEventListener(event, release);
  stage.addEventListener('pointerleave', () => { hover = { x: 0, y: 0 }; requestRender(); });
  stage.addEventListener('keydown', e => {
    const keys = ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Escape','Home'];
    if (!keys.includes(e.key)) return;
    stage.classList.add('keyboard-focus');
    e.preventDefault();
    if (e.key === 'ArrowLeft') target.y -= .2;
    if (e.key === 'ArrowRight') target.y += .2;
    if (e.key === 'ArrowUp') target.x -= .2;
    if (e.key === 'ArrowDown') target.x += .2;
    if (e.key === 'Escape' || e.key === 'Home') { target = { ...rest }; hover = { x: 0, y: 0 }; }
    requestRender();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab') stage.classList.add('keyboard-focus');
  });
  stage.addEventListener('dblclick', () => { target = { ...rest }; hover = { x: 0, y: 0 }; requestRender(); });
  new MutationObserver(requestRender).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  reduced.addEventListener('change', requestRender);
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(frame); frame = 0; requestRender();
  });
  canvas.addEventListener('webglcontextlost', e => {
    e.preventDefault(); visible = false; cancelAnimationFrame(frame); frame = 0;
    stage.classList.remove('cube-ready');
  });
  canvas.addEventListener('webglcontextrestored', () => {
    visible = true; stage.classList.add('cube-ready'); requestRender();
  });
  resize(); stage.classList.add('cube-ready');
}
