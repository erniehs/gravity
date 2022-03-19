var ctx = document.getElementById("grid").getContext("2d");
var doDraw, doUpdate = false;

const resize = () => {
  ctx.canvas.width = ctx.canvas.parentElement.clientWidth;
  ctx.canvas.height = ctx.canvas.parentElement.clientHeight;
};

window.addEventListener("wheel", (e) => {});

window.addEventListener("resize", () => {
  resize();
  if (doDraw) draw(); // TODO throttle
});

window.addEventListener("keyup", (e) => {});

window.addEventListener("load", () => {
  resize();
  draw();
});

window.addEventListener("load", () => {
  doDraw = true;
  loop(performance.now());
});

var last = performance.now();
var delta = 0;

const loop = (t) => {
  window.requestAnimationFrame(loop);
  delta = t - last;
  last = t;
  if (doUpdate) update(delta / 1000.0);   // send dt in seconds
  if (doDraw) draw();
};

