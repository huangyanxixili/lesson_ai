import {
    useState,
    useEffect,
} from 'react';
// 引入接口，esm 前面加个 type 申明类型约束
import type {
    Todo
} from '../types/todo.ts';
import { getStorage, setStorage } from '../utils/storages.ts';

const STORAGE_KEY = 'todos'; //便于维护

export function useTodos() {
    // 其中 todos 为类型为Todo的数组，所以在约定这个初始数组时也要用<Todo[]>
    const [todos, setTodos] = useState<Todo[]>(
        () => getStorage<Todo[]>(STORAGE_KEY, [])
    );

    useEffect(() => {
        setStorage<Todo[]>(STORAGE_KEY, todos);
    }, [todos]);

    // const [count, setCount] = useState<number>(0);
    const addTodo = (title:string) => {
        const newTodo:Todo = {
            id: + new Date(), // 通过 + 运算符强制将 Date() 转为时间戳
            title,
            completed: false
        }
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
    }

     const toggleTodo = (id:number) => {
        const newTodos = todos.map(todo => 
            todo.id === id ? 
            { ...todo, completed: !todo.completed } 
            : todo
        );
    setTodos(newTodos);
  }

    const removeTodo = (id:number) => {
        const newTodos = todos.filter(todo => todo.id !== id) 
        setTodos(newTodos);
    }

    return {
        todos,
        addTodo,
        toggleTodo,
        removeTodo
    }
}