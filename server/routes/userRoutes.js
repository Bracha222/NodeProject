import express from 'express';
const router = express.Router();

import {
  addUser,
  loginUser
} from '../controllers/userController.js';

// רישום משתמש חדש
router.post('/register', addUser);

// התחברות משתמש
router.post('/login', loginUser);

export default router;
