<script>
  import { onMount, createEventDispatcher } from "svelte";
  import LightningIcon from "./icons/lightning.svelte";
  import animate from "../utils/animate.js";
  import { getRandomInteger } from "../utils/getRandomInteger.js";

  export let widthField;
  export let heightField;
  export let ownerX;
  export let ownerY;
  export let heightUnit;
  export let id;

  const dispatch = createEventDispatcher();
  const direction = [true, false];

  let x = ownerX;
  console.log(ownerX);
  let y = ownerY + heightUnit / 2;
  console.log(y);
  const handleRemove = () => {
    dispatch("remove", { id });
  };

  const move = ({speed: { speedX, speedY }}) => {
    if (x < 1200) {

      if (y >= heightField - 50) {
        reverse = true;
      }
      if (y <= 0) {
        reverse = false;
      }

      x += speedX;
      y = reverse ?  y - speedY : y + speedY;

      return true;
    } else {
      handleRemove();
      return false;
    }
  };

  let reverse = direction[getRandomInteger(0, 1)];

  const speed = {
    speedX: getRandomInteger(1, 6),
    speedY: getRandomInteger(1, 6)
  };

  animate(move, speed);
</script>

<style lang="scss">

</style>

<div>
  <LightningIcon left={x} top={y} />
</div>
