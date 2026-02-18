# Backend - Heladería Ecommerce

Backend completo para sistema de heladería con Node.js + Express + MySQL.

## 🚀 Características Implementadas

### ✅ Fase 1 - Base del Backend
✅ Conexión a MySQL  
✅ Estructura modular profesional  
✅ Configuración de Express  
✅ Manejo global de errores  
✅ Archivos estáticos (imágenes)  

### ✅ Fase 2 - Autenticación y Roles (COMPLETADA)
✅ Sistema de registro  
✅ Login con JWT  
✅ Tokens con expiración de 7 días  
✅ Middleware de autenticación  
✅ Middleware de autorización por roles  
✅ Validación de contraseña (mínimo 6 caracteres)  
✅ Encriptación con bcrypt  
✅ Utilidad `generateToken()`  
✅ Endpoint `/api/auth/me`  

### ✅ Fase 3 - CRUD de Productos
✅ CRUD completo de productos  
✅ Subida de imágenes con Multer  
✅ Reemplazo automático de imágenes  
✅ Eliminación de imágenes al borrar producto  
✅ Protección de rutas (solo ADMIN)  
✅ Validación de tipos de archivo  
✅ Límite de tamaño (5MB)  

## 📁 Estructura del Proyecto

```
heladeria-backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración MySQL
│   ├── controllers/
│   │   ├── auth.controller.js   # Controlador de autenticación
│   │   └── productos.controller.js
│   ├── services/
│   │   ├── auth.service.js      # Lógica de negocio
│   │   └── productos.service.js
│   ├── routes/
│   │   ├── auth.routes.js       # Rutas de autenticación
│   │   └── productos.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js   # Validación JWT
│   │   ├── role.middleware.js   # Validación de rol admin
│   │   └── error.middleware.js  # Manejo de errores
│   ├── utils/
│   │   └── multer.config.js     # Configuración de subida
│   └── app.js                    # Configuración de Express
├── uploads/
│   └── productos/                # Imágenes de productos
├── .env                          # Variables de entorno
├── .gitignore
├── server.js                     # Punto de entrada
└── package.json
```

## ⚙️ Instalación

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Edita el archivo `.env` con tus credenciales de MySQL:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=heladeria_db
JWT_SECRET=tu_clave_secreta_super_segura
```

### 3. Crear la base de datos
Ejecuta el script SQL ubicado en `../script1-18/02.sql` en tu MySQL.

### 4. Iniciar el servidor

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

## 📡 Endpoints de la API

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/profile` | Obtener perfil del usuario | Sí |
| GET | `/api/auth/me` | Obtener usuario autenticado | Sí |

### Productos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/productos` | Listar todos los productos | No |
| GET | `/api/productos/:id` | Obtener producto por ID | No |
| POST | `/api/productos` | Crear producto | Admin |
| PUT | `/api/productos/:id` | Actualizar producto | Admin |
| DELETE | `/api/productos/:id` | Eliminar producto | Admin |

## 🔐 Autenticación

### Registro
```json
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "telefono": "70000000",
  "direccion": "Av. Siempre Viva 123"
}
```

### Login
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "rol": "CLIENTE"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Usar el token
Para rutas protegidas, incluye el token en el header:
```
Authorization: Bearer {token}
```

## 🛍️ Gestión de Productos

### Crear producto (ADMIN)
```bash
POST /api/productos
Authorization: Bearer {token}
Content-Type: multipart/form-data

nombre: Helado de Chocolate
descripcion: Delicioso helado artesanal
precio: 25.50
stock: 100
categoria_id: 1
destacado: true
imagen: [archivo]
```

### Actualizar producto (ADMIN)
```bash
PUT /api/productos/1
Authorization: Bearer {token}
Content-Type: multipart/form-data

nombre: Helado de Vainilla Premium
precio: 30.00
imagen: [archivo nuevo] (opcional)
```

⚠️ **Nota:** Al actualizar con nueva imagen, la imagen anterior se elimina automáticamente.

### Eliminar producto (ADMIN)
```bash
DELETE /api/productos/1
Authorization: Bearer {token}
```

⚠️ **Nota:** Al eliminar, se borra la imagen física del servidor.

## 📸 Acceso a Imágenes

Las imágenes están disponibles públicamente en:
```
http://localhost:3000/uploads/productos/nombre-imagen.jpg
```

## 🔒 Sistema de Roles

- **CLIENTE**: Puede registrarse, hacer login y ver productos
- **ADMIN**: Puede crear, actualizar y eliminar productos

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **Express**: Framework web
- **MySQL2**: Cliente MySQL con soporte para Promises
- **JWT**: Autenticación con tokens
- **bcrypt**: Encriptación de contraseñas
- **Multer**: Subida de archivos
- **dotenv**: Variables de entorno
- **CORS**: Habilitar Cross-Origin Resource Sharing

## 📝 Notas Importantes

1. **Contraseñas:** Mínimo 6 caracteres requeridos
2. **JWT Secret:** Cambia `JWT_SECRET` en producción por una clave segura
3. **Token:** Expira en 7 días (configurable en `.env`)
4. **Imágenes:** Se guardan en `uploads/productos/`
5. **Validación:** Solo imágenes JPEG, JPG, PNG, GIF o WEBP
6. **Tamaño máximo:** 5MB por imagen
7. **Roles:** ADMIN tiene acceso completo, CLIENTE solo lectura

## ✅ Próximos Pasos (Fase 2)

- [ ] Sistema de pedidos
- [ ] Panel de administración
- [ ] Estadísticas
- [ ] Sistema de reseñas
- [ ] Frontend con Angular

---

**Desarrollado con ❤️ para Heladería Deliciosa**
