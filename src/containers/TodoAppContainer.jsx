import React, { useEffect, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

function TodoAppContainer() {
  const STORAGE_KEY = 'todos';
  const defaultTodos = [
    { id: 1, text: 'เรียนรู้ useContext', completed: true },
    { id: 2, text: 'ทำ Mini Project', completed: false },
  ];

  // Load saved todos once; fall back to the defaults if storage is empty or broken.
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultTodos;
    } catch {
      return defaultTodos;
    }
  });

  // Persist every change so tasks survive a page refresh.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Storage can be unavailable (private mode); the app still works in memory.
    }
  }, [todos]);

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
