import express from 'express';
const router = express.Router();

import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment
} from '../controllers/commentsController.js';

// תגובות לפוסט מסוים
router.get('/post/:postId', getCommentsByPost);

// יצירת תגובה חדשה
router.post('/create', createComment);

// עדכון תגובה
router.put('/update/:id', updateComment);

// מחיקת תגובה
router.delete('/delete/:id', deleteComment);

export default router;
