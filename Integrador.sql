CREATE DATABASE sis_agricultura;
USE sis_agricultura;

CREATE TABLE usuario (
    pk_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    apellido VARCHAR(200),
    email VARCHAR(200) NOT NULL UNIQUE,
    contraseña VARCHAR(50) NOT NULL,
    avatar VARCHAR(255) NOT NULL
);

CREATE TABLE cultivo (
    pk_cultivo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_cultivo VARCHAR(100) NOT NULL,
    tipo_cultivo VARCHAR(100) NOT NULL,
    fecha_plantacion DATE NOT NULL
);

CREATE TABLE tipo_suelo (
    pk_tipo_suelo VARCHAR(200) PRIMARY KEY
);

CREATE TABLE calidad (
    pk_tipo_calidad VARCHAR(50) PRIMARY KEY
);

CREATE TABLE cantidad (
    pk_tipo_cantidad VARCHAR(20) PRIMARY KEY
);

CREATE TABLE sembrio (
    pk_sembrio INT PRIMARY KEY AUTO_INCREMENT,
    fk_cultivo INT NOT NULL,
    fk_usuario INT NOT NULL,
    fk_tipo_suelo VARCHAR(200) NOT NULL,
    semilla VARCHAR(50) NOT NULL,
    tipo_sembrio VARCHAR(50) NOT NULL,
    fecha_sembrio DATE NOT NULL
);

CREATE TABLE registro_fertilizacion (
    pk_fertilizacion INT PRIMARY KEY AUTO_INCREMENT,
    fk_sembrio INT NOT NULL,
    fecha_fertilizacion DATE NOT NULL,
    tipo_fertilizante VARCHAR(100) NOT NULL
);

CREATE TABLE cosecha (
    pk_cosecha INT PRIMARY KEY AUTO_INCREMENT,
    fk_sembrio INT NOT NULL,
    fecha_cosecha DATE NOT NULL,
    fk_tipo_calidad VARCHAR(50) NOT NULL,
    fk_tipo_cantidad VARCHAR(20) NOT NULL,
    cantidad_valor DECIMAL(10,2) NOT NULL
);

CREATE TABLE pregunta (
    pk_pregunta INT PRIMARY KEY AUTO_INCREMENT,
    fk_cultivo INT NOT NULL,
    pregunta TEXT NOT NULL,
    respuesta TEXT
);



-- conexiones
-- sembrio
ALTER TABLE sembrio
ADD FOREIGN KEY (fk_cultivo) REFERENCES cultivo(pk_cultivo),
ADD FOREIGN KEY (fk_usuario) REFERENCES usuario(pk_usuario),
ADD FOREIGN KEY (fk_tipo_suelo) REFERENCES tipo_suelo(pk_tipo_suelo);

-- registro_fertilizacion
ALTER TABLE registro_fertilizacion
ADD FOREIGN KEY (fk_sembrio) REFERENCES sembrio(pk_sembrio);

-- cosecha
ALTER TABLE cosecha
ADD FOREIGN KEY (fk_sembrio) REFERENCES sembrio(pk_sembrio),
ADD FOREIGN KEY (fk_tipo_calidad) REFERENCES calidad(pk_tipo_calidad),
ADD FOREIGN KEY (fk_tipo_cantidad) REFERENCES cantidad(pk_tipo_cantidad);

-- pregunta
ALTER TABLE pregunta
ADD FOREIGN KEY (fk_cultivo) REFERENCES cultivo(pk_cultivo);
