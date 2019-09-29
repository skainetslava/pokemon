<script>
  import { onMount, afterUpdate, createEventDispatcher } from "svelte";

  import animate from "../utils/animate.js";
  import { getRandomInteger } from "../utils/getRandomInteger.js";

  import { checkCollision } from "../game/checkCollision.js";
  import { skillsStore } from "../stores/skills.js";

  export let widthField;
  export let heightField;
  export let heightUnit;
  export let skill;
  export let enemy;
  export let mate;

  const dispatch = createEventDispatcher();
  const direction = [true, false];

  let x = skill.has === "mate" ? mate.x : enemy.x;
  let y =
    skill.has === "mate" ? mate.y + heightUnit / 2 : enemy.y + heightUnit / 2;

  onMount(() => {
    animate(() => move(speed));
  });

  afterUpdate(() => {
    const aim = skill.has === "mate" ? enemy : mate;
    checking(aim);
  });

  const move = ({ speedX, speedY }) => {
    if (x < 1200 && x > 0) {
      if (y >= heightField - 50) {
        reverse = true;
      }
      if (y <= 0) {
        reverse = false;
      }

      x = skill.has === "mate" ? x + speedX : x - speedX;
      y = reverse ? y - speedY : y + speedY;

      skillsStore.update({ id: skill.id, x, y });
      return true;
    } else {
      skillsStore.remove({ id: skill.id });
      return false;
    }
  };

  const checking = aim => {
    if (!checkCollision(skill, aim)) {
      return;
    }
    skillsStore.remove({ id: skill.id });
    dispatch("trigger", { has: skill.has});
  };

  let reverse = direction[getRandomInteger(0, 1)];

  const speed = {
    speedX: getRandomInteger(1, 6),
    speedY: getRandomInteger(1, 6)
  };
</script>

<style lang="scss">
  .light {
    height: 20px;
    width: 20px;
    background: yellow;
    border-radius: 50%;
    position: absolute;
    transition: left 2s ease-in-out top 2s;
    top: 50%;
  }
</style>

<div>
  <div class="light" style="left: {x}px; top: {y}px" />
</div>
