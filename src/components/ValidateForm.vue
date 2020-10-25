/**
* User: soalin
* Date: 2020/10/25
* Time: 12:06
* Desc:
*/
<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div @click.prevent="submitForm" class="submit-area">
      <slot name="submit">
        <button class="btn btn-primary" type="submit">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type ValidateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      // 循环执行数组 得到最后的验证结果
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const callback: any = (func: ValidateFunc) => {
      funcArr.push(func)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      // 删除监听
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    // 添加监听
    return {
      submitForm
    }
  }
})
</script>

<style scoped>

</style>
