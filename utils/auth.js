import crypto from 'crypto';

/**
 * Hash a password using SHA-1.
 * @param {string} password - The plain text password.
 * @returns {string} The hashed password.
 */
function hashPassword(password) {
  return crypto.createHash('sha1').update(password).digest('hex');
}
/**
 * Verify if the provided password matches the stored hashed password.
 * @param {string} plainPassword - The plain text password.
 * @param {string} hashedPassword - The stored hashed password
 * @returns {boolean} True if the passwords match, false otherwise.
 */
function verifyPassword(plainPassword, hashedPassword) {
  const hashedInputPassword = hashPassword(plainPassword);
  return hashedInputPassword === hashedPassword;
}

export { hashPassword, verifyPassword };
