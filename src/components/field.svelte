<script>
  import { tick, onMount } from "svelte";
  import PikachuUnit from "./icons/pikachuUnit.svelte";
  import BulbazavrUnit from "./icons/bulbazavrUnit.svelte";
  import Skill from "./skill.svelte";
  import { skillsStore } from '../stores/skills.js';

  let widthField;
  let heightField;
  let oneUnitElement;
  let heightUnit;

  $: topPositionOneUnit = 0;
  let skills;

	const unsubscribe = skillsStore.subscribe(value => {
		skills = value;
	});

  onMount(() => {
    let rect = oneUnitElement.getBoundingClientRect();
    topPositionOneUnit = rect.top;
  });

  const handleRemove = (event) => {
    skillsStore.update((skills) => [ ...skills.filter(item => item.id !== event.detail.id)]);
  }
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
    top: 50%;
    transform: translateY(-50%);
    //animation: go-left-right 1s infinite alternate;
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
  bind:clientHeight={heightField}>

  {#each skills as skill(skill.id)}
    <Skill
      {widthField}
      {heightField}
      {heightUnit}
      id={skill.id}
      on:remove={handleRemove}
      positionTopUnit={topPositionOneUnit} />
  {/each}

  <div class="unit1" bind:clientHeight={heightUnit} bind:this={oneUnitElement}>
    <PikachuUnit />
  </div>

  <div class="unit2">
    <BulbazavrUnit />
  </div>
</div>
