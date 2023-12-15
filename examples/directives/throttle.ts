// 节流函数
export const throttle = {
  mounted(el, binding) {
      let timer: NodeJS.Timeout | null;
    el.addEventListener('click', () => {
      if (timer) return
      timer = setTimeout(() => {
        binding.value()
        timer = null
      }, binding.arg | 1000)
    })
  },
  unmounted(el, binding) {
    el.removeEventListener('click')
  },
}