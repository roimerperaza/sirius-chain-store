export const accountStore = {
    // This makes your getters, mutations, and actions accessed by, eg: 'myModule/myModularizedNumber' 
    // instead of mounting getters, mutations, and actions to the root namespace.
    namespaced: true,
    state: {
        dataUser: null,
        isLogged: false,
        isLoggedFromSSID: false
    },
    getters: {
        userData: state => state.dataUser,
        isLogged: state => state.isLogged,
        isLoggedFromSSID: state => state.isLogged,
        address: state => state.dataUser.simpleWallet.address['address']
    },
    mutations: {
        LOGIN(state, data) {
            state.isLogged = (data && data.username && data.simpleWallet) ? true : false
            state.dataUser = data
        },
        LOGIN_FROM_SSID(state, status) {
            state.isLoggedFromSSID = status
        },
        UPDATE_DATA_USER(state, data){
            state.dataUser = data
        },
        CHANGE_NAME_USER(state, name) {
            state.dataUser.name = name
        }
    },
    actions: {
        LOGOUT({ commit }, data) {
            commit('LOGIN', null)
        }
    }
}