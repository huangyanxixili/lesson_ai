import {
  useState,
  useEffect
} from 'react'
import { useMouse } from './hooks/useMouse.js'
import { useTodos } from './hooks/useTodos.js'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'

function MouseMove() {
  const { x, y } = useMouse();

  return (
    <>
      <div>
        鼠标位置：{x}, {y}
      </div>
    </>
  )
}

export default function App() {
  const [count, setCount] = useState(0);
  const { 
    todos,
    addTodo,
    deleteTodo,
    toggleTodo
  } = useTodos();

  return (
    <>
      <TodoInput onAddTodo={addTodo} />
      {
        todos.length > 0 ? (
          <TodoList 
            todos={todos}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ) : (
          <div>暂无待办事项</div>
        )
      }
      {/* {count}
      <button onClick={() => setCount(count => count + 1)}>
        增加
      </button>
      { count % 2 === 0 && <MouseMove /> } */}
    </>
  )
}