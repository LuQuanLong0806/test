
import AlertComponent from './Alert.vue'

const Alert = {}

Alert.install = (Vue) => {
  const AlertContructor = Vue.extend(AlertComponent) // 扩展到vue上
  const instance = new AlertContructor(); // 创建实例化对象
  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el)

  Vue.prototype.$alert = (msg) => {
    instance.type = 'alert';
    instance.msg = msg;
    instance.isShow = true
  }

  Vue.prototype.$confirm = (msg, success, cancel) => {
    instance.type = 'confirm';
    instance.msg = msg;
    instance.isShow = true
    if (typeof success != 'undefined') {
      instance.success = success
    }
    if (typeof cancel != 'undefined') {
      instance.cancel = cancel
    }
  }
}

export default Alert