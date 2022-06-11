import axios from "@/api/request.js";

export const getComments = data => axios.get('/public/comments', data)


export const addComment = data => axios.post('/comments/reply', data)

