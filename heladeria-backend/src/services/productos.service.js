const { pool } = require('../config/database');
const fs = require('fs');
const path = require('path');

class ProductosService {
  // Obtener todos los productos
  async getAll() {
    const [productos] = await pool.query(`
      SELECT 
        p.id,
        p.nombre,
        p.descripcion,
        p.precio,
        p.stock,
        p.imagen,
        p.estado,
        p.destacado,
        p.categoria_id,
        c.nombre as categoria_nombre,
        p.fecha_creacion,
        p.fecha_actualizacion
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      WHERE p.estado = TRUE
      ORDER BY p.fecha_creacion DESC
    `);

    return productos;
  }

  // Obtener producto por ID
  async getById(id) {
    const [productos] = await pool.query(`
      SELECT 
        p.id,
        p.nombre,
        p.descripcion,
        p.precio,
        p.stock,
        p.imagen,
        p.estado,
        p.destacado,
        p.categoria_id,
        c.nombre as categoria_nombre,
        p.fecha_creacion,
        p.fecha_actualizacion
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      WHERE p.id = ? AND p.estado = TRUE
    `, [id]);

    if (productos.length === 0) {
      throw new Error('Producto no encontrado');
    }

    return productos[0];
  }

  // Crear producto
  async create(productData, imagePath = null) {
    const { 
      nombre, 
      descripcion, 
      precio, 
      stock = 0, 
      categoria_id, 
      destacado = false 
    } = productData;

    const [result] = await pool.query(
      `INSERT INTO productos 
       (nombre, descripcion, precio, stock, imagen, categoria_id, destacado) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, precio, stock, imagePath, categoria_id || null, destacado]
    );

    return await this.getById(result.insertId);
  }

  // Actualizar producto
  async update(id, productData, newImagePath = null) {
    // Verificar que el producto existe
    const productoActual = await this.getById(id);

    const { 
      nombre, 
      descripcion, 
      precio, 
      stock, 
      categoria_id, 
      destacado 
    } = productData;

    // Si hay nueva imagen, eliminar la anterior
    if (newImagePath && productoActual.imagen) {
      this.deleteImage(productoActual.imagen);
    }

    // Determinar qué imagen usar
    const imagePath = newImagePath || productoActual.imagen;

    await pool.query(
      `UPDATE productos 
       SET nombre = ?, descripcion = ?, precio = ?, stock = ?, 
           imagen = ?, categoria_id = ?, destacado = ?
       WHERE id = ?`,
      [
        nombre || productoActual.nombre,
        descripcion || productoActual.descripcion,
        precio || productoActual.precio,
        stock !== undefined ? stock : productoActual.stock,
        imagePath,
        categoria_id !== undefined ? categoria_id : productoActual.categoria_id,
        destacado !== undefined ? destacado : productoActual.destacado,
        id
      ]
    );

    return await this.getById(id);
  }

  // Eliminar producto (soft delete)
  async delete(id) {
    const producto = await this.getById(id);

    // Eliminar imagen física
    if (producto.imagen) {
      this.deleteImage(producto.imagen);
    }

    // Soft delete
    await pool.query(
      'UPDATE productos SET estado = FALSE WHERE id = ?',
      [id]
    );

    return { message: 'Producto eliminado exitosamente' };
  }

  // Función auxiliar para eliminar imagen del servidor
  deleteImage(imagePath) {
    try {
      if (imagePath) {
        const fullPath = path.join(process.cwd(), imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          console.log('✅ Imagen eliminada:', imagePath);
        }
      }
    } catch (error) {
      console.error('⚠️  Error al eliminar imagen:', error.message);
    }
  }
}

module.exports = new ProductosService();
