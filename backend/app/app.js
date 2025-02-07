import express from 'express';
import cors from 'cors';
import prisma from './services/prismaClient.js';
import { router } from './router/indexRouter.js';
import passport from './services/passport.js';

const app = express();

app.use(
  cors({
    origin: process.env.CORS === '*' ? '*' : process.env.CORS.split(','),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(passport.initialize());

const syncDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Connexion à la base de données Supabase réussie');
  } catch (error) {
    console.error('Impossible de se connecter à Supabase');
  }
};

syncDatabase();

app.use('/api', router);

app.use((err, req, res, next) => {
  console.error('Erreur serveur :', err.message);
  res.status(err.status || 500).json({
    message: 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

export default app;
