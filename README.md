CONTEXTO GENERAL DEL PROYECTO

(Primera sesión – Base Backend)

🧊 Proyecto: Heladería Ecommerce

Desarrollar un sistema web tipo ecommerce para una heladería con:

Tienda pública

Panel administrativo

Gestión de pedidos sin pagos digitales

Control de stock

Subida y reemplazo de imágenes

Sistema de roles (ADMIN/CLIENTE)

Diseño responsive y multiplataforma.

La base de datos ya fue creada en:


Base MySQL :heladeria_db

🧱 STACK TECNOLÓGICO DEFINIDO
🖥 Interfaz

Angular 17+

TailwindCSS

JWT

RxJS

Arquitectura modular

🛠 Backend

Node.js

Expresar

JWT

Bcrypt

Multer (subida de imágenes)

ORM: Prisma o Sequelize

Arquitectura limpia por capas

🏗 MODELO DE ARQUITECTURA

Arquitectura Cliente-Servidor:

Angular (Frontend SPA)
        ↓
Express API REST
        ↓
MySQL Database


Separación estricta entre frontend y backend.

🎯 OBJETIVO DE ESTA PRIMERA SESIÓN

Construir la BASE DEL BACKEND funcional:

Inicialización del proyecto

Conexión a MySQL

Configuración de Express

Base de middleware

Autenticación JWT

Sistema de roles

CRUD básico de productos

Subida de imágenes con reemplazo

Estructura profesional de carpetas.

📁 ESTRUCTURA OBLIGATORIA DEL BACKEND
heladeria-backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── models/
│   ├── utils/
│   └── app.js
│
├── uploads/
├── .env
└── server.js
🔐 REGLAS TÉCNICAS OBLIGATORIAS

Todas las contraseñas deben cifrarse con bcrypt.

JWT debe tener expiración.

Middleware para proteger rutas.

Middleware para validar el rol ADMIN.

Manejo centralizado de errores.

Uso de variables de entorno (.env).

Subida de imágenes con Multer.

Eliminación automática de imagen anterior al reemplazar.

No usar código monolítico en un solo archivo.

Código limpio y modular.

📋 TAREAS DETALLADAS – FASE 1 (BASE BACKEND)
🟢 TAREA 1: Inicializar Proyecto Backend

Crear proyecto Node

Instalar dependencias:

expresar

MySQL2

dotenv

token web json

bcrypt

Multer

coros

prisma o secuela

Configurar script dev con nodemon

🟢 TAREA 2: Configuración Inicial

Crear server.js

Crear app.js

Configurar:

express.json()

cors()

rutas base

Puerto configurable por .env

🟢 TAREA 3: Conexión a MySQL

Crear archivo de conexión en/config

Usar variables de entorno

Validar conexión al iniciar servidor

🟢 TAREA 4: Módulo de Autenticación

Crear:

/controllers/auth.controller.js
/routes/auth.routes.js
/services/auth.service.js
/middlewares/auth.middleware.js


Puntos finales:

POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile


Requisitos:

Encriptar contraseña

Generar JWT

Validar token

Extraer usuario desde token

🟢 TAREA 5: Middleware de Roles

Crear middleware:

isAdmin


Debe permitir acceso solo si:

usuario.rol === 'ADMIN'

🟢 TAREA 6: CRUD de Productos

Crear módulo completo:

/controllers/productos.controller.js
/routes/productos.routes.js
/services/productos.service.js


Puntos finales:

GET    /api/productos
GET    /api/productos/:id
POST   /api/productos
PUT    /api/productos/:id
DELETE /api/productos/:id


Reglas:

PUBLICAR, COLOCAR, ELIMINAR → solo ADMIN

Soporte para imagen con Multer

Reemplazo de imagen al actualizar

Eliminación de imagen al borrar producto

🟢 TAREA 7: Configurar Carpeta de Subidas

Crear carpeta/uploads/productos

Servir carpeta estática

URL accesible desde la interfaz

Ejemplo:

http://localhost:3000/uploads/productos/imagen.jpg

🟢 TAREA 8: Manejo Global de Errores

Middleware centralizado

Respuestas estándar JSON

Sin pila expuesta en producción

📦 RESULTADO ESPERADO DE ESTA SESIÓN

Al finalizar esta primera sesión el backend debe:

✔ Conectarse a MySQL
✔ Tener login funcional
✔ Generar JWT
✔ Proteger rutas
✔ Permitir CRUD de productos
✔ Subir imágenes
✔ Reemplazar imágenes correctamente
✔ Eliminar imágenes al borrar producto

🚫 AÚN NO HACER

Pedidos

Panel

Estadísticas

Reseñas

Interfaz angular

Eso será FASE 2.

🧠 Nivel esperado del código

Modular

Escalable

Producción lista

Buen manejo de errores

Buenas prácticas


