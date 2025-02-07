import prisma from '../services/prismaClient.js';
import { deleteMediaFromCloudinary } from '../utils/uploadMedia.js';

const projectController = {
  getAllProjectsByClient: async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId, 10);
      if (isNaN(clientId)) {
        return res.status(400).json({ error: "l'ID doit être un nombre" });
      }
      const client = await prisma.client.findUnique({
        where: { id: clientId },
      });
      if (!client) {
        return res.status(404).json({ error: 'Client non trouvé' });
      }
      const projects = await prisma.project.findMany({
        where: { clientId },
        include: { client: true, media: true, comments: true },
      });
      res.status(200).json(projects);
    } catch (error) {
      console.error(
        "erreur prisma lors de la récupération des projets de l'utilisateur :",
        error
      );
      res.status(500).json({
        message:
          "Erreur serveur lors de la récupération des projets de l'utilisateur",
      });
    }
  },
  getProject: async (req, res) => {
    try {
      const projectId = parseInt(req.params.id, 10);
      if (isNaN(projectId)) {
        return res.status(400).json({ error: "l'ID doit être un nombre" });
      }
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { client: true, media: true, comments: true },
      });
      if (!project) {
        return res.status(404).json({ error: 'Projet non trouvé' });
      }
      res.status(200).json(project);
    } catch (error) {
      console.error(
        "erreur prisma lors de la récupération d'un projet :",
        error
      );
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération du projet',
      });
    }
  },
  createProject: async (req, res) => {
    try {
      const { clientId, name, ...projectData } = req.body;
      const client = await prisma.client.findUnique({
        where: { id: clientId },
      });
      if (!client) {
        return res.status(404).json({ message: 'Client non trouvé' });
      }
      if (!name) {
        return res.status(400).json({ message: 'Le nom du projet est requis' });
      }
      const project = await prisma.project.create({
        data: {
          ...projectData,
          name,
          client: { connect: { id: clientId } },
        },
      });
      res.status(201).json(project);
    } catch (error) {
      console.error("erreur prisma lors de la création d'un projet :", error);
      res.status(500).json({ message: 'Erreur lors de la création du projet' });
    }
  },
  updateProject: async (req, res) => {
    try {
      const projectId = parseInt(req.params.id, 10);
      const { clientId, ...projectData } = req.body;
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });
      if (!project) {
        return res.status(400).json({ message: 'Aucun projet trouvé' });
      }
      if (clientId) {
        const client = await prisma.client.findUnique({
          where: { id: clientId },
        });
        if (!client) {
          return res
            .status(404)
            .json({ message: 'Aucun client rattaché à ce projet' });
        }
      }
      await prisma.project.update({
        where: { id: projectId },
        data: {
          ...projectData,
          client: clientId ? { connect: { id: clientId } } : undefined,
        },
      });
      res.status(201).json({ message: 'Projet mis à jour avec succès' });
    } catch (error) {
      console.error(
        "erreur prisma lors de la mise à jour d'un projet :",
        error
      );
      res
        .status(500)
        .json({ message: 'Erreur serveur lors de la mise à jour du projet' });
    }
  },
  deleteProject: async (req, res) => {
    try {
      const projectId = parseInt(req.params.id, 10);
      if (isNaN(projectId)) {
        return res.status(400).json({ error: "l'ID doit être un nombre" });
      }
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { media: true, comments: true },
      });
      if (!project) {
        return res.status(404).json({ error: 'Projet non trouvé' });
      }
      for (const media of project.media) {
        if (media.url) {
          await deleteMediaFromCloudinary(media.url);
        }
      }
      await prisma.project.delete({
        where: { id: projectId },
      });
      res.status(200).json({ message: 'Projet supprimé avec succès' });
    } catch (error) {
      console.error(
        "erreur prisma lors de la suppression d'un projet :",
        error
      );
      res
        .status(500)
        .json({ message: 'Erreur serveur lors de la suppression du projet' });
    }
  },
};

export default projectController;
