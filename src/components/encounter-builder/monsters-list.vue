
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
    <div>
      <select v-model="threshold">
        <option v-for="option in Object.keys(difficultyThreshold)" :key="option" :value="difficultyThreshold[option]" :label="option.toLowerCase()" />
      </select>
      <button @click="generateRandomEncounter()">Generate Random Encounter</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import { DIFFICULTY_THRESHOLD } from '../../mixins/rules.js';
import { getAllMonsters } from "../../util/dnd-api-util.js";

export default {
  name: "MonstersList",

  data: () => ({
    selectedMonsters: [],
    difficultyThreshold: DIFFICULTY_THRESHOLD,
    threshold: DIFFICULTY_THRESHOLD.EASY
  }),
  async mounted() {
    this.$store.dispatch("setMonsters", await getAllMonsters())
  },
  computed: {
    ...mapGetters(["getAllMonstersFromState", "getTotalCharacterLevel"]),
    monstersByCr() {
      return this.getAllMonstersFromState.sort((a, b) => a.cr - b.cr)
    }
  },
    methods: {
      generateRandomEncounter(){
        // get each party member from state
        // total their level at the selected threshold
        let totalXp = this.getTotalCharacterLevel(this.threshold)
        let finished = false
        const pool = []
        while (totalXp && !finished) {
          let monsters = this.monstersByCr.filter(monster => {
            return monster.xp <= totalXp
          });
          if (!monsters.length) {
            finished = true;
          } else {
            const pickedMonster = monsters[(Math.floor(Math.random() * monsters.length))]
            pool.push(pickedMonster)
            totalXp -= pickedMonster.xp
          }
        }   
        this.selectedMonsters = pool
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
