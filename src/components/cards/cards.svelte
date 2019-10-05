<script>
  import Card from "./card/card.svelte";
  import FireIcon from "../icons/fire.svelte";
  import ShieldIcon from "../icons/shield.svelte";
  import { skillsStore } from "../../stores/skills.js";
  import { firstUnitStore } from "../../stores/firstUnit.js";
   import { isPlayingStore } from "../../stores/states.js";

  $: timerFire = $firstUnitStore.fire.reload;
  $: timeReloadShield = $firstUnitStore.defence.reload;

  const handleFire = () => {
    if (timerFire) {
      return;
    }

    skillsStore.add("mate");
    firstUnitStore.overcharge({ reload: 10, energy: 5 });

    const interval = setInterval(() => {
      if (timerFire > 0) {
        firstUnitStore.overcharge({ reload: timerFire - 1 });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleDefend = () => {
    if (timeReloadShield) {
      return;
    }

    firstUnitStore.defend({ reload: 10, duration: true });

    const interval = setInterval(() => {
      if (timeReloadShield > 0) {
        if (timeReloadShield === -2) {
          firstUnitStore.defend({ duration: false });
        }
        firstUnitStore.defend({ reload: timeReloadShield - 1 });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const stop = () => {
    isPlayingStore.update((n) => {console.log(n); return !n})
  }

</script>

<style>
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
  <Card id={0} on:trigger={handleFire} time={timerFire}>
    <FireIcon />
  </Card>
  <Card
    id={1}
    className="green"
    on:trigger={handleDefend}
    time={timeReloadShield}>
    <ShieldIcon />
  </Card>
  <Card id={2} on:trigger={stop}>
    <FireIcon />
  </Card>
</div>
