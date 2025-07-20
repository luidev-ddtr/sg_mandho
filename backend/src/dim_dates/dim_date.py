from src.utils.id_generator import create_id

"""
Ejemplo de diccionario con informacion cargada
        "dim_date": {
            "fiscal_date": "2022-01-01",
            "fiscal_year": "2022",
            "fiscal_month": "01",
            "fiscal_day": "01",
            "week": "01",
            "year": "2022",
            "month": "01",
            "day": "01"
        }
"""

class DIM_DATE_MODEL:
    """
    Clase la cual mapeara la informacion de la base de datos y se cargara automaticamente 
    para poder enviarse al frontend o usarse para hacer calculos con fechas
    Args:
        dateId (str): Identificador unico de la fecha
        fiscal_date (str): Fecha Fiscal
        year (int): Año
        month (int): Mes
        day (int): Dia
        fiscal_year (int): Año Fiscal
        fiscal_month (int): Mes Fiscal
        fiscal_day (int): Dia Fiscal
        week (int): Semana
    
    returns: Objeto con la informacion para ser introducida en la base de datos
    """
    def __init__(self, dateId, fiscal_date, year, month, day, fiscal_year, fiscal_month, fiscal_day, week):
        """
        Constructor de la clase DIM_DATE: Hace referencia a la tabla DIM DATE de la base de datos:
        este recibira la informacion ya creada y guardada en la bd
        """
        self.dateId = dateId
        self.year = year
        self.month = month
        self.day = day
        self.fiscal_date = fiscal_date
        self.fiscal_year =  fiscal_year
        self.fiscal_month = fiscal_month
        self.fiscal_day = fiscal_day
        self.week = week
    
    def __str__(self) -> str:
        return f"Date {self.dateId} {self.fiscal_date} {self.year} {self.month} {self.day} {self.fiscal_year} {self.fiscal_month} {self.fiscal_day} {self.week}"
    
    def mostrar_datos(self):
        print(f"""Id fecha {self.dateId}
        Fecha Fiscal {self.fiscal_date}
        Año {self.year}
        Mes {self.month}
        Dia {self.day}
        Año Fiscal {self.fiscal_year}
        Mes Fiscal {self.fiscal_month}
        Dia Fiscal {self.fiscal_day}
        Semana {self.week}""")
        

class DIM_DATE:
    """
    IMPORTANTE ESTA CLASE AUN NO ES FUNCIONAL
    
    Clase dim date, Se instanciara cada que una de las tablas relacionadas nesecite la informacion
    Se creara automaticamente los atributos de.
    Returns:
        string: dateId,
        string: fiscal_date,
        string: year,
        string: month,
        string: day,
        string: fiscal_year,
        string: fiscal_month,
        string: fiscal_day,
        string: week
    
    Agregar mas metodos para que sea mas funcional 
    """
    def __init__(self) -> None:
        """
        Constructor de la clase DIM_DATE: Define en none todos los atributos
        y los guardara en un diccionario
        """
        self.dim_date_data = dict()
        self.dateId = create_id([None, None, None])
        self.fiscal_date = None
        self.fiscal_year = None
        self.fiscal_month = None
        self.fiscal_day = None
        self.year = None
        self.month = None
        self.day = None
        self.week = None
    
    
    def Create_dim_date_dic(self) -> dict[str, str | None]:
        self.dim_date_data = {
                "dateId": self.dateId,
                "fiscal_date": self.fiscal_date,
                "fiscal_year": self.fiscal_year,
                "fiscal_month": self.fiscal_month, 
                "fiscal_day": self.fiscal_day,
                "year": self.year,
                "month": self.month,
                "week": self.week,
                "day": self.day,
            }
        return self.dim_date_data