/*!
 * seiryu.js — Mishima Computing hero background: 三島の清流
 *
 * A procedural shallow-stream surface (Genbegawa, Mishima) rendered with
 * three.js as a single full-screen quad. No image assets: the riverbed,
 * caustics, ripples and baikamo weed are all generated in the fragment shader.
 *
 * Two intensities, chosen with data-seiryu-mode on the stage element:
 *   "hero" - the stream as the subject: full flow, caustics and glints.
 *   "calm" - the stream as a ground: slower, flatter, quieter, so page copy
 *            and form controls stay the focus.
 *
 * Purely decorative. All copy stays in static HTML so that non-JS crawlers
 * and AI agents still read the full DOM (see README).
 */

import * as THREE from '../vendor/three.module.min.js';

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform vec2  uRes;
  uniform float uTime;
  uniform float uTheme;    // 0.0 = dark, 1.0 = light
  uniform vec2  uPointer;  // -1..1, smoothed
  uniform float uQuality;  // 0.0 = reduced, 1.0 = full
  uniform float uCalm;     // 0.0 = hero intensity, 1.0 = calm ground

  #define TAU 6.28318530718
  #define FBM_M mat2(1.62, 1.18, -1.18, 1.62)

  /* ---------------- hashing ---------------- */

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
  }

  /* ---------------- value noise / fbm ---------------- */

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash12(i);
    float b = hash12(i + vec2(1.0, 0.0));
    float c = hash12(i + vec2(0.0, 1.0));
    float d = hash12(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm2(vec2 p) {
    float s = 0.0;
    float a = 0.5;
    for (int i = 0; i < 2; i++) { s += a * vnoise(p); p = FBM_M * p; a *= 0.5; }
    return s;
  }

  float fbm3(vec2 p) {
    float s = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) { s += a * vnoise(p); p = FBM_M * p; a *= 0.5; }
    return s;
  }

  /* ---------------- water surface height ---------------- */

  float surfaceH(vec2 w, float t) {
    vec2 f1 = vec2(t * 0.34, t * -0.03);
    vec2 f2 = vec2(t * 0.55, t *  0.06);
    float h  = fbm3(w * 1.20 - f1);
    h += 0.52 * fbm3(w * 3.10 - f2);
    h += 0.20 * fbm2(w * 7.60 - f2 * 1.7);
    return h;
  }

  /* ---------------- worley cells (river stones) ---------------- */

  float worley(vec2 p, out vec2 toFeat, out vec2 cellId, out float f2) {
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    float f1 = 9.0;
    f2 = 9.0;
    toFeat = vec2(0.0);
    cellId = ip;
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = hash22(ip + g);
        o = 0.5 + 0.40 * sin(TAU * o);
        vec2 r = g + o - fp;
        float d = dot(r, r);
        if (d < f1) { f2 = f1; f1 = d; toFeat = r; cellId = ip + g; }
        else if (d < f2) { f2 = d; }
      }
    }
    f2 = sqrt(f2);
    return sqrt(f1);
  }

  /* ---------------- riverbed ---------------- */

  vec3 riverbed(vec2 b, float lod, out float bedH, out vec3 bedN) {
    float grav = fbm3(b * 13.0);
    float grit = fbm2(b * 34.0);

    // pale sand and gravel between the stones
    vec3 col = mix(vec3(0.455, 0.455, 0.440), vec3(0.820, 0.780, 0.680), grav);
    col *= 0.90 + 0.20 * grit;

    bedH = grav * 0.08 + grit * 0.02;
    vec3 nrm = vec3(0.0, 0.0, 1.0);

    // large rounded stones
    vec2 tf, cid;
    float f2;
    float d = worley(b * 2.70, tf, cid, f2);
    float rad = mix(0.17, 0.38, hash12(cid + 11.3));
    float k = clamp(1.0 - (d * d) / (rad * rad), 0.0, 1.0);
    float dome = sqrt(k);
    float mask = smoothstep(0.0, 0.10, k);

    // contact shadow cast onto the gravel around each stone
    col *= 1.0 - 0.30 * smoothstep(rad * 1.50, rad * 1.02, d) * (1.0 - mask);

    vec3 stone = mix(vec3(0.395, 0.420, 0.450), vec3(0.790, 0.740, 0.640), hash12(cid + 3.7));
    stone *= 0.80 + 0.42 * hash12(cid + 21.1);
    stone *= 0.92 + 0.16 * fbm2(b * 26.0);
    col = mix(col, stone, mask);
    bedH += dome * mask * 0.60;
    nrm = mix(nrm, normalize(vec3(-tf / rad * 1.00, dome + 0.55)), mask);

    // small pebbles, dropped in the distance and on weak GPUs
    float small = uQuality * (1.0 - lod);
    if (small > 0.01) {
      vec2 tf2, cid2;
      float g2;
      float d2 = worley(b * 6.40 + 17.0, tf2, cid2, g2);
      float rad2 = mix(0.15, 0.34, hash12(cid2 + 5.1));
      float k2 = clamp(1.0 - (d2 * d2) / (rad2 * rad2), 0.0, 1.0);
      float dome2 = sqrt(k2);
      float mask2 = smoothstep(0.0, 0.12, k2) * small;

      vec3 pebble = mix(vec3(0.475, 0.490, 0.500), vec3(0.850, 0.805, 0.710), hash12(cid2 + 9.9));
      pebble *= 0.84 + 0.32 * hash12(cid2 + 31.7);
      col = mix(col, pebble, mask2 * 0.85);
      bedH += dome2 * mask2 * 0.25;
      nrm = mix(nrm, normalize(vec3(-tf2 / rad2 * 0.85, dome2 + 0.60)), mask2 * 0.7);
    }

    bedN = normalize(nrm);
    return col;
  }

  /* ---------------- baikamo (梅花藻), streaming with the current ---------------- */

  float baikamo(vec2 b, float t, out float flower) {
    flower = 0.0;
    float clump = smoothstep(0.46, 0.74, fbm3(b * 0.70 + 3.1));
    if (clump <= 0.001) return 0.0;

    vec2 q = b;
    q.y += 0.14 * sin(q.x * 1.6 + t * 1.1) + 0.06 * sin(q.x * 3.7 - t * 1.7);

    float fibers = fbm3(vec2(q.x * 3.2 - t * 1.35, q.y * 30.0));
    float m = smoothstep(0.47, 0.68, fibers) * clump;

    // sparse white blossoms riding on the surface
    vec2 fc = q * vec2(7.0, 20.0);
    vec2 fi = floor(fc);
    vec2 ff = fract(fc) - 0.5;
    float disc = smoothstep(0.030, 0.011, length(vec2(ff.x / 7.0, ff.y / 20.0)));
    flower = step(0.984, hash12(fi)) * disc * m;
    return m;
  }

  /* ---------------- caustic light net ---------------- */

  float causticOctave(vec2 p0, float t) {
    vec2 p = mod(p0 * TAU, TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;
    float inten = 0.0045;
    for (int n = 0; n < 5; n++) {
      float tt = t * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
    }
    c /= 5.0;
    c = 1.17 - pow(c, 1.4);
    return clamp(pow(abs(c), 8.0), 0.0, 1.0);
  }

  float caustics(vec2 p0, float t) {
    mat2 rot = mat2(0.8253, 0.5646, -0.5646, 0.8253);   // ~34 degrees
    float a = causticOctave(p0, t);
    float b = causticOctave(rot * p0 * 1.63 + 11.0, t * 1.21 + 4.0);
    return max(a, b * 0.85);
  }

  /* ---------------- main ---------------- */

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    float t = uTime;

    // Tilted ground plane: the bed recedes toward the top of the frame.
    float dist = 1.0 / (mix(1.78, 2.55, uCalm) - uv.y * mix(0.96, 0.80, uCalm));
    vec2 w = vec2((uv.x - 0.5) * aspect * dist, dist * 1.35) * mix(2.6, 3.1, uCalm);
    float lod = clamp((dist - 0.60) / 0.75, 0.0, 1.0);

    // Surface height, 4 taps around the sample for the normal.
    float e  = 0.0032 * (1.0 + dist);
    float hL = surfaceH(w - vec2(e, 0.0), t);
    float hR = surfaceH(w + vec2(e, 0.0), t);
    float hD = surfaceH(w - vec2(0.0, e), t);
    float hU = surfaceH(w + vec2(0.0, e), t);

    float amp = mix(0.055, 0.020, lod) * mix(1.0, 0.72, uCalm);
    vec2 grad = vec2(hR - hL, hU - hD) * (amp / (2.0 * e));
    vec3 N = normalize(vec3(-grad, 1.0));

    // Depth: shallow in the foreground, deepening upstream.
    float depth = clamp(0.22 + 0.30 * uv.y + 0.24 * (fbm3(w * 0.42) - 0.5), 0.04, 1.0);

    // Refracted lookup into the bed.
    vec2 b = w + grad * depth * 0.35;

    float bedH;
    vec3 bedN;
    vec3 bed = riverbed(b, lod, bedH, bedN);

    float flower;
    float weed = baikamo(b * 0.85, t, flower);
    vec3 weedCol = mix(vec3(0.085, 0.230, 0.150), vec3(0.200, 0.420, 0.235), fbm2(b * 5.0));
    bed = mix(bed, weedCol, weed * 0.88 * mix(1.0, 0.55, uCalm));
    bedN = normalize(mix(bedN, vec3(0.0, 0.0, 1.0), weed * 0.6));

    vec3 L = normalize(vec3(-0.30 + uPointer.x * 0.16, 0.42 + uPointer.y * 0.12, 0.86));
    vec3 V = vec3(0.0, 0.0, 1.0);

    // Bed shading + caustic net drifting downstream.
    bed *= 0.62 + 0.62 * clamp(dot(bedN, L), 0.0, 1.0);

    float ca = caustics(b * 0.95 - vec2(t * 0.05, 0.0), t * 0.5);
    ca *= mix(1.0, 0.30, lod) * mix(1.25, 0.60, depth) * mix(1.0, 0.58, uCalm);
    bed += (bed * 1.05 + vec3(0.30, 0.52, 0.55)) * ca * mix(0.70, 1.00, uTheme);

    // Water column: Beer-Lambert absorption of clear spring water.
    vec3 ext = vec3(1.05, 0.30, 0.17);
    float path = depth * mix(1.00, 1.55, lod);
    vec3 trans = exp(-ext * path * 1.05);
    vec3 scatter = mix(vec3(0.055, 0.215, 0.235), vec3(0.200, 0.500, 0.495), uTheme);

    vec3 col = bed * trans + scatter * (1.0 - trans);
    col += vec3(0.95, 0.97, 0.90) * flower * 0.90 * trans;

    // Sky reflected off the surface (Fresnel).
    float fres = 0.02 + 0.98 * pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 5.0);
    vec3 sky = mix(vec3(0.055, 0.085, 0.140), vec3(0.640, 0.760, 0.880), uTheme);
    col = mix(col, sky, clamp(fres * mix(0.55, 0.85, lod), 0.0, 0.90));

    // Specular glints on the ripples.
    vec3 H = normalize(L + V);
    float sparkle = smoothstep(0.25, 0.90, pow(clamp(dot(N, H), 0.0, 1.0), 240.0));
    col += mix(vec3(0.45, 0.72, 0.85), vec3(1.00, 0.98, 0.92), uTheme) * sparkle * 1.60 * mix(1.0, 0.45, uCalm);

    // Foam where stones break the shallow surface.
    float foam = smoothstep(0.62, 0.95, bedH) * smoothstep(0.42, 0.10, depth);
    foam *= 0.40 + 0.60 * smoothstep(0.35, 0.75, fbm2(w * 6.0 - vec2(t * 1.1, 0.0)));
    col = mix(col, mix(vec3(0.72, 0.85, 0.90), vec3(1.0), uTheme), foam * 0.55 * mix(1.0, 0.30, uCalm));

    // Haze into the page background upstream, then vignette.
    vec3 far = mix(vec3(0.030, 0.105, 0.135), vec3(0.780, 0.860, 0.900), uTheme);
    col = mix(col, far, smoothstep(0.50, 1.0, uv.y) * 0.60);

    // streaks of light dragged downstream
    float streak = smoothstep(0.55, 0.95, fbm2(vec2(w.x * 0.55 - t * 0.55, w.y * 4.2)));
    col += mix(vec3(0.06, 0.13, 0.15), vec3(0.10, 0.16, 0.16), uTheme) * streak * (1.0 - lod);

    vec2 vv = (uv - 0.5) * vec2(1.05, 1.0);
    col *= 1.0 - mix(0.26, 0.34, uCalm) * dot(vv, vv);
    col = clamp(col, 0.0, 1.0);
    col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
    col = pow(col, vec3(0.94));

    // Fade out under the sticky header and along the bottom edge.
    float a = smoothstep(1.0, 0.84, uv.y);
    gl_FragColor = vec4(col, a * mix(0.94, 0.88, uTheme));
  }
`;

function hasWebGL2() {
  try {
    const probe = document.createElement('canvas');
    return !!probe.getContext('webgl2');
  } catch (err) {
    return false;
  }
}

function boot() {
  const stage = document.querySelector('[data-seiryu-mode]');
  const canvas = stage && stage.querySelector('canvas');
  if (!stage || !canvas) return;

  const calm = stage.dataset.seiryuMode === 'calm' ? 1 : 0;
  const markOff = () => stage.setAttribute('data-seiryu-state', 'off');

  if (!hasWebGL2()) {
    markOff();
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: 'high-performance'
    });
  } catch (err) {
    markOff();
    return;
  }
  renderer.setClearColor(0x000000, 0);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = !window.matchMedia('(hover: hover)').matches;
  const weakGpu = coarse || (navigator.hardwareConcurrency || 8) <= 4;
  const maxDpr = weakGpu ? 1.25 : 1.75;

  const uniforms = {
    uRes: { value: new THREE.Vector2(1, 1) },
    uTime: { value: 6.0 },
    uTheme: { value: document.documentElement.getAttribute('data-theme') === 'light' ? 1 : 0 },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uQuality: { value: weakGpu ? 0.0 : 1.0 },
    uCalm: { value: calm }
  };

  // A calm ground should drift, not run.
  const timeScale = calm ? 0.55 : 1.0;

  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false
    })
  );
  scene.add(mesh);

  function resize() {
    const rect = stage.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w * dpr, h * dpr);
  }

  function draw() {
    renderer.render(scene, camera);
    stage.setAttribute('data-seiryu-state', 'on');
  }

  // --- still frame for reduced motion -------------------------------------
  if (reducedMotion.matches) {
    resize();
    draw();
    window.addEventListener('resize', () => { resize(); draw(); }, { passive: true });
    return;
  }

  // --- animated ------------------------------------------------------------
  const pointerTarget = new THREE.Vector2(0, 0);
  let themeTarget = uniforms.uTheme.value;
  let last = performance.now();
  let rafId = 0;
  let onScreen = true;
  let running = false;

  function frame(now) {
    rafId = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;

    uniforms.uTime.value += dt * timeScale;
    uniforms.uTheme.value += (themeTarget - uniforms.uTheme.value) * Math.min(1, dt * 4.0);
    uniforms.uPointer.value.lerp(pointerTarget, Math.min(1, dt * 2.5));

    draw();
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(rafId);
  }

  function sync() {
    if (onScreen && document.visibilityState === 'visible') start();
    else stop();
  }

  resize();

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); if (!running) draw(); }, 120);
  }, { passive: true });

  document.addEventListener('visibilitychange', sync);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      sync();
    }, { threshold: 0 }).observe(stage);
  }

  if (!coarse) {
    window.addEventListener('pointermove', (ev) => {
      pointerTarget.set(
        (ev.clientX / window.innerWidth) * 2 - 1,
        1 - (ev.clientY / window.innerHeight) * 2
      );
    }, { passive: true });
  }

  new MutationObserver(() => {
    themeTarget = document.documentElement.getAttribute('data-theme') === 'light' ? 1 : 0;
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  reducedMotion.addEventListener('change', (ev) => { if (ev.matches) stop(); else sync(); });

  renderer.domElement.addEventListener('webglcontextlost', (ev) => { ev.preventDefault(); stop(); });
  renderer.domElement.addEventListener('webglcontextrestored', () => { resize(); sync(); });

  sync();
}

boot();
