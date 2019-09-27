<script>
  import { tick, onMount } from "svelte";
  import PikachuUnit from "./icons/pikachuUnit.svelte";
  import BulbazavrUnit from "./icons/bulbazavrUnit.svelte";
  import Skill from "./skill.svelte";
  import animate from "../utils/animate.js";
  import { skillsStore, removeSkill } from "../stores/skills.js";
  import { getRandomInteger } from "../utils/getRandomInteger.js";

  let widthField;
  let heightField;
  let oneFirstElement;
  let heightUnit;
  let fieldEl;
  let firstUnitYCurrent = 0;
  let firstUnitY = 0;

  $: oneUnitX = 0;
  //console.log(oneUnitXp);
  let skills;

  const update = skillsStore.subscribe(value => {
    skills = value;
  });

  onMount(() => {
    oneUnitX = oneFirstElement.getBoundingClientRect().left;
  });

  const handleRemove = event => {
    removeSkill(event);
  };

  const move = ({ recalculate }) => {
    console.log(firstUnitY);
    if(firstUnitY > 800) {
      return false;
    }
    firstUnitY = firstUnitY + getRandomInteger(5,5);
    return true;
  };

  animate(move);
</script>

<style lang="scss">
  .field {
    grid-area: field;
    position: relative;
    width: 1168px;
    height: 100%;
    margin: 16px;
    border: 1px solid green;
    border-radius: 2px;
  }
  .unit1 {
    position: absolute;
    left: 5%;
   // transition: 1s;
  }

  .unit2 {
    position: absolute;
    top: 20px;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    //animation: go-left-right 1s infinite alternate;
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
  bind:clientHeight={heightField}
  bind:this={fieldEl}>
  {firstUnitY}
  {#each skills as skill (skill.id)}
    <Skill
      {widthField}
      {heightField}
      {heightUnit}
      id={skill.id}
      on:remove={handleRemove}
      ownerX={oneUnitX}
      ownerY={firstUnitY} />
  {/each}

  <div
    class="unit1"
    bind:clientHeight={heightUnit}
    bind:this={oneFirstElement}
    style="top: {firstUnitY}px">
    <PikachuUnit />
  </div>

  <div class="unit2">
    <BulbazavrUnit />
  </div>
</div>
