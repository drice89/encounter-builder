<template>
  <div>
    <v-simple-table dark>
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
  </div>
</template>

<script>
import { DIFFICULTY_THRESHOLD } from "../../mixins/rules"
import { mapGetters } from "vuex";
export default {
    name: "PartyDifficultyThresholds",
    computed: {
        ...mapGetters(["getCurrentThresholdXp"]),
        easyThreshold() {
        return this.getCurrentThresholdXp(DIFFICULTY_THRESHOLD.EASY)
        },
        mediumThreshold() {
        return this.getCurrentThresholdXp(DIFFICULTY_THRESHOLD.MEDIUM)
        },
        hardThreshold() {
        return this.getCurrentThresholdXp(DIFFICULTY_THRESHOLD.HARD)
        },
        deadlyThreshold() {
        return this.getCurrentThresholdXp(DIFFICULTY_THRESHOLD.DEADLY)
        },
    }
}
</script>

<style lang="scss" scoped>

</style>