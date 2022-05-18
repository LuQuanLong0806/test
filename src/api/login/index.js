
import axios from "@/api/request";

// 获取验证码方法
const getCaptcha = (data = {}) => {
    return axios.get('/public/captcha', data)
}

// 登录方法
const login = (data) => {
    return axios.post('/login/login', data)
}
// 注册
const reg = (data) => {
    return axios.post('/login/register', data)
}
// 找回密码
const retrievePwd = (data) => {
    return axios.get('/login/retrievePwd', data)
}
// 重置密码
const resetPwd = (data) => {
    return axios.get('/login/resetPwd', data)
}



export default {
    getCaptcha,
    login,
    reg,
    retrievePwd,
    resetPwd
}