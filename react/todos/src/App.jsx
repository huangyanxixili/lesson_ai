import {
  useState,
  useEffect,
} from 'react'
import './styles/app.styl'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import TodoStats from './components/TodoStats'

function App() {
  // 子组件共享的数据状态
  const [todos, setTodos] = useState(() => {
    // 高级用法
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // 回调函数触发父组件更新的方法
  const addTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(), // 时间戳
      text,
      completed: false,
    }])
  }

  const deleteTodo = (id) => {
    // 查找到符合id的数据，并且返还不是该id其他数据组成的数组（变相删除）
    // 并且是返还新数组而不影响原先数组内容
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {
      ...todo,
      completed: !todo.completed,
    } : todo))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  // todos 这个数组实例调用了 filter 方法，所以 filter 自动把 todos 传给回调函数。
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  // 监听todos变化，保存到本地存储（核心亮点）
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <div className="todo-app">
      <h1>My Todo List</h1>
      {/* 自定义事件 */}
      <TodoInput onAdd={addTodo} />
      <TodoList 
        todos={todos} 
        onDelete={deleteTodo} 
        onToggle={toggleTodo}
      />
      <TodoStats 
        total={todos.length}
        active={activeCount}
        completed={completedCount}
        onClearCompleted={clearCompleted}
      />
    </div>
  )
}

export default App