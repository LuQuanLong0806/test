
const meta = {
    requiresAuth: true,
}

const Add = () => import(/*webpackChunkName: 'UserCenter'*/ '@/views/content/Add.vue');

const contentRoutes = [
    {
        path: '/add',
        name: 'Add',
        component: Add,
        meta: {
            ...meta
        },

    },

]

export default contentRoutes