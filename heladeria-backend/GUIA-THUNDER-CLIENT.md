# 🌩️ Guía Paso a Paso - Thunder Client

Thunder Client es una extensión de VS Code para probar APIs REST. Es similar a Postman pero más simple y está integrado en VS Code.

---

## 📦 Paso 1: Instalar Thunder Client

### Opción A: Desde VS Code
1. Abre **VS Code**
2. Presiona `Ctrl + Shift + X` (abre el panel de extensiones)
3. Busca: **Thunder Client**
4. Haz clic en **Install** (Instalar)
5. Espera a que se instale

### Opción B: Desde el menú
1. En VS Code, ve al menú lateral izquierdo
2. Haz clic en el ícono de extensiones (cuadrados apilados)
3. Busca: **Thunder Client**
4. Instala

---

## ⚡ Paso 2: Abrir Thunder Client

Después de instalar, verás un ícono de **rayo** ⚡ en la barra lateral izquierda de VS Code.

1. Haz clic en el ícono del **rayo** ⚡
2. Se abrirá el panel de Thunder Client

---

## 🧪 Paso 3: Crear tu Primera Petición

### Prueba 1: Registrar un Usuario

#### 3.1 Crear Nueva Petición
1. En Thunder Client, haz clic en **New Request** (Solicitud nueva)
2. Verás una pantalla con campos para configurar la petición

#### 3.2 Configurar la Petición
En la parte superior, configura:

**Método:** Cambia de `GET` a `POST`
- Haz clic en el dropdown que dice `GET`
- Selecciona `POST`

**URL:** 
```
http://localhost:3000/api/auth/register
```

#### 3.3 Configurar el Body
1. Debajo de la URL, verás pestañas: **Headers**, **Body**, **Query**, etc.
2. Haz clic en la pestaña **Body**
3. Selecciona el formato **JSON**
4. En el área de texto, pega esto:

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@test.com",
  "password": "123456"
}
```

#### 3.4 Enviar la Petición
1. Haz clic en el botón morado **Send** (Enviar)
2. Espera 1-2 segundos
3. ¡Verás la respuesta abajo! ✅

**Respuesta esperada:**
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

#### 3.5 Guardar la Petición (Opcional)
1. Haz clic en **Save** (arriba a la derecha)
2. Dale un nombre: `Registrar Usuario`
3. Se guardará en "Collections" para usarla después

---

### Prueba 2: Hacer Login

#### 2.1 Nueva Petición
1. Haz clic en **New Request**

#### 2.2 Configurar
**Método:** `POST`
**URL:**
```
http://localhost:3000/api/auth/login
```

#### 2.3 Body (JSON)
```json
{
  "email": "juan@test.com",
  "password": "123456"
}
```

#### 2.4 Enviar
1. Clic en **Send**
2. Verás la respuesta con el usuario y token

#### 2.5 IMPORTANTE: Copiar el Token
1. En la respuesta, busca el campo `"token"`
2. Copia TODO el texto del token (sin las comillas)
3. **Guárdalo**, lo necesitarás para el siguiente paso

Ejemplo de token:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ikp1YW4gUMOp...
```

---

### Prueba 3: Ver Perfil (Requiere Token)

#### 3.1 Nueva Petición
1. Clic en **New Request**

#### 3.2 Configurar
**Método:** `GET`
**URL:**
```
http://localhost:3000/api/auth/me
```

#### 3.3 Agregar el Token (IMPORTANTE)
1. Haz clic en la pestaña **Headers**
2. En la primera fila:
   - **Header:** escribe: `Authorization`
   - **Value:** escribe: `Bearer ` (con espacio) + pega tu token

   Debe quedar así:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

#### 3.4 Enviar
1. Clic en **Send**
2. ✅ Deberías ver tu información de usuario

**Respuesta esperada:**
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
    "fecha_creacion": "2026-02-18T..."
  }
}
```

---

### Prueba 4: Ver Productos (Sin Token)

#### 4.1 Nueva Petición
**Método:** `GET`
**URL:**
```
http://localhost:3000/api/productos
```

#### 4.2 Enviar
- Solo clic en **Send** (no necesita token)
- Verás la lista de productos (probablemente vacía por ahora)

---

### Prueba 5: Crear Producto (Solo ADMIN)

#### 5.1 Primero Registra un ADMIN
**Método:** `POST`
**URL:** `http://localhost:3000/api/auth/register`
**Body:**
```json
{
  "nombre": "Administrador",
  "email": "admin@heladeria.com",
  "password": "admin123",
  "rol": "ADMIN"
}
```

**Clic en Send** y copia el token que te devuelva.

#### 5.2 Crear Producto
**Método:** `POST`
**URL:**
```
http://localhost:3000/api/productos
```

**Headers:**
```
Authorization: Bearer {token_del_admin}
```

**Body:** Cambia a **Form**
1. En Thunder Client, bajo la URL, haz clic en **Body**
2. Selecciona **Form** (en lugar de JSON)
3. Agrega estos campos:

| Key | Value |
|-----|-------|
| nombre | Helado de Chocolate |
| descripcion | Delicioso helado artesanal |
| precio | 25.50 |
| stock | 100 |
| categoria_id | 1 |
| destacado | true |

#### 5.3 OPCIONAL: Agregar Imagen
1. Agrega una fila más
2. En **Key** escribe: `imagen`
3. Cambia el tipo de **Text** a **File**
4. Haz clic en **Choose File** y selecciona una imagen de tu PC

#### 5.4 Enviar
- Clic en **Send**
- ✅ Producto creado!

---

## 📚 Resumen de Métodos HTTP

| Método | Cuándo Usar |
|--------|-------------|
| **GET** | Ver/Obtener información (productos, perfil) |
| **POST** | Crear algo nuevo (registrar, login, crear producto) |
| **PUT** | Actualizar información existente |
| **DELETE** | Eliminar algo |

---

## 🔑 Resumen de Headers

### Para peticiones con JSON
**Header:** `Content-Type`
**Value:** `application/json`

(Thunder Client lo agrega automáticamente cuando seleccionas JSON en Body)

### Para peticiones autenticadas
**Header:** `Authorization`
**Value:** `Bearer {tu_token_aqui}`

---

## 💡 Consejos

1. **Guarda tus peticiones:** Usa el botón **Save** para crear una colección y no tener que escribir todo de nuevo

2. **Variables de entorno:** Puedes crear variables para no escribir `http://localhost:3000` cada vez:
   - Clic en **Env** (arriba)
   - New Environment
   - Agrega: `base_url` = `http://localhost:3000`
   - Usa en URL: `{{base_url}}/api/auth/register`

3. **Colores de respuesta:**
   - Verde (200-299) = ✅ Éxito
   - Amarillo (400-499) = ⚠️ Error del cliente
   - Rojo (500-599) = ❌ Error del servidor

4. **Ver el código de estado:**
   - Busca el número en la respuesta (200, 201, 400, 401, 403, etc.)
   - Indica si funcionó o qué tipo de error ocurrió

---

## 🎯 Orden Recomendado de Pruebas

1. ✅ Registrar usuario normal
2. ✅ Login con ese usuario
3. ✅ Ver perfil con `/me` (usa el token)
4. ✅ Ver productos (sin token)
5. ✅ Registrar usuario ADMIN
6. ✅ Login como ADMIN (guarda token)
7. ✅ Crear producto (con token de admin)
8. ✅ Actualizar producto (con token de admin)
9. ✅ Eliminar producto (con token de admin)

---

## ❓ Preguntas Frecuentes

### ¿Por qué me da error 401?
- No incluiste el token
- El token es inválido
- El token expiró (dura 7 días)

### ¿Por qué me da error 403?
- Tu usuario no tiene permisos
- Probablemente intentas hacer algo de ADMIN siendo CLIENTE

### ¿Por qué me da error 400?
- Faltan campos requeridos
- Email duplicado
- Contraseña muy corta (< 6 caracteres)

### ¿Cómo saber si mi servidor está corriendo?
Haz una petición GET a:
```
http://localhost:3000/
```

Deberías ver:
```json
{
  "success": true,
  "message": "🍦 API Heladería - Backend funcionando correctamente"
}
```

---

## 🚀 ¡Listo para Probar!

Ahora ya sabes usar Thunder Client. Empieza con las pruebas básicas y ve avanzando.

**¿Problemas?** Revisa:
1. Que el servidor esté corriendo (`npm run dev`)
2. Que estés usando la URL correcta
3. Que hayas copiado bien el token (sin espacios extras)

---

**¡Éxito! 🎉**
