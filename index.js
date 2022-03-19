// default camera and mouse controls
var camera = _camera([0, 0], 1);
var mouse = _mouseState();
var doUpdate = false;

const tmax = 30;        // length of trail
const spread = 500;     // spread of bodies
const total = 500;      // total number of bodies
const v_spread = 50;    // spread of velocity
const m_spread = 100;   // mass spread

const _genv = () => [_randns(spread), _randns(spread)];

const _genp = () => {
  var m = 1 + _rand(m_spread);
  var d = m;                      
  return _particle(m, d, _genv(), [_randns(v_spread), _randns(v_spread)], tmax);
};

var pts = Array.from({ length: total }, () => _genp());
pts.push(_particle(50000, _cald(50000, 10), [0, 0], [0, 0], tmax));  // a black hole!

ctx.canvas.addEventListener("wheel", (e) => {
  camera = camera.zoom([e.x, e.y], e.deltaY > 0 ? 0.9 : 1.1);
});

ctx.canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

ctx.canvas.addEventListener("mousedown", (event) => {
  mouse = _updateMouseState(mouse, {
    s: [event.x, event.y],
    f: [event.x, event.y],
  });
  switch (event.button) {
    case 0:
      mouse = _updateMouseState(mouse, { l: true });
      break;
    case 2:
      mouse = _updateMouseState(mouse, { r: true });
      break;
  }
});

ctx.canvas.addEventListener("mousemove", (event) => {
  mouse = _updateMouseState(mouse, { f: [event.x, event.y] });
  if (mouse.r) {
    camera = _camera(_add(camera.o, _sub(mouse.f, mouse.s)), camera.z);
    mouse = _updateMouseState(mouse, { s: mouse.f });
  }
});

ctx.canvas.addEventListener("mouseup", (event) => {
  mouse = _updateMouseState(mouse, { f: [event.x, event.y] });
  switch (event.button) {
    case 0:
      mouse = _updateMouseState(mouse, { l: false });
      break;
    case 2:
      mouse = _updateMouseState(mouse, { r: false });
      break;
  }
});

doUpdate = true;

const grads = Array.from(
  { length: tmax },
  (_, i) => `rgb(${10 + i * 5}, ${10 + i * 5}, ${10 + i * 5})`
);

const draw = () => {
  ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.setTransform(_affineToDOM(camera.t));
  pts.forEach((p) => {
    p.trail.forEach((pt, i) => {
      ctx.strokeStyle = grads[i];
      ctx.strokeRect(pt[0], pt[1], 1, 1);
    });
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(p.o[0], p.o[1], p.r, 0, 2 * Math.PI, false);
    ctx.fill();
  });
  ctx.restore();
};

const update = (dt) => {
  doUpdate = false;
  _doit(pts, dt);
  doUpdate = true;
};
