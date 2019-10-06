<script>
  import Card from "./card/card.svelte";
  import FireIcon from "../icons/fire.svelte";
  import LaserIcon from "../icons/laserIcon.svelte";
  import ShieldIcon from "../icons/shield.svelte";
  import { skillsStore } from "../../stores/skills.js";
  import { firstUnitStore } from "../../stores/firstUnit.js";
  import { isPlayingStore } from "../../stores/states.js";
  import { freezeGame } from "../../game/freezeGame.js";

  $: timerFire = $firstUnitStore.fire.reload;
  $: timerSuperFire = $firstUnitStore.superFire.reload;
  $: energy = $firstUnitStore.energy;
  $: timeReloadShield = $firstUnitStore.defence.reload;

  const handleFire = () => {
    if (timerFire || energy < 40 || !$isPlayingStore) {
      return;
    }

    skillsStore.add({ has: "mate", type: "standart" });
    firstUnitStore.overcharge({ reloadFire: 10, energy: 20 });

    const interval = setInterval(() => {
      if (!$isPlayingStore) {
        return;
      }
      if (timerFire > 0) {
        firstUnitStore.overcharge({ reloadFire: timerFire - 1 });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleDefend = () => {
    if (timeReloadShield || !$isPlayingStore) {
      return;
    }

    firstUnitStore.defend({ reload: 10, duration: true });

    const interval = setInterval(() => {
      if (!$isPlayingStore) {
        return;
      }
      if (timeReloadShield > 0) {
        if (timeReloadShield === 8) {
          firstUnitStore.defend({ duration: false });
        }
        firstUnitStore.defend({ reload: timeReloadShield - 1 });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleSuperFire = () => {
    if (timerSuperFire || energy < 60 || !$isPlayingStore) {
      return;
    }

    skillsStore.add({ has: "mate", type: "super" });
    firstUnitStore.overcharge({
      reloadSuperFire: 40,
      energy: 60
    });

    const interval = setInterval(() => {
      if (!$isPlayingStore) {
        return;
      }
      if (timerSuperFire > 0) {
        firstUnitStore.overcharge({ reloadSuperFire: timerSuperFire - 1 });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };
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
  :global(.blue) {
    background: yellow;
  }
</style>

<div class="cards">
{timerSuperFire}
  <Card id={0} on:trigger={handleFire} time={timerFire} maxTime={10}>
    <FireIcon />
  </Card>
  <Card
    id={1}
    className="green"
    on:trigger={handleDefend}
    maxTime={10}
    time={timeReloadShield}>
    <ShieldIcon />
  </Card>
  <Card
    id={2}
    on:trigger={handleSuperFire}
    className="blue"
    maxTime={40}
    time={timerSuperFire}>
    <LaserIcon />
  </Card>
</div>
