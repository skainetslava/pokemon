<script>
 import { onMount } from 'svelte';

  import LightningIcon from "./icons/lightning.svelte";
  import animate from "../utils/animate.js";
  export let widthField;
  export let heightField;
  $: a = heightField;
  onMount(() => {
    a = heightField;
    console.log(a);
  });

  console.log(heightField);
  let leftPosition = 130;
  let topPosition = 0;

  const getRandomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  $: move = ({ top, left }) => {
    console.log(widthField);
    if (leftPosition < 1200) {
      if (topPosition >= heightField - 50) {
        reverse = true;
      }
      if (topPosition <= 0) {
        reverse = false;
      }

      leftPosition += getRandomInteger(top.min, top.max);
      if (!reverse) {
        topPosition += getRandomInteger(left.min, left.max);
      } else {
        topPosition = topPosition - getRandomInteger(left.min, left.max);
      }
    }
  };

  let reverse = false;
  const speed = {
    top: { min: getRandomInteger(1, 6) },
    left: { min: getRandomInteger(0, 4) }
  };

  speed.top.max = speed.top.min + 1;
  speed.left.max = speed.left.min + 1;

  animate({
    duration: 1000,
    draw: () => move(speed)
  });
</script>

<style lang="scss">

</style>

<div>
  <LightningIcon left={leftPosition} top={topPosition} />
</div>
