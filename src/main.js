import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueLodash from 'vue-lodash'

import App from './App.vue'
import router from './router'
import store from './store'
import Utils from './services/utils'
import vuetify from './plugins/vuetify';
import { StorageService } from './services/storage'
import { Connections } from './services/connection'
// import { Config } from './services/config'
// import { ProximaxProvider } from './services/proximaxProvider'

const options = { name: 'lodash' } // customize the way you want to call it
Vue.use(VueLodash, options)
Vue.use(VueAxios, axios);
Vue.config.productionTip = false

// Define prototype
Vue.prototype.$utils = Utils
Vue.prototype.$storage = new StorageService(localStorage)

const configIntegration = async function () {
  try {
    const configInfo = await axios.get('../config/config.json')
    store.commit('ADD_CONFIG_INFO', configInfo.data)
    // Vue.prototype.$config = new Config(environment)
    // const connection = new Connections(Vue.prototype.$config.nodes[0])
    // console.log('----connection----', connection)
    // Vue.prototype.$provider = new Connections(Vue.prototype.$config.nodes[0])
    // Vue.prototype.$proximaxProvider = new ProximaxProvider(null)
  } catch (e) {
    console.error(e)
  }
}

const selectEnvironment = function (configInfo) {
  let environment = null
  switch (configInfo.version) {
    case 'TEST_NET':
      environment = configInfo.environment.TESTNET
      break;
    case 'MAIN_NET':
      environment = configInfo.environment.MAINNET
      break;
  }
  return environment
}


new Vue({
  beforeCreate() {
    configIntegration()
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#blockchainStore')