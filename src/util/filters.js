// 公共日期格式化方法
import moment from 'moment'

const dateFormat = (val, type = 'YYYY-MM-DD') => {
  return moment(val).format(type)
}


export default {
  dateFormat
}