const jwt = require('jsonwebtoken');

/**
 * Genera un token JWT para el usuario
 * @param {Object} user - Datos del usuario
 * @param {number} user.id - ID del usuario
 * @param {string} user.email - Email del usuario
 * @param {string} user.rol - Rol del usuario
 * @returns {string} Token JWT
 */
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    rol: user.rol
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

module.exports = generateToken;
