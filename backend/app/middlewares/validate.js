import { ZodError } from 'zod';

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res
      .status(500)
      .json({ error: 'Erreur serveur lors de la validation' });
  }
};

export default validate;
