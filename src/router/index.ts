import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { pendingRequest } from '../utils/http'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/weather'
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('../views/Weather.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由加载前
router.beforeEach((to, from, next) => {
  // 取消前面路由页面未完成的 axios 请求
  pendingRequest.forEach((request: Function, key: string) => {
    request(key)
    pendingRequest.delete(key)
  })
  next()
})

export default router
