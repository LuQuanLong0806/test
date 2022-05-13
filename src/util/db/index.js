// 前缀
const prifix = 'MY_PROJECT_'

// 获取token
export const get = (key) => {
    localStorage.getItem(prifix + key)
}
// 设置token
export const set = (key, val) => {
    localStorage.setItem(prifix + key, val)
}
// 移除token
export const remove = (key) => {
    localStorage.removeItem(prifix + key)
}