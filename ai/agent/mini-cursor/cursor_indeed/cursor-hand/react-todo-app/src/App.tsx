import React, { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  edited?: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
    };
    setTodos([newTodoItem, ...todos]);
    setNewTodo('');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim() === '') return;
    setTodos(
      todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (editingId) {
        saveEdit();
      } else {
        addTodo();
      }
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>✨ TodoList</h1>
        <p>高效管理你的任务</p>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="添加新任务..."
          className="todo-input"
        />
        <button onClick={addTodo} className="add-btn">
          ➕ 添加
        </button>
      </div>

      <div className="filter-section">
        <button 
          onClick={() => setFilter('all')} 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          全部 ({todos.length})
        </button>
        <button 
          onClick={() => setFilter('active')} 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
        >
          进行中 ({activeCount})
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        >
          已完成 ({completedCount})
        </button>
      </div>

      <div className="stats-section">
        <span>总计：{todos.length} 项</span>
        <span>进行中：{activeCount} 项</span>
        <span>已完成：{completedCount} 项</span>
      </div>

      <div className="todos-section">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>暂无任务，快添加一个吧！</p>
          </div>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <li 
                key={todo.id} 
                className={`todo-item ${todo.completed ? 'completed' : ''} ${editingId === todo.id ? 'editing' : ''}`}
              >
                {editingId === todo.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      className="edit-input"
                    />
                    <div className="edit-actions">
                      <button onClick={saveEdit} className="save-btn">✓</button>
                      <button onClick={cancelEdit} className="cancel-btn">✕</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span 
                      className="todo-text" 
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.text}
                    </span>
                    <div className="todo-actions">
                      <button 
                        onClick={() => startEditing(todo)} 
                        className="edit-btn"
                        title="编辑"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => deleteTodo(todo.id)} 
                        className="delete-btn"
                        title="删除"
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="footer">
        <p>© {new Date().getFullYear()} TodoList • 数据已自动保存至本地</p>
      </div>
    </div>
  );
}

export default App;