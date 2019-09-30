<script>
  import { firstUnitStore } from "../stores/firstUnit.js";
  import { secondUnitStore } from "../stores/secondUnit.js";
</script>

<style>
  .stats {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 8px;
  }

  .bar {
    height: 140px;
  }

  .progress {
    width: 40px;
    border-radius: 50px;
    transition: 0.5s;
  }

  .title {
    margin-right: 8px;
  }
  .health_bar {
    background: red;
  }
  .energy_bar {
    background: blue;
  }
  .shield_bar {
    background: green;
  }
</style>

<div class="stats">
  <section class="stat">
    <div class="bar">
      <div
        class="progress health_bar"
        style="height: {$firstUnitStore.health}%;" />
    </div>
    <div class="title">Health</div>

  </section>
  <section class="stat">
    <div class="bar">
      <div
        class="progress energy_bar"
        style="height: {$firstUnitStore.health}%;" />
    </div>
    <div class="title">Energy</div>

  </section>
  <section class="stat">
    <div class="bar">
      <div
        class="progress shield_bar"
        style="height: {$firstUnitStore.health}%;" />
    </div>
    <div class="title">Shield</div>
  </section>
</div>
