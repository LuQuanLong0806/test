const login = {
    namespaced: true,
    state: {
        isLogin: false

    },
    mutations: {
        SET_IS_LOGIN(state, payload) {
            state.isLogin = payload
        }
    },
    actions: {

    }
}

export default login