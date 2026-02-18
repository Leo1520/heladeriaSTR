const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/role.middleware');
const upload = require('../utils/multer.config');

// Rutas públicas
router.get('/', productosController.getAll);
router.get('/:id', productosController.getById);

// Rutas protegidas solo para ADMIN
router.post(
  '/',
  authMiddleware,
  isAdmin,
  upload.single('imagen'),
  productosController.create
);

router.put(
  '/:id',
  authMiddleware,
  isAdmin,
  upload.single('imagen'),
  productosController.update
);

router.delete(
  '/:id',
  authMiddleware,
  isAdmin,
  productosController.delete
);

module.exports = router;
