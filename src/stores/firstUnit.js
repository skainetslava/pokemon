import { writable, get } from "svelte/store";

function createFirstUnit() {
  const { subscribe, set, update } = writable({
    x: 90,
    y: 0,
    health: 100,
    energy: 100,
    shield: 100,
    fire: { reload: 0 },
    defence: { reload: 0, duration: 0 }
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
      }),
    overcharge: ({ energy, ...fire }) =>
      update(unit => {
        const energyState = energy ? unit.energy - energy : unit.energy;
        return {
          ...unit,
          energy: energyState,
          fire: { ...unit.fire, ...fire }
        };
      }),
    defend: stats =>
      update(unit => {
        return {
          ...unit,
          defence: {
            ...unit.defence,
            ...stats
          }
        };
      })
  };
}

export const firstUnitStore = createFirstUnit();
