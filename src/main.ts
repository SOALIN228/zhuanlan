import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import App from './App.vue'

axios.defaults.baseURL = 'http://apis.imooc.com/api'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: 'F2B393DD9280AFE8' }
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
