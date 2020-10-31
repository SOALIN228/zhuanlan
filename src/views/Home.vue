/**
* User: soalin
* Date: 2020/10/25
* Time: 23:51
* Desc:
*/
<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img alt="callout" class="w-50" src="../assets/callout.svg"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a class="btn btn-primary my-2" href="#">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <uploader :before-upload="beforeUpload" action="/upload" @file-uploaded="onFileUploaded">
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500">
      </template>
    </uploader>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ResponseType, ImageProps } from '@/store'
import ColumnList from '@/components/ColumnList.vue'
import { createMessage } from '@/components/Message'
import Uploader from '@/components/Uploader.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList,
    Uploader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('不是jpg', 'error')
      }
      return isJPG
    }
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`id ${rawData.data._id}`, 'success')
    }
    return {
      list,
      beforeUpload,
      onFileUploaded
    }
  }
})
</script>

<style scoped>

</style>
