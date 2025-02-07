import express from 'express';
import clientController from '../controllers/clientController.js';
import projectController from '../controllers/projectController.js';

export const router = express.Router();

router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClient);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

router.get('/:clientId/projects', projectController.getAllProjectsByClient);
