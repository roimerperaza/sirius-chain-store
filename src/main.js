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
import { Config } from './services/config'
import { Connections } from './services/connection'


const options = { name: 'lodash' } // customize the way you want to call it
Vue.use(VueLodash, options)
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
Vue.prototype.$utils = Utils
Vue.prototype.$storage = new StorageService(localStorage)

async function configIntegration() {
  try {
    const configInfo = await axios.get('../config/config.json')
    if (configInfo.data.version === 'TESTNET') {
      Vue.prototype.$config = new Config(configInfo.data.environment.TESTNET)
    } else {
      Vue.prototype.$config = new Config(configInfo.data.environment.MAINNET)
    }

    Vue.prototype.$provider = new Connections(Vue.prototype.$config.nodes[0])
  } catch (e) {
    console.error(e)
  }

  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#blockchainStore')
}

configIntegration()