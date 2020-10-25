<template>
  <div class="container">
    <global-header :user="currentUser"/>
    <!--    <column-list :list="list"/>-->
    <form action="">
      <div class="mb-3">
        <label class="form-label" for="exampleInputEmail">邮箱地址</label>
        <validate-input :rules="emailRules"
                        id="exampleInputEmail"
                        placeholder="请输入邮箱地址"
                        type="text"
                        v-model="emailVal"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label" for="exampleInputPassword1">密码</label>
        <validate-input :rules="passwordRules"
                        id="exampleInputPassword1"
                        placeholder="请输入密码"
                        type="password"
                        v-model="emailVal"
        ></validate-input>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

const currentUser: UserProps = {
  isLogin: true,
  name: 'soa'
}

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧'
  }
]
const emailRules: RulesProp = [
  {
    type: 'required',
    message: '电子邮箱地址不能为空'
  },
  {
    type: 'email',
    message: '请输入正确的电子邮箱格式'
  }
]

const passwordRules: RulesProp = [
  {
    type: 'required',
    message: '密码不能为空'
  }
]

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    ValidateInput
    // ColumnList
  },
  setup () {
    const emailVal = ref('')
    const passwordVal = ref('')
    return {
      list: testData,
      currentUser,
      emailRules,
      passwordRules,
      emailVal,
      passwordVal
    }
  }
})
</script>

<style>
</style>
