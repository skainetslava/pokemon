import { secondUnitStore } from "../stores/secondUnit.js";
import { skillsStore } from "../stores/skills.js";

export function generateSkill() {
  setInterval(() => {
    skillsStore.add("enemy");
  }, 4000);
}
