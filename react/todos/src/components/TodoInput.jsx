import { useState } from "react";

function TodoInput(props) {
  // console.log(props)
  const { 
    onAdd,
  } = props;
  // react 不支持v-model那样的双向绑定（性能不好）
  // react 只支持单项绑定（性能好） + onChange 实现数据状态和视图的同步
  // 
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    // 取消页面刷新、跳转
    e.preventDefault();
    onAdd(inputValue);
    setInputValue('');
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoInput;
