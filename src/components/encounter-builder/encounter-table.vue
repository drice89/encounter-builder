<template>
  <div>
    <v-simple-table dense dark>
      <thead>
        <td>Total Party XP Thresholds</td>
        <td>Easy</td>
        <td>Medium</td>
        <td>Hard</td>
        <td>Deadly</td>
      </thead>
      <tr>
        <td></td>
        <td>{{ easyThreshold }}</td>
        <td>{{ mediumThreshold }}</td>
        <td>{{ hardThreshold }}</td>
        <td>{{ deadlyThreshold }}</td>
      </tr>
    </v-simple-table>
    <v-data-table :headers="headers" :items="characters" item-key="name">
    </v-data-table>
  </div>
</template>

<script>
import { DIFFICULTY_THRESHOLD } from "../../mixins/rules"
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
    ...mapGetters(["getAllCharactersFromState","getTotalCharacterLevel"]),
    easyThreshold() {
      return this.getTotalCharacterLevel(DIFFICULTY_THRESHOLD.EASY)
    },
    mediumThreshold() {
      return this.getTotalCharacterLevel(DIFFICULTY_THRESHOLD.MEDIUM)
    },
    hardThreshold() {
      return this.getTotalCharacterLevel(DIFFICULTY_THRESHOLD.HARD)
    },
    deadlyThreshold() {
      return this.getTotalCharacterLevel(DIFFICULTY_THRESHOLD.DEADLY)
    },
    characters() {
      return this.getAllCharactersFromState
    }
  }
}
</script>

<style lang="scss" scoped></style>
