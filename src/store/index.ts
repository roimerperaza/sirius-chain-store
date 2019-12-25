import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    configInfo: null,
    environment: null,
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
    ADD_CONFIG_INFO(state, data: any) {
      state.configInfo = data
    },
    LOGIN(state, data) {
      state.isLogged = (data) ? true : false;
      state.dataUser = data;
    },
    SHOW_LOADING(state, status: boolean) {
      state.overlay = status
    },
    SHOW_SNACKBAR(state, data) {
      state.snackbar.snackbar = data.snackbar
      state.snackbar.text = data.text
      state.snackbar.color = data.color
    }
  },
  actions: {},
  modules: {
  }
})
