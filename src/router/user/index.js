import store from './../../store'
const userRoutes = [
    {
        path: '/User',
        name: 'User',
        component: () => import(/*webpackChunkName: 'UserCenter'*/ '@/views/user/User.vue'),
        redirect: '/User/Center',
        beforeEnter(to, form, next) {
            console.log('form', form);
            console.log('to', to);
            if (store.state.login.isLogin) {
                next()
            } else {
                next('/login')
            }
        },
        children: [
            {
                path: 'Center',
                name: 'Center',
                component: () => import(/*webpackChunkName: 'BaseSetting'*/ '@/views/user/Center.vue'),
            },
            {
                path: 'BaseSetting',
                name: 'BaseSetting',
                component: () => import(/*webpackChunkName: 'BaseSetting'*/ '@/views/user/BaseSetting.vue'),
            },
            {
                path: 'MyPosts',
                name: 'MyPosts',
                component: () => import(/*webpackChunkName: 'MyPosts'*/ '@/views/user/MyPosts.vue'),
            },
            {
                path: 'MyMessage',
                name: 'MyMessage',
                component: () => import(/*webpackChunkName: 'MyMessage'*/ '@/views/user/MyMessage.vue'),
            },
            {
                path: 'Others',
                name: 'Others',
                component: () => import(/*webpackChunkName: 'Others'*/ '@/views/user/Others.vue'),
            },
        ]
    },


]

export default userRoutes