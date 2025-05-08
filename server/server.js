import express from 'express';
import cors from 'cors';
import pool from './dataServices/DB.js';
import postsRoutes from './routes/postsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';
import todosRoutes from './routes/todosRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
app.use(express.json());
app.use(cors());

// Route to test database connection
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1');
    res.json({ success: true, result: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

 app.use('/api/user', userRoutes);
 app.use('/api/posts', postsRoutes);
 app.use('/api/comments', commentsRoutes);
 app.use('/api/todos', todosRoutes);

// Start the server on a specified port or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});