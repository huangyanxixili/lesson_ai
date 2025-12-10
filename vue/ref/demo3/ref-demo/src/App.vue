<template>
  <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>
      <!-- 遍历数据渲染到界面 -->
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { 
  ref,
  onMounted // 挂载之后的生命周期
} from 'vue'; // 响应式api（将数据包装成响应式对象）

// 数据
const users = ref([]);
onMounted(() => {
  console.log('页面挂载完成');
  fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => {
      users.value = data;
    })
})

setTimeout(() => {
  users.value.push({
    id: '4',
    name: '钱六',
    email: '12313@qq.com'
  })
}, 3000)

</script>

<style scoped>

</style>