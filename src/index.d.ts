import { AxiosInstance } from 'axios'
declare module "@vue/runtiom-core" { 
  interface ComponentCustomProperties { 
    $axios: AxiosInstance
  }
}