
import Vue from 'vue';
// 集成 vue-i18n
import VueI18n from 'vue-i18n'
// 引入中文库
import zh from 'vee-validate/dist/locale/zh_CN.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    "zh_CN": {
      fields: {
        "name": '用户名',
        'password': '密码',
        'captcha': '验证码',
        'surepassword': '确认密码',
        'nickname': '昵称'
      },
      validation: {
        ...zh.messages,
        email: '请输入正确的{_field_}!',
        required: '{_field_}不能为空!',

      }
    }
  }
})

export { i18n }