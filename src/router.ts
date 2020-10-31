/**
 * User: soalin
 * Date: 2020/10/26
 * Time: 07:22
 * Desc:
 */
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import axios from 'axios'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true }
    }
  ]
})
router.beforeEach((to, form, next) => {
  const { user, token } = store.state
  const { redirectAlreadyLogin, requiredLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then((data) => {
        // token有效，访问redirectAlreadyLogin跳转到首页
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        // token无效或过期，跳转到登录页
        console.error(e)
        store.commit('logout')
        next('login')
      })
    } else {
      // 未登录且不存在token，访问需要登录页面则跳转到登录页
      if (requiredLogin) {
        next({ name: 'login' })
      } else {
        next()
      }
    }
  } else {
    // 登录后访问redirectAlreadyLogin，跳转到首页
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
export default router
