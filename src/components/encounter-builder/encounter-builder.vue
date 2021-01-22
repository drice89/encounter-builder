<template>
  <div>
    <EbMonsters />
    <EbTable />
  </div>
</template>

<script>
import EbMonsters from "./eb-monsters.vue"
import EbTable from "./eb-table"
export default {
  name: "EncounterBuilder",
  components:{
    EbMonsters,
    EbTable
  },
  async mounted() {
    this.$store.dispatch("setMonsters")
    if (localStorage.characters) {
      this.$store.dispatch("setSavedCharacters", JSON.parse(localStorage.characters))
    }
  }
}
</script>