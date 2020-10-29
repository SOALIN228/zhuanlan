/**
* User: soalin
* Date: 2020/10/29
* Time: 07:54
* Desc:
*/
<template>
  <teleport to="#message">
    <div :class="classObject"
         class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2" v-if="isVisible">
      <span>{{ message }}</span>
      <button @click.prevent="hide" aria-label="Close" class="close" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import useDOMCreate from '@/hooks/useDOMCreate'

export type MessageType = 'success' | 'error' | 'default'

export default defineComponent({
  name: 'Message',
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup (props, context) {
    useDOMCreate('message')
    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    const hide = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }
    return {
      isVisible,
      classObject,
      hide
    }
  }
})
</script>

<style scoped>

</style>
