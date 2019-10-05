import { moveFirstUnit, moveSecondUnit, updateSpeed } from "../game/move.js";
import { generateSkill } from "../game/enemyBehaviour.js";
import { isPlayingStore } from "../stores/states.js";
import { get } from "svelte/store";

export function startGame() {
  animate(moveFirstUnit);
  animate(moveSecondUnit);
  updateSpeed();
  generateSkill();
}

let isContinue = true;
export default function animate(draw) {
  if (typeof window === "undefined") {
    return;
  }
  const isPlaying = get(isPlayingStore);
  let req;

  if (isContinue && isPlaying) {
    req = window.requestAnimationFrame(() => {
      isContinue = draw();
      animate(draw);
    });
  } else {
    window.cancelAnimationFrame(req);
  }
}
