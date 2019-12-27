import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth-store';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    configInfo: null,
    environment: null,
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
  getters: {
    nameApp: state => state.configInfo.nameApp,
    pseudonymApp: state => state.configInfo.pseudonymApp
  },
  mutations: {
    ADD_CONFIG_INFO(state, data) {
      state.configInfo = data
    },
    SHOW_LOADING(state, value) {
      state.overlay = value
    },
    SHOW_SNACKBAR(state, data) {
      const { snackbar, text, color } = data
      state.snackbar.snackbar = snackbar
      state.snackbar.text = text
      state.snackbar.color = color
    }
  },
  actions: {
  },
  modules: {
    authStore
  }
})
