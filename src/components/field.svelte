<script>
import { tick, afterUpdate } from 'svelte';
  import PikachuUnit from "./icons/pikachuUnit.svelte";
  import BulbazavrUnit from "./icons/bulbazavrUnit.svelte";
  import Skill from "./skill.svelte";

  let w;
  let h;
  
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

<div class="field" bind:clientWidth={w} bind:clientHeight={h}>
    <Skill widthField={w} heightField={h}/>
  <div class="unit1">
    <PikachuUnit />

  </div>
  <div class="unit2">
    <BulbazavrUnit />
  </div>
</div>
