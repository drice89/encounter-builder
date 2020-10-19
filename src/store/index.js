import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monsters: null
  },
  mutations: {
    SET_MONSTERS(state, payload) {
      state.monsters = payload;
    } 
  },
  actions: {
    async setMonsters({ commit }, data) {
      commit('SET_MONSTERS', data);
    }
  },
  getters: {
    getAllMonstersFromState: (state) => {
      return state.monsters.data.results
    }
  },
  modules: {}
});
