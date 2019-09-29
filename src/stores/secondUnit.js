import { writable } from "svelte/store";

function createSecondUnit() {
  const { subscribe, set, update } = writable({
    x: 1030,
    y: 0,
    health: 100
  });

  return {
    subscribe,
    update: ({ x, y, health }) =>
      update(unit => {
        return {
          ...unit,
          x: x || unit.x,
          y: y || unit.y,
          health: health || unit.health
        };
      })
  };
}

export const secondUnitStore = createSecondUnit();
