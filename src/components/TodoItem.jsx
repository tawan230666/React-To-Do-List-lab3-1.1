import React, { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const { deleteTodo, toggleTodo, editTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    const text = newText.trim();
    if (!text) return setIsEditing(false);
    editTodo(todo.id, text);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
        />
      ) : (
        // คลิกข้อความเพื่อ toggle เสร็จ/ไม่เสร็จ
        <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
      )}

      <div>
        {isEditing ? (
          <button onClick={handleSave} className="save-btn">บันทึก</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-btn">แก้ไข</button>
        )}
        <button onClick={() => deleteTodo(todo.id)}>ลบ</button>
      </div>
    </li>
  );
}

export default TodoItem;
