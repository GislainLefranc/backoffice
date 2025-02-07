import prisma from '../services/prismaClient.js';

const commentController = {
  getAllCommentsByProject: async (req, res) => {
    const projectId = parseInt(req.params.id, 10);
    if (isNaN(projectId)) {
      return res.status(400).json({ error: 'l\ID doit être un nombre' });
    }
    try {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { comments: true },
      });
      if (!project) {
        return res.status(404).json({ error: 'Projet non trouvé' });
      }
      res.status(200).json(project.comments);
    } catch (error) {
      console.error(
        "erreur prisma lors de la récupération des commentaires d'un projet :",
        error
      );
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des commentaires',
      });
    }
  },
  getCommentByProject: async (req, res) => {
    try {
      const commentId = parseInt(req.params.id, 10);
      if (isNaN(commentId)) {
        return res.status(400).json({ error: 'l\ID doit être un nombre' });
      }
      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });
      if (!comment) {
        return res.status(404).json({ error: 'Commentaire non trouvé' });
      }
      res.status(200).json(comment);
    } catch (error) {
      console.error(
        "erreur prisma lors de la récupération d'un commentaire :",
        error
      );
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération du commentaire',
      });
    }
  },
  createComment: async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId, 10);
      if (isNaN(projectId)) {
        return res.status(400).json({ error: 'l\ID doit être un nombre' });
      }
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });
      if (!project) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
      const { userId, content } = req.body;

      if (!userId) {
        return res
          .status(400)
          .json({ message: "L'utilisateur doit être identifié" });
      }
      if (!content) {
        return res
          .status(400)
          .json({ message: 'Votre commentaire ne doit pas être vide' });
      }
      const comment = await prisma.comment.create({
        data: {
          content,
          user: { connect: { id: userId } },
          project: { connect: { id: projectId } },
        },
      });
      res.status(201).json(comment);
    } catch (error) {
      console.error(
        "erreur prisma lors de la création d'un commentaire :",
        error
      );
      res
        .status(500)
        .json({ message: 'Erreur lors de la création du commentaire' });
    }
  },
  updateComment: async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId, 10);
      const commentId = parseInt(req.params.commentId, 10);
      if (isNaN(projectId) || isNaN(commentId)) {
        return res.status(400).json({ error: 'l\ID doit être un nombre' });
      }
      const existingComment = await prisma.comment.findUnique({
        where: { id: commentId },
      });
      if (!existingComment || existingComment.projectId !== projectId) {
        return res
          .status(404)
          .json({ message: 'Commentaire non trouvé pour ce projet' });
      }
      const { content } = req.body;
      if (!content) {
        return res
          .status(400)
          .json({ message: 'Le contenu du commentaire ne doit pas être vide' });
      }
      const comment = await prisma.comment.update({
        where: { id: commentId },
        data: { content },
      });
      res.status(200).json(comment);
    } catch (error) {
      console.error(
        "erreur prisma lors de la mise à jour d'un commentaire :",
        error
      );
      res
        .status(500)
        .json({ message: 'Erreur lors de la mise à jour du commentaire' });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId, 10);
      const commentId = parseInt(req.params.commentId, 10);
      if (isNaN(projectId) || isNaN(commentId)) {
        return res.status(400).json({ error: "l'ID doit être un nombre" });
      }
      const existingComment = await prisma.comment.findUnique({
        where: {
          id: commentId,
        },
      });

      if (!existingComment || existingComment.projectId !== projectId) {
        return res
          .status(404)
          .json({ message: 'Commentaire non trouvé pour ce projet' });
      }

      await prisma.comment.delete({
        where: { id: commentId },
      });
      res.status(200).json({ message: 'Commentaire supprimé avec succès' });
    } catch (error) {
      console.error(
        "erreur prisma lors de la suppression d'un commentaire :",
        error
      );
      res
        .status(500)
        .json({ message: 'Erreur lors de la suppression du commentaire' });
    }
  },
};

export default commentController;
