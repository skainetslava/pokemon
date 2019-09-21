export default function animate({ draw, duration }){
    if(typeof window === "undefined") {
        return;
    }
    let start = Date.now();

    window.requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      draw(); 

      if (timeFraction < 1) {
        window.requestAnimationFrame(animate);
      }
    });
  };