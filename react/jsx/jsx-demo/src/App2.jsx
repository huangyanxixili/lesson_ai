// jsx 是 react 文件的后缀
// UI 用户界面工程师 前后端分离
// vue 通过三部分 来功能分离
// react 一上来就是 组件
// 就像早期 js 没有class而借助函数实现，react 函数就是组件

// 子组件们
function JuejinHeader() {
  return (
    // jsx 返还最外层只能有一个根元素
    <>
      <header>
        <h1>掘金首页</h1>
      </header>
    </>
  )
}

const Ariticles = () => {
  return (
    <>
      Articles
    </>
  )
}

const Checkin = () => {
  return (
    <>
      Check in
    </>
  )
}

const TopArticles = () => {
  return (
    <>
      TopArticles
    </>
  )
}

// 根组件
function App() {
  // xml in js -> jsx
  // 返回 JSX 的函数就是组件
  // 组件就是react开发的基本单位
  return (
    <div>
      {/* 头部组件 */}
      <JuejinHeader />
      <main>
        {/* 组件也和html一样申明，自定义组件 */}
        {/* 组件化让我们像搭积木一样组合成页面 */}
        <Ariticles />
        <aside>
          <Checkin />
          <TopArticles />
        </aside>
      </main>
    </div>
  )
}

export default App






