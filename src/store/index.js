import Vue from "vue";
import Vuex from "vuex";
import { ENCOUNTER_DIFFICULTY_TABLE } from "../mixins/rules"
import { getMonster, getAllMonsters } from "@/util/dnd-api-util.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monsters: {},
    characters: []
  },
  mutations: {
    SET_MONSTERS(state, payload) {
      state.monsters = payload;
    },
    ADD_MONSTER(state, payload) {
      state.monsters[payload.index] = payload
    },
    ADD_CHARACTER(state, payload) {
      state.characters.push(payload);
    }
  },
  actions: {
    async setMonsters({ commit }) {
      const data = await getAllMonsters()
      let monsters = {};
      data.forEach(monster => {
        monsters[monster.index] = monster
      })
      commit("SET_MONSTERS", monsters);
    },
    async addMonster({ commit }, monsterUrl){
      commit("ADD_MONSTER", await getMonster(monsterUrl))
    },
    async addCharacter({ commit }, data) {
      commit("ADD_CHARACTER", data);
    }
  },
  getters: {
    getAllMonstersFromState: state => {
      return Object.values(state.monsters) || [];
    },
    getAllCharactersFromState: state => {
      return state.characters;
    },
    getTotalCharacterLevel: state => threshold => {
      let totalXp = 0
      state.characters.forEach(char => {
        totalXp += ENCOUNTER_DIFFICULTY_TABLE[char.level][threshold]
      });
      return totalXp
    }
  },
  modules: {}
});
