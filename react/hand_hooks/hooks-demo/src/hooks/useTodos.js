// 封装响应式todos业务
import {
    useState,
    useEffect,
} from 'react'

const STORAGE_KEY = "todos"; // 好维护

function loadFromStorage() {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
}

function saveToStorage(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export const useTodos = () => {
    // useState 接收函数 计算、同步
    const [todos, setTodos] = useState(loadFromStorage);

    useEffect(() => {
        saveToStorage(todos);
    }, [todos])

    const addTodo = (text) => {
        setTodos(
            [
                ...todos,
                {
                    id: Date.now(),
                    text,
                    completed: false
                }
            ]
        )
    }

    const toggleTodo = (id) => {
        setTodos(
            todos.map(todo => {
                if(todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            })
        )
    }

    const deleteTodo = (id) => {
        setTodos(
            todos.filter(todo => todo.id !== id)
        )
    }

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo
    }
}