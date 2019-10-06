import { get } from "svelte/store";
import { isPlayingStore } from "../stores/states.js";

export function freezeGame(timer) {
  if (!get(isPlayingStore)) {
    clearInterval(timer);
  }
}
