import Vue from 'vue'

import VueRouter from 'vue-router'


import loginRoutes from './login'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/Home')
    },
    ...loginRoutes
]

let router = new VueRouter({
    routes
})

export default router