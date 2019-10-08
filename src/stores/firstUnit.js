import { writable } from "svelte/store";

function createFirstUnit() {
  const { subscribe, set, update } = writable({
    x: 90,
    y: 0,
    health: 100,
    energy: 100,
    shield: 100,
    fire: { reload: 0 },
    superFire: { reload: 0 },
    defence: { reload: 0, duration: 0 }
  });

  return {
    subscribe,
    update: ({ ...stats }) =>
      update(unit => {
        return {
          ...unit,
          ...stats
        };
      }),
    overcharge: ({ energy, reloadSuperFire, reloadFire }) =>
      update(unit => {
        const energyState = energy ? unit.energy - energy : unit.energy;
        const reloadFireState = reloadFire !== undefined ? reloadFire : unit.fire.reload;
        const reloadSuperFireState = reloadSuperFire !== undefined  ? reloadSuperFire : unit.superFire.reload;
        return {
          ...unit,
          energy: energyState,
          fire: { ...unit.fire, reload: reloadFireState },
          superFire: { ...unit.superFire, reload: reloadSuperFireState }
        };
      }),
    restore: energy =>
      update(unit => {
        return {
          ...unit,
          energy: unit.energy + energy
        };
      }),
    defend: ({...stats}) =>
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
