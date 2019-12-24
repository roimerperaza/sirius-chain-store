import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    dataUser: null,
    overlay: false
  },
  mutations: {
    LOGIN(state, data) {
      state.isLogged = (data) ? true : false;
      state.dataUser = data;
    },
    SHOWOVERLAY(state, value) {
      state.overlay = value
    },
  },
  actions: {
    login ({ commit }, data) {
      commit('LOGIN', data)
    },
    showOverlay({ commit }, value) {
      commit('SHOWOVERLAY', value)
    }
  },
  modules: {
  }
})
