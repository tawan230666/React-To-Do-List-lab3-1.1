import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import TodoItem from './TodoItem';

function TodoList() {
  const { todos } = useContext(TodoContext);

  if (!todos.length) {
    return <p className="empty">ยังไม่มีรายการ ลองเพิ่มรายการแรกได้เลย 💡</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
