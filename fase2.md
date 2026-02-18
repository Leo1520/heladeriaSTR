🧱 FASE 2 — Autenticación + Usuarios + Roles

Esta fase convierte tu backend en algo profesional y seguro.

🎯 Objetivo de la Fase 2

Implementar:

🔐 Iniciar sesión

👤 Registro de usuario

🛡️ Sistema de roles (ADMIN / CLIENTE)

🔑 Generación de JWT

🔒Middleware de protección de rutas

🔐 Encriptación con bcrypt

🧩 Lo que vamos a construir
Puntos finales nuevos:
| Método | Ruta                 | Función                  |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Crear usuario            |
| POST   | `/api/auth/login`    | Login                    |
| GET    | `/api/auth/me`       | Obtener usuario logueado |
📁 Estructura que vas a tener
src/
 ├── controllers/
 │    └── auth.controller.js
 │
 ├── routes/
 │    └── auth.routes.js
 │
 ├── middlewares/
 │    └── auth.middleware.js
 │
 ├── utils/
 │    └── generateToken.js
🧠 Lógica que Copilot debe implementar
1️⃣ Registro

Recibe: nombre, email, contraseña

Encriptar contraseña con bcrypt

Guarda usuario en BD con rol CLIENTE por defecto

Devuelve el token JWT

2️⃣ Iniciar sesión

Busca usuario por correo electrónico

Comparar contraseña con bcrypt.compare()

Si es válido → genera JWT

Devuelve usuario + token
3️⃣ Middleware de autenticación

Leer encabezadoAuthorization: Bearer TOKEN

Verificar con jwt.verify()

Adjuntar usuario alreq.user

Si no es válido → 401

4️⃣ Middleware de rol

Para proteger rutas admin   
if (req.user.role !== 'ADMIN') {
   return 403
}
🔐 Seguridad mínima obligatoria

JWT expira en 7 días

Password minimum 6 characters

Email único en base de datos

Manejo correcto de errores

🧪 Pruebas que debes hacer cuando Copilot termine

Registrar usuario nuevo

Loguearte

Copiar token

Probar /api/auth/mecon token en Postman

Probar ruta protegida sin token → debe fallar
📌 Después de la fase 2

Entramos a:

🛍 FASE 3 — Productos + Subida de imágenes

CRUD completo

Multer

Guardar rutas de imágenes

Solo ADMIN puede crear/editar

🚀 Estado actual del proyecto
| Fase             | Estado |
| ---------------- | ------ |
| Arquitectura     | ✅      |
| Base de datos    | ✅      |
| Servidor Express | ✅      |
| Autenticación    | ⏳      |
| Productos        | ⏳      |
| Pedidos          | ⏳      |
| Admin Panel      | ⏳      |
| Frontend Angular | ⏳      |
🧠 CONTEXTO DEL PROYECTO — HELADERÍA ECOMMERCE

Estoy desarrollando un comercio electrónico de una heladería.

Pila del proyecto:

Interfaz:

Angular 17+

TailwindCSS

JWT

RxJS

Backend:

Node.js

Expresar

MySQL

JWT

Bcrypt

Multer (para imágenes en el futuro)

ORM: Prisma o Sequelize (puedes usar Sequelize si no está definido)

Base de datos ya creada en MySQL.

El servidor Express ya está funcionando correctamente en puerto 3000.
Conexión a MySQL funcionando.
Estructura base del proyecto creado.

Ahora necesito implementar el sistema de autenticación completo.

🎯 OBJETIVO DE ESTA FASE

Implementar sistema profesional de:

Registro de usuario

Acceso

JWT

Middleware de autenticación

Middleware de autorización por rol

Punto final para obtener usuario autenticado

Roles del sistema:

ADMINISTRACIÓN

CLIENTE

📁 ESTRUCTURA ESPERADA
src/
├── controladores/
│ └── auth.controller.js
│
├── rutas/
│ └── auth.routes.js
│
├── middlewares/
│ ├── auth.middleware.js
│ └── rol.middleware.js
│
├── utilidades/
│ └── generateToken.js
│
├── modelos/
│ └── usuario.model.js
🗄️ MODELO USUARIO (MYSQL)

La tabla users debe tener:

id (INT AUTO_INCREMENT CLAVE PRIMARIA)

nombre (VARCHAR)

correo electrónico (VARCHAR UNIQUE)

contraseña (VARCHAR)

rol (ENUM: ADMIN, CLIENTE) CLIENTE POR DEFECTO

creado_en (MARCA DE TIEMPO)

actualizado_a las (MARCA DE TIEMPO)
🔐 FUNCIONALIDADES A IMPLEMENTAR
1️⃣ Registro

POST /api/auth/registrarse

Cuerpo:
{
"nombre": "Juan",
"correo electrónico": " juan@email.com
",
"contraseña": "123456"
}

Requisitos:

Validar que el correo electrónico no existe

Encriptar contraseña con bcrypt

Guardar usuario

Rol por defecto: CLIENTE

Generar JWT

Responder:

{
"usuario": { id, nombre, correo electrónico, rol },
"token": "JWT_TOKEN"
}

2️⃣ Iniciar sesión

POST /api/auth/login

Cuerpo:
{
"email": " juan@email.com
",
"contraseña": "123456"
}

Requisitos:

Buscar usuario por correo electrónico

Comparar contraseña con bcrypt.compare

Si es válido generar JWT

Si no → 401

Responder igual que en registro

3️⃣ Usuario del endpoint autenticado

OBTENER /api/auth/me

Encabezado:
Autorización: Portador TOKEN

Debe devolver:
{
id,
nombre,
correo electrónico,
rol
}

🛡️ ARTÍCULOS INTERMEDIOS
auth.middleware.js

Leer encabezado Autorización

Verificar JWT

Adjuntar usuario decodificado a req.user

Si no hay token → 401

rol.middleware.js

Función:
AuthorizeRoles(...roles)

Si req.user.role no está en los roles permitidos → 403

🔑JWT

Usar jsonwebtoken

Guardar JWT_SECRET en .env

Caducidad: 7d

⚠️ REQUISITOS IMPORTANTES

Manejo correcto de errores

Consistentes

Código limpio y modular

No usar devoluciones de llamadas, usar async/await

Validar contraseña mínimo 6 caracteres

No devolver contraseña en respuestas

🧪 TEST QUE DEBE FUNCIONAR

Registrador usuario

Acceso

Copiar token

Acceder a un token /api/auth/me con

Acceder sin token → debe fallar

Proteger una ruta admin usando AuthorizeRoles('ADMIN')

🎯 RESULTADO ESPERADO

Sistema de autenticación listo para:

Proteger rutas de productos

Administrador del panel de Proteger

Escalar el proyecto

Cuando termines:

Mostrar código completo de cada archivo

Explicar cómo probar con Postman

🔥 Fin del aviso.