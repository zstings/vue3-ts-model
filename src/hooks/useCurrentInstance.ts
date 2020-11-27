import { ComponentInternalInstance, getCurrentInstance } from 'vue'
export default function exx () {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const globalProperties = appContext.config.globalProperties
  return {
    globalProperties
  }
}
