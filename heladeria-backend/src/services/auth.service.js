const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

class AuthService {
  // Registrar nuevo usuario
  async register(userData) {
    const { nombre, email, password, telefono, direccion, rol = 'CLIENTE' } = userData;

    // Verificar si el email ya existe
    const [existing] = await pool.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      throw new Error('El email ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, telefono, direccion, rol) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, email, hashedPassword, telefono || null, direccion || null, rol]
    );

    return {
      id: result.insertId,
      nombre,
      email,
      rol
    };
  }

  // Login de usuario
  async login(email, password) {
    // Buscar usuario
    const [users] = await pool.query(
      'SELECT id, nombre, email, password, rol, estado FROM usuarios WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      throw new Error('Credenciales inválidas');
    }

    const user = users[0];

    // Verificar si está activo
    if (!user.estado) {
      throw new Error('Usuario inactivo');
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    };
  }

  // Obtener perfil de usuario
  async getProfile(userId) {
    const [users] = await pool.query(
      'SELECT id, nombre, email, telefono, direccion, rol, fecha_creacion FROM usuarios WHERE id = ? AND estado = TRUE',
      [userId]
    );

    if (users.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    return users[0];
  }
}

module.exports = new AuthService();
