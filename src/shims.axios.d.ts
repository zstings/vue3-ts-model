import { AxiosRequestConfig } from 'axios'

interface Other {
  isLoand?: boolean
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    other?: Other
  }
} 