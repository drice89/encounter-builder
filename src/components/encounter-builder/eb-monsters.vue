
<template>
<div class="encounter-monsters-container">
  <div class="monsters-list-wrapper">
    <h2 class="monsters-header">Monsters</h2>
    <div class="monsters-list">
      <MonsterSearch
        @add-monster-to-roster="addMonsterToRoster"
        @get-monster-profile="getMonsterProfile"
      />
      <ActiveMonster class="active-monster" :monster="activeMonster" />
    </div>
  </div>
  <div class="monster-roster">
    <MonsterRoster 
      :adjustedTotalXp="adjustedTotalXp" 
      :monsters="selectedMonsters"
      :currentSelectedThreshold="threshold"
      @remove="removeMonsterFromRoster"
    />
    <MonsterButtons 
      @change-threshold="changeThreshold" 
      @gen-encounter="generateRandomEncounter"
      @add-monsters="addMonstersToEncounter" 
    />
  </div>
</div>
</template>

<script>
/* eslint-disable */
// refactor ternary to get multiplier
import { mapGetters, mapActions } from "vuex";
import { DIFFICULTY_THRESHOLD, THRESHOLD_MULTIPLIERS, THRESHOLD_MULTIPLIERS_LIMIT } from '../../mixins/rules.js';
import ActiveMonster from "./eb-monsters/active-monster"
import MonsterRoster from "./eb-monsters/monster-roster"
import MonsterButtons from "./eb-monsters/monster-buttons"
import MonsterSearch from "./eb-monsters/monster-search"

export default {
  name: "EbMonsters",
  components: {
    ActiveMonster,
    MonsterRoster,
    MonsterButtons,
    MonsterSearch
  },
  data: () => ({
    selectedMonsters: [],
    // difficultyThreshold: DIFFICULTY_THRESHOLD,
    threshold: DIFFICULTY_THRESHOLD.EASY,
    rawTotalXp: 0,
    adjustedTotalXp: 0,
    activeMonster: null,
    // search: null
  }),
  computed: {
    ...mapGetters([ 
      "getCurrentThresholdXp"
    ]),
  },
  methods: {
    ...mapActions(["addMonster"]),
    generateRandomEncounter(monsterList){
      const totalXp = this.getCurrentThresholdXp(this.threshold)
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
    },
    changeThreshold(payload){
      this.threshold = payload
    },
    addMonstersToEncounter() {
      let monstersToBeAdded = {}
      this.selectedMonsters.forEach( (monster, index) => {
        monster.monster = true
        monstersToBeAdded[index] = monster
      })
      this.$store.dispatch("setSelectedMonsters", monstersToBeAdded)
    }
  }
};
</script>

<style lang="scss" scoped>
div.encounter-monsters-container {
  width: 100%;
  height: 550px;
  display: flex;
  justify-content: flex-start;
  background-color: #1E1E1E;
  color: white;

  div.monsters-list-wrapper{
    border: 1px solid rgb(160, 160, 160);
    margin: 12px;
    border-radius: 6px;

    h2.monsters-header{
      text-align: center;
      border-bottom: 1px solid rgb(160, 160, 160);
    }

    div.monsters-list {
      display:flex;
      align-content: flex-start;
    }
  }

  div.monster-roster {
    border: 1px solid rgb(160, 160, 160);
    margin: 12px;
    border-radius: 6px;
  }

}
</style>
