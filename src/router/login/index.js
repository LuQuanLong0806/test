
const Login = () => import(/*webpackChunkName: 'login'*/ '@/views/login/Login.vue')
const Forget = () => import(/*webpackChunkName: 'login'*/ '@/views/login/Forget.vue')
const Register = () => import(/*webpackChunkName: 'login'*/ '@/views/login/Register.vue')

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