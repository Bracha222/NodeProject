import express from 'express';


const router = express.Router();

// Register a new user 
router.post('/register', registerUser);

// user LogIn
router.post('/login', loginUser);


export default router;