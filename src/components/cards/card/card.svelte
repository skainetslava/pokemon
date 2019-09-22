<script>
  import Bg from "./bg.svelte";
  import Pokeball from "./Pokeball.svelte";
  import { skillsStore } from "../../../stores/skills.js";

  const useSkill = () => {
    skillsStore.update(skills => {
      const length = skills.length;
      return [...skills, { id: Date.now() }];
    });
  };
</script>

<style lang="scss">
  .card {
    position: relative;
    width: 102px;
    height: 162px;
    margin: 0 4px;
    bottom: 0;
    transition: all 0.4s ease;
    cursor: pointer;

    &:hover {
      bottom: 12px;
    }
  }
</style>

<div class="card" on:click={useSkill}>
  <Bg />
  <Pokeball />
</div>
