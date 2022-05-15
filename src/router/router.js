import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from 'vuex'
import jwt from 'jsonwebtoken'
import moment from 'moment'

import db from '@/util/db'
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

router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    let token = db.get('token');
    if (token) {
        const payload = jwt.decode(token)

        if (token && moment().isBefore(moment(payload.exp * 1000))) {
            // store.commit()
        } else {
            localStorage.clear()
        }
    }



    // if (to.matched.some(record => record.meta.requiresAuth)) {
    if (to.meta.requiresAuth) {
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router