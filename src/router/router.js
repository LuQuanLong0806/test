import Vue from 'vue'

import VueRouter from 'vue-router'


import loginRoutes from './login'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/views/Home'),
        children: [
            {
                path: 'ask',
                component: () => import('@/views/Template'),
            }
        ]
    },
    {
        path: '/postNew',
        component: () => import('@/views/postNew'),
    },
    ...loginRoutes
]

let router = new VueRouter({
    routes
})

export default router