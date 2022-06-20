import axios from "@/api/request.js";

// 获取
export const getTips = (data) => {
    return axios.get('/public/tips', data)
}

// 获取列表接口
export const getList = (data) => {
    return axios.get('/public/list', data)
}

// 发表新帖
export const addPost = (data) => {
    return axios.post('/content/add', data)
}

// 获取评论详情
export const getDetail = (data) => {
    return axios.get('public/content/detail', data)
}

// 收藏
export const collect = data => axios.post('/content/collect', data)