import express from 'express';
import authController from '../controllers/authController.js';

export const router = express.Router();

router.post('/login', authController.login);
router.put('/update-password/:userId', authController.updatePassword);
router.get('/me', authController.me);
