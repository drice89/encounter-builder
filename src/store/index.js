import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monsters: null,
    characters: []
  },
  mutations: {
    SET_MONSTERS(state, payload) {
      state.monsters = payload;
    },
    ADD_CHARACTER(state, payload) {
      state.characters.push(payload)
    } 
  },
  actions: {
    async setMonsters({ commit }, data) {
      commit('SET_MONSTERS', data);
    },
    async addCharacter({ commit }, data) {
      commit('ADD_CHARACTER', data)
    }
  },
  getters: {
    getAllMonstersFromState: (state) => {
      return state.monsters.data.results
    },
    getAllCharactersFromState: (state) => {
      return state.characters
    }
  },
  modules: {}
});
