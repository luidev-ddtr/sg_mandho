-- Creación de la base de datos sistema_mandho
PRAGMA foreign_keys = ON;

-- Tabla DIM_Role
CREATE TABLE DIM_Role (
    DIM_RoleId TEXT PRIMARY KEY,
    RoleName TEXT NOT NULL,
    RoleType TEXT NOT NULL,
    RoleStartDate TEXT NOT NULL,  -- Formato YYYY-MM-DD
    RoleEndDate TEXT DEFAULT 's/n',
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

-- Tabla DIM_Status
CREATE TABLE DIM_Status (
    DIM_StatusId TEXT PRIMARY KEY,
    StatusName TEXT NOT NULL,
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

-- Tabla DIM_Date
-- SE CREARA UN CODIGO EN PYTHON DONDE SE AGREGARAN TODOS LOS ANIOS COMO 
-- PREDEFINIDOS
CREATE TABLE DIM_Date (
    DIM_DateId INTEGER PRIMARY KEY,
    FiscalYear TEXT NOT NULL,
    FiscalMonth TEXT NOT NULL,
	FiscalQuarter TEXT NOT NULL,
    FiscalWeek TEXT NOT NULL,
    FiscalDay TEXT NOT NULL,
    Year INTEGER NOT NULL,
    Month TEXT NOT NULL,
    Week TEXT NOT NULL,
    Day TEXT NOT NULL,
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

-- Tabla DIM_Customer
CREATE TABLE DIM_Customer (
    DIM_CustomerId TEXT PRIMARY KEY,
    DIM_DateId INTEGER,
    CustomerName TEXT NOT NULL,
    CustomerMiddleName TEXT DEFAULT 's/n',
    CustomerLastName TEXT NOT NULL,
    CustomerSecondLastName TEXT DEFAULT 's/n',
    CustomerDateBirth TEXT NOT NULL,
    CustomerStartDate TEXT NOT NULL,
    CustomerEndDate TEXT DEFAULT 's/n',
    CustomerFraction TEXT DEFAULT 's/n',
    CustomerAddress TEXT DEFAULT 's/n',
    CustomerNumberExt TEXT DEFAULT 's/n',
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (DIM_DateId) REFERENCES DIM_Date(DIM_DateId)
);

-- Tabla DIM_Account
CREATE TABLE DIM_Account (
    DIM_AccountId TEXT PRIMARY KEY,
    DIM_DateId INTEGER,,
    DIM_CustomerId TEXT NOT NULL,
    DIM_RoleId TEXT NOT NULL,
    DIM_StatusId TEXT NOT NULL,
    StartDate TEXT NOT NULL,
    EndDate TEXT DEFAULT 's/n',
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (DIM_DateId) REFERENCES DIM_Date(DIM_DateId),
    FOREIGN KEY (DIM_CustomerId) REFERENCES DIM_Customer(DIM_CustomerId),
    FOREIGN KEY (DIM_RoleId) REFERENCES DIM_Role(DIM_RoleId),
    FOREIGN KEY (DIM_StatusId) REFERENCES DIM_Status(DIM_StatusId)
);

--Se modificaron desde aqui las para agregar modificaciones de servicios y movimientos
-- Tabla DIM_Service
CREATE TABLE DIM_Service (
    DIM_ServiceId TEXT PRIMARY KEY,
    ServiceName TEXT,
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

-- Tabla DIM_ServiceDetails
CREATE TABLE DIM_ServiceDetails (
    DIM_ServiceDetailsId TEXT PRIMARY KEY,
    DIM_DateId INTEGER,,
    DIM_ServiceId TEXT,
    ServiceDetailesType TEXT,
    amount REAL CHECK (amount >= 0.0),
	StartDate TEXT NOT NULL,
    EndDate TEXT NOT NULL, --Los pagos son anuales, ya se conce por defecto la fecha en la que se se vence el pago
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (DIM_DateId) REFERENCES DIM_Date(DIM_DateId),
    FOREIGN KEY (DIM_ServiceId) REFERENCES DIM_Service(DIM_ServiceId)
);

-- Tabla DIM_ServiceOwners
CREATE TABLE DIM_ServiceOwners (
    DIM_ServiceOwnersId TEXT PRIMARY KEY,
    DIM_DateId INTEGER,
    DIM_ServiceId TEXT,
    DIM_CustomerId TEXT,
    StartDate TEXT NOT NULL,
    EndDate TEXT DEFAULT 's/n',
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (DIM_DateId) REFERENCES DIM_Date(DIM_DateId),
    FOREIGN KEY (DIM_ServiceId) REFERENCES DIM_Service(DIM_ServiceId),
    FOREIGN KEY (DIM_CustomerId) REFERENCES DIM_Customer(DIM_CustomerId)
);

-- Tabla DIM_Movement
CREATE TABLE DIM_Movement (
    DIM_MovementId TEXT PRIMARY KEY,
    MovementName TEXT,
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

-- Tabla FACT_Revenue
CREATE TABLE FACT_Revenue (
    FACT_RevenueId TEXT PRIMARY KEY,
    DIM_DateId INTEGER,
    DIM_AccountId TEXT,
    DIM_ServiceDetailsId TEXT,
    DIM_MovementId TEXT,
    DIM_StatusId TEXT,
    amount REAL NOT NULL,
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (DIM_DateId) REFERENCES DIM_Date(DIM_DateId),
    FOREIGN KEY (DIM_AccountId) REFERENCES DIM_Account(DIM_AccountId),
    FOREIGN KEY (DIM_ServiceDetailsId) REFERENCES DIM_ServiceDetails(DIM_ServiceDetailsId),
    FOREIGN KEY (DIM_MovementId) REFERENCES DIM_Movement(DIM_MovementId),
    FOREIGN KEY (DIM_StatusId) REFERENCES DIM_Status(DIM_StatusId)
);

-- Tablas de dimensiones
SELECT * FROM DIM_Role;
SELECT * FROM DIM_Status;
SELECT * FROM DIM_Date;
SELECT * FROM DIM_Customer;
SELECT * FROM DIM_Account;
SELECT * FROM DIM_Service;
SELECT * FROM DIM_ServiceDetails;
SELECT * FROM DIM_ServiceOwners;
SELECT * FROM DIM_Movement;

-- Tabla de hechos
SELECT * FROM FACT_Revenue;

--se modificaron 3 tablas puesto que tenian algunos campos con tipos de datos incorrectos, asi como la tabla DIM_ServiceDetails que no tenia el campo StartDate y EndDate

--INSERSION DE DATOS PREDEFINIDOS EN DIM_STATUS
INSERT INTO DIM_Status(DIM_StatusId, StatusName) VALUES ('status1', 'activo');
INSERT INTO DIM_Status(DIM_StatusId, StatusName) VALUES ('status2', 'inactivo');
INSERT INTO DIM_Status(DIM_StatusId, StatusName) VALUES ('status4', 'pagado');
INSERT INTO DIM_Status(DIM_StatusId, StatusName) VALUES ('status5', 'pendiente');
INSERT INTO DIM_Status(DIM_StatusId, StatusName) VALUES ('status3', 'desactivado'); 

-- Insertar roles en la tabla DIM_Role
INSERT INTO DIM_Role (DIM_RoleId, RoleName, RoleType, RoleStartDate, RoleEndDate) 
VALUES ('9bce4ac0-5414-561d', 'delegado', 'administrador', '2000-01-01', '2100-01-01');

INSERT INTO DIM_Role (DIM_RoleId, RoleName, RoleType, RoleStartDate, RoleEndDate) 
VALUES ('bfd06808-257d-5710', 'comitiva', 'administrador', '2000-01-01', '2100-01-01');

INSERT INTO DIM_Role (DIM_RoleId, RoleName, RoleType, RoleStartDate, RoleEndDate) 
VALUES ('dbae332e-87a9-5fc3', 'subdelegado', 'administrador', '2000-01-01', '2100-01-01');

INSERT INTO DIM_Role (DIM_RoleId, RoleName, RoleType, RoleStartDate, RoleEndDate) 
VALUES ('c77ea6a3-4baa-523e', 'estudiante', 'usuario', '2000-01-01', '2100-01-01');

INSERT INTO DIM_Role (DIM_RoleId, RoleName, RoleType, RoleStartDate, RoleEndDate) 
VALUES ('822bbdbb-964d-50a6', 'ranchero', 'usuario', '2000-01-01', '2100-01-01');

INSERT INTO DIM_Role (DIM_RoleId, RoleName, RoleType, RoleStartDate, RoleEndDate) 
VALUES ('dcd3a2ee-69c1-545d', 'vecino', 'usuario', '2000-01-01', '2100-01-01');

INSERT INTO DIM_Role (DIM_RoleId, RoleName, RoleType, RoleStartDate, RoleEndDate) 
VALUES ('e2a5d805-8738-5069', 'inmigrante', 'usuario', '2000-01-01', '2100-01-01');

INSERT INTO DIM_Role (DIM_RoleId, RoleName, RoleType, RoleStartDate, RoleEndDate) 
VALUES ('74789a1e-2fc7-5131', 'pequeño propietario', 'usuario', '2000-01-01', '2100-01-01');

INSERT INTO DIM_Role (DIM_RoleId, RoleName, RoleType, RoleStartDate, RoleEndDate) 
VALUES ('e03b67a8-f9d7-5e9d', 'invalido', 'inactivo', '2000-01-01', '2100-01-01');


-- Insertar registros en la tabla DIM_Movement Solo son 2 registros
insert into DIM_Movement; 
(DIM_MovementId, MovementName) VALUES
('d3e7d32b-d440-5048', 'ingreso');
insert into DIM_Movement 

(DIM_MovementId, MovementName) VALUES
('9d8dff92-630b-5f51', 'egreso');


-- insertar registros en la tabla DIM_service
insert into DIM_Service
(DIM_ServiceId,ServiceName)
VALUES
('1fbd9d83-7a85-50ec','agua');

insert into DIM_Service
(DIM_ServiceId,ServiceName)
VALUES
('17259752-21dd-5d83','feria');

insert into DIM_Service
(DIM_ServiceId,ServiceName)
VALUES
('e2d33355-5186-597c','panteon');

insert into DIM_Service
(DIM_ServiceId,ServiceName)
VALUES
('acf85e49-6bce-5a8b','delegacion');


-- Estos servicios se deberan renovar anualmente para que se mantengan actualizado, solo deberia cambia star, y endate
--Registro de peuba metido en service details, SE DEBERA ACOMPLETAR COIN TODOS LOS TIPOS DE SERVICIO DE CADA COMITIVA
insert into DIM_ServiceDetails 
(DIM_ServiceDetailsId, DIM_DateId, DIM_ServiceId, ServiceDetailesType, amount, StartDate, EndDate)
VALUES
('4942db5a-04b2-57b2', '080c33d3-7f33-55d7', '1fbd9d83-7a85-50ec', 'consumo', 360.0, '2025-01-01', '2025-12-31');

insert into DIM_ServiceDetails
(DIM_ServiceDetailsId, DIM_DateId, DIM_ServiceId, ServiceDetailesType ,amount, StartDate, EndDate)
VALUES
('d8e3ce13-aef7-5594', '080c33d3-7f33-55d7', '1fbd9d83-7a85-50ec', 'tomas', 360.0, '2025-01-01', '2025-12-31');

insert into DIM_ServiceDetails
(DIM_ServiceDetailsId, DIM_DateId, DIM_ServiceId, ServiceDetailesType, amount, StartDate, EndDate)
VALUES
('cb6a2afc-1318-5658', '080c33d3-7f33-55d7', 'e2d33355-5186-597c', 'faenap', 300.0, '2025-01-01', '2025-12-31');

insert into DIM_ServiceDetails
(DIM_ServiceDetailsId, DIM_DateId, DIM_ServiceId, ServiceDetailesType, amount, StartDate, EndDate)
VALUES
('41ba58e0-500f-53ef', '080c33d3-7f33-55d7', 'e2d33355-5186-597c', 'cooperacionp', 400.0, '2025-01-01', '2025-12-31');




--Registro de un ususario en la tabla propiertarios, solo se hizzo para testear, ya que Se deberan agregar bien
insert into DIM_ServiceOwners
(DIM_ServiceOwnersId, DIM_DateId, DIM_ServiceId, DIM_CustomerId, StartDate, EndDate )
VALUES
('0901a1e6-8779-5695', '080c33d3-7f33-55d7', '1fbd9d83-7a85-50ec', 'ed37cb83-f080-5e41', '2025-01-01', '2025-12-31');


-- Índices adicionales para mejorar el rendimiento
-- CREATE INDEX idx_customer_date ON DIM_Customer(DIM_DateId);
-- CREATE INDEX idx_account_customer ON DIM_Account(DIM_CustomerId);
-- CREATE INDEX idx_account_status ON DIM_Account(DIM_StatusId);
-- CREATE INDEX idx_revenue_account ON FACT_Revenue(DIM_AccountId);
-- CREATE INDEX idx_revenue_date ON FACT_Revenue(DIM_DateId);
-- CREATE INDEX idx_service_details_service ON DIM_ServiceDetails(DIM_ServiceId);