export const accountStore = {
    // This makes your getters, mutations, and actions accessed by, eg: 'myModule/myModularizedNumber' 
    // instead of mounting getters, mutations, and actions to the root namespace.
    namespaced: true,
    state: {
        dataUser: null,
        isLogged: false,
    },
    getters: {
        userData: state => state.dataUser,
        isLogged: state => state.isLogged,
        address: state => state.dataUser.simpleWallet.address['address']
    },
    mutations: {
        LOGIN(state, data) {
            state.isLogged = (data && data.username && data.simpleWallet) ? true : false
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