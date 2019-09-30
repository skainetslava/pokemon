<script>
  import { tick, onMount } from "svelte";
  import { fly } from 'svelte/transition';

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
  let notification;

  let secondElement;

  $: enemy = {
    x: $secondUnitStore.x,
    y: $secondUnitStore.y
  };

  $: mate = {
    x: $firstUnitStore.x,
    y: $firstUnitStore.y
  };

  let show = false;

  onMount(() => {
    enemy.height = heightSecondElement;

    animate(() => moveFirstUnit(heightField, heightUnit));
    animate(() => moveSecondUnit(heightField, heightUnit));
    updateSpeed();
    generateSkill();
  });

  const handleRemove = event => {
    skillsStore.remove(event);
  };

  const handleTrigger = event => {
    if (event.detail.has === "enemy") {
      firstUnitStore.update({ health: $firstUnitStore.health - 2 });
      notification = {
        value: 2,
      }
      // setTimeout(() => {
      //   notification = null;
      // }, 2000)
    } else {
      secondUnitStore.update({ health: $secondUnitStore.health - 2 });
       notification = {
        value: 2,
      }
      setTimeout(() => {
        notification = null;
      }, 0)
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
    border-radius: 2px;
  }
  .unit1 {
    position: absolute;
    left: 5%;
  }

  .unit2 {
    position: absolute;
    right: 5%;
  }

  .notification {
    position: absolute;
    height: 50px;
    width: 50px;
    background: red;
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
  {#if notification}
     <span 
     class="notification"
     out:fly="{{ y: -200, duration: 2000 }}"
     top={firstUnitStore.y}
     left={firstUnitStore.x}
     >
        {notification.value}
     </span>
  {/if}
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
  {enemy.y}
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
