
const loginRoutes = [

    {
        path: '/login',
        name: 'Login',
        component: () => import(/*webpackChunkName: 'login'*/ '@/views/login/Login.vue')
    },
    {
        path: '/forget',
        name: 'Forget',
        component: () => import(/*webpackChunkName: 'login'*/ '@/views/login/Forget.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/*webpackChunkName: 'login'*/ '@/views/login/Register.vue'),
        beforeEnter: (to, from, next) => {
            console.log(to, from);
            if (from.name == 'Login') {
                next()
            } else {
                next('/login')
            }
        }
    },
]

export default loginRoutes