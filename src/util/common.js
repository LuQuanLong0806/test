// export const getElementY = (elem) => {
//   return window.scrollY + elem.getBoundingClientRect().top
// }

/**
 * 
 * @param {String} elem  Dom元素
 * @param {Number} duration 滚动动画执行的时间
 * @param {Number} offset 滚动偏移量
 * @returns 
 */
export const scrollToElem = (elem, duration, offset, container = null) => {
  const pageY = window.scrollY; // 滚动条已滚动的距离
  // const elemY = getElementY(elem) // 获取元素距可视窗口顶部的距离
  // const diff = pageY - elemY + offset
  const diff = elem.getBoundingClientRect().top + offset
  if (!diff) return
  // 缓动动画
  const easing = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  let start;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // 根据时间的差值 根据差值计算偏移量
    const time = timestamp - start
    let percent = Math.min(time / duration, 1) // 取最小值
    percent = easing(percent)

    // 要滚动的容器
    container ? container.scrollTo(0, pageY + diff * percent)
      : window.scrollTo(0, pageY + diff * percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}