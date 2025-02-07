import argon2 from 'argon2';

// Hash password
export const hashPassword = async (password) => {
  return await argon2.hash(password);
};

/**
 * Verify password
 * @param {*} hash
 * @param {*} password
 * @returns true if password is correct, false otherwise
 */
export const verifyPassword = async (hash, password) => {
  return await argon2.verify(hash, password);
};
