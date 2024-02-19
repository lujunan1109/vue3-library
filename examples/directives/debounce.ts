export const debounce = {
  mounted(el, binding, vnode, prevVnode) {
    let timer: NodeJS.Timeout;
    el.trigger = () => {
      if (timer) {
        // 结束上一次的定时器重新开始
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
        console.log(timer);
      }, binding.arg | 500)
    }
    el.addEventListener('click', el.trigger)
  },
  unmounted(el) {
    el.removeEventListener('click', el.trigger)
  },
}