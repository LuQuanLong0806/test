import Vue from 'vue'
import VueRouter from 'vue-router'

import loginRoutes from './login'
import userRoutes from './user'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/views/Home'),
        redirect: '/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/channels/index'),
            },
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
    {
        path: '/test',
        component: () => import('@/views/Test'),
    },
    ...loginRoutes,
    ...userRoutes
]

let router = new VueRouter({
    linkEexatActiveClass: 'layui-this', // 激活的class
    routes
})

export default router