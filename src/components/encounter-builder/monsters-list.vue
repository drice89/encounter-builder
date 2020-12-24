
<template>
<div>
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
      <v-simple-table dark>
        <thead>
          <td>Monster Name</td>
          <td>XP value</td>
          <td>Remove</td> 
        </thead>
        <tr v-for="(monster, index) in selectedMonsters" :key="index" class="">
          <td>{{ monster.name }}</td>
          <td>{{ monster.xp }}</td>
          <td @click="removeMonsterFromRoster(monster)">X</td>
        </tr>
        <tfoot>
          <td>
            Total Monsters: {{ selectedMonsters.length }}
          </td>
          <td>
            Total Adjusted Xp: {{ adjustedTotalXp }}
          </td>
        </tfoot>
      </v-simple-table>
    </v-container>
  </div>
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
// refactor ternary to get multiplier
import { mapGetters } from "vuex";
import { DIFFICULTY_THRESHOLD, THRESHOLD_MULTIPLIERS, THRESHOLD_MULTIPLIERS_LIMIT } from '../../mixins/rules.js';

export default {
  name: "MonstersList",

  data: () => ({
    selectedMonsters: [],
    difficultyThreshold: DIFFICULTY_THRESHOLD,
    threshold: DIFFICULTY_THRESHOLD.EASY,
    rawTotalXp: 0,
    adjustedTotalXp: 0
  }),
  computed: {
    ...mapGetters([
      "getAllMonstersFromState", 
      "getTotalCharacterLevel"
    ]),
    monstersByCr() {
      return this.getAllMonstersFromState.sort((a, b) => a.cr - b.cr)
    },
  },
  methods: {
    generateRandomEncounter(){
      const totalXp = this.getTotalCharacterLevel(this.threshold)
      let runningMonXpTotal = 0
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
      //refactor
      const multiplier = pool.length > THRESHOLD_MULTIPLIERS_LIMIT ? THRESHOLD_MULTIPLIERS[THRESHOLD_MULTIPLIERS_LIMIT] : THRESHOLD_MULTIPLIERS[pool.length]
      debugger
      this.rawTotalXp = runningMonXpTotal
      this.adjustedTotalXp = this.rawTotalXp * multiplier
      this.selectedMonsters = pool
    },
    addMonsterToRoster(monster) {
      const monsterCopy = { id: this.selectedMonsters.length, ...monster }
      this.rawTotalXp += monsterCopy.xp
      //refactor
      const multiplier = this.selectedMonsters.length > THRESHOLD_MULTIPLIERS_LIMIT ? THRESHOLD_MULTIPLIERS[THRESHOLD_MULTIPLIERS_LIMIT] : THRESHOLD_MULTIPLIERS[this.selectedMonsters.length + 1]
      this.adjustedTotalXp = this.rawTotalXp * multiplier
      this.selectedMonsters.push(monsterCopy)
    },
    removeMonsterFromRoster(monster) {
      this.rawTotalXp -= monster.xp
      //refactor
      const multiplier = this.selectedMonsters.length > THRESHOLD_MULTIPLIERS_LIMIT ? THRESHOLD_MULTIPLIERS[THRESHOLD_MULTIPLIERS_LIMIT] : THRESHOLD_MULTIPLIERS[this.selectedMonsters.length - 1]
      this.adjustedTotalXp = this.rawTotalXp * multiplier
      this.selectedMonsters = this.selectedMonsters.filter(m => m.id !== monster.id)
    },
  }
};
</script>

<style lang="scss" scoped>
div.monsters-list-container {
  display: flex;
  justify-content: space-around;
  background-color: #1E1E1E;
  color: white;

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
