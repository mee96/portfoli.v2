/* ------------------------------------------------------------------ */
/* Background: animated "Digital Lavender" mesh gradient               */
/* ------------------------------------------------------------------ */

export const meshVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const meshFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform float uScroll;

  float blob(vec2 p, vec2 c, float r) {
    vec2 d = p - c;
    return exp(-dot(d, d) / (r * r));
  }

  float grain(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    float t = uTime * 0.07;
    vec2 p = vUv;
    p.x *= uAspect;
    // Soft domain warp so the colour fields drift like ink in water.
    p += 0.06 * vec2(sin(p.y * 3.1 + t * 2.0), cos(p.x * 2.3 - t * 1.6));
    float s = uScroll * 0.18;
    float w = uAspect;

    vec3 col = vec3(0.949, 0.945, 0.984);                                   // near-white paper
    col = mix(col, vec3(0.686, 0.659, 0.988), 0.75 * blob(p, vec2(w * (0.18 + 0.10 * sin(t * 1.1)), 0.78 - s + 0.10 * cos(t * 0.9)), 0.55)); // lilac
    col = mix(col, vec3(0.565, 0.537, 0.918), 0.62 * blob(p, vec2(w * (0.86 + 0.08 * cos(t * 0.8)), 0.92 - s * 0.6 + 0.08 * sin(t * 1.3)), 0.50)); // periwinkle
    col = mix(col, vec3(0.655, 0.718, 0.965), 0.50 * blob(p, vec2(w * (0.70 + 0.12 * sin(t * 0.7)), 0.18 + s * 0.4 + 0.10 * cos(t)), 0.48)); // cool blue lift
    col = mix(col, vec3(0.988, 0.984, 1.0), 0.70 * blob(p, vec2(w * (0.45 + 0.15 * cos(t * 0.6)), 0.52 + 0.12 * sin(t * 0.8)), 0.36)); // white bloom
    col += (grain(gl_FragCoord.xy + uTime) - 0.5) / 255.0;                   // de-banding
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ------------------------------------------------------------------ */
/* Glass bubble                                                        */
/* ------------------------------------------------------------------ */

const noise = /* glsl */ `
  float hash3(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise3(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash3(i), hash3(i + vec3(1, 0, 0)), f.x), mix(hash3(i + vec3(0, 1, 0)), hash3(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash3(i + vec3(0, 0, 1)), hash3(i + vec3(1, 0, 1)), f.x), mix(hash3(i + vec3(0, 1, 1)), hash3(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
`;

export const glassVertex = /* glsl */ `
  attribute vec3 aBlob;
  attribute vec3 nBlob;
  attribute vec3 aHelix;
  attribute vec3 nHelix;
  attribute vec3 aCode;
  attribute vec3 nCode;
  attribute vec3 aHeart;
  attribute vec3 nHeart;
  attribute float aStrand;

  uniform vec4 uW;          // weights: blob, helix, code '< >', heart
  uniform float uTime;
  uniform float uSpin;      // helix twist around its own axis
  uniform float uBlobSpin;
  uniform float uSway;      // heart and '< >': gentle turn left/right

  varying vec3 vN;
  varying vec3 vView;
  varying float vStrand;

  ${noise}

  mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
  }

  void main() {
    mat3 rb = rotY(uBlobSpin);
    mat3 rh = rotY(uSpin);
    mat3 rs = rotY(uSway);
    mat3 rc = rotY(uSway * 0.6);
    vec3 p = rb * aBlob * uW.x + rh * aHelix * uW.y + rc * aCode * uW.z + rs * aHeart * uW.w;
    vec3 n = normalize(rb * nBlob * uW.x + rh * nHelix * uW.y + rc * nCode * uW.z + rs * nHeart * uW.w + 1e-5);

    // Liquid wobble: every organic shape breathes like the first bubble,
    // and everything goes extra liquid while it is between two forms.
    float top = max(max(uW.x, uW.y), max(uW.z, uW.w));
    float between = clamp((1.0 - top) * 2.2, 0.0, 1.0);
    float amp = 0.012 + 0.07 * uW.x + 0.06 * uW.y + 0.05 * uW.z + 0.07 * uW.w + 0.18 * between;
    float wob = noise3(p * 1.4 + vec3(0.0, uTime * 0.35, uTime * 0.2)) - 0.5;
    p += n * wob * amp * 2.0;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vView = mv.xyz;
    vN = normalize(normalMatrix * n);
    vStrand = aStrand;
    gl_Position = projectionMatrix * mv;
  }
`;

export const glassFragment = /* glsl */ `
  precision highp float;

  uniform sampler2D uBg;
  uniform vec2 uRes;
  uniform vec4 uW;
  uniform float uTime;

  varying vec3 vN;
  varying vec3 vView;
  varying float vStrand;

  void main() {
    // Helix and '< >' are two separate bubbles: hide the membrane between them.
    // That is the only difference between shapes: the glass itself is always the
    // same bubble, it just changes shape.
    float bridge = 1.0 - abs(2.0 * vStrand - 1.0);
    float alpha = 1.0 - step(0.002, bridge) * smoothstep(0.5, 0.85, uW.y + uW.z);
    if (alpha < 0.01) discard;

    vec3 N = normalize(vN);
    if (!gl_FrontFacing) N = -N;
    vec3 V = normalize(-vView);
    float ndv = clamp(dot(N, V), 0.0, 1.0);
    float fres = pow(1.0 - ndv, 3.0);

    // Refraction of the mesh gradient behind, with a little chromatic split.
    vec2 suv = gl_FragCoord.xy / uRes;
    vec2 off = N.xy * (0.09 + 0.22 * (1.0 - ndv));
    vec3 refr = vec3(
      texture2D(uBg, suv - off * 1.00).r,
      texture2D(uBg, suv - off * 1.07).g,
      texture2D(uBg, suv - off * 1.14).b);
    // Slight absorption so the glass reads against a light page.
    vec3 col = refr * mix(vec3(0.86, 0.84, 0.97), vec3(1.0), fres);

    // Thin-film iridescence, kept inside the site palette: lilac, cyan, a touch of pink.
    float phase = (1.0 - ndv) * 1.3 + uTime * 0.03;
    float f1 = 0.5 + 0.5 * cos(6.2831 * phase);
    float f2 = 0.5 + 0.5 * cos(6.2831 * (phase + 0.33));
    vec3 film = vec3(0.74, 0.66, 1.0) * (1.0 - 0.45 * f2) + vec3(0.42, 0.86, 0.95) * f1 * 0.4 + vec3(1.0, 0.62, 0.86) * f2 * 0.32;
    col = mix(col, col * 0.75 + film * 0.32, fres * 0.85);

    // Studio reflections (soft box on top, two strip lights on the sides).
    vec3 R = reflect(-V, N);
    float softbox = smoothstep(0.8, 0.97, R.y) * smoothstep(0.6, 0.2, abs(R.x));
    float strips = smoothstep(0.93, 0.99, abs(R.x)) * smoothstep(0.0, 0.5, R.y);
    col += softbox * 0.28 + strips * 0.3;

    vec3 L1 = normalize(vec3(0.5, 0.8, 0.6));
    vec3 L2 = normalize(vec3(-0.7, -0.35, 0.6));
    col += pow(max(dot(N, normalize(L1 + V)), 0.0), 160.0) * 1.1;
    col += pow(max(dot(N, normalize(L2 + V)), 0.0), 90.0) * 0.45;
    col += fres * 0.12;

    gl_FragColor = vec4(col, alpha);
  }
`;
