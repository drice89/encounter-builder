
<template>
<div>
  <div class="monsters-list-container">
    <div class="monsters-pick-list">
      Monsters
      <ul class="monster-select">
        <li
          v-for="(monster, index) in monstersByCr"
          :key="index"
          :value="monster"
          @click="addMonsterToRoster(monster)"
          @mouseenter="getMonsterProfile(monster)"
          class="monster-option"
        >
          <span>{{ monster.name }}</span>
          <span>{{ monster.challenge_rating }}</span>
        </li>
      </ul>
    </div>
    <ActiveMonster v-if="activeMonster" class="active-monster" :monster="activeMonster" />
    <div class="selected-monsters">
      <v-simple-table dark>
        <thead>
          <td>Monster Name</td>
          <td>XP value</td>
          <td>Remove</td> 
        </thead>
        <tr v-for="(monster, index) in selectedMonsters" :key="index">
          <td>{{ monster.name }}</td>
          <td>{{ monster.xp }}</td>
          <td><v-btn @click="removeMonsterFromRoster(monster)">X</v-btn></td>
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
    </div>
  </div>
  <div>
    <select v-model="threshold">
      <option v-for="option in Object.keys(difficultyThreshold)" :key="option" :value="difficultyThreshold[option]" :label="option.toLowerCase()" />
    </select>
    <v-btn @click="generateRandomEncounter()">Generate Random Encounter</v-btn>
  </div>
</div>
</template>

<script>
/* eslint-disable */
// refactor ternary to get multiplier
import { mapGetters, mapActions } from "vuex";
import { DIFFICULTY_THRESHOLD, THRESHOLD_MULTIPLIERS, THRESHOLD_MULTIPLIERS_LIMIT } from '../../mixins/rules.js';
import ActiveMonster from "./active-monster"

export default {
  name: "MonstersList",
  components: {
    ActiveMonster
  },
  data: () => ({
    selectedMonsters: [],
    difficultyThreshold: DIFFICULTY_THRESHOLD,
    threshold: DIFFICULTY_THRESHOLD.EASY,
    rawTotalXp: 0,
    adjustedTotalXp: 0,
    activeMonster: null
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
    ...mapActions(["addMonster"]),
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
    getMonsterProfile(monster) {
      if (!monster.loaded) {
        this.addMonster(monster.url)
          .then(res => {
            this.activeMonster = res
          })
      }
      this.activeMonster = monster
    }
  }
};
</script>

<style lang="scss" scoped>
div.monsters-list-container {
  display: flex;
  justify-content: flex-start;
  background-color: #1E1E1E;
  color: white;

  .monster-select {
    min-width: 200px;
    max-width: 400px;
    height: 400px;
    display: block;
    overflow-y: scroll;

    li.monster-option {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 2px 6px;
      &:hover{
        background-color: white;
        color: black;
      }
      .fixed-width {
        width: 200px;
      }
    }
  }
  .active-monster {
    width: 400px;
    height: 400px;
  }
  .selected-monsters {
    width: 500px;
    height: 400px;
    padding: 16px;
    overflow-y: auto;
  }
}
</style>
