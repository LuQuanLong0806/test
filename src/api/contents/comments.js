import axios from "@/api/request.js";
// 获取评论
export const getComments = data => axios.get('/public/comments', data)
// 添加评论
export const addComment = data => axios.post('/comments/reply', data)
// 更新评论
export const updateComment = data => axios.post('/comments/update', data)
// 设为最佳答案
export const setBest = data => axios.post('/comments/accept', data)
// 点赞
export const setHands = data => axios.post('/comments/hands', data)
