<template>
  <div class="container">
    <div>
      <label>输入：</label>
      <input class="input" v-model="question"/>
      <button @click="askLLM">提交</button>
    </div>
    <div class="output">
      <div>
        <label>Streaming</label>
        <input type="checkbox" v-model="stream" />
        <div>{{ content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// es6 解构
// vue 太复杂，目前只需要 ref
import { ref } from 'vue';
// 模板需要消费的数据
// 响应式数据
// 在数据改变的时候，模板（响应了）会自动更新
// count 是 value 为111的响应式对象
// let count = ref(111);
// console.log(count)
// setTimeout(() => {
//   count.value = 222;
// }, 1000);

// v-model 双向绑定指令，响应式绑定表单的数据
const question = ref('讲一个喜羊羊和灰太狼的故事');
const stream = ref(true);
const content = ref(''); // 单项绑定（主要）

// 调用LLM
const askLLM = async () => {
  // question 可以省去.value 
  if (!question.value) {
    console.log(' question 不能为空');
    return;
  }

  // 用户体验
  content.value = '思考中...';
  // 请求行
  // 请求头
  // 请求体
  const endpoint = 'https://api.deepseek.com/chat/completions';
  const headers = {
    'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
    'Content-Type': 'application/json'
  }
};

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  flex-direction: column;
  /* 主轴、次轴 */
  align-items: start;
  justify-content: start;
  height: 100vh;
  font-size: 0.85rem;
}
.input {
  width: 200px;
}
.button {
  padding: 0 10px;
  margin-left: 6px;
}
.output {
  margin-top: 10px;
  min-height: 300px;
  width: 100%;
  text-align: left;
}
</style>