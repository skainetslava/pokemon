<script>
  import { onMount, afterUpdate, createEventDispatcher } from "svelte";

  import { animate } from "../game/startGame.js";
  import { getRandomInteger } from "../utils/getRandomInteger.js";
  import { isPlayingStore } from "../stores/states.js";

  import { checkCollision } from "../game/checkCollision.js";
  import { skillsStore } from "../stores/skills.js";

  export let widthField;
  export let heightField;
  export let skill;
  export let enemy;
  export let mate;

  const dispatch = createEventDispatcher();
  const direction = [true, false];

  let stateSkill = skill.type === "super" ? "red" : "yellow";
  let x = skill.has === "mate" ? mate.x : enemy.x;
  let y = skill.has === "mate" ? mate.y + 39 : enemy.y + 39;

  $: {
    if ($isPlayingStore) {
      animate(() => move(speed));
    }
  }

  afterUpdate(() => {
    const aim = skill.has === "mate" ? enemy : mate;
    checking(aim);
  });

  const move = ({ speedX, speedY }) => {
    if (x < 1200 && x > 0) {
      if (y >= heightField - 25) {
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
    if (aim.defence && aim.defence.duration) {
      stateSkill = "disabled";
      return;
    }
    skillsStore.remove({ id: skill.id });
    dispatch("trigger", { ...skill });
  };

  let reverse = direction[getRandomInteger(0, 1)];

  const speed = {
    speedX: getRandomInteger(1, 6),
    speedY: getRandomInteger(1, 6)
  };
</script>

<style>
  .light {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: absolute;
    transition: left 2s ease-in-out top 2s;
    top: 50%;
  }
  .yellow {
    background: yellow;
  }
  .red {
    height: 50px;
    width: 4px;

    background: red;
    border-radius: 25%;
    animation: spin 1s linear infinite;
  }
  .disabled {
    background: blue;
    opacity: 0.3;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>

<div>
  <div class="light {stateSkill}" style="left: {x}px; top: {y}px" />
</div>
