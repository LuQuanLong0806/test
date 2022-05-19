const Login = () => import(/*webpackChunkName: 'login'*/ '@/views/login/Login.vue')
const Forget = () => import(/*webpackChunkName: 'Forget'*/ '@/views/login/Forget.vue')
const Register = () => import(/*webpackChunkName: 'Register'*/ '@/views/login/Register.vue')
const Reset = () => import(/*webpackChunkName: 'Reset'*/ '@/views/login/Reset.vue')

const loginRoutes = [

    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/forget',
        name: 'Forget',
        component: Forget
    },
    {
        path: '/reset',
        name: 'Reset',
        component: Reset
    },
    {
        path: '/register',
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

export default loginRoutes