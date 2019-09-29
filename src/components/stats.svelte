<script>
  import { firstUnitStore } from "../stores/firstUnit.js";
  import { secondUnitStore } from "../stores/secondUnit.js";
</script>

<style>
  .health {
    background: red;
    width: 20px;
    transition: .5s;
  }
</style>

<div>
  <div class="health" style="height: {$firstUnitStore.health * 1.5}px;" />
  <p>{$firstUnitStore.health}</p>
</div>
