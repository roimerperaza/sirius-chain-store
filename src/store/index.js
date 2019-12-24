import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    dataUser: null
  },
  mutations: {
    LOGIN(state, data) {
      state.isLogged = (data) ? true : false;
      state.dataUser = data;
    }
  },
  actions: {
    login ({ commit }, data) {
      commit('LOGIN', data)
    },
  },
  modules: {
  }
})
