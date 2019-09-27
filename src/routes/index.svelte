<script>
  import Field from "../components/field.svelte";
  import User from "../components/user.svelte";
  import Background from "../components/background.svelte";
  import Cards from "../components/cards/cards.svelte";
  import PokemonHero from "../components/PokemonHero/PokemonHero.svelte";
</script>

<style src="./index.scss">

</style>

<div class="app">
  <div class="game">
    <Field />
    <div class="footer">
      <div />
      <Cards />
      <PokemonHero />
    </div>
  </div>
</div>
