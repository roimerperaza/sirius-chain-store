import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    dataUser: null,
    overlay: false,
    snackbar: {
      color: '',
      mode: '',
      snackbar: false,
      text: '',
      timeout: 2500,
      x: 'right',
      y: 'top'
    }
  },
  mutations: {
    LOGIN(state, data) {
      state.isLogged = (data) ? true : false;
      state.dataUser = data;
    },
    SHOW_LOADING(state, value) {
      console.log('show here...', value);
      state.overlay = value
    },
    SHOW_SNACKBAR(state, data) {
      state.snackbar.snackbar = data.snackbar
      state.snackbar.text = data.text
      state.snackbar.color = data.color
    },
  },
  actions: {
    login({ commit }, data) {
      commit('LOGIN', data)
    },
    showLoading({ commit }, value) {
      commit('SHOW_LOADING', value)
    }
  },
  modules: {
  }
})
