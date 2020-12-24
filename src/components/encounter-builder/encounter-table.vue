<template>
  <div>
    <v-data-table :headers="headers" :items="characters" item-key="name">
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "EncounterTable",

  data() {
    return {
      headers: [
        { text: "name", value: "name" },
        { text: "level", value: "level" },
        { text: "hp", value: "hp" },
        { text: "init", value: "init" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getAllCharactersFromState"]),
    characters() {
      return this.getAllCharactersFromState
    }
  }
}
</script>

<style lang="scss" scoped></style>
