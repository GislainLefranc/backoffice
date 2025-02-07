import express from 'express';
import projectController from '../controllers/projectController.js';
import mediaController from '../controllers/mediaController.js';
import commentController from '../controllers/commentController.js';

export const router = express.Router();

router.get('/:id', projectController.getProject);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

router.get('/:projectId/media', mediaController.getAllMediasByProject);
router.post('/:projectId/media', mediaController.createMedia);
router.delete('/:projectId/media/:mediaId', mediaController.deleteMedia);

router.get('/:id/comments', commentController.getAllCommentsByProject);
router.post('/:projectId/comments', commentController.createComment);
router.put('/:projectId/comments/:commentId', commentController.updateComment);
router.delete(
  '/:projectId/comments/:commentId',
  commentController.deleteComment
);
