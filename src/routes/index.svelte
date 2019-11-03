<script>
  import { fly, slide } from "svelte/transition";

  import Field from "../components/field.svelte";
  import Stats from "../components/stats.svelte";
  import Cards from "../components/cards/cards.svelte";
  import Space from "../components/space.svelte";
  import { isPlayingStore } from "../stores/states.js";
  import { get } from "svelte/store";
  import { firstUnitStore } from "../stores/firstUnit.js";
  import { secondUnitStore } from "../stores/secondUnit.js";
  import { isEndedGame } from "../stores/states.js";

  const handleStopGame = () => {
    isPlayingStore.update(isPlaying => !isPlaying);
  };
</script>

<style>
  .app {
    position: relative;
    margin: 0 24px;
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
    align-items: center;
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

  .state {
    position: absolute;
    padding: 4px 24px;
    right: 36px;
    top: 12px;
    border: 1px solid #fff;
    border-radius: 10px;
    font-size: 1.4rem;
    cursor: pointer;
    z-index: 10;
  }

  .end-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 40%;
    padding: 12px 0;
    border: 1px solid #fff;
    border-radius: 10px;
  }
  h1 {
    margin: 0;
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
  <Space />
  <div class="game">
    {#if $isEndedGame}
      <div in:fly={{ y: -200, duration: 1000 }} class="end-modal">
        <h1>Game over</h1>
      </div>
    {:else}
      <div class="state" on:click={handleStopGame}>
        {$isPlayingStore ? 'Pause' : 'Continue'}
      </div>
      <Field />
      <div class="footer">
        <Stats data={$firstUnitStore} />
        <Cards />
        <Stats data={$secondUnitStore} />
      </div>
    {/if}
  </div>
</div>
