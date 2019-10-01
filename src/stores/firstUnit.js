import { writable, get } from "svelte/store";

function createFirstUnit() {
  const { subscribe, set, update } = writable({
    x: 90,
    y: 0,
    health: 100,
    energy: 100,
    shield: 100
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

export const firstUnitStore = createFirstUnit();
