import express from 'express';
import mediaController from '../controllers/mediaController.js';

export const router = express.Router();

router.get('/:id', mediaController.getMediaByProject);
router.delete('/:id', mediaController.deleteMedia);
