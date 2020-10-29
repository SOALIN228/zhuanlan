import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import App from './App.vue'

axios.defaults.baseURL = 'http://apis.imooc.com/api'
axios.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params = { ...config.params, icode: 'F2B393DD9280AFE8' }
  } else {
    config.data = { ...config.data, icode: 'F2B393DD9280AFE8' }
  }
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setLoading', false)
  store.commit('setError', { status: true, message: error })
  return Promise.reject(e.response.data)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
