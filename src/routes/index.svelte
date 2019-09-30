<script>
  import Field from "../components/field.svelte";
   import Stats from "../components/stats.svelte";
  import Cards from "../components/cards/cards.svelte";
</script>

<style src="./index.scss">

</style>

<div class="app">
  <div class="game">
    <Field />
    <div class="footer">
      <Stats />
      <Cards />
       <Stats />
    </div>
  </div>
</div>
