// 前缀
const prefix = 'MY_PROJECT_'

const db = {
    get(key) {
        return localStorage.getItem(prefix + key)
    },
    set(key, val) {
        localStorage.setItem(prefix + key, val)
    },
    remove(key) {
        localStorage.removeItem(prefix + key)
    }
}
// 获取token
// export const get = (key) => {
//     localStorage.getItem(prifix + key)
// }
// // 设置token
// export const set = (key, val) => {
//     localStorage.setItem(prifix + key, val)
// }
// // 移除token
// export const remove = (key) => {
//     localStorage.removeItem(prifix + key)
// }
export default db