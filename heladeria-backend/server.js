require('dotenv').config();
const app = require('./src/app');
const { testConnection } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Verificar conexión a la base de datos
    console.log('🔍 Verificando conexión a la base de datos...');
    const dbConnected = await testConnection();

    if (!dbConnected) {
      console.error('❌ No se pudo conectar a la base de datos. Verifica tu configuración en .env');
      process.exit(1);
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log('\n==============================================');
      console.log('🍦 SERVIDOR DE HELADERÍA INICIADO');
      console.log('==============================================');
      console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
      console.log(`📁 Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🗄️  Base de datos: ${process.env.DB_NAME}`);
      console.log('==============================================\n');
      console.log('📍 Endpoints disponibles:');
      console.log(`   - GET    http://localhost:${PORT}/`);
      console.log(`   - POST   http://localhost:${PORT}/api/auth/register`);
      console.log(`   - POST   http://localhost:${PORT}/api/auth/login`);
      console.log(`   - GET    http://localhost:${PORT}/api/auth/profile`);
      console.log(`   - GET    http://localhost:${PORT}/api/auth/me`);
      console.log(`   - GET    http://localhost:${PORT}/api/productos`);
      console.log(`   - GET    http://localhost:${PORT}/api/productos/:id`);
      console.log(`   - POST   http://localhost:${PORT}/api/productos (ADMIN)`);
      console.log(`   - PUT    http://localhost:${PORT}/api/productos/:id (ADMIN)`);
      console.log(`   - DELETE http://localhost:${PORT}/api/productos/:id (ADMIN)`);
      console.log('==============================================\n');
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Iniciar servidor
startServer();
