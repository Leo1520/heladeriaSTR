/**
 * Middleware para verificar que el usuario tenga rol de ADMIN
 */
const isAdmin = (req, res, next) => {
  try {
    // Verificar que el usuario esté autenticado
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No autenticado'
      });
    }

    // Verificar que sea administrador
    if (req.user.rol !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado. Se requieren permisos de administrador'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al verificar permisos'
    });
  }
};

/**
 * Middleware flexible para autorizar múltiples roles
 * Uso: authorizeRoles('ADMIN', 'CLIENTE')
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      // Verificar que el usuario esté autenticado
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'No autenticado'
        });
      }

      // Verificar que el rol del usuario esté en los roles permitidos
      if (!roles.includes(req.user.rol)) {
        return res.status(403).json({
          success: false,
          message: `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(', ')}`
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar permisos'
      });
    }
  };
};

module.exports = isAdmin;
module.exports.isAdmin = isAdmin;
module.exports.authorizeRoles = authorizeRoles;
