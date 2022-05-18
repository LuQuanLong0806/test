
import axios from "@/api/request";
import qs from 'qs'
// 用户签到
const userSign = (data = {}) => {
    return axios.get('/user/sign', data)
}

// 我的资料
const updateUserInfo = (data = {}) => {
    return axios.post('/user/basic', data)

}

// 修改用户名
const updateUserName = (data = {}) => {
    return axios.get('/public/resetEail?' + qs.stringify(data))
}

export {
    userSign,
    updateUserInfo,
    updateUserName
}

// 修改密码
export const changePassword = (data) => {
    return axios.post('/user/changePassword', data)
}

// 获取用户信息
export const getUserInfo = (data) => {
    return axios.post('/user/info', data)
}
