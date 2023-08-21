import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/permission'
import { createPinia } from 'pinia'

// import filter from './utils/filter'
 
// for (const key in filter) {
//     Vue.filter(key,filter[key]);
// }

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)

app.use(pinia)
app.use(router)

app.mount('#app')
