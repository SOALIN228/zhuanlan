/**
* User: soalin
* Date: 2020/10/31
* Time: 22:43
* Desc:
*/
<template>
  <div class="post-detail-page">
    <modal :visible="modalIsVisible" @modal-on-close="modalIsVisible = false"
           @modal-on-confirm="hideAndDelete"
           title="删除文章"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentImageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentImageUrl">
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{ currentPost.createdAt }}</span>
      </div>
      <div v-html="currentHTML"></div>
      <div class="btn-group mt-5" v-if="showEditArea">
        <router-link
          :to="{name: 'create', query: { id: currentPost._id}}"
          class="btn btn-success"
          type="button"
        >
          编辑
        </router-link>
        <button @click.prevent="modalIsVisible = true" class="btn btn-danger" type="button">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { GlobalDataProps, PostProps, ImageProps, UserProps, ResponseType } from '@/store'
import MarkdownIt from 'markdown-it'
import UserProfile from '@/components/UserProfile.vue'
import Modal from '@/components/Modal.vue'
import { createMessage } from '@/components/Message'

export default defineComponent({
  name: 'PostDetail',
  components: {
    UserProfile,
    Modal
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const currentId = route.params.id
    const md = new MarkdownIt()
    const modalIsVisible = ref(false)
    onMounted(() => {
      store.dispatch('fetchPost', currentId)
    })
    // 获取当前展示文章信息
    const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))
    // 获取当前展示文章内容
    const currentHTML = computed(() => {
      const { content, isHTML } = currentPost.value
      if (currentPost.value && content) {
        return isHTML ? content : md.render(content)
      }
    })
    // 展示图片逻辑
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })
    // 登录用户id和文章作者相同，展示操作按钮
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })
    // 删除文章
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store.dispatch('deletePost', currentId).then((rawData: ResponseType<PostProps>) => {
        createMessage('删除成功，2秒后跳转到专栏首页', 'success')
        setTimeout(() => {
          router.push({ name: 'column', params: { id: rawData.data.column } })
        }, 2000)
      })
    }
    return {
      currentPost,
      currentHTML,
      currentImageUrl,
      showEditArea,
      modalIsVisible,
      hideAndDelete
    }
  }
})
</script>

<style scoped>

</style>
