// particle

const _calr = (m, d) => Math.ceil(m / d); // d = m / v

const _cald = (m, r) => m / r;

const _particle = (m, d, o, v, tmax) => {
  var _m = m;

  var _d = d;

  var _r = _calr(m, d);

  var _o = o;

  var _v = v;

  var _trail = [];

  var _tmax = tmax;
  return {
    m: _m,

    d: _d,

    r: _r,

    o: _o,

    v: _v,

    trail: _trail,

    tmax: _tmax,
  };
};
