import axios from "@/api/request.js";

// 获取
const getTips = (data) => {
    return axios.get('/public/tips', data)
}

// 获取列表接口
const getLists = (data) => {
    return axios.get('/public/list', data)
}