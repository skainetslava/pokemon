<script>
  import { onMount, createEventDispatcher } from "svelte";
  import LightningIcon from "./icons/lightning.svelte";
  import animate from "../utils/animate.js";

  const dispatch = createEventDispatcher();

  export let widthField;
  export let heightField;
  export let positionTopUnit;
  export let heightUnit;
  export let id;

  let leftPosition = 160;

  $: topPosition = positionTopUnit / 2 + heightUnit;

  const getRandomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  const handleRemove = () => {
    dispatch("remove", { id });
  };

  $: move = ({ top, left }) => {
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
      return true;
    } else {
      handleRemove();
      return false;
    }
  };

  let direction = [true, false];
  let reverse = direction[getRandomInteger(0, 1)];

  const rndTop = getRandomInteger(1, 6);
  const rndLeft = getRandomInteger(1, 6);

  const speed = {
    top: { min: rndTop, max: rndTop + 1 },
    left: { min: rndLeft, max: rndLeft + 1 }
  };

  animate(() => move(speed));
</script>

<style lang="scss">

</style>

<div>
  <LightningIcon left={leftPosition} top={topPosition} />
</div>
