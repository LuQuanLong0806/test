// import store from './../../store'

const meta = {
    requiresAuth: true,
}

const userRoutes = [
    {
        path: '/User',
        name: 'User',
        component: () => import(/*webpackChunkName: 'UserCenter'*/ '@/views/user/User.vue'),
        redirect: '/User/Center',
        // beforeEnter(to, form, next) {
        //     console.log('form', form);
        //     console.log('to', to);
        //     if (store.state.login.isLogin) {
        //         next()
        //     } else {
        //         next('/login')
        //     }
        // },
        meta: {
            ...meta
        },
        children: [
            {
                path: 'Center',
                name: 'Center',
                component: () => import(/*webpackChunkName: 'BaseSetting'*/ '@/views/user/Center'),
                meta: {
                    ...meta
                },
            },
            {
                path: 'BaseSetting',
                name: 'BaseSetting',
                component: () => import(/*webpackChunkName: 'BaseSetting'*/ '@/views/user/BaseSetting'),
                meta: {
                    ...meta
                },
            },
            {
                path: 'MyPosts',
                name: 'MyPosts',
                component: () => import(/*webpackChunkName: 'MyPosts'*/ '@/views/user/MyPosts'),
                meta: {
                    ...meta
                },
            },
            {
                path: 'MyMessage',
                name: 'MyMessage',
                component: () => import(/*webpackChunkName: 'MyMessage'*/ '@/views/user/MyMessage'),
                meta: {
                    ...meta
                },
            },
            {
                path: 'Others',
                name: 'Others',
                component: () => import(/*webpackChunkName: 'Others'*/ '@/views/user/Others'),
                meta: {
                    ...meta
                },
            },
        ]
    },


]

export default userRoutes