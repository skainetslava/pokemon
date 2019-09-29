import { firstUnitStore } from "../stores/firstUnit.js";
import { secondUnitStore } from "../stores/secondUnit.js";
import { getRandomInteger } from "../utils/getRandomInteger.js";
import { get } from "svelte/store";

let value = getRandomInteger(0, 5);
let value1 = getRandomInteger(0, 5);

export const updateSpeed = () => {
  setInterval(() => {
    value = getRandomInteger(-5, 5);
    value1 = getRandomInteger(-5, 5);
  }, 1000);
};

export function moveFirstUnit(heightField, heightUnit) {
  let firstStore = get(firstUnitStore);
  if (firstStore.y > heightField - heightUnit) {
    value = -value;
  }

  if (firstStore.y <= -5) {
    value = -value;
  }

  firstUnitStore.update({ y: firstStore.y + value });
  return true;
}

export function moveSecondUnit(heightField, heightUnit) {
  let secondStore = get(secondUnitStore);

  if (secondStore.y > heightField - heightUnit) {
    value1 = -value1;
  }

  if (secondStore.y <= -5) {
    value1 = -value1;
  }

  secondUnitStore.update({ y: secondStore.y + value1 });
  return true;
}
