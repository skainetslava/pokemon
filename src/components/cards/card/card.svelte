<script>
  import { skillsStore } from "../../../stores/skills.js";

  export let className = "card_bg";
</script>

<style lang="scss">
  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 102px;
    height: 162px;
    margin: 0 4px;
    bottom: 0;
    transition: all 0.4s ease;
    cursor: pointer;
    border-radius: 5px;


    &:hover {
      bottom: 12px;
    }
  }
  .card_bg {
    background: #800119;

  }
</style>

<div class="card {className}" on:click={() => skillsStore.add('mate')}>
  <slot />
</div>
