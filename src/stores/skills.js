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
    add: ({...params}) => update(skills => {
      console.log([...skills, { id: Date.now(), ...params }])
      return [...skills, { id: Date.now(), ...params }]
    }),
    remove: event => update(skills => [...skills.filter(item => item.id !== event.id)])
  };
}

export const skillsStore = createSkills();
