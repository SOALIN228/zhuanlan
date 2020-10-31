/**
* User: soalin
* Date: 2020/10/26
* Time: 23:51
* Desc:
*/
<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader :beforeUpload="uploadCheck"
              @file-uploaded="handleFileUploaded"
              action="/upload"
              class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary"></div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData.data.url">
          <h3>点击重新上传</h3>
        </div>
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules" placeholder="请输入文章标题"
          type="text"
          v-model="titleVal"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          :rules="contentRules"
          placeholder="请输入文章详情"
          rows="10"
          tag="textarea"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import router from '@/router'
import { useStore } from 'vuex'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '@/store'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'
import { createMessage } from '@/components/Message'
import { beforeUploadCheck } from '@/helper'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInput,
    Uploader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const titleVal = ref('')
    let imageId = ''
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    // 图片格式验证
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过 1Mb', 'error')
      }
      return passed
    }
    // 图片上传成功
    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id
          }
          if (imageId) {
            newPost.image = imageId
          }
          store.dispatch('createPost', newPost).then(() => {
            createMessage('发表成功，2秒后跳转到文章', 'success')
            setTimeout(() => {
              router.push({ name: 'column', params: { id: column } })
            }, 2000)
          })
        }
      }
    }
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      uploadCheck,
      handleFileUploaded,
      onFormSubmit
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container {
  overflow: hidden;
  height: 200px;
  cursor: pointer;
}

.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploaded-area {
  position: relative;
}

.uploaded-area:hover h3 {
  display: block;
}

.uploaded-area h3 {
  position: absolute;
  top: 50%;
  display: none;
  width: 100%;
  text-align: center;
  color: #999;
}
</style>
