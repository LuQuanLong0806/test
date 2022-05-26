
import { extend, localize } from 'vee-validate';

import { required, email, min, length, confirmed } from 'vee-validate/dist/rules';

import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('email', email)
extend('required', required)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  // 组件绑定的name
  names: {
    "name": '用户名',
    'password': '密码',
    'captcha': '验证码',
    'captcha': '验证码',
    'oldpwd': '当前密码'
  },
  // key 和上面组件绑定的 name 对应  里面的内容 是对规则的校验
  fields: {
    "name": {
      email: '请输入正确的{_field_}!',
      required: '{_field_}不能为空!'
    },
    "captcha": {
      required: '{_field_}不能为空!'
    }
  }

})