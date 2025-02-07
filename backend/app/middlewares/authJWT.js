import passport from 'passport';

const authJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error("Erreur serveur durant l'authentification :", err);
      return res
        .status(500)
        .json({ message: "Erreur serveur durant l'authentification" });
    }
    if (!user) {
      console.error('Accès non autorisé :', info);
      return res.status(401).json({ message: 'Accès non autorisé' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authJWT;
