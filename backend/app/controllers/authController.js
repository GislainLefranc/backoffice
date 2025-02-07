import jwt from 'jsonwebtoken';
import prisma from '../services/prismaClient.js';
import { hashPassword, verifyPassword } from '../utils/password.js';

// Generate a token
const generateToken = (user, expiresIn) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      email = email.toLowerCase();

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res
          .status(401)
          .json({ error: 'Email ou mot de passe incorrect' });
      }

      const isValidPassword = await verifyPassword(user.password, password);
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ error: 'Email ou mot de passe incorrect' });
      }

      const token = generateToken(user, '1h');
      const refreshToken = generateToken(user, '7d');

      res.status(200).json({
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      });
    } catch (error) {
      console.error('Erreur serveur lors de la connexion :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      console.log('BODY:', req.body);
      console.log('PARAMS:', req.params);
      if (isNaN(userId)) {
        return res
          .status(400)
          .json({ message: "l'ID utilisateur est invalide" });
      }

      if (!userId) {
        return res
          .status(400)
          .json({ message: "l'ID utilisateur est manquant" });
      }

      const { oldPassword, newPassword } = req.body;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      const isValidOldPassword = await verifyPassword(
        user.password,
        oldPassword
      );
      if (!isValidOldPassword) {
        return res
          .status(400)
          .json({ message: 'Ancien mot de passe incorrect' });
      }
      const hashedPassword = await hashPassword(newPassword);
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
      res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
    } catch (error) {
      console.error(
        'Erreur serveur lors de la mise à jour du mot de passe :',
        error
      );
      res.status(500).json({
        message: 'Erreur serveur lors de la mise à jour du mot de passe',
      });
    }
  },
};

export default authController;
