INSTRUCCIÓN – FASE 1 BASE TRASERA

🧊 CONTEXTO DEL PROYECTO

Estoy desarrollando un comercio electrónico para una heladería.

La base de datos ya fue creada en:

MySQL
Base de datos:heladeria_db

El backend debe desarrollarse usando:

Node.js

Expresar

JWT

bcrypt

Multer

dotenv

MySQL2

arquitectura modular limpia

No usar código monolítico.

🎯 OBJETIVO DE ESTA FASE

Construir la base completa del backend incluyendo:

Inicialización del proyecto

Conexión a MySQL

Autenticación JWT

Middleware de roles

CRUD completo de productos

Subida y reemplazo de imágenes

Eliminación automática de imágenes antiguas.

Manejo global de errores

Estructura profesional de carpetas.

📁 ESTRUCTURA OBLIGATORIA
heladeria-backend/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── productos.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── productos.routes.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   └── productos.service.js
│   │
│   ├── utils/
│   │   └── multer.config.js
│   │
│   └── app.js
│
├── uploads/
│   └── productos/
│
├── .env
├── server.js
└── package.json
🔐 REGLAS TÉCNICAS OBLIGATORIAS

Todas las contraseñas deben cifrarse con bcrypt.

JWT debe tener expiración.

Middleware para validar token.

El middleware esAdmin para proteger rutas.

Manejo centralizado de errores.

Uso obligatorio de variables de entorno.

Subida de imágenes con multer.

Al actualizar imagen:

eliminar imagen anterior del servidor

guardar nueva imagen

actualizar ruta en BD

Al eliminar el producto:

eliminar imagen física

eliminar registro en BD

Servir carpeta /uploads como estática.

📋 TAREAS A IMPLEMENTAR
🟢 TAREA 1 – Inicialización

Inicializar proyecto Node

Instalar dependencias:

expresar

MySQL2

dotenv

token web json

bcrypt

Multer

coros

nodemon (desarrollador)

Configurar scripts:
"dev": "nodemon server.js"
"start": "node server.js"
🟢 TAREA 2 – Configuración Base

Crear:

servidor.js

aplicación.js

Configurar:

express.json()

cors()

rutas base

middleware de errores

puerto desde .env
🟢 TAREA 3 – Conexión MySQL

Crear archivo:
src/config/database.js
Debe:

Leer variables desde .env

Conectarse usando mysql2

Exportar pool de conexión

Validar conexión al iniciar servidor
🟢 TAREA 4 – Autenticación

Puntos finales:
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
Requisitos:

Encriptar contraseña con bcrypt

Generar JWT con expiración

Middleware para validar token

Obtener usuario desde token
🟢 TAREA 5 – Middleware de Rol

Crear middleware:
isAdmin
Debe verificar:
req.user.rol === 'ADMIN'
🟢 TAREA 6 – CRUD Productos

Puntos finales:
GET    /api/productos
GET    /api/productos/:id
POST   /api/productos        (ADMIN)
PUT    /api/productos/:id    (ADMIN)
DELETE /api/productos/:id    (ADMIN)
Requisitos:

Soporte para imagen con multer

Guardar imagen en:
/uploads/productos
Guardar ruta en BD

Reemplazar imagen al actualizar

Eliminar imagen al borrar producto

Validar existencia antes de modificar
🟢 TAREA 7 – Configurar Multer

Crear:
src/utils/multer.config.js
Debe:

Generar nombre único

Validar tipo imagen

Limitar tamaño

Guardar en subidas/productos
🟢 TAREA 8 – Manejo Global de Errores

Crear:
error.middleware.js
Debe:

Capturar errores

Retornar JSON estándar

Sin pila expuesta en producción
📦 RESULTADO FINAL ESPERADO

Al terminar esta fase:

✔ Backend funcional
✔ Iniciar sesión con JWT
✔ Protección de rutas
✔ Productos CRUD funcionales
✔ Subida de imágenes
✔ Reemplazo automático
✔ Eliminación correcta
✔ Estructura profesional
🚫 NO IMPLEMENTAR AÚN

Pedidos

Stock automático

Panel

Estadísticas

Reseñas

Interfaz angular

Eso será FASE 2.
🎯 INSTRUCCIÓN FINAL

Implementar exactamente esta arquitectura sin simplificar estructura ni mezclar responsabilidades.