<template>
  <a-form class="login-form">
    <a-form-item>
      <a-input v-model:value="cityInfo.city" placeholder="请输入城市" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="submit">查询</a-button>
    </a-form-item>
  </a-form>
  {{weather}}
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getWeather } from '../hooks/useRequest'
import useCurrentInstance from '../hooks/useCurrentInstance'
interface WeatherType {
  city: string;
  id?: string;
}
export default defineComponent({
  name: 'Weather',
  setup () {
    const cityInfo = reactive<WeatherType>({
      city: '深圳市',
      id: '1'
    })
    const { globalProperties } = useCurrentInstance()
    const weather = reactive({
      resu: ''
    })
    async function submit () {
      try {
        const result: any = await getWeather({
          city: cityInfo.city
        })
        if (result.code === 1) {
          globalProperties.$message.success(result.msg)
          weather.resu = result.data
        } else {
          globalProperties.$message.error(result.msg)
        }
      } catch (error) {
        globalProperties.$message.error(error.toString())
      }
    }
    return { cityInfo, submit, weather }
  }
})
</script>
<style lang="less" scoped>
.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .ant-form-item {
    margin-bottom: 10px;
  }
  .ant-btn, /deep/ .ant-col {
    width: 100%;
  }
}
</style>
