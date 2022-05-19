import axios from "@/api/request.js";

// 获取
export const getTips = (data) => {
    return axios.get('/public/tips', data)
}

// 获取列表接口
export const getList = (data) => {
    return axios.get('/public/list', data)
}