<template>
  <div class="monsters-pick-list">
    <div>
      Monsters
    </div>
    <div>
      <input type="text" v-model="search">
    </div>
    <ul class="monster-select">
      <li
        v-for="(monster, index) in monstersByCr"
        :key="index"
        :value="monster"
        @click="$emit('add-monster-to-roster', monster)"
        @mouseenter="$emit('get-monster-profile', monster)"
        class="monster-option"
      >
        <span>{{ monster.name }}</span>
        <span>{{ monster.challenge_rating }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MonsterSearch",
  data: () => ({
    search: null
  }),
  computed: {
    ...mapGetters([
      "getAllMonstersFromState", 
    ]),
    monstersByCr() {
      return this.getAllMonstersFromState
        .filter(monster => this.monsterInSearch(monster))
        .sort((a, b) => a.cr - b.cr)
    },
  },
  methods: {
    monsterInSearch(monster) {
      return !this.search || monster.name.toLowerCase().includes(this.search)
    },
  }
}
</script>

<style lang="scss" scoped>
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
</style>