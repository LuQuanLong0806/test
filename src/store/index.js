import Vue from 'vue'

import Vuex from 'vuex';


import login from './modules/login'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        sid: '',
    },
    mutations: {
        SET_SID(state, value) {
            state.sid = value
        }
    },

    modules: {
        login
    }

})

export default store