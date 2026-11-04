/**
 * Morph targets for the scroll bubble — a metaphor of the author herself,
 * still taking shape: bubble -> healthcare (DNA) -> code ('< >') -> heart.
 *
 * Every shape is computed once from the same sphere topology, so the GPU only
 * has to blend positions per vertex. All shapes stay soft and "inflated" so
 * the bubble never loses its essence.
 */

export const HELIX = { radius: 0.46, halfLength: 1.45, turns: 0.85, tube: 0.35 } as const;
/** '< >': each DNA strand becomes one bracket, so the two bubbles stay two bubbles. */
export const CODE = { gap: 0.8, width: 0.62, height: 0.68, tube: 0.25 } as const;

export interface BubbleShapes {
  blob: Float32Array;
  blobNormal: Float32Array;
  helix: Float32Array;
  helixNormal: Float32Array;
  code: Float32Array;
  codeNormal: Float32Array;
  heart: Float32Array;
  heartNormal: Float32Array;
  /** 0 for the first strand, 1 for the second; faces between them are hidden in helix and code mode. */
  strand: Float32Array;
}

type Vec3 = [number, number, number];
type RadialShape = (x: number, y: number, z: number) => Vec3;

const TAU = Math.PI * 2;

function normalize(v: Vec3): Vec3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/* ------------------------------------------------------------------ */
/* Shapes                                                              */
/* ------------------------------------------------------------------ */

/** Puffy four-lobed glass blob, flattened front-to-back (Bionova-style). */
const blobShape: RadialShape = (x, y, z) => {
  const a = Math.atan2(y, x);
  const lobe = Math.pow(0.5 + 0.5 * Math.cos(4 * a), 1.6);
  const r = 1 + 0.42 * lobe * (1 - z * z);
  return [x * r, y * r, z * r * 0.78];
};

/** Centre line of one bracket: strand 0 is '<', strand 1 is '>'. s = 0 top .. 1 bottom. */
function bracketCentre(s: number, strand: number): Vec3 {
  const dir = strand === 0 ? 1 : -1;
  const t = 2 * s - 1;
  const k = 0.2; // roundness of the corner
  const bend = (Math.sqrt(t * t + k * k) - k) / (Math.sqrt(1 + k * k) - k); // 0 at the tip, 1 at the arms
  const cx = strand === 0 ? -CODE.gap : CODE.gap;
  return [cx + dir * CODE.width * (bend - 0.5), -t * CODE.height, 0];
}

/** Puffy 3D heart (classic implicit heart surface), found by ray-marching from the centre. */
const heartShape: RadialShape = (x, y, z) => {
  const scale = 1.12;
  // Implicit heart: x = width, Y = height, Z = depth (the 9/4 term flattens the depth).
  const f = (r: number) => {
    const X = (x * r) / scale;
    const Y = (y * r) / scale + 0.12;
    const Z = (z * r) / scale;
    const q = X * X + 2.6 * Z * Z + Y * Y - 1;
    return q * q * q - X * X * Y * Y * Y - 0.1 * Z * Z * Y * Y * Y;
  };
  let lo = 0;
  let hi = 0.05;
  while (hi < 3 && f(hi) < 0) {
    lo = hi;
    hi += 0.05;
  }
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) < 0) lo = mid;
    else hi = mid;
  }
  const r = (lo + hi) / 2;
  return [x * r, y * r, z * r];
};

/** The heart, melted a little towards a sphere so it stays a bubble rather than an icon. */
const softHeartShape: RadialShape = (x, y, z) => {
  const h = heartShape(x, y, z);
  const k = 0.3;
  return [(h[0] * (1 - k) + x * k) * 1.05, (h[1] * (1 - k) + y * k) * 1.05, (h[2] * (1 - k) + z * k) * 1.05];
};

/* ------------------------------------------------------------------ */
/* Normals                                                             */
/* ------------------------------------------------------------------ */

/** Seam-free normal of a radial shape, by finite differences on the unit sphere. */
function radialNormal(shape: RadialShape, d: Vec3): Vec3 {
  const up: Vec3 = Math.abs(d[1]) > 0.99 ? [1, 0, 0] : [0, 1, 0];
  const t1 = normalize(cross(d, up));
  const t2 = cross(d, t1);
  const e = 1e-3;
  const p0 = shape(...d);
  const p1 = shape(...normalize([d[0] + e * t1[0], d[1] + e * t1[1], d[2] + e * t1[2]]));
  const p2 = shape(...normalize([d[0] + e * t2[0], d[1] + e * t2[1], d[2] + e * t2[2]]));
  const n = normalize(cross(sub(p1, p0), sub(p2, p0)));
  return dot(n, p0) < 0 ? [-n[0], -n[1], -n[2]] : n;
}

/* ------------------------------------------------------------------ */
/* Build                                                               */
/* ------------------------------------------------------------------ */

/**
 * @param position unit-sphere positions (THREE.SphereGeometry, radius 1)
 * @param uv       matching uvs
 * @param widthSegments sphere widthSegments (must be even)
 */
export function buildShapes(position: ArrayLike<number>, uv: ArrayLike<number>, widthSegments: number): BubbleShapes {
  const count = position.length / 3;
  const shapes: BubbleShapes = {
    blob: new Float32Array(count * 3),
    blobNormal: new Float32Array(count * 3),
    helix: new Float32Array(count * 3),
    helixNormal: new Float32Array(count * 3),
    code: new Float32Array(count * 3),
    codeNormal: new Float32Array(count * 3),
    heart: new Float32Array(count * 3),
    heartNormal: new Float32Array(count * 3),
    strand: new Float32Array(count),
  };

  const half = widthSegments / 2;
  const { radius, halfLength, turns, tube } = HELIX;
  const dTheta = turns * TAU;

  for (let i = 0; i < count; i++) {
    const d = normalize([position[i * 3], position[i * 3 + 1], position[i * 3 + 2]]);
    const k = i * 3;
    const u = uv[i * 2];
    const s = 1 - uv[i * 2 + 1];

    shapes.blob.set(blobShape(...d), k);
    shapes.blobNormal.set(radialNormal(blobShape, d), k);
    shapes.heart.set(softHeartShape(...d), k);
    shapes.heartNormal.set(radialNormal(softHeartShape, d), k);

    // Helix: the sphere's columns are split in two halves, one soft elongated
    // bubble per strand. Each half gets its own full turn so both close.
    const column = Math.round(u * widthSegments);
    const strand = column < half ? 0 : 1;
    const ul = strand === 0 ? column / (half - 1) : (column - half) / half;

    const theta = s * dTheta + strand * Math.PI;
    const c: Vec3 = [radius * Math.cos(theta), (0.5 - s) * 2 * halfLength, radius * Math.sin(theta)];
    const tangent = normalize([-radius * Math.sin(theta) * dTheta, -2 * halfLength, radius * Math.cos(theta) * dTheta]);
    const nrm: Vec3 = [Math.cos(theta), 0, Math.sin(theta)];
    // Same handedness as the bracket ring below, so the triangles keep facing outwards
    // (with cross(tangent, nrm) the tube was inside-out: its front was culled and only
    // the far inner wall showed, which the glass shader rendered as pure white rim).
    const bin = cross(nrm, tangent);
    const ang = ul * TAU;
    const ring = normalize([
      Math.cos(ang) * nrm[0] + Math.sin(ang) * bin[0],
      Math.cos(ang) * nrm[1] + Math.sin(ang) * bin[1],
      Math.cos(ang) * nrm[2] + Math.sin(ang) * bin[2],
    ]);
    // Rounded, bubble-like ends and a gentle swell in the middle of each strand.
    const r = tube * Math.sqrt(Math.sin(Math.PI * s)) * (0.85 + 0.15 * Math.sin(Math.PI * s));

    shapes.helix.set([c[0] + ring[0] * r, c[1] + ring[1] * r, c[2] + ring[2] * r], k);
    shapes.helixNormal.set(ring, k);
    shapes.strand[i] = strand;

    // Code: the same strand, same ring, bent into a bracket lying in the screen plane.
    const e = 1e-4;
    const bc = bracketCentre(s, strand);
    const bt = normalize(sub(bracketCentre(Math.min(1, s + e), strand), bracketCentre(Math.max(0, s - e), strand)));
    const depth: Vec3 = [0, 0, 1];
    const side = normalize(cross(bt, depth));
    const bring = normalize([
      Math.cos(ang) * side[0] + Math.sin(ang) * depth[0],
      Math.cos(ang) * side[1] + Math.sin(ang) * depth[1],
      Math.cos(ang) * side[2] + Math.sin(ang) * depth[2],
    ]);
    const br = CODE.tube * Math.sqrt(Math.sin(Math.PI * s)) * (0.88 + 0.12 * Math.sin(Math.PI * s));
    shapes.code.set([bc[0] + bring[0] * br, bc[1] + bring[1] * br, bc[2] + bring[2] * br], k);
    shapes.codeNormal.set(bring, k);
  }

  return shapes;
}
