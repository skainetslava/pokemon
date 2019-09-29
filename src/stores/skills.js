import { writable } from "svelte/store";

function createSkills() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    update: ({ id, x, y }) =>
      update(skills => {
        const index = skills.findIndex(item => item.id === id);
        const newSkills = [...skills];

        newSkills[index] = { ...skills[index], x, y };
        return [...newSkills];
      }),
    add: (has) => update(skills => {
      return [...skills, { id: Date.now(), has }]
    }),
    remove: event => update(skills => [...skills.filter(item => item.id !== event.id)])
  };
}

export const skillsStore = createSkills();
