<script>
  import Bg from "./bg.svelte";
  import Pokeball from "./Pokeball.svelte";
</script>

<style lang="scss">
  .card {
    position: relative;
    width: 102px;
    height: 162px;
    margin: 0 4px;
    bottom: 0;
    transition: all .4s ease;
    cursor: pointer;

    &:hover {
      bottom: 12px;
    }
  }
</style>

<div class="card">
  <Bg />
  <Pokeball />
</div>
