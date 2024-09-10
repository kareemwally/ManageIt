const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require("path")
require('dotenv').config();

const app = express();

process.env.NODE_OPTIONS = '--openssl-legacy-provider';

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'todo-frontend/build')));

// Logging middleware
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

const dbConfig = {
  host: '52.91.121.118',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'to_do',
  connectionLimit: 10
};

const pool = mysql.createPool(dbConfig);

// Root route
/*app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'todo-frontend/build'));
});*/

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1');
    res.json({ message: 'Database connection successful', data: rows });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  });
  
  // User login
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (users.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const user = users[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.json({ message: 'Login successful', userId: user.id });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error during login' });
    }
  });
  
  // Create a new todo
  app.post('/api/todos', async (req, res) => {
    const { user_id, category_id, title, description, due_date, priority } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO todos (user_id, category_id, title, description, due_date, priority) VALUES (?, ?, ?, ?, ?, ?)',
        [user_id, category_id, title, description, due_date, priority]
      );
      res.status(201).json({ message: 'Todo created successfully', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error creating todo' });
    }
  });
  
  // Get all todos for a user
  app.get('/api/todos/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const [todos] = await pool.query('SELECT * FROM todos WHERE user_id = ?', [userId]);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching todos' });
    }
  });
  
  // Update a todo
  app.put('/api/todos/:id', async (req, res) => {
    const todoId = req.params.id;
    const { title, description, is_completed, category_id, due_date, priority } = req.body;
    try {
      await pool.query(
        'UPDATE todos SET title = ?, description = ?, is_completed = ?, category_id = ?, due_date = ?, priority = ? WHERE id = ?',
        [title, description, is_completed, category_id, due_date, priority, todoId]
      );
      res.json({ message: 'Todo updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating todo' });
    }
  });
  
  // Delete a todo
  app.delete('/api/todos/:id', async (req, res) => {
    const todoId = req.params.id;
    try {
      await pool.query('DELETE FROM todos WHERE id = ?', [todoId]);
      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting todo' });
    }
  });
  
  // Create a new category
  app.post('/categories', async (req, res) => {
    const { name, user_id } = req.body;
    try {
      const [result] = await pool.query('INSERT INTO categories (name, user_id) VALUES (?, ?)', [name, user_id]);
      res.status(201).json({ message: 'Category created successfully', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error creating category' });
    }
  });
  
  // Get all categories for a user
  app.get('/categories/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const [categories] = await pool.query('SELECT * FROM categories WHERE user_id = ?', [userId]);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching categories' });
    }
  });
  
  // Create a new tag
  app.post('/tags', async (req, res) => {
    const { name, user_id } = req.body;
    try {
      const [result] = await pool.query('INSERT INTO tags (name, user_id) VALUES (?, ?)', [name, user_id]);
      res.status(201).json({ message: 'Tag created successfully', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error creating tag' });
    }
  });
  
  // Get all tags for a user
  app.get('/tags/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const [tags] = await pool.query('SELECT * FROM tags WHERE user_id = ?', [userId]);
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tags' });
    }
  });
  
  // Add a tag to a todo
  app.post('/todo-tags', async (req, res) => {
    const { todo_id, tag_id } = req.body;
    try {
      await pool.query('INSERT INTO todo_tags (todo_id, tag_id) VALUES (?, ?)', [todo_id, tag_id]);
      res.status(201).json({ message: 'Tag added to todo successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding tag to todo' });
    }
  });
  
  // Share a todo
  app.post('/shared-todos', async (req, res) => {
    const { todo_id, shared_with_user_id, can_edit } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO shared_todos (todo_id, shared_with_user_id, can_edit) VALUES (?, ?, ?)',
        [todo_id, shared_with_user_id, can_edit]
      );
      res.status(201).json({ message: 'Todo shared successfully', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Error sharing todo' });
    }
  });
  
  // Get shared todos for a user
  app.get('/shared-todos/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const [sharedTodos] = await pool.query(
        'SELECT t.*, st.can_edit FROM todos t JOIN shared_todos st ON t.id = st.todo_id WHERE st.shared_with_user_id = ?',
        [userId]
      );
      res.json(sharedTodos);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching shared todos' });
    }
  });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'todo-frontend/build', 'index.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});