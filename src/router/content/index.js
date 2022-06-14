
const meta = {
    requiresAuth: true,
}

const Add = () => import(/*webpackChunkName: 'Add'*/ '@/views/content/Add.vue');
// const Detail = () => import(/*webpackChunkName: 'Detail'*/ '@/components/contents/Detail.vue');

const contentRoutes = [
    {
        path: '/add',
        name: 'Add',
        component: Add,
        meta: {
            ...meta
        },

    },
    // {
    //     path: '/detail',
    //     name: 'Detail',
    //     component: Detail,
    //     meta: {
    //     },
    // },

]

export default contentRoutes