<template>
  <div>
    <v-data-table :headers="headers" :items="Object.values(getAllCharactersFromState)" item-key="id" dark>
    </v-data-table>
    <v-btn @click="save">Save</v-btn> 
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
        { text: "init", value: "init" },
      ],
      numChars: 0
    };
  },
  computed: {
    ...mapGetters(["getAllCharactersFromState"]),
  },
  methods: {
    save() {
      localStorage.characters = JSON.stringify(this.getAllCharactersFromState)
    }
  },
}
</script>

<style lang="scss" scoped></style>
