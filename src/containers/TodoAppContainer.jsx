import React, { useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

function TodoAppContainer() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียนรู้ useContext', completed: true },
    { id: 2, text: 'ทำ Mini Project', completed: false },
  ]);

  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const value = { todos, addTodo, deleteTodo, toggleTodo, editTodo };

  return (
    <TodoContext.Provider value={value}>
      <div className="app">
        <h1>My To-Do List (with Context + Container Pattern)</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
}

export default TodoAppContainer;
