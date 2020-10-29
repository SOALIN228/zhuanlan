/**
* User: soalin
* Date: 2020/10/28
* Time: 20:40
* Desc:
*/
<template>
  <teleport to="#back">
    <div
      :style="{backgroundColor: background || ''}"
      class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary"></div>
        <p class="text-primary small" v-if="text">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '@/hooks/useDOMCreate'

export default defineComponent({
  name: 'Loader',
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    useDOMCreate('back')
  }
})
</script>

<style>
.loading-container {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, .5);
}

.loading-container {
  text-align: center;
}
</style>
