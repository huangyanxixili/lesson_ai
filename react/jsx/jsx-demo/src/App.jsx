// 根组件
// 组件树
// why 函数适合做组件呢？
// 将 JSX + 逻辑 封装成了一个组件
// 组件是由 js/css/html 组合起来，完成一个相对独立的功能

// use 使用 state 数据状态 --> 就像 vue 的 ref
import { useState, createElement } from 'react';
import './App.css';
// JSX 负责UI
function App() {
    // const name = 'React';
    // 数组的第一个元素是状态值，第二个元素是更新状态值的函数
    const [name, setName] = useState('React');
    const [todos, setTodos] = useState([
        { id: 1, text: '学习 JSX', done: false },
        { id: 2, text: '学习 React', done: true },
    ]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    setTimeout(() => {
        setName('React 2.0');
    }, 2000);
    // 组件的数据业，交互等

    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    // 语法糖，主要是简化模板开发，提升代码的可读性
    const element = <h2>JSX 是 React 中用于描述用户界面的语法拓展</h2>
    const element2 = createElement('h2', null, 'JSX 是 React 中用于描述用户界面的语法拓展');

    // JSX 实际还是js，class 是js关键字，不能使用，所以用className
    return (
        // 文档碎片标签
        <div>
            {element}
            {element2}
            <h1>Hello <span className="title">{name}!</span></h1>
            {
                todos.length > 0 ? (
                    <ul>
                        {
                            // 遍历 todos 数组，渲染每个 todo 项
                            todos.map((todo) => (
                                <li key={todo.id}>
                                    {todo.text}
                                </li>
                            ))
                        }
                    </ul>
                ) : 
                (
                    <div>暂无待办事项</div>
                )
            }
            {isLoggedIn ? <div>已登录</div> : <div>未登录</div>}
            <button onClick={toggleLogin}>
                {isLoggedIn ? '退出登录' : '登录'}
            </button>
        </div>
    )
}

export default App