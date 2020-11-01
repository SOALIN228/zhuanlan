/**
* User: soalin
* Date: 2020/10/25
* Time: 07:19
* Desc:
*/
<template>
  <div class="validate-input-container pb-3">
    <input
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      class="form-control"
      v-bind="$attrs"
      v-if="tag !== 'textarea'"
      v-model="inputRef.val"
    >
    <textarea
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      class="form-control"
      v-bind="$attrs"
      v-else
      v-model="inputRef.val"
    >
    </textarea>
    <span class="invalid-feedback" v-if="inputRef.error">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, computed, onMounted } from 'vue'
import { emitter } from '@/components/ValidateForm.vue'

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}

export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      // 用于获取动态传入的值
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style scoped>

</style>
