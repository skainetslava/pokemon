<script>
  import Card from "./card/card.svelte";
  import FireIcon from "../icons/fire.svelte";
  import ShieldIcon from "../icons/shield.svelte";

  const cards = [1, 2, 3];
</script>

<style lang="scss">
  .cards {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :global(.green) {
    background: green;
  }
</style>

<div class="cards">
  <Card>
    <FireIcon />
  </Card>
  <Card className="green">
    <ShieldIcon />
  </Card>
  <Card>
    <FireIcon />
  </Card>
</div>
