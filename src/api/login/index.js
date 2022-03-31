
import axios from "@/api/request";

// 获取验证码方法
const getCaptcha = (data = {}) => {
    return axios.get('/public/captcha', data)
}

// 登录方法
const login = (data) => {
    return axios.post('/login/login', data)
}

const reg = (data) => {
    return axios.post('/login/register', data)
}
export default {
    getCaptcha,
    login,
    reg
}