const TodoStats = (props) => {
  const { 
    total, 
    active, 
    completed,
    onClearCompleted,
  } = props;
  return (
    <div className="todo-stats">
      <p>Total: {total} | Active: {active} | Active: {active}</p>
      {
        completed > 0 && (
            <button 
              onClick={onClearCompleted}
              className="clear-btn"
            >清除</button>
        )
      }
    </div>
  );
};

export default TodoStats;
