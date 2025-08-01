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
CREATE TABLE DIM_Date (
    DIM_DateId TEXT PRIMARY KEY,
    FiscalDate TEXT NOT NULL,
    FiscalYear INTEGER NOT NULL,
    FiscalMonth INTEGER NOT NULL,
    FiscalDay INTEGER NOT NULL,
    FullDate TEXT NOT NULL,
    Year INTEGER NOT NULL,
    Month INTEGER NOT NULL,
    Week INTEGER,
    Day INTEGER NOT NULL,
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

-- Tabla DIM_Customer
CREATE TABLE DIM_Customer (
    DIM_CustomerId TEXT PRIMARY KEY,
    DIM_DateId TEXT NOT NULL,
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
    DIM_DateId TEXT NOT NULL,
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
    DIM_DateId INTEGER,
    DIM_ServiceId TEXT,
    ServiceDetailesType TEXT,
    amount REAL,
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
    StartDate TEXT,
    EndDate TEXT,
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
    amount REAL,
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (DIM_DateId) REFERENCES DIM_Date(DIM_DateId),
    FOREIGN KEY (DIM_AccountId) REFERENCES DIM_Account(DIM_AccountId),
    FOREIGN KEY (DIM_ServiceDetailsId) REFERENCES DIM_ServiceDetails(DIM_ServiceDetailsId),
    FOREIGN KEY (DIM_MovementId) REFERENCES DIM_Movement(DIM_MovementId),
    FOREIGN KEY (DIM_StatusId) REFERENCES DIM_Status(DIM_StatusId)
);

--Hasta aqui se modificon las tablas
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

-- Índices adicionales para mejorar el rendimiento
-- CREATE INDEX idx_customer_date ON DIM_Customer(DIM_DateId);
-- CREATE INDEX idx_account_customer ON DIM_Account(DIM_CustomerId);
-- CREATE INDEX idx_account_status ON DIM_Account(DIM_StatusId);
-- CREATE INDEX idx_revenue_account ON FACT_Revenue(DIM_AccountId);
-- CREATE INDEX idx_revenue_date ON FACT_Revenue(DIM_DateId);
-- CREATE INDEX idx_service_details_service ON DIM_ServiceDetails(DIM_ServiceId);