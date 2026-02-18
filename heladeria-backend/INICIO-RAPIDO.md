# 🚀 Guía de Inicio Rápido

Sigue estos pasos para poner en marcha el backend de la heladería.

## Paso 1: Preparar la Base de Datos

### 1.1 Asegúrate de que MySQL esté corriendo
Si usas Laragon, inicia el servidor MySQL desde el panel de control.

### 1.2 Ejecutar el script de base de datos
1. Abre **phpMyAdmin** o tu cliente MySQL preferido
2. Copia el contenido del archivo `../script1-18/02.sql`
3. Ejecuta el script completo
4. Verifica que se haya creado la base de datos `heladeria_db` con todas sus tablas

## Paso 2: Instalar Dependencias

Abre una terminal en la carpeta `heladeria-backend` y ejecuta:

```bash
npm install
```

Esto instalará:
- express
- mysql2
- dotenv
- jsonwebtoken
- bcrypt
- multer
- cors
- nodemon (dev)

## Paso 3: Configurar Variables de Entorno

El archivo `.env` ya está creado. Verifica que los datos coincidan con tu configuración de MySQL:

```env
PORT=3000
NODE_ENV=development

# Configuración de MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=          # Deja vacío si no tienes contraseña
DB_NAME=heladeria_db
DB_PORT=3306

# Configuración JWT
JWT_SECRET=tu_clave_secreta_super_segura_cambiala_en_produccion
JWT_EXPIRES_IN=24h
```

⚠️ **Importante:** Si tu MySQL tiene contraseña, agrégala en `DB_PASSWORD`.

## Paso 4: Crear Usuario Administrador

El script SQL incluye un usuario admin de ejemplo, pero la contraseña NO está encriptada correctamente.

Tienes dos opciones:

### Opción A: Crear usuario desde la API (Recomendado)
Una vez iniciado el servidor, usa este endpoint:

```json
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "nombre": "Administrador",
  "email": "admin@heladeria.com",
  "password": "admin123",
  "rol": "ADMIN"
}
```

### Opción B: Encriptar contraseña manualmente
Ejecuta este script en Node.js:

```javascript
const bcrypt = require('bcrypt');
bcrypt.hash('admin123', 10).then(hash => console.log(hash));
```

Copia el hash generado y actualízalo en la tabla `usuarios`.

## Paso 5: Iniciar el Servidor

### Modo desarrollo (con auto-reload):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

Si todo está correcto, verás:

```
🔍 Verificando conexión a la base de datos...
✅ Conexión a MySQL exitosa

==============================================
🍦 SERVIDOR DE HELADERÍA INICIADO
==============================================
🚀 Servidor corriendo en: http://localhost:3000
📁 Entorno: development
🗄️  Base de datos: heladeria_db
==============================================
```

## Paso 6: Probar el API

### 6.1 Verificar que el servidor funciona
Abre tu navegador y ve a:
```
http://localhost:3000
```

Deberías ver un JSON con información del API.

### 6.2 Probar con Postman/Thunder Client

#### 1. Registrar un usuario
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@test.com",
  "password": "123456"
}
```

#### 2. Hacer login
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "juan@test.com",
  "password": "123456"
}
```

Guarda el `token` que recibas en la respuesta.

#### 3. Ver tu perfil
```
GET http://localhost:3000/api/auth/profile
Authorization: Bearer {tu_token_aqui}
```

#### 4. Ver productos
```
GET http://localhost:3000/api/productos
```

#### 5. Crear un producto (requiere rol ADMIN)
```
POST http://localhost:3000/api/productos
Authorization: Bearer {token_del_admin}
Content-Type: multipart/form-data

nombre: Helado de Chocolate
descripcion: Delicioso helado artesanal de chocolate belga
precio: 25.50
stock: 50
categoria_id: 1
destacado: true
imagen: [seleccionar archivo]
```

## 📁 Estructura de Carpetas Creada

```
heladeria-backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── productos.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── productos.service.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── productos.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── error.middleware.js
│   ├── utils/
│   │   └── multer.config.js
│   └── app.js
├── uploads/
│   └── productos/              # Las imágenes se guardarán aquí
├── .env
├── .gitignore
├── server.js
├── package.json
└── README.md
```

## ✅ Checklist de Verificación

- [ ] MySQL está corriendo
- [ ] Base de datos `heladeria_db` creada
- [ ] Dependencias instaladas (`node_modules` existe)
- [ ] Variables de `.env` configuradas
- [ ] Servidor inicia sin errores
- [ ] Conexión a MySQL exitosa
- [ ] Puedes registrar usuarios
- [ ] Puedes hacer login
- [ ] Puedes ver productos
- [ ] Usuario admin puede crear productos

## 🐛 Problemas Comunes

### Error: "Cannot find module"
```bash
npm install
```

### Error: "Access denied for user"
- Verifica `DB_USER` y `DB_PASSWORD` en `.env`
- Asegúrate de que el usuario MySQL tenga permisos

### Error: "Unknown database"
- Ejecuta el script SQL para crear la base de datos

### Error: "Port 3000 already in use"
- Cambia el `PORT` en `.env` a otro valor (ej: 3001)
- O mata el proceso que usa el puerto 3000

### Imágenes no se suben
- Verifica que exista la carpeta `uploads/productos/`
- Verifica permisos de escritura en la carpeta

## 🎯 Próximos Pasos

Una vez que el backend esté funcionando:

1. Familiarízate con todos los endpoints
2. Prueba crear, editar y eliminar productos
3. Verifica el reemplazo de imágenes
4. Revisa los archivos de código para entender la estructura
5. Prepárate para la Fase 2 (pedidos, panel, estadísticas)

---

**¿Problemas?** Revisa los logs de la consola donde iniciaste el servidor.
