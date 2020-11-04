<template>
  <div>
    <v-data-table :headers="headers" :items="characters" item-key="name">
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "EncounterTable",

  data() {
    return {
      characters: this.$store.state.characters,
      headers: [
        { text: "name", value: "name" },
        { text: "level", value: "level" },
        { text: "hp", value: "hp" },
        { text: "init", value: "init" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
