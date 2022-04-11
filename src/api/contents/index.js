import axios from "@/api/request.js";

const getTips = (data) => {
    return axios.get('/public/tips', data)
}