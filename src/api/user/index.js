
import axios from "@/api/request";

import store from '@/store'

const headers = {
  Authorization: 'Bearer ' + store.state.login.token,
  'Content-Type': 'application/json'
}

// 用户签到
const userSign = (data = {}) => {
  return axios.get('/user/sign', data, {
    headers
  })
}

export {
  userSign
}