import express from 'express';
const router = express.Router();

import {
  getAllPosts,
  getPostById,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postsController.js';

// כל הפוסטים
router.get('/all', getAllPosts);

// פוסט לפי ID
router.get('/id/:id', getPostById);

// פוסטים של משתמש מסוים
router.get('/user/:userId', getPostsByUser);

// יצירת פוסט חדש
router.post('/create', createPost);

// עדכון פוסט קיים
router.put('/update/:id', updatePost);

// מחיקת פוסט
router.delete('/delete/:id', deletePost);

export default router;
