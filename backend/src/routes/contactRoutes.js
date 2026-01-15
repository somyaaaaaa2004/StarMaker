// Contact routes
import express from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();

// Contact form route
router.post('/', submitContact);

export default router;
