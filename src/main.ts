import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Radio, Input, Tag, Menu, Dropdown, InputNumber, Empty, Form, message } from 'ant-design-vue'
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$message = message
app.use(Button).use(Radio).use(Input).use(Tag).use(Menu).use(Dropdown).use(InputNumber).use(Empty).use(Form)
app.use(router).mount('#app')
