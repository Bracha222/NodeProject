import express from 'express';
const router = express.Router();

import {
  getTodosByUser,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todosController.js';



// משימות לפי משתמש
router.get('/user/:userId', getTodosByUser);

// יצירת משימה
router.post('/create', createTodo);

// עדכון משימה
router.put('/update/:id', updateTodo);

// מחיקת משימה
router.delete('/delete/:id', deleteTodo);

export default router;
