import { writable } from "svelte/store";

export const skillsStore = writable([]);

export const getSkills = () => {
  let skills;
  const a = skillsStore.subscribe(value => {
    skills = value;
  });

  return skills;
};

export const removeSkill = event => {
  skillsStore.update(skills => [...skills.filter(item => item.id !== event.detail.id)]);
};
