
<template>
  <div>
    <v-container>
      <label for="monsters-pick-list">Monsters</label>
      <select
        name="monsters-pick-list"
        id="monsters-pick-list"
        class="monster-select"
        v-model="selectedMonsters"
        multiple
      >
        <option
          v-for="monster in monstersByCr"
          :key="monster.name"
          :value="monster"
        >
          <span>{{ monster.name }}</span>
          <span>{{ monster.cr }}</span>
        </option>
      </select>
    </v-container>
    <v-container>
      <v-list>
        <li v-for="monster in selectedMonsters" :key="monster.name">
          {{ monster.name }}
        </li>
      </v-list>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import { getAllMonsters } from "../../util/dnd-api-util.js";

export default {
  name: "MonstersList",

  data: () => ({
    selectedMonsters: []
  }),
  async mounted() {
    this.$store.dispatch("setMonsters", await getAllMonsters())
  },
  computed: {
    ...mapGetters(["getAllMonstersFromState"]),
    monstersByCr() {
      return this.getAllMonstersFromState.sort((a, b) => a.cr - b.cr)
    }
  },
    methods: {
      generateRandomEncounter(){
        // get each party member from state
        // total their level at the selected threshold
        // while threshold is > 0 || some other condition tbd
        // make adjustments for number of monsters already in the list
        // filter all monsters above that threshold
        // randomly select monster from that list
        // add it to a monsters array
        // subtract its xp from the total threshold
        // return monster array
      }
  //       addMonsterToRoster(monster) {
  //           this.selectedMonsters.push(monster)
  //       },
  //       removeMonsterFromRoster(monster) {
  //           this.selectedMonsters = this.selectedMonsters.filter(m => m.name === monster.name)
  //       },
  //       handleMonsterSelectChange(monster) {
  //           console.log("handlechange")
  //           if(this.selectedMonsters.some(m => m.name === monster.name)) {
  //               this.removeMonsterFromRoster(monster);
  //           } else {
  //               this.addMonsterToRoster(monster);
  //           }
  //       }
    }
};
</script>

<style lang="scss" scoped>
.monster-select {
  width: 400px;
  height: 1000px;
}
</style>
