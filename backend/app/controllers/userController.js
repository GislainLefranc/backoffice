import prisma from '../services/prismaClient.js';
import { hashPassword } from '../utils/password.js';
import {
  uploadMediaFromCloudinary,
  deleteMediaFromCloudinary,
} from '../utils/uploadMedia.js';

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          role: true,
          image: true,
        },
        orderBy: { id: 'asc' },
      });
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
  },
  getUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          role: true,
          image: true,
        },
      });
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération de l'utilisateur" });
    }
  },
  createUser: async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: 'Un utilisateur avec cet email existe déjà' });
      }

      const hashedPassword = await hashPassword(password);

      const userRole = role || 'admin';

      const user = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password: hashedPassword,
          role: userRole,
        },
      });
      return res.status(201).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la création de l'utilisateur" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { firstname, lastname, email, image } = req.body;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      let imageUrl;

      console.log('user.image', user.image);
      console.log('image du body', image);

      if (image !== user.image) {
        if (user.image) {
          await deleteMediaFromCloudinary(user.image);
        }
        imageUrl = await uploadMediaFromCloudinary(image);
      }

      console.log('imageUrl', imageUrl);

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          firstname,
          lastname,
          email,
          image: imageUrl,
        },
      });
      res.json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
    }
  },
  updateUserForSuperAdmin: async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, role } = req.body;
    try {
      const user = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          firstname,
          lastname,
          email,
          role,
        },
      });
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ message: 'l\ID doit être un nombre' });
      }

      await prisma.user.delete({
        where: { id },
      });

      res.status(200).json({
        message: 'Utilisateur supprimé avec succès',
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
  },
};

export default userController;
