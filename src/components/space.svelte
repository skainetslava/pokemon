<script>
  import { getRandomInteger } from "../utils/getRandomInteger.js";

  let items = [];

  for (let i = 0; i <= 100; i++) {
    const size = getRandomInteger(2, 7);
    items.push({
      left: getRandomInteger(0, 100),
      top: getRandomInteger(0, 100),
      bright: getRandomInteger(0, 5),
      height: size,
      width: size
    });
  }
</script>

<style>
  .star {
    height: 5px;
    width: 5px;
    background-color: #fff;
    position: absolute;
    border-radius: 100px;
    transition: transform 0.3s;
    box-shadow: 0 0 5px 0 rgba(255, 255, 255, 0.7);
  }
</style>

<div>
  {#each items as item}
    <svg
      class="star"
      style=" top: {item.top}%; left: {item.left}%; box-shadow: 0 0 {item.brigth}px
      0rgba(255, 255, 255, 0.7); height: {item.height}px; width: {item.width}px;" />
  {/each}
</div>
