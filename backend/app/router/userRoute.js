import express from 'express';
import userController from '../controllers/userController.js';

export const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.patch('/:id', userController.updateUserForSuperAdmin);
router.delete('/:id', userController.deleteUser);
