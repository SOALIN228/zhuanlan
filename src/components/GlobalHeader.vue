/**
* User: soalin
* Date: 2020/10/24
* Time: 09:11
* Desc:
*/
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">者也专栏</router-link>
    <ul class="list-inline mb-0" v-if="!user.isLogin">
      <li class="list-inline-item">
        <router-link class="btn btn-outline-light my-2" to="/login">登录</router-link>
      </li>
      <li class="list-inline-item">
        <router-link class="btn btn-outline-light my-2" to="/signup">注册</router-link>
      </li>
    </ul>
    <ul class="list-inline mb-0" v-else>
      <li class="list-inline-item">
        <dropdown :title="`你好 ${ user.nickName }`">
          <dropdown-item>
            <router-link class="dropdown-item" to="/create">新建文章</router-link>
          </dropdown-item>
          <dropdown-item>
            <router-link class="dropdown-item" to="/">编辑资料</router-link>
          </dropdown-item>
          <dropdown-item>
            <router-link class="dropdown-item" to="/">退出登录</router-link>
          </dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserProps } from '@/store'
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
