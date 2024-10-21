USE vehiculo;

CREATE TABLE IF NOT EXISTS usado(
		patente VARCHAR(7) PRIMARY KEY,
        modelo VARCHAR(45),
        version VARCHAR(65),
        anio INT(4),
        kilometros INT(6),
        color VARCHAR(45),
        precioLista INT(15),
        precioMedio INT(15),
        precioMinimo INT(15)
);

CREATE TABLE IF NOT EXISTS sucursal(
		id_sucursal INT(6) PRIMARY KEY AUTO_INCREMENT,
        dir_sucursal VARCHAR(25) NOT NULL,
        num_sucursal INT(6) NOT NULL,
        localidad_sucursal VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS empleado(
		id_empleado INT(6) PRIMARY KEY AUTO_INCREMENT,
        puesto VARCHAR(25) NOT NULL,
        nom_empleado VARCHAR(20) NOT NULL,
        apell_empleado VARCHAR(45) NOT NULL,
        nro_DNI INT(8) NOT NULL,
        CUIT_empleado VARCHAR(25) NOT NULL,
        fecha_nac DATE NOT NULL
);
    
CREATE TABLE IF NOT EXISTS cliente(
		id_cliente INT(10) AUTO_INCREMENT PRIMARY KEY,
        nom_cliente VARCHAR(40),
        apell_cliente VARCHAR(35),
        tipo_doc INT(4) NOT NULL,
        num_doc INT(8) NOT NULL,
        CUIL VARCHAR(11),
        f_nac_cliente DATE NOT NULL,
        email NVARCHAR (100),
        telefono INT(20),
        domicilio_cliente VARCHAR(45),
        localidad_cliente VARCHAR(55),
        cod_postal_cliente INT(5),
        observaciones VARCHAR(120)
);

CREATE TABLE IF NOT EXISTS venta(
		id_venta INT(9) AUTO_INCREMENT PRIMARY KEY,
        id_suc VARCHAR(45) NOT NULL,
        id_emp VARCHAR(40) NOT NULL,
        id_cli INT(10) NOT NULL,
        patente VARCHAR(10) NOT NULL,
        FOREIGN KEY (patente) REFERENCES usado(patente),
        FOREIGN KEY (id_suc) REFERENCES sucursal(id_sucursal),
        FOREIGN KEY (id_emp) REFERENCES empleado(id_empleado),
        FOREIGN KEY (id_cli) REFERENCES cliente(id_cliente)
);

