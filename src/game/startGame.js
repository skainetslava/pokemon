import { moveFirstUnit, moveSecondUnit, updateSpeed } from "../game/move.js";
import { restoreEnergy } from "../game/restoreStats.js";
import { generateSkill } from "../game/enemyBehaviour.js";
import { isPlayingStore, isEndedGame } from "../stores/states.js";
import { get } from "svelte/store";

export function startGame(isPlaying) {
  if (isPlaying) {
    animate(moveFirstUnit);
    animate(moveSecondUnit);
    updateSpeed();
    generateSkill();
    restoreEnergy();
  }
}

export function checkEndingGame(healthFirstUnit, healthSecondUnit) {
  if (healthFirstUnit < 0 || healthSecondUnit < 0) {
    isEndedGame.update(() => true);
    isPlayingStore.update(() => false);
  }
}

let isContinue = true;
export function animate(draw) {
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
