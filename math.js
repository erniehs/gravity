const _randn = (n) => Math.floor(Math.random() * n);

const _randns = (n) => n / 2 - _randn(n);

const _rand = () => 0.5 - Math.random();

const _add = (a, b) => [a[0] + b[0], a[1] + b[1]];

const _sub = (a, b) => [a[0] - b[0], a[1] - b[1]];

const _mul = (a, b) => [a[0] * b, a[1] * b];

const _div = (a, b) => [a[0] / b, a[1] / b];

const _hadmard = (a, b) => [a[0] * b[0], a[1] * b[1]];

const _dot = (a, b) => a[0] * b[0] + a[1] * b[1];

const _mod2 = (a) => _dot(a, a);

const _mod = (a) => Math.sqrt(_mod2(a));

const _norm = (v) => _div(v, _mod(v));

const _round = (v) => v.map((e) => Math.round(e));

// affine matrix stuff
const _affine = (m00, m01, m02, m10, m11, m12) => [
  m00,
  m01,
  m02,
  m10,
  m11,
  m12,
  0,
  0,
  1,
];

const _affineI = _affine(1, 0, 0, 0, 1, 0);

const _affineToDOM = (a) => ({
  a: a[0],
  b: a[3],
  c: a[1],
  d: a[4],
  e: a[2],
  f: a[5],
});

const _affineT = (v) => _affine(1, 0, v[0], 0, 1, v[1]);

const _affineS = (v) => _affine(v[0], 0, 0, 0, v[1], 0);

const _affineR = (a) =>
  _affine(Math.cos(a), Math.sin(a), 0, -Math.sin(a), Math.cos(a), 0);

const _affineMM = (m1, m2) =>
  _affine(
    m1[0] * m2[0] + m1[1] * m2[3],
    m1[0] * m2[1] + m1[1] * m2[4],
    m1[0] * m2[2] + m1[1] * m2[5] + m1[2],
    m1[3] * m2[0] + m1[4] * m2[3],
    m1[3] * m2[1] + m1[4] * m2[4],
    m1[3] * m2[2] + m1[4] * m2[5] + m1[5]
  );

const _affineMV = (m, v) => [
  m[0] * v[0] + m[1] * v[1] + m[2],
  m[3] * v[0] + m[4] * v[1] + m[5],
];

// arry stuff

const _pipe_push = (arry, item, size) => arry.push(item) > size ? arry.shift() : arry;