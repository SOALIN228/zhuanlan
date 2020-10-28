/**
* User: soalin
* Date: 2020/10/26
* Time: 00:43
* Desc:
*/
<template>
  <div class="post-list">
    <article :key="post._id" class="card mb-3 shadow-sm" v-for="post in list">
      <div class="card-body">
        <h4>{{ post.title }}</h4>
        <div class="row my-3 align-items-center">
          <div class="col-4" v-if="post.image">
            <img :alt="post.image" :src="post.image.url" class="rounded-lg w-100">
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{ post.excerpt }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '@/store'

export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  }
})
</script>

<style scoped>

</style>
