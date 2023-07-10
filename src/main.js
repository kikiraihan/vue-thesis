import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'


const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(VueSweetalert2)
app.mount('#app')