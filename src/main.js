import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router/router'

import filters from '@/util/filters'

import Alert from './components/modules/alert'
import Pop from './components/modules/pop'

// 公共过滤器
Object.keys(filters).forEach(d => {
    Vue.filter(d, filters[d])
})

// import '@/util/veevalidate.js'
import '@/util/veevalidate-i18n.js'
Vue.use(Alert)
Vue.use(Pop)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App),
    components: {

    },
}).$mount('#app')
