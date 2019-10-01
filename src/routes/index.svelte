<script>
  import Field from "../components/field.svelte";
  import Stats from "../components/stats.svelte";
  import Cards from "../components/cards/cards.svelte";

  import { firstUnitStore } from "../stores/firstUnit.js";
  import { secondUnitStore } from "../stores/secondUnit.js";

</script>

<style>
  .app {
    position: relative;
    margin: 24px;
    min-width: 1000px;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }

  .game {
    display: grid;
    grid-template-areas: "field" "footer";
    grid-template-rows: 2fr 1fr;
    grid-template-columns: 1fr;
    position: relative;
    height: 100%;
    justify-items: center;
  }

  .footer {
    grid-area: footer;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    width: 100%;
  }

  :global(#sapper) {
    position: absolute;
    height: 100%;
    width: 100%;
    background: black;
    font-family: "Big Shoulders Display", cursive;
    color: white;
  }
</style>

<div class="app">
  <div class="game">
    <Field />
    <div class="footer">
      <Stats data={$firstUnitStore} />
      <Cards />
      <Stats data={$secondUnitStore} />
    </div>
  </div>
</div>
