
import { Validator } from "vee-validate";

const dictionary = {
    'zh-CN':{
        messages:{
            required: filed => '请输入' + filed,
            email: () => '请输入正确的邮箱格式!'
        },
        attributes: {
            'formData.email': '邮箱',
            'formData.password': '密码',
            'name':'用户名',
            'formData.captcha':'验证码',
        }
    }
}

Validator.localize( dictionary )