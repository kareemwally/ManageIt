import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoPage.css';  // Create this file for custom styling

const API_BASE_URL = 'http://localhost:3000';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`${API_BASE_URL}/api/todos/${userId}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`${API_BASE_URL}/api/todos`, {
        user_id: userId,
        title: newTodo,
      });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Your To-Do List</h2>
      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New Task"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">Add Task</button>
          </div>
        </div>
      </form>

      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            {todo.title}
            <button className="btn btn-danger btn-sm" onClick={() => {/* handle delete */}}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
