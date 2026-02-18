const productosService = require('../services/productos.service');

class ProductosController {
  // GET /api/productos
  async getAll(req, res, next) {
    try {
      const productos = await productosService.getAll();
      res.json({
        success: true,
        data: productos
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/productos/:id
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const producto = await productosService.getById(id);
      res.json({
        success: true,
        data: producto
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/productos
  async create(req, res, next) {
    try {
      const imagePath = req.file ? `uploads/productos/${req.file.filename}` : null;
      const producto = await productosService.create(req.body, imagePath);
      
      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: producto
      });
    } catch (error) {
      // Si hay error, eliminar imagen subida
      if (req.file) {
        productosService.deleteImage(`uploads/productos/${req.file.filename}`);
      }
      next(error);
    }
  }

  // PUT /api/productos/:id
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const newImagePath = req.file ? `uploads/productos/${req.file.filename}` : null;
      
      const producto = await productosService.update(id, req.body, newImagePath);
      
      res.json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: producto
      });
    } catch (error) {
      // Si hay error, eliminar nueva imagen subida
      if (req.file) {
        productosService.deleteImage(`uploads/productos/${req.file.filename}`);
      }
      next(error);
    }
  }

  // DELETE /api/productos/:id
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await productosService.delete(id);
      
      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductosController();
