const G = 100000;    // somewhat scaled G...

const _newt = (p1, p2) => (G * p1.m * p2.m) / _mod2(_sub(p1.o, p2.o));    // universal law of gravity...

// return the acceleration between two points
const _acc = (p1, p2) => {
  var d = _sub(p2.o, p1.o);
  var r2 = _mod2(d);
  var n = _div(d, Math.sqrt(r2));
  return [_mul(n, p2.m / r2), _mul(n, p1.m / r2)];
};

const _doit = (pts, dt) => {
  momentum = 0;
  for (var i = 0; i < pts.length; i++) {
    for (var j = i + 1; j < pts.length; j++) {
      var acc = _acc(pts[i], pts[j]);
      pts[i].v = _add(pts[i].v, _mul(acc[0], dt));    // fraction of acc to add to the velocity...
      pts[j].v = _add(pts[j].v, _mul(acc[1], dt));
    }
    _pipe_push(pts[i].trail, pts[i].o, pts[i].tmax);
    pts[i].o = _add(pts[i].o, _mul(pts[i].v, dt));    // fraction of the velocity to add to the position...
  }
};

const _doit2 = (pts, dt) => {};
