const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rutas protegidas
router.get('/profile', authMiddleware, authController.getProfile);
router.get('/me', authMiddleware, authController.getProfile); // Alias para /profile

module.exports = router;
