/*EQUIPOS*/
CREATE TABLE Equipos (
    id SERIAL PRIMARY KEY,
    nombre_equipo VARCHAR(255) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    serie VARCHAR(255) NOT NULL UNIQUE,
    recinto VARCHAR(255) DEFAULT 'BODEGA' NOT NULL,
    estado VARCHAR(10) DEFAULT '1' NOT NULL
);

CREATE TABLE MovimientoEquipo (
    id SERIAL PRIMARY KEY,
    equipo_id INTEGER,
    nombre_responsable VARCHAR(255) NOT NULL,
    recinto VARCHAR(255) NOT NULL,
    fecha TIMESTAMP DEFAULT now(),
    detalles VARCHAR(3000) DEFAULT 'SIN DETALLES',
    FOREIGN KEY (equipo_id) REFERENCES Equipos(id)
);

CREATE TABLE Mantencion (
    id SERIAL PRIMARY KEY,
    equipo_id INTEGER,
    fecha DATE DEFAULT CURRENT_DATE,
    nombre_responsable VARCHAR(555) NOT NULL,
    empresa VARCHAR(255) NOT NULL,
    recinto VARCHAR(255) NOT NULL,
    detalles VARCHAR(3000) DEFAULT 'SIN DETALLES',
    FOREIGN KEY (equipo_id) REFERENCES Equipos(id)
);

CREATE TABLE CheckIncubadura (
    id SERIAL PRIMARY KEY,
    mantencion_id INTEGER,
    detalles VARCHAR(3000) DEFAULT 'SIN DETALLES',
    visualestadoequipo integer NOT NULL DEFAULT 3,
    seguridadsiselectrico integer NOT NULL DEFAULT 3,
    estadocarroruedas integer NOT NULL DEFAULT 3,
    estadotapaderas integer NOT NULL DEFAULT 3,
    controlhumedad integer NOT NULL DEFAULT 3,
    funcionamiento integer NOT NULL DEFAULT 3,
    sensortemperatura integer NOT NULL DEFAULT 3,
    alarma integer NOT NULL DEFAULT 3,
    estadofinal integer NOT NULL,
    FOREIGN KEY (mantencion_id) REFERENCES Mantencion(id)
);

CREATE TABLE CheckVentiladores (
    id SERIAL PRIMARY KEY,
    mantencion_id INTEGER,
    detalles VARCHAR(3000) DEFAULT 'SIN DETALLES',
    precioncircuito integer NOT NULL DEFAULT 3,
    flujoinspiexha integer NOT NULL DEFAULT 3,
    fugapresion integer NOT NULL DEFAULT 3,
    valvulapeepexhala integer NOT NULL DEFAULT 3,
    pruebascualitativa_ebc integer NOT NULL DEFAULT 3,
    pruebapantalla integer NOT NULL DEFAULT 3,
    pruebachasis integer NOT NULL DEFAULT 3,
    pruebafio2 integer NOT NULL DEFAULT 3,
    pruebaapnea integer NOT NULL DEFAULT 3,
    pruebaalarma integer NOT NULL DEFAULT 3,
    estadofinal integer NOT NULL,
    FOREIGN KEY (mantencion_id) REFERENCES Mantencion(id)
);

CREATE TABLE CheckAnestasia (
    id SERIAL PRIMARY KEY,
    mantencion_id INTEGER,
    detalles VARCHAR(3000) DEFAULT 'SIN DETALLES',
    chequeovisual integer NOT NULL DEFAULT 3,
    limpieza integer NOT NULL DEFAULT 3,
    chequeoinicial integer NOT NULL DEFAULT 3,
    chequeoentradagas integer NOT NULL DEFAULT 3,
    monitorexhala integer NOT NULL DEFAULT 3,
    revisionestado_apl integer NOT NULL DEFAULT 3,
    revisionestado_peep integer NOT NULL DEFAULT 3,
    medicionpresion integer NOT NULL DEFAULT 3,
    medicionflujo integer NOT NULL DEFAULT 3,
    fugapresion integer NOT NULL DEFAULT 3,
    revisionvalvuaoxigenoflujo integer NOT NULL DEFAULT 3,
    verificacionalarmas integer NOT NULL DEFAULT 3,
    pruebasseguridad integer NOT NULL DEFAULT 3,
    estadofinal integer NOT NULL,
    FOREIGN KEY (mantencion_id) REFERENCES Mantencion(id)
);

/*DISPOSITIVOS*/
CREATE TABLE Dispositivo (
    id SERIAL PRIMARY KEY,
    recinto VARCHAR(255) DEFAULT 'BODEGA',
    codigo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    saldo NUMERIC(255) NOT NULL,
    lote NUMERIC(255) NOT NULL,
    ultimoprecio NUMERIC(255) NOT NULL,
    estado NUMERIC(100) DEFAULT 1
);

CREATE TABLE MovimientoDispositivos (
    id SERIAL PRIMARY KEY,
    dispositivo_id INTEGER,
    nombre_responsable VARCHAR(255) NOT NULL,
    fecha TIMESTAMPTZ DEFAULT NOW(),
    detalles VARCHAR(3000) DEFAULT 'SIN DETALLES',
    recinto VARCHAR NOT NULL,
    FOREIGN KEY (dispositivo_id) REFERENCES Dispositivo(id) ON DELETE CASCADE
);