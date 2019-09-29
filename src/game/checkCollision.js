export const checkCollision = (skill, enemy) => {
  if (
    skill.x < enemy.x + 24 &&
    skill.x + 20 > enemy.x &&
    skill.y < enemy.y + 68 &&
    skill.y + 30 > enemy.y
  ) {
    return true;
  }
};
