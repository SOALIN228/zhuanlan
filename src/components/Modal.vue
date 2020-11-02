/**
* User: soalin
* Date: 2020/11/1
* Time: 20:16
* Desc:
*/
<template>
  <teleport to="#modal" v-if="visible">
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button aria-label="Close" class="close" data-dismiss="modal" type="button">
              <span @click="onClose" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button @click="onClose" class="btn btn-secondary" data-dismiss="modal" type="button">取消</button>
            <button @click="onConfirm" class="btn btn-primary" type="button">确定</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '@/hooks/useDOMCreate'

export default defineComponent({
  name: 'Modal',
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['modal-on-close', 'modal-on-confirm'],
  setup (props, context) {
    useDOMCreate('modal')
    const onClose = () => {
      context.emit('modal-on-close')
    }
    const onConfirm = () => {
      context.emit('modal-on-confirm')
    }
    return {
      onClose,
      onConfirm
    }
  }
})
</script>

<style scoped>

</style>
