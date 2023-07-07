import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // lazy-loaded route
  {
    path: '/praproses',
    name: 'praproses',
    component: () => import('@/views/praprosesView.vue')
  },
  {
    path: '/proses',
    name: 'proses',
    component: () => import('@/views/prosesView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
