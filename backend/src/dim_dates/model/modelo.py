from typing import  Dict, Any


class DIM_DATE_MODEL:
    """
    Modelo puro que representa la estructura de la tabla DIM_Date.
    Solo contiene datos y métodos básicos de transformación.
    """
    def __init__(self, DIM_DateId: int, FiscalYear: str, FiscalMonth: str, 
                 FiscalQuarter: str, FiscalWeek: str, FiscalDay: str, 
                 Year: int, Month: str, Week: str, Day: str) -> None:
        """
        Constructor con todos los campos requeridos por el schema.
        
        Args:
            DIM_DateId: Identificador único en formato AAAAMMDD (20230815)
            FiscalYear: Formato 'Y23'
            FiscalMonth: Formato 'M08'
            FiscalQuarter: Formato 'Q3'
            FiscalWeek: Formato 'W35'
            FiscalDay: Formato 'D15'
            Year: Año numérico (2023)
            Month: Mes en formato '08'
            Week: Semana en formato '35'
            Day: Día en formato '15'
        """
        self.DIM_DateId = DIM_DateId
        self.FiscalYear = FiscalYear
        self.FiscalMonth = FiscalMonth
        self.FiscalQuarter = FiscalQuarter
        self.FiscalWeek = FiscalWeek
        self.FiscalDay = FiscalDay
        self.Year = Year
        self.Month = Month
        self.Week = Week
        self.Day = Day
    
    def to_dict(self) -> Dict[str, Any]:
        """Convierte el modelo a diccionario para operaciones CRUD"""
        return {
            'DIM_DateId': self.DIM_DateId,
            'FiscalYear': self.FiscalYear,
            'FiscalMonth': self.FiscalMonth,
            'FiscalQuarter': self.FiscalQuarter,
            'FiscalWeek': self.FiscalWeek,
            'FiscalDay': self.FiscalDay,
            'Year': self.Year,
            'Month': self.Month,
            'Week': self.Week,
            'Day': self.Day
        }
    
    def __str__(self) -> str:
        """Representación legible del modelo"""
        return (f"DateID: {self.DIM_DateId} | "
                f"Fiscal: {self.FiscalYear}-{self.FiscalMonth}-{self.FiscalDay} "
                f"(Q{self.FiscalQuarter}, W{self.FiscalWeek}) | "
                f"Calendar: {self.Year}-{self.Month}-{self.Day}")
    
    def to_tuple(self) -> tuple:
        """
        Convierte el modelo a una tupla en el orden correcto para INSERT SQL.
        
        Returns:
            tuple: (DIM_DateId, FiscalYear, FiscalMonth, FiscalQuarter, FiscalWeek,
                   FiscalDay, Year, Month, Week, Day)
        """
        return (
            self.DIM_DateId,
            self.FiscalYear,
            self.FiscalMonth,
            self.FiscalQuarter,
            self.FiscalWeek,
            self.FiscalDay,
            self.Year,
            self.Month,
            self.Week,
            self.Day
        )