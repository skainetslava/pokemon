export default function animate(draw) {
  if (typeof window === "undefined") {
    return;
  }

  window.requestAnimationFrame(function animate() {
    const isContinue = draw();
    if (isContinue) {
      window.requestAnimationFrame(animate);
    }
  });
}
