export default function TodoItem(props) {
    const {
        todo,
        onDelete,
        onToggle
    } = props;

    return (
        <li className="todo-item">
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => onToggle(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
            </span>
            <button 
                onClick={() => onDelete(todo.id)}
            >
                删除
            </button>
        </li>
    )
}