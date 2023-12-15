// env.d.ts
// 处理ts文件中导入vue模块会报错问题
declare module "*.vue" {
    import { DefineComponent } from "vue"
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  declare interface Window {
    Vue: any,
  }
  