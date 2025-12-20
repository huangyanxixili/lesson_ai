<template>
  <div>
    <!-- 数据绑定 -->
    <h2>{{ title }}</h2>
    <!-- 双向数据绑定 -->
    <!-- 
    @ = v-bind: 缩写，绑定事件，不用addEventListener
    @event-name.enter 监听事件，当用户按下enter键时触发
    -->
    <input type="text" v-model="title" @keydown.enter="addTodo">
    <ul v-if="todos.length">
      <!-- key 作为 唯一属性 -->
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.done">
        <!-- : 是 v-bind: 缩写，“”内部是js表达式 -->
        <!-- 
        将 class 动态绑定，名为done
        通过 todo.done 来判断是否输出done，这样可以动态决定类的样式 
        -->
        <span :class="{done: todo.done}">{{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>
      暂无计划
    </div>
    <div>
      全选<input type="checkbox" v-model="allDone">
      <!-- {{ 数据绑定 -> 表达式结果绑定 }} -->
      <!-- {{ todos.filter(todo => !todo.done).length }} -->
      {{ active }}
      /
      {{ todos.length }}
    </div>
  </div>
</template>

<script setup>
// 业务是页面上要动态展示标题，且支持编辑标题
// vue 通过响应式API 让我们 focus 标题数据业务，修改数据后，余下的DOM更新交给vue底层
// setup vue3 composition API
// vue2 options API
import { ref, computed } from 'vue'
// 响应式数据
const title = ref("")
const todos = ref([
  {
    id: 1,
    title: '打王者',
    done: false
  },
  {
    id: 2,
    title: '学习vue3',
    done: true
  },
])

// 形式上是函数（计算过程），结果（计算属性）返回
// 依赖于 todos "响应式数据"，返回结果也是响应式的
// 优点：computed 自带缓存效果，如果直接挂载在页面上每次更新都需要重新执行函数
//      而缓存的 computed 如果响应式数据没有更新就不会发生改变（且更简洁）
const active = computed(() => {
  return todos.value.filter(todo => !todo.done).length
})

const addTodo = () => {
  // focus 数据业务
  todos.value.push({
    id: Math.random(),
    title: title.value,
    done: false
  })
  title.value = "";
}

// computed 高级技巧
// get set 属性的概念
const allDone = computed({
  get() {
    return todos.value.every(todo => todo.done)
  },
  set(val) {
    todos.value.forEach(todo => todo.done = val)
  }
})
</script>

<style>
.done {
  color: gray;
  /* 删除线 */
  text-decoration: line-through;
}
</style>
