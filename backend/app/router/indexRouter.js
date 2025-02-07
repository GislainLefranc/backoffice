import { Router } from 'express';
import { router as authRoute } from './authRoute.js';
import { router as userRoute } from './userRoute.js';
import { router as clientRoute } from './clientRoute.js';
import { router as projectRoute } from './projectRoute.js';
import { router as mediaRoute } from './mediaRoute.js';

export const router = Router();

router.get('/', (req, res) => {
  res.send({ message: "Bienvenue sur l'API BackOffice d'Odaptos!" });
});

router.use('/users', userRoute);
router.use('/clients', clientRoute);
router.use('/projects', projectRoute);
router.use('/media', mediaRoute);
router.use('/auth', authRoute);
