import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import {copy, debounce, throttle} from './directives/index.ts'
import App from './App.vue'

const app = createApp(App)

app.directive('copy', copy)
app.directive('debounce', debounce)
app.directive('throttle', throttle)

app.mount('#app')