// 封装axios 请求 返回封装的数据格式
import db from '@/util/db'

// 对错误的统一处理
import axios from "axios";
// import config from '@/config'
import errorHandle from './errorHandle'

// 取消相同请求
const CancelToken = axios.CancelToken;
class HttpRequest {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.pending = {}
    }
    // 获取创建时候的config
    getInsideConfig() {
        const config = {
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            timeout: 10000
        }
        return config
    }

    // 取消axios请求
    removePending(key, isRequest = false) {
        // 如果有相同的请求方法就取消请求
        if (this.pending[key] && isRequest) {
            this.pending[key]('取消重复的请求!')
        }
        delete this.pending[key]
    }

    // 设置拦截器
    interceptors(instance) {


        // 请求拦截器
        instance.interceptors.request.use((config) => {
            //   console.log('config~', config);
            let key = config.url + '&' + config.method
            this.removePending(key, true)
            // axios取消
            config.CancelToken = new CancelToken((c) => {
                this.pending[key] = c
            })
            // 如果有token
            let token = db.get('token');
            if (token) {
                config.headers = {
                    Authorization: 'Bearer ' + token,
                }
            }

            // 一定要rerurn config
            return config;
        }, (err) => {
            errorHandle(err)
            return Promise.reject(err)
        })
        // 响应拦截器
        instance.interceptors.response.use((res) => {
            // 响应成功删除key
            let key = res.url + '&' + res.method
            this.removePending(key)

            // 浏览器状态码
            if (res.status == 200) {
                return Promise.resolve(res.data)
            } else {
                return Promise.reject(res)
            }
        }, err => {
            errorHandle(err)
            return Promise.reject(err)
        })
    }
    // 创建请求
    request(options) {
        const instance = axios.create() // 创建axios
        const newOptions = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance) // 设置响应拦截

        return instance(newOptions) // 返回axios实例
    }
    // get请求
    get(url, data = {}, config = {}) {
        const options = {
            method: 'GET',
            url,
            params: data,
            ...config
        }
        return this.request(options)
    }
    // post
    post(url, data = {}, config = {}) {
        const options = {
            method: 'POST',
            url,
            data,
            ...config
        }
        return this.request(options)
    }
}

// 创建 axios 实例
// const instance = axios.create({
//   baseURL: process.env.NODE_ENV == 'development' ? config.baseURL.dev : config.baseURL.pro,
//   headers: {
//     'Content-Type': 'applicaiton/json;charset=utf-8'
//   },
//   timeout: 10000
// });
// // 请求拦截器
// instance.interceptors.request.use((config) => {
//   console.log('config~', config);
//   // 一定要rerurn config
//   return config;
// }, (err) => {
//   errorHandle(err)
//   return Promise.reject(err)
// })
// // 响应拦截器
// instance.interceptors.response.use((res) => {
//   // 浏览器状态码
//   if (res.status == 200) {
//     return Promise.resolve(res.data)
//   } else {
//     return Promise.reject(res)
//   }
// }, err => {
//   errorHandle(err)
//   return Promise.reject(err)
// })

export default HttpRequest