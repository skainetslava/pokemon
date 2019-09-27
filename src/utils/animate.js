export default function animate(draw, speed) {
  if (typeof window === "undefined") {
    return;
  }

  let then = Date.now();

  window.requestAnimationFrame(function animate() {
    let now = Date.now();

    const recalculate = now - then > 1000;

    if (recalculate) {
      then = Date.now();
    }
    const isContinue = draw({ recalculate, speed });

    if (isContinue) {
      window.requestAnimationFrame(animate);
    }
  });
}
