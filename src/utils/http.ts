import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import Qs from 'qs'
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
const responseHandle = {
  200: (response: AxiosResponse) => {
    return response.data.data
  },
  default: (response: AxiosResponse) => {
    return Promise.reject(response.data)
  }
}

export const pendingRequest = new Map()
function generateReqKey (config: AxiosRequestConfig) {
  const { method, url, params, data } = config
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&')
}
function addPendingRequest (config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel)
      }
    })
}
function removePendingRequest (config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey)
    cancelToken(requestKey)
    pendingRequest.delete(requestKey)
  }
}

class Times {
  idx!: number
  static instance: any
  constructor () {
    if (!Times.instance) {
      this.idx = 0
      Times.instance = this
    }
    return Times.instance
  }

  add () {
    this.idx += 1
  }

  remove () {
    this.idx -= 1
  }
}
function timeStamp (t: number) {
  const func = [
    () => {
      const times = new Times()
      if (times.idx === 0) {
        message.loading({
          content: '加载中...',
          duration: 0
        })
      }
      times.add()
    },
    () => {
      const times = new Times()
      times.remove()
      if (times.idx === 0) {
        message.destroy()
      }
    }
  ]
  func[t]()
}

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    if (config.other?.isLoand === true) {
      timeStamp(0)
    }
    removePendingRequest(config)
    addPendingRequest(config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  response => {
    if (response.config?.other?.isLoand === true) {
      timeStamp(1)
    }
    removePendingRequest(response.config)
    // 没有token，缺少登录令牌
    if (response.data.code === 2020) {
      router.replace('/login')
    }
    // token过期，登录令牌无效
    if (response.data.code === 2030) {
      router.replace('/login')
    }
    return responseHandle[response.data.code === 200 ? 200 : 'default'](response)
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
