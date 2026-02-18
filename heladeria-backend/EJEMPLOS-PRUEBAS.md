# 🧪 Ejemplos de Pruebas - Heladería API

Esta guía contiene ejemplos detallados para probar todos los endpoints del backend.

## 📋 Información General

- **Base URL:** `http://localhost:3000`
- **Content-Type:** `application/json` (excepto subida de archivos)
- **Autenticación:** Header `Authorization: Bearer {token}`

---

## 1️⃣ AUTENTICACIÓN

### 1.1 Registrar Usuario

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "nombre": "María García",
  "email": "maria@test.com",
  "password": "123456",
  "telefono": "70123456",
  "direccion": "Av. América #456"
}
```

**Response exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": 2,
    "nombre": "María García",
    "email": "maria@test.com",
    "rol": "CLIENTE"
  }
}
```

---

### 1.2 Registrar Administrador

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "nombre": "Admin Principal",
  "email": "admin@heladeria.com",
  "password": "admin123",
  "rol": "ADMIN"
}
```

**Response exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Admin Principal",
    "email": "admin@heladeria.com",
    "rol": "ADMIN"
  }
}
```

---

### 1.3 Iniciar Sesión

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "admin@heladeria.com",
  "password": "admin123"
}
```

**Response exitosa (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwi...",
    "user": {
      "id": 1,
      "nombre": "Admin Principal",
      "email": "admin@heladeria.com",
      "rol": "ADMIN"
    }
  }
}
```

⚠️ **Importante:** Guarda el `token` para usarlo en las siguientes peticiones.

---

### 1.4 Obtener Perfil

**Endpoint:** `GET /api/auth/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Admin Principal",
    "email": "admin@heladeria.com",
    "telefono": null,
    "direccion": null,
    "rol": "ADMIN",
    "fecha_creacion": "2026-02-18T10:30:00.000Z"
  }
}
```

---

## 2️⃣ PRODUCTOS (Público)

### 2.1 Listar Todos los Productos

**Endpoint:** `GET /api/productos`

**No requiere autenticación**

**Response exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Helado de Chocolate",
      "descripcion": "Delicioso helado artesanal de chocolate belga",
      "precio": "25.50",
      "stock": 50,
      "imagen": "uploads/productos/chocolate-1708254123456.jpg",
      "estado": true,
      "destacado": true,
      "categoria_id": 1,
      "categoria_nombre": "Helados Tradicionales",
      "fecha_creacion": "2026-02-18T10:30:00.000Z",
      "fecha_actualizacion": "2026-02-18T10:30:00.000Z"
    }
  ]
}
```

---

### 2.2 Obtener Producto por ID

**Endpoint:** `GET /api/productos/1`

**No requiere autenticación**

**Response exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Helado de Chocolate",
    "descripcion": "Delicioso helado artesanal de chocolate belga",
    "precio": "25.50",
    "stock": 50,
    "imagen": "uploads/productos/chocolate-1708254123456.jpg",
    "estado": true,
    "destacado": true,
    "categoria_id": 1,
    "categoria_nombre": "Helados Tradicionales",
    "fecha_creacion": "2026-02-18T10:30:00.000Z",
    "fecha_actualizacion": "2026-02-18T10:30:00.000Z"
  }
}
```

---

## 3️⃣ PRODUCTOS (ADMIN)

### 3.1 Crear Producto

**Endpoint:** `POST /api/productos`

**Headers:**
```
Authorization: Bearer {token_admin}
Content-Type: multipart/form-data
```

**Form Data:**
```
nombre: Helado de Vainilla
descripcion: Helado cremoso de vainilla premium
precio: 22.00
stock: 100
categoria_id: 1
destacado: false
imagen: [archivo de imagen]
```

**Response exitosa (201):**
```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {
    "id": 2,
    "nombre": "Helado de Vainilla",
    "descripcion": "Helado cremoso de vainilla premium",
    "precio": "22.00",
    "stock": 100,
    "imagen": "uploads/productos/vainilla-1708254567890.jpg",
    "estado": true,
    "destacado": false,
    "categoria_id": 1,
    "categoria_nombre": "Helados Tradicionales",
    "fecha_creacion": "2026-02-18T11:00:00.000Z",
    "fecha_actualizacion": "2026-02-18T11:00:00.000Z"
  }
}
```

---

### 3.2 Actualizar Producto (sin cambiar imagen)

**Endpoint:** `PUT /api/productos/2`

**Headers:**
```
Authorization: Bearer {token_admin}
Content-Type: multipart/form-data
```

**Form Data:**
```
nombre: Helado de Vainilla Premium
precio: 28.00
stock: 80
destacado: true
```

**Response exitosa (200):**
```json
{
  "success": true,
  "message": "Producto actualizado exitosamente",
  "data": {
    "id": 2,
    "nombre": "Helado de Vainilla Premium",
    "descripcion": "Helado cremoso de vainilla premium",
    "precio": "28.00",
    "stock": 80,
    "imagen": "uploads/productos/vainilla-1708254567890.jpg",
    "estado": true,
    "destacado": true,
    "categoria_id": 1,
    "categoria_nombre": "Helados Tradicionales",
    "fecha_creacion": "2026-02-18T11:00:00.000Z",
    "fecha_actualizacion": "2026-02-18T11:30:00.000Z"
  }
}
```

---

### 3.3 Actualizar Producto (cambiando imagen)

**Endpoint:** `PUT /api/productos/2`

**Headers:**
```
Authorization: Bearer {token_admin}
Content-Type: multipart/form-data
```

**Form Data:**
```
imagen: [nueva imagen]
```

⚠️ **Nota:** La imagen anterior se eliminará automáticamente del servidor.

**Response exitosa (200):**
```json
{
  "success": true,
  "message": "Producto actualizado exitosamente",
  "data": {
    "id": 2,
    "nombre": "Helado de Vainilla Premium",
    "imagen": "uploads/productos/vainilla-nueva-1708254999999.jpg",
    ...
  }
}
```

---

### 3.4 Eliminar Producto

**Endpoint:** `DELETE /api/productos/2`

**Headers:**
```
Authorization: Bearer {token_admin}
```

⚠️ **Nota:** 
- Se hace un "soft delete" (marca como inactivo)
- La imagen se elimina físicamente del servidor

**Response exitosa (200):**
```json
{
  "success": true,
  "message": "Producto eliminado exitosamente"
}
```

---

## 🔐 Ejemplos de Errores

### Error 400 - Email duplicado
```json
{
  "success": false,
  "message": "El email ya está registrado"
}
```

### Error 401 - No autenticado
```json
{
  "success": false,
  "message": "Token no proporcionado"
}
```

### Error 403 - No autorizado (no es admin)
```json
{
  "success": false,
  "message": "Acceso denegado. Se requieren permisos de administrador"
}
```

### Error 404 - Producto no encontrado
```json
{
  "success": false,
  "message": "Producto no encontrado"
}
```

### Error 400 - Archivo no válido
```json
{
  "success": false,
  "message": "Solo se permiten imágenes (jpeg, jpg, png, gif, webp)"
}
```

### Error 400 - Archivo muy grande
```json
{
  "success": false,
  "message": "El archivo es demasiado grande. Máximo 5MB"
}
```

---

## 📥 Importar en Postman

Puedes crear una colección con estos endpoints:

### Variables de Entorno
```
base_url: http://localhost:3000
token: (se guardará después del login)
```

### Script Post-Request para Login
En el endpoint de LOGIN, agrega este script:

```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("token", response.data.token);
}
```

Así el token se guardará automáticamente.

---

## 🧪 Casos de Prueba Sugeridos

### Test 1: Flujo Completo de Usuario
1. ✅ Registrar usuario
2. ✅ Login
3. ✅ Ver perfil
4. ✅ Listar productos
5. ✅ Ver detalle de un producto
6. ❌ Intentar crear producto (debe fallar, no es admin)

### Test 2: Flujo Completo de Admin
1. ✅ Registrar admin
2. ✅ Login admin
3. ✅ Crear producto con imagen
4. ✅ Actualizar producto (sin imagen)
5. ✅ Actualizar producto (con nueva imagen)
6. ✅ Eliminar producto
7. ✅ Verificar que la imagen fue eliminada

### Test 3: Validaciones
1. ❌ Registrar con email duplicado
2. ❌ Login con contraseña incorrecta
3. ❌ Acceder a perfil sin token
4. ❌ Acceder a perfil con token inválido
5. ❌ Crear producto sin ser admin
6. ❌ Subir archivo que no es imagen
7. ❌ Subir imagen muy grande (>5MB)

---

## 🌐 Acceso a Imágenes

Las imágenes se pueden acceder directamente desde el navegador:

```
http://localhost:3000/uploads/productos/nombre-imagen-123456.jpg
```

Puedes usar esta URL en tu frontend para mostrar las imágenes.

---

**¡Listo para probar!** 🚀
