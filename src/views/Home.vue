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
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
    <button
      @click="loadMorePage"
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25" v-if="!isLastPage"
    >
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import ColumnList from '@/components/ColumnList.vue'
import useLoadMore from '@/hooks/useLoadMore'

export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const total = computed(() => store.state.columns.total)
    const currentPage = computed(() => store.state.columns.currentPage)
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.getters.getColumns)
    const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, {
      pageSize: 3,
      currentPage: (currentPage.value ? currentPage.value + 1 : 3) // 从第7条数据，序号为6开始请求
    })
    return {
      list,
      isLastPage,
      loadMorePage
    }
  }
})
</script>

<style scoped>

</style>
