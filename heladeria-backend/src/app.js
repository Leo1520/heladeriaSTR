const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const productosRoutes = require('./routes/productos.routes');

// Importar middlewares
const errorMiddleware = require('./middlewares/error.middleware');

// Crear aplicación Express
const app = express();

// ============================================
// MIDDLEWARES GLOBALES
// ============================================

// CORS
app.use(cors());

// Parsear JSON
app.use(express.json());

// Parsear URL-encoded
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (imágenes)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ============================================
// RUTAS
// ============================================

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🍦 API Heladería - Backend funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      productos: '/api/productos'
    }
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// ============================================
// MIDDLEWARE DE ERRORES (debe ir al final)
// ============================================
app.use(errorMiddleware);

module.exports = app;
