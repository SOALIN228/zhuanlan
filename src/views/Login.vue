/**
* User: soalin
* Date: 2020/10/25
* Time: 23:53
* Desc:
*/
<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label" for="exampleInputEmail">邮箱地址</label>
        <validate-input
          :rules="emailRules" id="exampleInputEmail"
          placeholder="请输入邮箱地址"
          ref="inputRef"
          type="text"
          v-model="emailVal"
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="exampleInputPassword1">密码</label>
        <validate-input
          :rules="passwordRules"
          id="exampleInputPassword1"
          placeholder="请输入密码"
          type="password"
          v-model="passwordVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-block btn-large" type="submit">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { createMessage } from '@/components/Message'
import router from '@/router'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const store = useStore()
    const emailVal = ref('')
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
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      {
        type: 'required',
        message: '密码不能为空'
      }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(() => {
          createMessage('登录成功 2秒后跳转首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }
    return {
      emailRules,
      passwordRules,
      emailVal,
      passwordVal,
      onFormSubmit
    }
  }
})
</script>

<style scoped>

</style>
