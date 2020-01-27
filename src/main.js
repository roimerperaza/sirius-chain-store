import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueLodash from 'vue-lodash'
import VueClipboard from 'vue-clipboard2'


import './assets/css/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { StorageService } from './services/storage'
import { GeneralService } from './services/general'
import { BlockchainProvider } from './services/blockchain-provider'


const options = { name: 'lodash' } // customize the way you want to call it
Vue.use(VueLodash, options)
Vue.use(VueAxios, axios);
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.directive('quantity', {
  bind: function (el, binding) {
    var s = JSON.stringify
    const res = s(binding.value.q).replace(/["]+/g, ' ').split('.')
    const coin = s(binding.value.coin).replace(/["]+/g, ' ')
    if (res.length > 1) {
      el.innerHTML = `<span class="fs-085rem font-weight-medium">${res[0]}.</span><span class="fs-07rem">${res[1]}</span>
                      <span class="fs-085rem font-weight-medium">${coin}</span>`
    } else {
      el.innerHTML = `<span class="fs-085rem font-weight-medium"> ${res[0]}</span>
                      <span class="fs-085rem font-weight-medium">${coin}</span>`
    }
  }
})

// Define prototype
Vue.prototype.$storage = new StorageService(localStorage)
Vue.prototype.$generalService = new GeneralService()

const configIntegration = async function () {
  try {
    const configInfo = await axios.get('../config/config.json')
    store.commit('ADD_CONFIG_INFO', configInfo.data)
    const environment = getEnvironment(configInfo.data)
    Vue.prototype.$environment = environment
    Vue.prototype.$blockchainProvider = new BlockchainProvider(
      environment.connectionNodes.nodes[0],
      environment.connectionNodes.protocol,
      environment.connectionNodes.networkType
    )
  } catch (e) {
    console.error(e)
  }
}


const getEnvironment = function (configInfo) {
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