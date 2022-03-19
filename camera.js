const _camera = (o, z) => {
  var _o = o;

  var _z = z;

  var _t = _affineMM(_affineT(o), _affineS([z, z]));

  return {
    o: _o,

    z: _z,

    t: _t,

    zoom: function (p, dz) {
      var ncz = _z * dz;
      var dco = _sub(p, _o);
      var dp = _sub(_mul(dco, ncz), _mul(dco, _z));
      return _camera(_sub(_o, _div(dp, _z)), ncz);
    },

    inv: function (o) {
      return _div(_sub(o, _o), _z);
    },
  };
};

