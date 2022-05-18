const Entrance = () => import(/*webpackChunkName: 'login'*/ '@/views/login/index')
const Login = () => import(/*webpackChunkName: 'login'*/ '@/views/login/Login.vue')
const Forget = () => import(/*webpackChunkName: 'login'*/ '@/views/login/Forget.vue')
const Register = () => import(/*webpackChunkName: 'login'*/ '@/views/login/Register.vue')
const Reset = () => import(/*webpackChunkName: 'login'*/ '@/views/login/Reset.vue')

const loginRoutes = [
    {
        path: '/entrance',
        name: 'Entrance',
        redirect: '/entrance/login',
        component: Entrance,
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login
            },
            {
                path: 'forget',
                name: 'Forget',
                component: Forget
            },
            {
                path: 'reset',
                name: 'Reset',
                component: Reset
            },
            {
                path: 'register',
                name: 'Register',
                component: Register,
                // beforeEnter: (to, from, next) => {
                //     console.log(to, from);
                //     if (from.name == 'Login') {
                //         next()
                //     } else {
                //         next('/login')
                //     }
                // }
            },
        ]
    },

]

export default loginRoutes