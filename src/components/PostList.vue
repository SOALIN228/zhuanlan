/**
* User: soalin
* Date: 2020/10/26
* Time: 00:43
* Desc:
*/
<template>
  <div class="post-list">
    <article :key="post.id" class="card mb-3 shadow-sm" v-for="post in list">
      <div class="card-body">
        <h4>{{ post.title }}</h4>
        <div class="row my-3 align-items-center">
          <div class="col-4" v-if="post.image">
            <img :alt="post.title" :src="post.image" class="rounded-lg w-100">
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{ post.content }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { testPosts } from '@/testData'

export default defineComponent({
  name: 'PostList',
  setup () {
    return {
      list: testPosts
    }
  }
})
</script>

<style scoped>

</style>
