import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
//@ts-ignore
import VueLodash from 'vue-lodash'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

// 
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { StorageService } from './services/storage'
import Utils from './services/utils'


Vue.config.productionTip = false
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

const selectEnvironment = function (configInfo: any) {
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
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app')
