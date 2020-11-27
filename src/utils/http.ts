import type { AxiosResponse } from 'axios'
import axios from 'axios'
import router from '../router'
axios.defaults.baseURL = process.env.VUE_APP_URL
axios.defaults.withCredentials = true
const http = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
http.interceptors.response.use(function (response: AxiosResponse<any>) {
  // 没有token，缺少登录令牌
  if (response.data.code === 2020) {
    router.replace('/login')
  }
  // token过期，登录令牌无效
  if (response.data.code === 2030) {
    router.replace('/login')
  }
  return response.data
}, function (err: any) {
  return Promise.reject(err)
})
export default http
