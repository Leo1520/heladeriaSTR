-- ============================================
-- CREAR BASE DE DATOS
-- ============================================

DROP DATABASE IF EXISTS heladeria_db;
CREATE DATABASE heladeria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE heladeria_db;

-- ============================================
-- TABLA: usuarios
-- ============================================

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    rol ENUM('ADMIN','CLIENTE') DEFAULT 'CLIENTE',
    estado BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: categorias
-- ============================================

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: productos
-- ============================================

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    imagen VARCHAR(255),
    categoria_id INT,
    estado BOOLEAN DEFAULT TRUE,
    destacado BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- ============================================
-- TABLA: pedidos
-- ============================================

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    estado ENUM(
        'PENDIENTE',
        'CONFIRMADO',
        'PREPARANDO',
        'LISTO',
        'ENTREGADO',
        'CANCELADO'
    ) DEFAULT 'PENDIENTE',
    metodo_entrega ENUM('RETIRO','DELIVERY') DEFAULT 'RETIRO',
    direccion_entrega TEXT,
    telefono_contacto VARCHAR(20),
    notas TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- ============================================
-- TABLA: detalle_pedido
-- ============================================

CREATE TABLE detalle_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ============================================
-- TABLA: movimientos_stock
-- ============================================

CREATE TABLE movimientos_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    tipo ENUM('ENTRADA','SALIDA') NOT NULL,
    cantidad INT NOT NULL,
    motivo VARCHAR(150),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ============================================
-- TABLA: configuracion
-- ============================================

CREATE TABLE configuracion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tienda VARCHAR(150),
    telefono VARCHAR(20),
    direccion TEXT,
    horario VARCHAR(150),
    mensaje_bienvenida TEXT,
    logo VARCHAR(255)
);

-- ============================================
-- TABLA: resenas
-- ============================================

CREATE TABLE resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    producto_id INT,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ============================================

CREATE INDEX idx_producto_categoria ON productos(categoria_id);
CREATE INDEX idx_pedido_usuario ON pedidos(usuario_id);
CREATE INDEX idx_detalle_pedido ON detalle_pedido(pedido_id);
CREATE INDEX idx_mov_stock_producto ON movimientos_stock(producto_id);

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Usuario administrador
-- contraseña ejemplo: admin123 (DEBES encriptarla con bcrypt en producción)
INSERT INTO usuarios (nombre, email, password, rol)
VALUES ('Administrador', 'admin@heladeria.com', '$2b$10$abcdefghijklmnopqrstuv', 'ADMIN');

-- Categorías iniciales
INSERT INTO categorias (nombre, descripcion) VALUES
('Helados Tradicionales', 'Sabores clásicos y artesanales'),
('Açaí', 'Bowls naturales energéticos'),
('Batidos', 'Bebidas frías y refrescantes'),
('Promociones', 'Ofertas especiales del día');

-- Configuración inicial
INSERT INTO configuracion (nombre_tienda, telefono, direccion, horario, mensaje_bienvenida)
VALUES (
'Heladería Deliciosa',
'70000000',
'Av. Principal #123',
'Lunes a Domingo 9:00 - 22:00',
'¡Bienvenido a la mejor heladería artesanal!'
);

-- ============================================
-- FIN DEL SCRIPT
-- ============================================
