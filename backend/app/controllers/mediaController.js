import prisma from '../services/prismaClient.js';
import {
  uploadMediaFromCloudinary,
  deleteMediaFromCloudinary,
} from '../utils/uploadMedia.js';

const mediaController = {
  getAllMediasByProject: async (req, res) => {
    const projectId = parseInt(req.params.projectId, 10);
    if (isNaN(projectId)) {
      return res.status(400).json({ error: "l'ID doit être un nombre" });
    }
    try {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { media: true },
      });
      if (!project) {
        return res.status(404).json({ error: 'Projet non trouvé' });
      }
      res.status(200).json(project.media);
    } catch (error) {
      console.error(
        "erreur prisma lors de la récupération des médias d'un projet :",
        error
      );
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des médias',
      });
    }
  },
  getMediaByProject: async (req, res) => {
    try {
      const mediaId = parseInt(req.params.id, 10);
      if (isNaN(mediaId)) {
        return res.status(400).json({ error: 'l\ID doit être un nombre' });
      }
      const media = await prisma.media.findUnique({
        where: { id: mediaId },
      });
      if (!media) {
        return res.status(404).json({ error: 'Média non trouvé' });
      }
      res.status(200).json(media);
    } catch (error) {
      console.error(
        "erreur prisma lors de la récupération d'un média :",
        error
      );
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération du média',
      });
    }
  },
  createMedia: async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId, 10);
      const { name, file } = req.body;

      if (isNaN(projectId)) {
        return res.status(400).json({ error: "l'ID doit être un nombre" });
      }
      if (!name || !file) {
        return res
          .status(400)
          .json({ error: 'Le nom et le fichier sont obligatoires' });
      }

      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });
      if (!project) {
        return res.status(404).json({ error: 'Projet non trouvé' });
      }

      const mediaUrl = await uploadMediaFromCloudinary(file);
      const newMedia = await prisma.media.create({
        data: {
          name,
          url: mediaUrl,
          project: {
            connect: { id: projectId },
          },
        },
      });
      res.status(201).json(newMedia);
    } catch (error) {
      console.error("erreur prisma lors de la création d'un média :", error);
      res.status(500).json({ message: 'Erreur lors de la création du média' });
    }
  },
  deleteMedia: async (req, res) => {
    try {
      const mediaId = parseInt(req.params.id, 10);
      if (isNaN(mediaId)) {
        return res.status(400).json({ error: "l'ID doit être un nombre" });
      }
      const media = await prisma.media.findUnique({
        where: { id: mediaId },
      });
      if (!media) {
        return res.status(404).json({ error: 'Média non trouvé' });
      }
      await deleteMediaFromCloudinary(media.url);
      await prisma.media.delete({
        where: { id: mediaId },
      });
      res.status(200).json(media);
    } catch (error) {
      console.error("erreur prisma lors de la suppression d'un média :", error);
      res
        .status(500)
        .json({ message: 'Erreur serveur lors de la suppression du média' });
    }
  },
};

export default mediaController;
