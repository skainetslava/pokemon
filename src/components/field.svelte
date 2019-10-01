<script>
  import { tick, onMount } from "svelte";
  import { fly } from "svelte/transition";

  import PikachuUnit from "./icons/pikachuUnit.svelte";
  import BulbazavrUnit from "./icons/bulbazavrUnit.svelte";

  import Skill from "./skill.svelte";
  import animate from "../utils/animate.js";

  import { moveFirstUnit, moveSecondUnit, updateSpeed } from "../game/move.js";
  import { generateSkill } from "../game/enemyBehaviour.js";

  import { skillsStore } from "../stores/skills.js";
  import { firstUnitStore } from "../stores/firstUnit.js";
  import { secondUnitStore } from "../stores/secondUnit.js";

  let widthField;
  let heightField;

  let firstElement;
  let heightUnit;
  let heightSecondElement;

  let secondElement;

  $: enemy = {
    x: $secondUnitStore.x,
    y: $secondUnitStore.y
  };

  $: mate = {
    x: $firstUnitStore.x,
    y: $firstUnitStore.y
  };

  onMount(() => {
    enemy.height = heightSecondElement;

    animate(() => moveFirstUnit(heightField, heightUnit));
    animate(() => moveSecondUnit(heightField, heightUnit));
    updateSpeed();
    generateSkill();
  });

  let damages = [];
  const addDamage = unit => {
    const id = Date.now();

    damages.push({
      id,
      value: -2,
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
    if (has === "enemy") {
      firstUnitStore.update({ health: $firstUnitStore.health - 2 });
      addDamage($firstUnitStore);
    } else {
      secondUnitStore.update({ health: $secondUnitStore.health - 2 });
      addDamage($secondUnitStore);
    }
  };
</script>

<style lang="scss">
  .field {
    grid-area: field;
    position: relative;
    width: 1168px;
    height: 100%;
    border: 1px solid green;
    background: black;
    border-radius: 2px;
  }
  .unit1 {
    position: absolute;
    left: 5%;
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
      {heightUnit}
      {skill}
      on:trigger={handleTrigger}
      on:remove={handleRemove}
      {mate}
      {enemy} />
  {/each}

  <div
    class="unit1"
    bind:clientHeight={heightUnit}
    bind:this={firstElement}
    style="top: {$firstUnitStore.y}px">
    <PikachuUnit />
  </div>

  <div
    class="unit2"
    bind:clientHeight={heightSecondElement}
    bind:this={secondElement}
    style="top: {$secondUnitStore.y}px">
    <BulbazavrUnit />
  </div>
</div>
