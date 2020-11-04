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
          v-for="monster in monsters"
          :key="monster.name"
          :value="monster"
        >
          {{ monster.name }}
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
import { mapGetters } from "vuex";
import { getAllMonsters } from "../../util/dnd-api-util.js";

export default {
  name: "MonstersList",

  data: () => ({
    monsters: null,
    selectedMonsters: []
  }),
  created() {
    getAllMonsters().then(res => {
      this.$store.dispatch("setMonsters", res).then(() => {
        this.monsters = this.getAllMonstersFromState;
      });
    });
  },
  computed: {
    ...mapGetters(["getAllMonstersFromState"])
  }
  //   methods: {
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
  //   }
};
</script>

<style lang="scss" scoped>
.monster-select {
  width: 400px;
  height: 1000px;
}
</style>
