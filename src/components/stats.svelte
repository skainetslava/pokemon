<script>
  export let data;
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
    font-size: 1.2rem;
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
      <div class="progress health_bar" style="height: {data.health}%;" />
    </div>
    <div class="title">{data.health}</div>

  </section>
  <section class="stat">
    <div class="bar">
      <div class="progress energy_bar" style="height: {data.energy}%;" />
    </div>
    <div class="title">{data.energy}</div>

  </section>
  <section class="stat">
    <div class="bar">
      <div class="progress shield_bar" style="height: {data.shield}%;" />
    </div>
    <div class="title">{data.shield}</div>
  </section>
</div>
