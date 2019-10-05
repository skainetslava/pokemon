export const checkCollision = (skill, aim) => {
  if (
    skill.x < aim.x + 24 &&
    skill.x + 20 > aim.x &&
    skill.y < aim.y + 68 &&
    skill.y + 30 > aim.y
  ) {
    return true;
  }
};
