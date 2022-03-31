import Vue from 'vue'

import VueRouter from 'vue-router'


import loginRoutes from './login'

Vue.use(VueRouter)

const routes = [
    ...loginRoutes
]

let router = new VueRouter({
    routes
})

export default router