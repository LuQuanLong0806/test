// import store from './../../store'

const meta = {
    requiresAuth: true,
}


const User = () => import(/*webpackChunkName: 'UserCenter'*/ '@/views/user/User.vue');
const Center = () => import(/*webpackChunkName: 'Center'*/ '@/views/user/Center');
const BaseSetting = () => import(/*webpackChunkName: 'BaseSetting'*/ '@/views/user/BaseSetting/index');
const MyPosts = () => import(/*webpackChunkName: 'MyPosts'*/ '@/views/user/MyPosts');
const MyMessage = () => import(/*webpackChunkName: 'MyMessage'*/ '@/views/user/MyMessage');
const Others = () => import(/*webpackChunkName: 'Others'*/ '@/views/user/Others');
const MyHomePage = () => import(/*webpackChunkName: 'MyHomePage'*/ '@/views/user/MyHomePage');


const userRoutes = [
    {
        path: '/User',
        name: 'User',
        component: User,
        redirect: '/User/Center',
        meta: {
            ...meta
        },
        children: [

            {
                path: 'MyHomePage',
                name: 'MyHomePage',
                component: MyHomePage,
                meta: {
                    ...meta
                },
            },
            {
                path: 'Center',
                name: 'Center',
                component: Center,
                meta: {
                    ...meta
                },
            },
            {
                path: 'BaseSetting',
                name: 'BaseSetting',
                component: BaseSetting,
                meta: {
                    ...meta
                },
            },
            {
                path: 'MyPosts',
                name: 'MyPosts',
                component: MyPosts,
                meta: {
                    ...meta
                },
            },
            {
                path: 'MyMessage',
                name: 'MyMessage',
                component: MyMessage,
                meta: {
                    ...meta
                },
            },
            {
                path: 'Others',
                name: 'Others',
                component: Others,
                meta: {
                    ...meta
                },
            },
        ]
    },

]

export default userRoutes