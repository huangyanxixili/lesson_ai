<template>
  <div class="container">
    <!-- 输入区域 -->
    <div class="input">
      <div class="file-input">
        <input type="file" ref="uploadImage" accept="image/*" @change="updateImageData" required />
      </div>
      <img :src="imgPreview" alt="" v-if="imgPreview" />
      ...
    </div>
    <div class="output">
      <div class="generated">
        <img :src="imgUrl" alt="" v-if="imgUrl">
        <div v-if="status">{{ status }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>