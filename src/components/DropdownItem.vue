/**
* User: soalin
* Date: 2020/10/24
* Time: 11:19
* Desc:
*/
<template>
  <li
    :class="{'is-disabled': disabled}"
    class="dropdown-option"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style>
.dropdown-option.is-disabled * {
  pointer-events: none;
  color: #6c757d;
  background-color: transparent;
}
</style>
