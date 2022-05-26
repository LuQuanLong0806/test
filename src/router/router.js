import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'moment'

import db from '@/util/db'
import loginRoutes from './login'
import userRoutes from './user'
import contentRoutes from './content'

Vue.use(VueRouter)
// 404
const NotFound = () => import('@/views/NotFound')
const Index = () => import('@/views/channels/index')
const Ask = () => import('@/views/Template')
const postNew = () => import('@/views/postNew')
const Confirm = () => import('@/views/Confirm')

const routes = [
    {
        path: '*',
        redirect: '/404',
    },
    {
        path: '/404',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/',
        component: () => import('@/views/Home'),
        redirect: '/index',
        children: [
            {
                path: 'index',
                name: 'index',
                component: Index,
            },
            {
                path: 'ask',
                name: 'ask',
                component: Ask,
            },

        ]
    },
    {
        path: '/postNew',
        name: 'postNew',
        component: postNew,
    },

    {
        path: '/confirm',
        name: 'Confirm',
        component: Confirm,
    },

    {
        path: '/test',
        component: () => import('@/views/Test'),
    },
    ...loginRoutes,
    ...userRoutes,
    ...contentRoutes
]

let router = new VueRouter({
    linkEexatActiveClass: 'layui-this', // 激活的class
    routes
})

router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    let token = db.get('token');
    if (token) {
        const payload = jwt.decode(token)
        if (token && moment().isBefore(moment(payload.exp * 1000))) {
            // store.commit()
        } else {
            store.commit('login/SET_TOKEN', '')
            localStorage.clear()
        }
    }

    // if (to.matched.some(record => record.meta.requiresAuth)) {
    if (to.meta.requiresAuth) {
        if (token) {
            next()
        } else {
            next('/login?redirect=' + to.fullPath)
        }
    } else {
        next()
    }
})

export default router