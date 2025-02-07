const authRole = (role) => {
  try {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Vous devez être connecté' });
      }
      if (req.user.role !== role) {
        return res
          .status(403)
          .json({ message: "Accès non autorisé : vous n'avez pas les droits" });
      }
      next();
    };
  } catch (error) {
    console.error('Erreur dans le middleware authRole :', error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de l'authentification du role" });
  }
};
