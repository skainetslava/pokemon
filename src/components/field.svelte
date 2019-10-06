<script>
  import { tick, onMount } from "svelte";
  import { fly } from "svelte/transition";

  import SpaceshipUnit from "./icons/spaceship.svelte";
  import UfoUnit from "./icons/ufo.svelte";
  import { getRandomInteger } from "../utils/getRandomInteger.js";

  import Skill from "./skill.svelte";
  import { isPlayingStore } from "../stores/states.js";
  import { moveFirstUnit, moveSecondUnit, updateSpeed } from "../game/move.js";
  import { generateSkill } from "../game/enemyBehaviour.js";
  import { startGame, checkEndingGame } from "../game/startGame.js";

  import { skillsStore } from "../stores/skills.js";
  import { firstUnitStore } from "../stores/firstUnit.js";
  import { secondUnitStore } from "../stores/secondUnit.js";
  import { heightFieldStore } from "../stores/states.js";

  let widthField;
  let heightField;

  let firstElement;
  let secondElement;

  let shieldClass;

  $: {
    shieldClass = $firstUnitStore.defence.duration ? "shield" : "";
  }

  $: {
    startGame($isPlayingStore);
  }

  $: {
    checkEndingGame($firstUnitStore.health, $secondUnitStore.health);
  }

  onMount(() => {
    heightFieldStore.update(() => heightField);
  });

  let damages = [];
  const addDamage = (unit, dmg) => {
    const id = Date.now();
    damages.push({
      id,
      value: dmg,
      top: unit.y,
      left: unit.x
    });

    setTimeout(() => {
      const index = damages.findIndex(item => item.id === id);
      damages.splice(index, 1);
    }, 0);
  };

  const handleRemove = event => {
    skillsStore.remove(event);
  };

  const handleTrigger = ({ detail: { has } }) => {
    const dmg = getRandomInteger(-40, -2);
    if (has === "enemy") {
      firstUnitStore.update({ health: $firstUnitStore.health + dmg });
      addDamage($firstUnitStore, dmg);
    } else {
      secondUnitStore.update({ health: $secondUnitStore.health + dmg });
      addDamage($secondUnitStore, dmg);
    }
  };
</script>

<style>
  .field {
    grid-area: field;
    position: relative;
    width: 1168px;
    height: 100%;
    border-radius: 2px;
  }
  .unit1 {
    position: absolute;
    left: 5%;
  }
  .shield {
    padding: 30px;
    border: 1px solid white;
    border-radius: 50%;
  }

  .unit2 {
    position: absolute;
    left: 1005px;
  }

  .notification {
    position: absolute;
    font-size: 1.5rem;
    color: #fff;
    font-weight: 600;
  }

  @keyframes go-left-right {
    from {
      top: 10%;
    }
    to {
      top: 70%;
    }
  }
</style>

<div
  class="field"
  bind:clientWidth={widthField}
  bind:clientHeight={heightField}>

  {#each damages as damage (damage.id)}
    <span
      class="notification"
      out:fly={{ y: -200, duration: 2000 }}
      style="top:{damage.top}px; left: {damage.left}px;">
      {damage.value}
    </span>
  {/each}

  {#each $skillsStore as skill (skill.id)}
    <Skill
      {widthField}
      {heightField}
      {skill}
      on:trigger={handleTrigger}
      on:remove={handleRemove}
      mate={$firstUnitStore}
      enemy={$secondUnitStore} />
  {/each}

  <div
    class="unit1 {shieldClass}"
    bind:this={firstElement}
    style="top: {$firstUnitStore.y}px">
    <SpaceshipUnit />
  </div>

  <div
    class="unit2"
    bind:this={secondElement}
    style="top: {$secondUnitStore.y}px">
    <UfoUnit />
  </div>
</div>
