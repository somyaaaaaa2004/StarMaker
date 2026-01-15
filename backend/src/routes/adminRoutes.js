// Admin routes (separate from student auth routes)
import express from 'express';
import { adminLogin } from '../controllers/adminController.js';

const router = express.Router();

// Admin login route (separate from student login)
router.post('/login', adminLogin);

export default router;
