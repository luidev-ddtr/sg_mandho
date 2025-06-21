class DIM_DATE:
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
    
    def __str__(self):
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