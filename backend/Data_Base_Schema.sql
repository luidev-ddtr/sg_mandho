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

-- Tabla DIM_Service
CREATE TABLE DIM_Service (
    DIM_ServiceId TEXT PRIMARY KEY,
    ServiceName TEXT NOT NULL,
    amount REAL NOT NULL CHECK(amount >= 0),
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

-- Tabla DIM_Movement
CREATE TABLE DIM_Movement (
    DIM_MovementId TEXT PRIMARY KEY,
    MovementName TEXT NOT NULL,
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
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

-- Tabla FACT_Revenue
CREATE TABLE FACT_Revenue (
    FACT_RevenueId TEXT PRIMARY KEY,
    DIM_DateId TEXT NOT NULL,
    DIM_AccountId TEXT NOT NULL,
    DIM_ServiceId TEXT NOT NULL,
    DIM_MovementId TEXT NOT NULL,
    DIM_StatusId TEXT NOT NULL,
    amount REAL NOT NULL CHECK(amount >= 0),
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (DIM_DateId) REFERENCES DIM_Date(DIM_DateId),
    FOREIGN KEY (DIM_AccountId) REFERENCES DIM_Account(DIM_AccountId),
    FOREIGN KEY (DIM_ServiceId) REFERENCES DIM_Service(DIM_ServiceId),
    FOREIGN KEY (DIM_MovementId) REFERENCES DIM_Movement(DIM_MovementId),
    FOREIGN KEY (DIM_StatusId) REFERENCES DIM_Status(DIM_StatusId)
);

-- Tabla DIM_ServiceDetails
CREATE TABLE DIM_ServiceDetails (
    DIM_ServiceDetailsId TEXT PRIMARY KEY,
    DIM_DateId TEXT NOT NULL,
    DIM_ServiceId TEXT NOT NULL,
    DIM_CustomerId TEXT NOT NULL,
    amount REAL NOT NULL CHECK(amount >= 0),
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (DIM_DateId) REFERENCES DIM_Date(DIM_DateId),
    FOREIGN KEY (DIM_ServiceId) REFERENCES DIM_Service(DIM_ServiceId),
    FOREIGN KEY (DIM_CustomerId) REFERENCES DIM_Customer(DIM_CustomerId)
);

--INSERSION DE DATOS PREDEFINIDOS EN DIM_STATUS
INSERT INTO DIM_Status(DIM_StatusId, StatusName) VALUES ('status1', 'activo');
INSERT INTO DIM_Status(DIM_StatusId, StatusName) VALUES ('status2', 'inactivo');
INSERT INTO DIM_Status(DIM_StatusId, StatusName) VALUES ('status4', 'pagado');
INSERT INTO DIM_Status(DIM_StatusId, StatusName) VALUES ('status5', 'pendiente');
INSERT INTO DIM_Status(DIM_StatusId, StatusName) VALUES ('status3', 'desactivado'); 

-- Índices adicionales para mejorar el rendimiento
-- CREATE INDEX idx_customer_date ON DIM_Customer(DIM_DateId);
-- CREATE INDEX idx_account_customer ON DIM_Account(DIM_CustomerId);
-- CREATE INDEX idx_account_status ON DIM_Account(DIM_StatusId);
-- CREATE INDEX idx_revenue_account ON FACT_Revenue(DIM_AccountId);
-- CREATE INDEX idx_revenue_date ON FACT_Revenue(DIM_DateId);
-- CREATE INDEX idx_service_details_service ON DIM_ServiceDetails(DIM_ServiceId);