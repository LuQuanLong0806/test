import db from '@/util/db'

const login = {
    namespaced: true,
    state: {
        // isLogin: false

    },
    mutations: {
        SET_IS_LOGIN(state, payload) {
            state.isLogin = payload
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
            db.set('token', payload)
        }
    },
    actions: {

    },
    getters: {
        isLogin: state => state.token ? true : false
    }

}

export default login