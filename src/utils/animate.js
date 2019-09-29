export default function animate(draw) {
  if (typeof window === "undefined") {
    return;
  }
  let myReq;
  
  window.requestAnimationFrame(function animate() {
    const isContinue = draw();

    if (isContinue) {
      myReq = window.requestAnimationFrame(animate);
    } else {
      window.cancelAnimationFrame(myReq)
    }
  });
}
