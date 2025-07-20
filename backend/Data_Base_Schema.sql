--Database Schema Report for: sistema_mandho.db

--Found 9 tables

TABLE: DIM_Role
Creation SQL: CREATE TABLE DIM_Role (
    DIM_RoleId TEXT PRIMARY KEY,
    RoleName TEXT NOT NULL,
    RoleType TEXT NOT NULL,
    RoleStartDate TEXT NOT NULL,  -- Se espera formato YYYY-MM-DD
    RoleEndDate TEXT DEFAULT 's/n',  -- Valor por defecto para nulos
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
)

COLUMNS:
  DIM_RoleId: TEXT | Constraints: PRIMARY KEY
  RoleName: TEXT | Constraints: NOT NULL
  RoleType: TEXT | Constraints: NOT NULL
  RoleStartDate: TEXT | Constraints: NOT NULL
  RoleEndDate: TEXT | Constraints: DEFAULT 's/n'
  timestamp: TEXT | Constraints: DEFAULT strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')

PRIMARY KEY: DIM_RoleId

================================================================================        

TABLE: DIM_Status
Creation SQL: CREATE TABLE DIM_Status (
    DIM_StatusId TEXT PRIMARY KEY,
    StatusName TEXT NOT NULL,
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
)

COLUMNS:
  DIM_StatusId: TEXT | Constraints: PRIMARY KEY
  StatusName: TEXT | Constraints: NOT NULL
  timestamp: TEXT | Constraints: DEFAULT strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')

PRIMARY KEY: DIM_StatusId

================================================================================        

TABLE: DIM_Date
Creation SQL: CREATE TABLE DIM_Date (
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
)

COLUMNS:
  DIM_DateId: TEXT | Constraints: PRIMARY KEY
  FiscalDate: TEXT | Constraints: NOT NULL
  FiscalYear: INTEGER | Constraints: NOT NULL
  FiscalMonth: INTEGER | Constraints: NOT NULL
  FiscalDay: INTEGER | Constraints: NOT NULL
  FullDate: TEXT | Constraints: NOT NULL
  Year: INTEGER | Constraints: NOT NULL
  Month: INTEGER | Constraints: NOT NULL
  Week: INTEGER | Constraints: None
  Day: INTEGER | Constraints: NOT NULL
  timestamp: TEXT | Constraints: DEFAULT strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')

PRIMARY KEY: DIM_DateId

================================================================================        

TABLE: DIM_Customer
Creation SQL: CREATE TABLE DIM_Customer (
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
)

COLUMNS:
  DIM_CustomerId: TEXT | Constraints: PRIMARY KEY
  DIM_DateId: TEXT | Constraints: NOT NULL
  CustomerName: TEXT | Constraints: NOT NULL
  CustomerMiddleName: TEXT | Constraints: DEFAULT 's/n'
  CustomerLastName: TEXT | Constraints: NOT NULL
  CustomerSecondLastName: TEXT | Constraints: DEFAULT 's/n'
  CustomerDateBirth: TEXT | Constraints: NOT NULL
  CustomerStartDate: TEXT | Constraints: NOT NULL
  CustomerEndDate: TEXT | Constraints: DEFAULT 's/n'
  CustomerFraction: TEXT | Constraints: DEFAULT 's/n'
  CustomerAddress: TEXT | Constraints: DEFAULT 's/n'
  CustomerNumberExt: TEXT | Constraints: DEFAULT 's/n'
  timestamp: TEXT | Constraints: DEFAULT strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')

PRIMARY KEY: DIM_CustomerId

FOREIGN KEYS:
  DIM_DateId -> DIM_Date(DIM_DateId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION

================================================================================        

TABLE: DIM_Service
Creation SQL: CREATE TABLE DIM_Service (
    DIM_ServiceId TEXT PRIMARY KEY,
    ServiceName TEXT NOT NULL,
    amount REAL NOT NULL CHECK(amount >= 0),
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
)

COLUMNS:
  DIM_ServiceId: TEXT | Constraints: PRIMARY KEY
  ServiceName: TEXT | Constraints: NOT NULL
  amount: REAL | Constraints: NOT NULL
  timestamp: TEXT | Constraints: DEFAULT strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')

PRIMARY KEY: DIM_ServiceId

================================================================================        

TABLE: DIM_Movement
Creation SQL: CREATE TABLE DIM_Movement (
    DIM_MovementId TEXT PRIMARY KEY,
    MovementName TEXT NOT NULL,
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
)

COLUMNS:
  DIM_MovementId: TEXT | Constraints: PRIMARY KEY
  MovementName: TEXT | Constraints: NOT NULL
  timestamp: TEXT | Constraints: DEFAULT strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')

PRIMARY KEY: DIM_MovementId

================================================================================        

TABLE: DIM_Account
Creation SQL: CREATE TABLE DIM_Account (
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
)

COLUMNS:
  DIM_AccountId: TEXT | Constraints: PRIMARY KEY
  DIM_DateId: TEXT | Constraints: NOT NULL
  DIM_CustomerId: TEXT | Constraints: NOT NULL
  DIM_RoleId: TEXT | Constraints: NOT NULL
  DIM_StatusId: TEXT | Constraints: NOT NULL
  StartDate: TEXT | Constraints: NOT NULL
  EndDate: TEXT | Constraints: DEFAULT 's/n'
  timestamp: TEXT | Constraints: DEFAULT strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')

PRIMARY KEY: DIM_AccountId

FOREIGN KEYS:
  DIM_StatusId -> DIM_Status(DIM_StatusId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION
  DIM_RoleId -> DIM_Role(DIM_RoleId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION
  DIM_CustomerId -> DIM_Customer(DIM_CustomerId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION
  DIM_DateId -> DIM_Date(DIM_DateId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION

================================================================================        

TABLE: FACT_Revenue
Creation SQL: CREATE TABLE FACT_Revenue (
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
)

COLUMNS:
  FACT_RevenueId: TEXT | Constraints: PRIMARY KEY
  DIM_DateId: TEXT | Constraints: NOT NULL
  DIM_AccountId: TEXT | Constraints: NOT NULL
  DIM_ServiceId: TEXT | Constraints: NOT NULL
  DIM_MovementId: TEXT | Constraints: NOT NULL
  DIM_StatusId: TEXT | Constraints: NOT NULL
  amount: REAL | Constraints: NOT NULL
  timestamp: TEXT | Constraints: DEFAULT strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')

PRIMARY KEY: FACT_RevenueId

FOREIGN KEYS:
  DIM_StatusId -> DIM_Status(DIM_StatusId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION
  DIM_MovementId -> DIM_Movement(DIM_MovementId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION
  DIM_ServiceId -> DIM_Service(DIM_ServiceId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION
  DIM_AccountId -> DIM_Account(DIM_AccountId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION
  DIM_DateId -> DIM_Date(DIM_DateId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION

================================================================================        

TABLE: DIM_ServiceDetails
Creation SQL: CREATE TABLE DIM_ServiceDetails (
    DIM_ServiceDetailsId TEXT PRIMARY KEY,
    DIM_DateId TEXT NOT NULL,
    DIM_ServiceId TEXT NOT NULL,
    DIM_CustomerId TEXT NOT NULL,
    amount REAL NOT NULL CHECK(amount >= 0),
    timestamp TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (DIM_DateId) REFERENCES DIM_Date(DIM_DateId),
    FOREIGN KEY (DIM_ServiceId) REFERENCES DIM_Service(DIM_ServiceId),
    FOREIGN KEY (DIM_CustomerId) REFERENCES DIM_Customer(DIM_CustomerId)
)

COLUMNS:
  DIM_ServiceDetailsId: TEXT | Constraints: PRIMARY KEY
  DIM_DateId: TEXT | Constraints: NOT NULL
  DIM_ServiceId: TEXT | Constraints: NOT NULL
  DIM_CustomerId: TEXT | Constraints: NOT NULL
  amount: REAL | Constraints: NOT NULL
  timestamp: TEXT | Constraints: DEFAULT strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')

PRIMARY KEY: DIM_ServiceDetailsId

FOREIGN KEYS:
  DIM_CustomerId -> DIM_Customer(DIM_CustomerId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION
  DIM_ServiceId -> DIM_Service(DIM_ServiceId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION
  DIM_DateId -> DIM_Date(DIM_DateId)
    ON UPDATE: NO ACTION
    ON DELETE: NO ACTION