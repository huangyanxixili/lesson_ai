<template>
  <div>
    <!-- 数据绑定 -->
    <h2>{{ title }}</h2>
    <!-- 双向数据绑定 -->
    <input type="text" v-model="title">
  </div>
</template>

<script setup>
// 业务是页面上要动态展示标题，且支持编辑标题
// vue 通过响应式API 让我们 focus 标题数据业务，修改数据后，余下的DOM更新交给vue底层
// setup vue3 composition API
// vue2 options API
import { ref, onMounted } from 'vue'
// 响应式数据
const title = ref("Todos任务清单")
const todos = ref([
  {
    id: 1,
    
  }
])
</script>

<style scoped>

</style>
