import PopComponent from './Pop'

const Pop = {}

Pop.install = (Vue) => {
    // 注册pop组件
    const PopConstructor = Vue.extend(PopComponent)
    // 
    const instance = new PopConstructor()
    // 挂载
    instance.$mount(document.createElement('div'))
    // 添加到body
    document.body.appendChild(instance.$el)
    // 添加原型
    Vue.prototype.$pop = (msg, type) => {
        instance.type = type;
        instance.msg = msg;
        instance.isShow = true;
    }

}

export default Pop