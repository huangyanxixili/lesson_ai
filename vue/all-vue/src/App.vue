<script setup>

</script>

<template>
  <div>
    <header>
      <ul>
        <!-- app.use(router)之后router带给我们的全局组件 -->
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </header>
    <main>
      <!-- 多个页面的占位符 -->
      <router-view></router-view>
    </main>
    <footer>

    </footer>
  </div>
</template>

<style scoped>

</style>
