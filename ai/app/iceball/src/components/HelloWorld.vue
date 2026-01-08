<template>
  <div class="container">
    <div class="input">
      <div class="file-input">
        <input type="file" ref="uploadImage" accept="image/*" @change="updateImageData" required />
      </div>
      <img :src="imgPreview" alt="" v-if="imgPreview" />
      <div class="settings">
        <div class="selection">
          <label>队服编号：</label>
          <input type="number" v-model="uniform_number" />
        </div>
        <div class="selection">
          <label>队服颜色：</label>
          <select v-model="uniform_color">
            <option value="红">红</option>
            <option value="蓝">蓝</option>
            <option value="绿">绿</option>
            <option value="白">白</option>
            <option value="黑">黑</option>
          </select>
        </div>
      </div>
      <div class="settings">
        <div class="selection">
          <label>位置：</label>
          <select v-model="position">
            <option value="0">守门员</option>
            <option value="1">先锋</option>
            <option value="2">后卫</option>
          </select>
        </div>
      </div>
      <div class="selection">
        <label>持杆：</label>
        <select v-model="shooting_hand">
          <option value="0">左手</option>
          <option value="1">右手</option>
        </select>
      </div>
      <div class="selection">
        <label>风格：</label>
        <select v-model="style">
          <option value="写实">写实</option>
          <option value="乐高">乐高</option>
          <option value="国漫">国漫</option>
          <option value="日漫">日漫</option>
          <option value="油画">油画</option>
          <option value="涂鸦">涂鸦</option>
          <option value="素描">素描</option>
        </select>
      </div>
      <div class="generate">
        <button @click="generate">生成</button>
      </div>
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
import { ref, onMounted } from 'vue'

// --------------- 定义响应式状态 -------------------
const uniform_number = ref(10);
const uniform_color = ref('红');
const position = ref(0);
const shooting_hand = ref(0);
const style = ref('写实')
// 数据状态
const status = ref(''); 
const imgUrl = ref('');
const imgPreview = ref('');// 申明了响应式对象

console.log(patToken)

// --------------- 图片预览模块 -------------------
// ref 可以用于标记一个DOM对象
// 未挂载前为null，uploadImage在template中被ref绑定成对应的DOM对象（也就是代码中的<input>）
const uploadImage = ref(null);

// 挂载后 uploadImage将会得到DOM对象
// null -> DOM对象 （变化）
onMounted(() => {
  console.log(uploadImage.value)
})
const updateImageData = () => {
  // html5 文件对象
  // console.log(uploadImage.value.files); 
  const input = uploadImage.value;
  // console.log(input);
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


// --------------- 大厂常用业务请求 ----------------
const patToken = import.meta.env.VITE_PAT_TOKEN;
const uploadUrl = 'https://api.coze.cn/v1/files/upload';
// 先上传到coze服务器 
const uploadFile = async () => {
  // POST 请求体 http协议
  // 创建一个空表单用于提交数据
  const formData = new FormData(); // FormData专门用于构建form-data格式数据的对象，常用于传输文件
  const input = uploadImage.value;
  if (!input.files || input.files.length <= 0) return;
  //传入文件（照片）到请求体中，并且将这个字段命名为file
  formData.append('file', input.files[0]);

  // 向 coze 发送http请求 上传
  const res = await fetch(uploadUrl, {
    method: 'POST', // 请求方式：POST（常用于提交/上传）
    headers: {
      // 请求头 令牌
      'Authorization': `Bearer ${patToken}`
    },
    // 传输内容
    body: formData
  })

  // 等待返还内容（异步），并转换为json格式
  const ret = await res.json();
  console.log(ret);

  // 错误判断
  if( ret.code !== 0) { // code=0代表成功，反之出错了
    status.value = ret.msg; // 将错误消息msg传输给用户 
    return
  }
  return ret.data.id;
}


// --------------- 生成图片模块 -------------------
const workflowUrl = 'https://api.coze.cn/v1/workflow/run';
const workflow_id = '7586933897834446874';

const generate = async () => {
  status.value = "图片上传中..."
  const file_id = await uploadFile();
  if (!file_id) return;
  status.value = "图片上传成功，正在生成...";

// workflow 调用 
  const parameters = {
    picture: JSON.stringify({
      file_id // 安全问题
    }),
    style: style.value,
    uniform_color: uniform_color.value,
    uniform_number: uniform_number.value,
    position: position.value,
    shooting_hand: shooting_hand.value,
  }

  const res = await fetch(workflowUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${patToken}`,
      // 内容类型为 JSON
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      workflow_id,
      parameters
    })
  });
  const ret = await res.json();
  if( ret.code !== 0) {
    status.value = ret.msg;
    return;
  }

  const data = JSON.parse(ret.data);
  console.log(data);
  status.value = '';
  imgUrl.value = data.data;
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  height: 100vh;
  font-size: .85rem;
}

.preview {
  max-width: 300px;
  margin-bottom: 20px;
}

.settings {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  margin-top: 1rem;
}

.selection {
  width: 100%;
  text-align: left;
}

.selection input {
  width: 50px;
}

.input {
  display: flex;
  flex-direction: column;
  min-width: 330px;
}

.file-input {
  display: flex;
  margin-bottom: 16px;
}

.output {
  margin-top: 10px;
  min-height: 300px;
  width: 100%;
  text-align: left;
}

button {
  padding: 10px;
  min-width: 200px;
  margin-left: 6px;
  border: solid 1px black;
}

.generate {
  width: 100%;
  margin-top: 16px;
}

.generated {
  width: 400px;
  height: 400px;
  border: solid 1px black;
  position: relative;
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
}

.output img {
  width: 100%;
}
</style>