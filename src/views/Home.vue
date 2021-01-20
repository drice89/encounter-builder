<template>
  <div>
    <PartyDifficultyThresholds />
    <MonsterList />
    <CharacterForm />
    <EncounterTable />
  </div>
</template>

<script>
// @ is an alias to /src
import MonsterList from "@/components/encounter-builder/monsters-list.vue";
import CharacterForm from "@/components/encounter-builder/character-form.vue";
import EncounterTable from "@/components/encounter-builder/encounter-table.vue";
import PartyDifficultyThresholds from "@/components/encounter-builder/party-difficulty-thresholds.vue"

export default {
  name: "Home",
  components: {
    MonsterList,
    CharacterForm,
    EncounterTable,
    PartyDifficultyThresholds
  },
  async mounted() {
    this.$store.dispatch("setMonsters")
    if (localStorage.characters) {
      this.$store.dispatch("setSavedCharacters", JSON.parse(localStorage.characters))
    }
  },
};
</script>
