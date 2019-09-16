<script>
  import Field from "components/field.svelte";
  import User from "components/user.svelte";
</script>

<style>
  .app {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background: #79c9fa;
    background-image: url("wall.jpg");
    background-position: 0 -40%;
    background-repeat: no-repeat;
  }
</style>

<div class="app">
  <Field />
  <User />
</div>
