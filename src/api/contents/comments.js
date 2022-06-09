import axios from "@/api/request.js";

export const getComments = tid => axios.get('/public/comments?tid=' + tid)