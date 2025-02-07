import prisma from '../services/prismaClient.js';

const clientController = {
  getAllClients: async (req, res) => {
    try {
      const clients = await prisma.client.findMany({
        orderBy: { id: 'asc' },
      });
      res.status(200).json(clients);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Erreur lors de la récupération des clients' });
    }
  },
  getClient: async (req, res) => {
    const clientId = parseInt(req.params.id, 10);
    if (isNaN(clientId)) {
      return res.status(400).json({ error: "l'ID doit être un nombre" });
    }
    try {
      const client = await prisma.client.findUnique({
        where: { id: clientId },
        include: {
          projects: true,
        },
      });
      if (!client) {
        return res.status(404).json({ error: 'Client non trouvé' });
      }
      res.status(200).json(client);
    } catch (error) {
      console.error(
        "erreur prisma lors de la récupération d'un client :",
        error
      );
      res
        .status(500)
        .json({ message: 'Erreur lors de la récupération du client' });
    }
  },
  createClient: async (req, res) => {
    try {
      console.log('Données reçu pour créer un client :', req.body);
      const { email, ...clientData } = req.body;
      const existingClient = await prisma.client.findUnique({
        where: { email },
      });
      if (existingClient) {
        return res
          .status(400)
          .json({ message: 'Un client avec cet email existe déjà' });
      }
      const client = await prisma.client.create({
        data: { ...clientData, email },
      });
      res.status(201).json(client);
    } catch (error) {
      console.error("erreur prisma lors de la création d'un client :", error);
      res.status(500).json({ message: 'Erreur lors de la création du client' });
    }
  },
  updateClient: async (req, res) => {
    try {
      const clientId = parseInt(req.params.id, 10);
      if (isNaN(clientId)) {
        return res.status(400).json({ error: "l'ID doit être un nombre" });
      }
      console.log('Données reçu pour mettre à jour un client :', req.body);
      const clientData = req.body;

      // Supprime les projets du body pour éviter une erreur de validation
      delete clientData.projects;

      const client = await prisma.client.update({
        where: { id: clientId },
        data: clientData,
      });
      res.status(201).json(client);
    } catch (error) {
      console.error(
        "erreur prisma lors de la mise à jour d'un client :",
        error
      );
      res
        .status(500)
        .json({ message: 'Erreur lors de la mise à jour du client' });
    }
  },
  deleteClient: async (req, res) => {
    try {
      const clientId = parseInt(req.params.id, 10);
      if (isNaN(clientId)) {
        return res.status(400).json({ error: "l'ID doit être un nombre" });
      }
      await prisma.client.delete({
        where: { id: clientId },
      });
      res.status(200).json({ message: 'Client supprimé avec succès' });
    } catch (error) {
      console.error(
        "erreur prisma lors de la suppression d'un client :",
        error
      );
      res
        .status(500)
        .json({ message: 'Erreur lors de la suppression du client' });
    }
  },
};

export default clientController;
