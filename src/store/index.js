import Vue from "vue";
import Vuex from "vuex";
import { ENCOUNTER_DIFFICULTY_TABLE } from "../mixins/rules"
import { getMonster, getAllMonsters } from "@/util/dnd-api-util.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monsters: {},
    characters: {},
    selectedMonsters: {},
    spinner: false
  },
  mutations: {
    SET_MONSTERS(state, payload) {
      state.monsters = payload;
    },
    SET_SAVED_CHARACTERS(state, payload) {
      state.characters = { ...payload }
    },
    SET_SELECTED_MONSTERS(state, payload) {
      Vue.set(state.selectedMonsters, payload.id, payload)
    },
    ADD_MONSTER(state, payload) {
      state.monsters[payload.index] = payload
    },
    ADD_CHARACTER(state, payload) {
      Vue.set(state.characters, payload.id, payload) 
    },
    SET_SPINNER(state) {
      state.spinner = true
    },
    REMOVE_SPINNER(state) {
      state.spinner = false
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
      const res = await getMonster(monsterUrl)
      let monster = res.data
      monster.loaded = true
      commit("ADD_MONSTER", monster)
      return monster
    },
    async addCharacter({ commit }, data) {
      commit("ADD_CHARACTER", data);
    },
    async setSpinner({ commit }) {
      commit("SET_SPINNER");
    },
    async removeSpinner({ commit }) {
      commit("REMOVE_SPINNER")
    },
    async setSavedCharacters({ commit }, data) {
      commit("SET_SAVED_CHARACTERS", data)
    },
    async setSelectedMonsters({ commit }, data) {
      commit("SET_SELECTED_MONSTERS", data)
    }
  },
  getters: {
    getAllMonstersFromState: state => {
      return Object.values(state.monsters) || [];
    },
    getAllCharactersFromState: state => {
      return state.characters;
    },
    charactersLength: state => {
      return Object.keys(state.characters).length || 0
    },
    getCurrentThresholdXp: state => threshold => {
      let totalXp = 0
      Object.values(state.characters).forEach(char => {
        totalXp += ENCOUNTER_DIFFICULTY_TABLE[char.level][threshold]
      });
      return totalXp
    },
    getSpinnerStatus: state => {
      return state.spinner
    },
    getSelectedMonstersFromState: state => {
      return state.selectedMonsters
    }
  },
  modules: {}
});
