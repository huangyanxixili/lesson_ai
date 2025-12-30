<template>
  <div class="container">
    <div class="input">
      <div class="file-input">
        <input 
          type="file" 
          ref="uploadImage" 
          accept="image/*" 
          @change="updateImageData"
          required
          />
      </div>
      <img :src="imgPreview" alt="" v-if="imgPreview" />
      <div class="settings">
        <div class="selection">
          <label>队服编号：</label>
          <input type="number" v-model="uniform_number" />
        </div>
      </div>
    </div>
    <div class="output">

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// script + setup 是vue3最好的代码组织方式
// composition api 组合
// 直接在 script setup 中定义函数，不用手动return或components注册

// ref 可以用于标记一个DOM对象
// 未挂载前为null，uploadImage在template中被ref绑定成对应的DOM对象（也就是代码中的<input>）
const uploadImage = ref(null);
const imgPreview = ref('');// 申明了响应式对象
const uniform_number = ref(10);


// 挂载后 uploadImage将会得到DOM对象
// null -> DOM对象 （变化）
onMounted(() => {
  console.log(uploadImage.value)
})
const updateImageData = () => {
  // html5 文件对象
  // console.log(uploadImage.value.files); 
  const input = uploadImage.value;
  if (!input.files || input.files.length === 0) {
    return;
  }
  const file = input.files[0]; // 文件对象 html5 新特性
  console.log(file);
  // FileReader 文件阅读对象 -> 将文件读取成二进制
  const reader = new FileReader();
  reader.readAsDataURL(file); // 把文件编码为 Data URL（异步）
  reader.onload = (e) => { // 事件监听->读取完成后触发 拿到Data URL
    // console.log(e.target.result);
    imgPreview.value = e.target.result;
  }
}
</script>

<style scoped>
.container {
  display: flex; /* 多列式 */
  /* flex-wrap: wrap; 换行 */
  align-items: start;
  justify-content: start;
  height: 100vh;
  font-size: 0.85rem;
}
.input {
  display: flex;
  flex-direction: column; /* 垂直方向 */
  min-width: 330px;
}
.output {
  margin-top: 10px;
  min-height: 300px;
  width: 100%;
  text-align: left;
}
</style>