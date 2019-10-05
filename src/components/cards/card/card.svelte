<script>
  export let id;
  export let time;
  export let className = "background";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleTrigger() {
    dispatch("trigger", { id });
  }
</script>

<style>
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
  }
  .disable {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: rgba(1, 1, 1, 0.7);
    transition: all 0.3s;
  }
  .card:hover {
     opacity: 0.7;
  }
  .background {
    background: #800119;
  }
</style>

<div class="card {className}" on:click={handleTrigger}>
  {#if time > 0}
    <div class="disable" style="height: {time*10}%"></div>
  {/if}
  <slot />
</div>
