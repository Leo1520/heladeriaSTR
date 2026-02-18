const bcrypt = require('bcrypt');
const { pool } = require('../config/database');
const generateToken = require('../utils/generateToken');

class AuthService {
  // Registrar nuevo usuario
  async register(userData) {
    const { nombre, email, password, telefono, direccion, rol = 'CLIENTE' } = userData;

    // Validar contraseña mínima
    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

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

    const user = {
      id: result.insertId,
      nombre,
      email,
      rol
    };

    // Generar token JWT
    const token = generateToken(user);

    return {
      user,
      token
    };
  }

  // Login de usuario
  async login(email, password) {
    // Validar que se proporcionen credenciales
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }

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

    // Datos del usuario sin contraseña
    const userData = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    };

    // Generar token JWT
    const token = generateToken(userData);

    return {
      user: userData,
      token
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
