// 导入单个组件
import vButton from './v-button'
import vDialog from './v-dialog'
import vForm from './v-form'
import vTable from './v-table'
import vTree from './v-tree'
// 以数组的结构保存组件，便于遍历
const components = [
  vButton,
  vDialog,
  vForm,
  vTable,
  vTree
]
// 用于按需导入
export {
  vButton,
  vDialog,
  vForm,
  vTable,
  vTree
}
// 定义 install 方法
const install = function (Vue: any) {
  if ((install as any).installed) return;
  (install as any).installed = true
  // 遍历并注册全局组件
  components.map(component => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  // 导出的对象必须具备一个 install 方法
  install,
}
