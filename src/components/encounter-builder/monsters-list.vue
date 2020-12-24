
<template>
  <div class="monsters-list-container">
    <v-container>
      <div class="monsters-pick-list">
        Monsters
        <ul class="monster-select">
          <li
            v-for="(monster, index) in monstersByCr"
            :key="index"
            :value="monster"
            @click="addMonsterToRoster(monster)"
            class="monster-option"
          >
            <span>{{ monster.name }}</span>
            <span>{{ monster.cr }}</span>
          </li>
        </ul>
      </div>
    </v-container>
    <v-container>
      <v-list>
        <li v-for="(monster, index) in selectedMonsters" :key="index" class="">
          <span>{{ monster.xp }}</span>
          <span>{{ monster.name }}</span>
          <span @click="removeMonsterFromRoster(monster)">X</span>
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
import { DIFFICULTY_THRESHOLD, THRESHOLD_MULTIPLIERS, THRESHOLD_MULTIPLIERS_LIMIT } from '../../mixins/rules.js';
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
    ...mapGetters([
      "getAllMonstersFromState", 
      "getTotalCharacterLevel"
    ]),
    monstersByCr() {
      return this.getAllMonstersFromState.sort((a, b) => a.cr - b.cr)
    }
  },
  methods: {
    generateRandomEncounter(){
      // get each party member from state
      // total their level at the selected threshold
      const totalXp = this.getTotalCharacterLevel(this.threshold)
      let runningMonXpTotal = 0
      console.log(totalXp)
      let finished = false
      const pool = []
      while (totalXp && !finished) {
        let monsters = this.monstersByCr.filter(monster => {
          const thresholdMultiplier = pool.length > THRESHOLD_MULTIPLIERS_LIMIT ? THRESHOLD_MULTIPLIERS[THRESHOLD_MULTIPLIERS_LIMIT] : THRESHOLD_MULTIPLIERS[pool.length + 1]
          return (thresholdMultiplier * (monster.xp + runningMonXpTotal)) <= totalXp
        });
        if (!monsters.length) {
          finished = true;
        } else {
          const pickedMonster = monsters[(Math.floor(Math.random() * monsters.length))]
          pool.push(pickedMonster)
          runningMonXpTotal += pickedMonster.xp
        }
      }
      console.log(runningMonXpTotal)   
      this.selectedMonsters = pool
    },
    addMonsterToRoster(monster) {
      let monsterCopy = { id: this.selectedMonsters.length, ...monster }
      this.selectedMonsters.push(monsterCopy)
    },
    removeMonsterFromRoster(monster) {
      this.selectedMonsters = this.selectedMonsters.filter(m => m.id !== monster.id)
    },
  }
};
</script>

<style lang="scss" scoped>
div.monsters-list-container {
  display: flex;
  justify-content: space-around;

  .monster-select {
    width: 400px;
    height: 400px;
    display: block;
    overflow-y: scroll;
  }
  .monster-option {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .fixed-width {
      width: 200px;
    }
  }
}
</style>
