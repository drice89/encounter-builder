<template>
  <div>
    <EncounterBuilder/>
    <PartyDifficultyThresholds />
  </div>
</template>

<script>
// @ is an alias to /src
import PartyDifficultyThresholds from "@/components/encounter-builder/party-difficulty-thresholds.vue"
import EncounterBuilder from '../components/encounter-builder/encounter-builder.vue';


export default {
  name: "Home",
  components: {
    PartyDifficultyThresholds,
    EncounterBuilder,
  },
};
</script>
