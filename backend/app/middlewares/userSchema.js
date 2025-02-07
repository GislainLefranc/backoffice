import { z } from 'zod';

// Regex pour les noms composés
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

export const userSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(2, { message: 'Le prénom doit contenir au moins 2 caractères' })
    .max(30, { message: 'Le prénom doit contenir au maximum 30 caractères' })
    .regex(nameRegex, {
      message: 'Le prénom ne peut contenir que des lettres, espaces ou tirets',
    }),

  lastname: z
    .string()
    .trim()
    .min(2, { message: 'Le nom doit contenir au moins 2 caractères' })
    .max(30, { message: 'Le nom doit contenir au maximum 30 caractères' })
    .regex(nameRegex, {
      message: 'Le nom ne peut contenir que des lettres, espaces ou tirets',
    }),

  email: z.string().trim().email({ message: 'Adresse email invalide' }),
  password: z
    .string()
    .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
    .regex(/[A-Z]/, {
      message: 'Le mot de passe doit contenir au moins une majuscule',
    })
    .regex(/[a-z]/, {
      message: 'Le mot de passe doit contenir au moins une minuscule',
    })
    .regex(/[0-9]/, {
      message: 'Le mot de passe doit contenir au moins un chiffre',
    })
    .regex(/[\W]/, {
      message:
        'Le mot de passe doit contenir au moins un caractère spécial (@, $, !, etc.)',
    }),
});
