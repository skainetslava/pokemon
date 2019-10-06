import { skillsStore } from "../stores/skills.js";
import { freezeGame } from "./freezeGame.js";

export function generateSkill() {
  const interval = setInterval(() => {
    freezeGame(interval);
    skillsStore.add({has: "enemy", type: "standart"});
  }, 4000);
}
