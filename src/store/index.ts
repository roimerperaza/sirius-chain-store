import Vue from 'vue'
import Vuex from 'vuex'
import SystemConfigInterface from '../interfaces/General'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    configInfo: {},
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
    ADD_CONFIG_INFO(state, data: SystemConfigInterface.RootObjectConfig) {
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
