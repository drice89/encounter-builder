<template>
  <div class="monsters-pick-list">
    <div>
      <input type="text" v-model="search" placeholder="Search" class="search-bar" />
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
        .sort((a, b) => {
          let _a = parseFloat(a.challenge_rating)
          let _b = parseFloat(b.challenge_rating)
          return _a - _b
        })
    }
  },
  methods: {
    monsterInSearch(monster) {
      return !this.search || monster.name.toLowerCase().includes(this.search)
    },
  }
}
</script>

<style lang="scss" scoped>
.monsters-pick-list{
  height: 475px;
  width: 332px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .search-bar {
    border-radius: 6px;
    margin: 12px 4px;
    width: 315px; 
    height: 35px; 
    border: 1px solid #999999; 
    padding: 10px;
    color: rgb(255, 255, 255);

    &:focus{
       outline: rgb(255, 255, 255) auto 1px;
    }
  }

  .monster-select {
    width: 325px;
    height: 400px;
    display: block;
    overflow-y: scroll;

    li.monster-option {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 2px 0px;
      &:hover{
        background-color: white;
        color: black;
      }
    }
  }
}
</style>