import {
  BufferAttribute,
  FrontSide,
  Group,
  LinearFilter,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector4,
  WebGLRenderTarget,
  WebGLRenderer,
} from 'three';
import { buildShapes } from './bubble-shapes';
import { glassFragment, glassVertex, meshFragment, meshVertex } from './bubble-shaders';

type Weights = [number, number, number, number]; // blob, helix, code '< >', heart

/** Where the bubble sits and which shape it has. x/y are fractions of the half viewport. */
interface Pose {
  w: Weights;
  x: number;
  y: number;
  scale: number;
}

interface Stop {
  /** Section id; `null` = top of the page. */
  id: string | null;
  desktop: Pose;
  mobile: Pose;
}

const BLOB: Weights = [1, 0, 0, 0];
const HELIX: Weights = [0, 1, 0, 0];
const CODE: Weights = [0, 0, 1, 0];
const HEART: Weights = [0, 0, 0, 1];

/** The bubble is her: it takes shape through healthcare (DNA), then code ('< >'), and ends as a heart. */
const STOPS: Stop[] = [
  { id: null, desktop: { w: BLOB, x: 0.5, y: 0.2, scale: 0.74 }, mobile: { w: BLOB, x: 0.42, y: 0.5, scale: 0.42 } },
  { id: 'plate', desktop: { w: HELIX, x: 0.72, y: -0.02, scale: 0.66 }, mobile: { w: HELIX, x: 0.62, y: 0.1, scale: 0.5 } },
  { id: 'experience', desktop: { w: HELIX, x: 0.74, y: 0.0, scale: 0.66 }, mobile: { w: HELIX, x: 0.66, y: 0.0, scale: 0.48 } },
  { id: 'skills', desktop: { w: CODE, x: 0.66, y: 0.56, scale: 0.5 }, mobile: { w: CODE, x: 0.45, y: -0.6, scale: 0.36 } },
  { id: 'training-log', desktop: { w: CODE, x: 0.78, y: 0.28, scale: 0.46 }, mobile: { w: CODE, x: 0.5, y: -0.58, scale: 0.32 } },
  { id: 'contact', desktop: { w: HEART, x: 0.66, y: 0.5, scale: 0.48 }, mobile: { w: HEART, x: 0.52, y: -0.42, scale: 0.32 } },
];

const FOV = 35;
const CAMERA_Z = 6;

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export class BubbleScene {
  private readonly renderer: WebGLRenderer;
  private readonly camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
  private readonly scene = new Scene();
  private readonly bgScene = new Scene();
  private readonly bgCamera = new PerspectiveCamera();
  private readonly bgTarget = new WebGLRenderTarget(1, 1, { minFilter: LinearFilter, magFilter: LinearFilter });
  private readonly group = new Group();
  private readonly bgMaterial: ShaderMaterial;
  private readonly glassMaterial: ShaderMaterial;
  private readonly glass: Mesh;

  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  private readonly pose: Pose = { w: [...BLOB], x: STOPS[0].desktop.x, y: STOPS[0].desktop.y, scale: STOPS[0].desktop.scale };
  private readonly pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  private frame = 0;
  private last = performance.now();
  private time = 0;
  private first = true;

  /** @param onFirstFrame called once the first frame is on screen (to swap out the CSS fallback). */
  constructor(
    canvas: HTMLCanvasElement,
    private onFirstFrame?: () => void,
  ) {
    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.autoClear = false;
    this.camera.position.z = CAMERA_Z;

    // Background mesh gradient (full-screen quad in clip space).
    this.bgMaterial = new ShaderMaterial({
      vertexShader: meshVertex,
      fragmentShader: meshFragment,
      uniforms: { uTime: { value: 0 }, uAspect: { value: 1 }, uScroll: { value: 0 } },
      depthTest: false,
      depthWrite: false,
    });
    const bg = new Mesh(new PlaneGeometry(2, 2), this.bgMaterial);
    bg.frustumCulled = false;
    this.bgScene.add(bg);

    // One sphere, four precomputed shapes.
    const small = window.innerWidth < 700;
    const widthSegments = small ? 128 : 192;
    const sphere = new SphereGeometry(1, widthSegments, small ? 96 : 144);
    const shapes = buildShapes(sphere.attributes['position'].array, sphere.attributes['uv'].array, widthSegments);
    sphere.setAttribute('aBlob', new BufferAttribute(shapes.blob, 3));
    sphere.setAttribute('nBlob', new BufferAttribute(shapes.blobNormal, 3));
    sphere.setAttribute('aHelix', new BufferAttribute(shapes.helix, 3));
    sphere.setAttribute('nHelix', new BufferAttribute(shapes.helixNormal, 3));
    sphere.setAttribute('aCode', new BufferAttribute(shapes.code, 3));
    sphere.setAttribute('nCode', new BufferAttribute(shapes.codeNormal, 3));
    sphere.setAttribute('aHeart', new BufferAttribute(shapes.heart, 3));
    sphere.setAttribute('nHeart', new BufferAttribute(shapes.heartNormal, 3));
    sphere.setAttribute('aStrand', new BufferAttribute(shapes.strand, 1));

    this.glassMaterial = new ShaderMaterial({
      vertexShader: glassVertex,
      fragmentShader: glassFragment,
      transparent: true,
      side: FrontSide,
      uniforms: {
        uBg: { value: this.bgTarget.texture },
        uRes: { value: [1, 1] },
        uW: { value: new Vector4(1, 0, 0, 0) },
        uTime: { value: 0 },
        uSpin: { value: 0 },
        uBlobSpin: { value: 0 },
        uSway: { value: 0 },
      },
    });
    this.glass = new Mesh(sphere, this.glassMaterial);
    this.glass.frustumCulled = false;
    this.group.add(this.glass);
    this.scene.add(this.group);

    window.addEventListener('resize', this.resize, { passive: true });
    window.addEventListener('pointermove', this.onPointer, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibility);
    this.resize();
    this.frame = requestAnimationFrame(this.tick);
  }

  dispose(): void {
    cancelAnimationFrame(this.frame);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('pointermove', this.onPointer);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.glass.geometry.dispose();
    this.glassMaterial.dispose();
    this.bgMaterial.dispose();
    this.bgTarget.dispose();
    this.renderer.dispose();
  }

  private readonly resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, w < 700 ? 1.5 : 1.75);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    // The refraction source is blurry anyway: half resolution is plenty.
    this.bgTarget.setSize(Math.max(1, Math.round((w * dpr) / 2)), Math.max(1, Math.round((h * dpr) / 2)));
    this.bgMaterial.uniforms['uAspect'].value = w / h;
    this.glassMaterial.uniforms['uRes'].value = [w * dpr, h * dpr];
  };

  private readonly onPointer = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    this.pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };

  private readonly onVisibility = () => {
    cancelAnimationFrame(this.frame);
    if (!document.hidden) {
      this.last = performance.now();
      this.frame = requestAnimationFrame(this.tick);
    }
  };

  /** Pose for the current scroll position, interpolated between section stops. */
  private targetPose(): Pose {
    const vh = window.innerHeight;
    const mobile = window.innerWidth < 760;
    const y = window.scrollY;
    const anchors = STOPS.map((s) => {
      if (!s.id) return 0;
      const el = document.getElementById(s.id);
      return el ? el.getBoundingClientRect().top + y - vh * 0.55 : Number.POSITIVE_INFINITY;
    });

    let i = 0;
    while (i < STOPS.length - 1 && y >= anchors[i + 1]) i++;
    const from = mobile ? STOPS[i].mobile : STOPS[i].desktop;
    if (i === STOPS.length - 1 || !Number.isFinite(anchors[i + 1])) return from;

    const to = mobile ? STOPS[i + 1].mobile : STOPS[i + 1].desktop;
    const raw = (y - anchors[i]) / Math.max(1, anchors[i + 1] - anchors[i]);
    // Hold the shape for a while, then morph in the middle of the way.
    const t = smoothstep(0.3, 0.9, raw);
    return {
      w: from.w.map((v, j) => lerp(v, to.w[j], t)) as Weights,
      x: lerp(from.x, to.x, t),
      y: lerp(from.y, to.y, t),
      scale: lerp(from.scale, to.scale, t),
    };
  }

  private readonly tick = (now: number) => {
    this.frame = requestAnimationFrame(this.tick);
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    const still = this.reducedMotion.matches;
    if (!still) this.time += dt;
    const t = this.time;

    // Ease towards the scroll pose (instant on the first frame / with reduced motion).
    const target = this.targetPose();
    const k = this.first || still ? 1 : 1 - Math.exp(-dt * 5);
    this.first = false;
    const p = this.pose;
    for (let j = 0; j < 4; j++) p.w[j] = lerp(p.w[j], target.w[j], k);
    p.x = lerp(p.x, target.x, k);
    p.y = lerp(p.y, target.y, k);
    p.scale = lerp(p.scale, target.scale, k);
    this.pointer.x = lerp(this.pointer.x, this.pointer.tx, 1 - Math.exp(-dt * 3));
    this.pointer.y = lerp(this.pointer.y, this.pointer.ty, 1 - Math.exp(-dt * 3));

    const [wb, wh, wc, wl] = p.w;
    const halfH = Math.tan(((FOV / 2) * Math.PI) / 180) * CAMERA_Z;
    const halfW = halfH * this.camera.aspect;
    const bob = still ? 0 : Math.sin(t * 0.8) * 0.06;
    this.group.position.set(p.x * halfW, p.y * halfH + bob, 0);
    this.group.scale.setScalar(p.scale);
    this.group.rotation.set(
      wb * 0.3 + wc * 0.1 + wl * 0.08 + this.pointer.y * 0.12,
      wc * -0.15 + this.pointer.x * 0.18,
      wb * -0.12 + wh * 0.4 + wl * Math.sin(t * 0.7) * 0.05,
    );

    const u = this.glassMaterial.uniforms;
    (u['uW'].value as Vector4).set(wb, wh, wc, wl);
    u['uTime'].value = t;
    u['uSpin'].value = t * 0.45 + window.scrollY * 0.0012;
    u['uBlobSpin'].value = t * 0.22 + window.scrollY * 0.0008;
    u['uSway'].value = Math.sin(t * 0.5) * 0.35;

    this.bgMaterial.uniforms['uTime'].value = t;
    this.bgMaterial.uniforms['uScroll'].value = window.scrollY / Math.max(1, document.documentElement.scrollHeight);

    const r = this.renderer;
    r.setRenderTarget(this.bgTarget);
    r.render(this.bgScene, this.bgCamera);
    r.setRenderTarget(null);
    r.clear();
    r.render(this.bgScene, this.bgCamera);
    r.render(this.scene, this.camera);

    if (this.onFirstFrame) {
      this.onFirstFrame();
      this.onFirstFrame = undefined;
    }
  };
}
