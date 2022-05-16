
import axios from "@/api/request";

// 用户签到
const userSign = (data = {}) => {
    return axios.get('/user/sign', data)
}

export {
    userSign
}