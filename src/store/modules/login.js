import db from '@/util/db'

const login = {
    namespaced: true,
    state: {
        token: db.get('token'),
        userInfo: db.get('userInfo') ? JSON.parse(db.get('userInfo')) : {}
    },
    mutations: {
        SET_IS_LOGIN(state, payload) {
            state.isLogin = payload
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
            if (payload) {
                state.isLogin = true
            } else {
                state.isLogin = false
            }
            db.set('token', payload)
        },
        SET_USER_INFO(state, payload) {
            state.userInfo = payload
            db.set('userInfo', JSON.stringify(payload))
        }
    },
    actions: {},
    getters: {
        isLogin: state => state.token ? true : false,
    }

}

export default login