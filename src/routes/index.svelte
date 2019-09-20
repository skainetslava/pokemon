<script>
  import Field from "../components/field.svelte";
  import User from "../components/user.svelte";
  import Background from "../components/background.svelte";
  import Cards from "../components/cards/cards.svelte";
  import Pikachu from "../components/icons/pikachu.svelte";
</script>

<style src="./index.scss">

</style>

<div class="app">
  <Background />
  <div class="game">
    <Field />
    <User />
    <Cards />
    <Pikachu />
  </div>
</div>
