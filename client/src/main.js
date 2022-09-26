import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/style/common.css'
import store from './store'

createApp(App).use(router, store).mount('#app')
