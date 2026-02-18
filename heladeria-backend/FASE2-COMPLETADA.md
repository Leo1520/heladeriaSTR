# ✅ FASE 2 COMPLETADA - Autenticación y Roles

## 🎯 Resumen de Implementación

La Fase 2 está completamente implementada con todas las características solicitadas:

✅ Sistema de registro de usuarios  
✅ Sistema de login con JWT  
✅ Validación y encriptación con bcrypt  
✅ Middleware de autenticación  
✅ Middleware de autorización por roles  
✅ Endpoint para obtener usuario autenticado  
✅ Tokens JWT con expiración de 7 días  
✅ Validación de contraseña mínima (6 caracteres)  
✅ Arquitectura modular y profesional  

---

## 📁 Archivos Creados/Modificados

### ✨ Nuevos Archivos
- `src/utils/generateToken.js` - Utilidad para generar JWT

### 🔧 Archivos Modificados
- `src/services/auth.service.js` - Lógica de autenticación mejorada
- `src/controllers/auth.controller.js` - Validaciones adicionales
- `src/routes/auth.routes.js` - Nuevo endpoint `/me`
- `src/middlewares/role.middleware.js` - Función `authorizeRoles()`
- `src/middlewares/error.middleware.js` - Manejo de nuevos errores
- `.env` - JWT expira en 7 días

---

## 🔐 Endpoints de Autenticación

### 1️⃣ Registro de Usuario

**POST** `/api/auth/register`

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@test.com",
  "password": "123456"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": 2,
      "nombre": "Juan Pérez",
      "email": "juan@test.com",
      "rol": "CLIENTE"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validaciones:**
- ✅ Nombre requerido
- ✅ Email único (no puede duplicarse)
- ✅ Contraseña mínima de 6 caracteres
- ✅ Rol por defecto: CLIENTE
- ✅ Contraseña encriptada con bcrypt
- ✅ Devuelve token JWT automáticamente

---

### 2️⃣ Login

**POST** `/api/auth/login`

**Body:**
```json
{
  "email": "juan@test.com",
  "password": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": 2,
      "nombre": "Juan Pérez",
      "email": "juan@test.com",
      "rol": "CLIENTE"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validaciones:**
- ✅ Email y contraseña requeridos
- ✅ Verifica usuario existe
- ✅ Verifica usuario activo
- ✅ Compara contraseña con bcrypt.compare()
- ✅ Genera nuevo token JWT

---

### 3️⃣ Obtener Usuario Autenticado

**GET** `/api/auth/me` o `/api/auth/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "nombre": "Juan Pérez",
    "email": "juan@test.com",
    "telefono": null,
    "direccion": null,
    "rol": "CLIENTE",
    "fecha_creacion": "2026-02-18T12:00:00.000Z"
  }
}
```

**Validaciones:**
- ✅ Requiere token válido
- ✅ Token no expirado
- ✅ Usuario debe estar activo
- ✅ No devuelve contraseña

---

## 🛡️ Middlewares

### 1. Middleware de Autenticación (`auth.middleware.js`)

```javascript
// Uso en rutas
router.get('/perfil', authMiddleware, controller.getPerfil);
```

**Funcionalidad:**
- Lee el header `Authorization: Bearer {token}`
- Verifica el token con `jwt.verify()`
- Decodifica y adjunta usuario a `req.user`
- Si no hay token → 401
- Si token inválido → 401
- Si token expirado → 401

---

### 2. Middleware de Roles (`role.middleware.js`)

#### Opción A: Solo Admin
```javascript
// Solo ADMIN puede acceder
router.post('/productos', authMiddleware, isAdmin, controller.crear);
```

#### Opción B: Múltiples Roles
```javascript
const { authorizeRoles } = require('../middlewares/role.middleware');

// ADMIN o CLIENTE pueden acceder
router.get('/pedidos', authMiddleware, authorizeRoles('ADMIN', 'CLIENTE'), controller.listar);

// Solo ADMIN
router.delete('/usuarios/:id', authMiddleware, authorizeRoles('ADMIN'), controller.eliminar);
```

**Funcionalidad:**
- Verifica que `req.user` exista (usuario autenticado)
- Compara `req.user.rol` con los roles permitidos
- Si no autorizado → 403

---

## 🔑 Utilidad de Token (`generateToken.js`)

```javascript
const generateToken = require('../utils/generateToken');

const user = {
  id: 1,
  email: 'admin@heladeria.com',
  rol: 'ADMIN'
};

const token = generateToken(user);
// Token válido por 7 días
```

**Características:**
- ✅ Encapsula lógica de JWT
- ✅ Expiración configurable desde `.env`
- ✅ Por defecto: 7 días
- ✅ Reutilizable en toda la aplicación

---

## 🧪 Pruebas con Postman

### Flujo Completo de Prueba

#### Test 1: Registrar Usuario
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "nombre": "María García",
  "email": "maria@test.com",
  "password": "123456"
}
```

Guarda el `token` de la respuesta.

---

#### Test 2: Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "maria@test.com",
  "password": "123456"
}
```

---

#### Test 3: Ver Perfil (con token)
```http
GET http://localhost:3000/api/auth/me
Authorization: Bearer {tu_token_aqui}
```

✅ Debe devolver tu información de usuario

---

#### Test 4: Ver Perfil (sin token)
```http
GET http://localhost:3000/api/auth/me
```

❌ Debe devolver error 401:
```json
{
  "success": false,
  "message": "Token no proporcionado"
}
```

---

#### Test 5: Registrar Admin
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "nombre": "Administrador",
  "email": "admin@heladeria.com",
  "password": "admin123",
  "rol": "ADMIN"
}
```

---

#### Test 6: Crear Producto (como ADMIN)
```http
POST http://localhost:3000/api/productos
Authorization: Bearer {token_del_admin}
Content-Type: multipart/form-data

nombre: Helado de Chocolate
precio: 25.00
stock: 50
categoria_id: 1
```

✅ Debe funcionar (ADMIN tiene permisos)

---

#### Test 7: Crear Producto (como CLIENTE)
```http
POST http://localhost:3000/api/productos
Authorization: Bearer {token_del_cliente}
Content-Type: multipart/form-data

nombre: Helado de Vainilla
precio: 20.00
```

❌ Debe devolver error 403:
```json
{
  "success": false,
  "message": "Acceso denegado. Se requieren permisos de administrador"
}
```

---

## 🚨 Validaciones y Errores

### Error 400 - Contraseña muy corta
```json
{
  "success": false,
  "message": "La contraseña debe tener al menos 6 caracteres"
}
```

### Error 400 - Email duplicado
```json
{
  "success": false,
  "message": "El email ya está registrado"
}
```

### Error 400 - Credenciales inválidas
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

### Error 401 - Sin token
```json
{
  "success": false,
  "message": "Token no proporcionado"
}
```

### Error 401 - Token inválido
```json
{
  "success": false,
  "message": "Token inválido"
}
```

### Error 401 - Token expirado
```json
{
  "success": false,
  "message": "Token expirado"
}
```

### Error 403 - Sin permisos
```json
{
  "success": false,
  "message": "Acceso denegado. Se requieren permisos de administrador"
}
```

---

## 🔒 Seguridad Implementada

✅ **Encriptación:** bcrypt con salt de 10 rounds  
✅ **JWT:** Firmado con clave secreta  
✅ **Expiración:** Tokens expiran en 7 días  
✅ **Validación:** Contraseña mínima 6 caracteres  
✅ **Protección:** Middleware valida autenticación  
✅ **Autorización:** Sistema de roles funcional  
✅ **Email único:** No permite emails duplicados  
✅ **No expone contraseñas:** Nunca en respuestas  

---

## 📊 Variables de Entorno

```env
# JWT
JWT_SECRET=tu_clave_secreta_super_segura_cambiala_en_produccion
JWT_EXPIRES_IN=7d
```

⚠️ **IMPORTANTE:** Cambia `JWT_SECRET` en producción por una clave aleatoria y segura.

---

## 🎓 Código de Referencia

### Estructura del Token JWT

```javascript
{
  "id": 2,
  "email": "juan@test.com",
  "rol": "CLIENTE",
  "iat": 1708254000,  // Issued at
  "exp": 1708858800   // Expira en 7 días
}
```

### Objeto `req.user` en Rutas Protegidas

Después de pasar por `authMiddleware`, tendrás acceso a:

```javascript
req.user = {
  id: 2,
  email: "juan@test.com",
  rol: "CLIENTE"
}
```

---

## ✅ Checklist Fase 2

- [x] Registro de usuarios
- [x] Login con JWT
- [x] Encriptación con bcrypt
- [x] Middleware de autenticación
- [x] Middleware de autorización por roles
- [x] Endpoint `/api/auth/me`
- [x] Utilidad `generateToken()`
- [x] Validación contraseña mínima 6 caracteres
- [x] Email único
- [x] Rol por defecto CLIENTE
- [x] Token expira en 7 días
- [x] Manejo de errores completo
- [x] Código limpio y modular

---

## 🚀 Próximos Pasos

La **Fase 2 está COMPLETA**. Ahora puedes:

1. ✅ Probar todos los endpoints con Postman
2. ✅ Verificar que las validaciones funcionan
3. ✅ Continuar con **Fase 3** (si hay más funcionalidades)
4. ✅ Integrar con el frontend Angular

---

**🎉 ¡Fase 2 completada exitosamente!**
