import { firstUnitStore } from "../stores/firstUnit.js";
import { isPlayingStore } from "../stores/states.js";
import { freezeGame } from "../game/freezeGame.js";
import { get } from "svelte/store";

export const restoreEnergy = () => {
  const interval = setInterval(() => {
    freezeGame(interval);
    if (get(firstUnitStore).energy < 100) {
      firstUnitStore.restore(1);
    }
  }, 1000);
};
