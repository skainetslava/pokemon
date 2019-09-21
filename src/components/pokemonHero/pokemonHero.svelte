<script>
  import PicaIcon from "../icons/pikachu.svelte";
</script>

<style lang="scss">
  .hero {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .state {
    position: relative;
    left: -48px;
  }

  .health {
    &_progress {
      width: 128px;
      height: 8px;
      background: green;
    }
  }
  .energy {
    &_progress {
      width: 128px;
      height: 8px;
      background: green;
    }
  }
  .shield {
    &_progress {
      width: 128px;
      height: 8px;
      background: green;
    }
  }
</style>

<div class="hero">
  <PicaIcon />
  <div class="state">
    <div class="health">
      Health:
      <div class="health_progress" />
    </div>
    <div class="energy">
      Energy:
      <div class="energy_progress" />
    </div>
    <div class="shield">
      Shield:
      <div class="shield_progress" />
    </div>
  </div>
</div>
