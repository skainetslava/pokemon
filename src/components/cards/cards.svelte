<script>
  import Card from "./card/card.svelte";

  const cards = [1, 2, 3];
</script>

<style lang="scss">
    .cards {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>

<div class="cards">
  {#each cards as item}
    <Card />
  {/each}
</div>
