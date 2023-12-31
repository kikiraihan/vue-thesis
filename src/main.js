import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import i18n from './i18n'


const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(VueSweetalert2)
app.use(i18n)
app.mount('#app')