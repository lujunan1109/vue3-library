// 节流函数
export const throttle = {
  mounted(el, binding) {
    let timer: NodeJS.Timeout | null;
    el.trigger = () => {
      if (timer) return
      timer = setTimeout(() => {
        binding.value()
        timer = null
      }, binding.arg | 1000)
    }
    el.addEventListener('click', el.trigger)
  },
  unmounted(el, binding) {
    el.removeEventListener('click', el.trigger)
  },
}