const errorMiddleware = (err, req, res, next) => {
  console.error('❌ Error:', err);

  // Error de validación
  if (err.message.includes('ya está registrado') || 
      err.message.includes('Credenciales inválidas') ||
      err.message.includes('no encontrado')) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Error de Multer
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'El archivo es demasiado grande. Máximo 5MB'
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Error al subir archivo: ' + err.message
    });
  }

  // Error personalizado de Multer (filtro)
  if (err.message.includes('Solo se permiten imágenes')) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Error de MySQL
  if (err.code && err.code.startsWith('ER_')) {
    return res.status(500).json({
      success: false,
      message: 'Error de base de datos',
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }

  // Error genérico
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorMiddleware;
