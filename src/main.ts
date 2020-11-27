import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { Button, Radio, Input, Tag, Menu, Dropdown, InputNumber, Empty, Form, message } from 'ant-design-vue'
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$message = message
axios.defaults.baseURL = process.env.VUE_APP_URL
app.use(Button).use(Radio).use(Input).use(Tag).use(Menu).use(Dropdown).use(InputNumber).use(Empty).use(Form)
app.use(router).mount('#app')
