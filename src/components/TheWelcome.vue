<template>
  <div>
    <h1 class="mb-5">高雄景點 共有：{{ state.openData.length }}個</h1>
    <div v-if="state.isLoading">
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="row g-0" v-else>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-2 px-xl-3 px-lg-3 px-md-3 px-sm-3 px-0 py-2" v-for="item in paginatedItems" :key="item.Id">
        <div class="border px-3 py-2 h-100">
          <div class="imgWrap d-flex justify-content-center align-items-center">
            <img :src="item.Picture1" alt="" />
          </div>
          <div class="d-flex justify-content-center align-items-start flex-column px-xl-3 px-lg-3 px-md-3 px-sm-3 px-0">
            <p>{{ item.Name }}</p>
            <p>{{ item.Description }}</p>
          </div>
        </div>
      </div>
      <nav>
        <ul class="pagination flex-wrap">
          <li class="page-item" :class="{ disabled: state.currentPage === 1 }">
            <a class="page-link" href="#" @click="prevPage">Previous</a>
          </li>
          <li
            class="page-item"
            v-for="page in state.totalPage"
            :key="page"
            :class="{ active: state.currentPage === page }"
          >
            <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: state.currentPage === state.totalPage }">
            <a class="page-link" href="#" @click="nextPage">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'

const state = reactive({
  isLoading: false,
  openData: [
    {
      Id: 0,
      Picture1: '',
      Name: '',
      Description: ''
    }
  ],
  perPage: 10, // 每頁顯示的項目數量
  currentPage: 1, // 當前頁面
  totalPage: 0
})

const apiUrl = 'https://api.kcg.gov.tw/api/service/Get/9c8e1450-e833-499c-8320-29b36b7ace5c' // 替換為你的OpenData API URL
// const apiUrl = 'https://data.tycg.gov.tw/api/v1/rest/tag/112%E5%B9%B4' // 替換為你的OpenData API URL

onMounted(async () => {
  await fetchOpenData()
})

// 將paginatedItems改為計算屬性
const paginatedItems = computed(() => {
  // 計算當前頁面的起始索引
  const startIndex = (state.currentPage - 1) * state.perPage
  // 計算當前頁面的結束索引
  const endIndex = startIndex + state.perPage
  // 利用Array的slice方法來獲取當前頁面的項目
  // slice方法會返回一個新的陣列，包含從startIndex到endIndex之間的項目（不包含endIndex）
  return state.openData.slice(startIndex, endIndex)
})

// 刷新
const fetchOpenData = async () => {
  try {
    // 開啟loading
    state.isLoading = true
    const response = await fetch(apiUrl)
    const data = await response.json() // 解析回應的內容為JSON格式，獲得回應的JSON數據
    state.openData = data.data.XML_Head.Infos.Info // 將獲取到的數據存儲在組件的data中
    // 關閉loading
    state.isLoading = false
    console.log('data', state.openData)

    // 獲取數據後重新計算總頁數和當前頁面顯示的項目
    totalPage()
  } catch (error) {
    console.error('Error fetching OpenData:', error)
    // 發生錯誤時也要關閉loading
    state.isLoading = false
  }
}

// 計算總頁數
const totalPage = () => {
  state.totalPage = Math.ceil(state.openData.length / state.perPage)
  console.log('總頁數', state.totalPage)

  // 獲取總頁數後重新計算當前頁面顯示的項目
  // paginatedItems.value
}

// 上一頁
const prevPage = () => {
  if (state.currentPage > 1) {
    state.currentPage--
  }
}
// 下一頁
const nextPage = () => {
  if (state.currentPage < state.totalPage) {
    state.currentPage++
  }
}
// 切換頁面
const changePage = (page: any) => {
  state.currentPage = page
}

</script>
<style scoped>
.imgWrap {
  max-width: 200px;
  width: 100%;
  height: 200px;
}
.imgWrap img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}
.page-link {
  /* border: none; */
}
</style>