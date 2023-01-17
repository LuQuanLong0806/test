import { escapeHtml } from "./escapeHtml";
// import store from '@/store';

export default {
  "richtext": {
    bind: function (el, binding, vnode) {
      console.log('vnode~', vnode);
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el, binding, vnode) {
      console.log('vnode~', vnode);
      el.innerHTML = escapeHtml(binding.value)
    },
  },
  'hasRole': {
    inserted: function (el, binding, vnode) {
      console.log('vnode~', el, binding, vnode);
      // let roles = store.state.login.userInfo.roles || ['user']
      let roles = ['user']
      if (!roles.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  }
}