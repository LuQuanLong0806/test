
import axios from "@/api/request";

// 用户签到
const userSign = (data = {}) => {
    return axios.get('/user/sign', data)
}

// 我的资料
const updateUserInfo = (data = {}) => {
    return axios.post('/user/basic', data)

}
export {
    userSign,
    updateUserInfo
}