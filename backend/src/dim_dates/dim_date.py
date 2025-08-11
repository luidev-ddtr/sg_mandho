import sqlite3
from typing import Optional, List
from src.utils.conexion import Conexion
from src.dim_dates.model.modelo import DIM_DATE_MODEL
import datetime 
from datetime import date
from zoneinfo import ZoneInfo
import pytz 


class DIM_DATE:
    """
    Clase para gestionar operaciones relacionadas con fechas y su interacción con la base de datos.
    Proporciona funcionalidades para obtener, convertir y generar representaciones de fechas
    en diferentes formatos, así como para interactuar con la dimensión de fecha en la base de datos.
    """

    def __init__(self) -> None:
        """
        Inicializa la instancia con la fecha actual y su correspondiente ID en la base de datos.
        
        Atributos:
            dateId (int): ID de la fecha actual en formato AAAAMMDD
            full_date (tuple): Tupla con los componentes de la fecha actual (año, mes, día)
        """
        self.dateId = self.get_id_by_object_date(*self._get_full_date())
        self.full_date = self._get_full_date()
    
    def _get_full_date(self) -> tuple:
        """
        Obtiene la fecha actual en la zona horaria de la Ciudad de México.
        
        Returns:
            tuple: Tupla con los componentes de la fecha en el formato (año, mes, día)
        """
        now = datetime.datetime.now(pytz.timezone("America/Mexico_City")) 
        return [now.year, now.month, now.day]
    
    def get_by_id(self, date_id: int) -> Optional[DIM_DATE_MODEL]:
        """
        Obtiene un modelo de fecha por su ID completo (AAAAMMDD).
        
        Args:
            date_id (int): Identificador completo de la fecha (ej. 20230815)
            
        Returns:
            Optional[DIM_DATE_MODEL]: Modelo de fecha si existe, None si no se encuentra
        """
        try:
            # Implementación pendiente para obtener fecha por ID
            pass
        except sqlite3.Error as e:
            print(f"Error al obtener fecha por ID: {e}")
            return None
    
    def get_by_object_date(self, year: int, month: int, day: int) -> Optional[DIM_DATE_MODEL]:
        """
        Obtiene un modelo de fecha por sus componentes individuales.
        
        Args:
            year (int): Año (ej. 2023)
            month (int): Mes (1-12)
            day (int): Día (1-31)
            
        Returns:
            Optional[DIM_DATE_MODEL]: Modelo de fecha si existe, None si no se encuentra
        """
        date_id = int(f"{year}{month:02d}{day:02d}")
        return self.get_by_id(date_id)
    
    def get_id_by_object_date(self, year: int, month: int, day: int) -> Optional[int]:
        """
        Obtiene el ID de fecha a partir de sus componentes.
        
        Args:
            year (int): Año (ej. 2023)
            month (int): Mes (1-12)
            day (int): Día (1-31)
            
        Returns:
            Optional[int]: ID de la fecha si existe, None si no se encuentra
        """
        date_id = int(f"{year}{month:02d}{day:02d}")
        connection = Conexion()
        try:
            query = "SELECT DIM_DateId FROM DIM_Date WHERE DIM_DateId = ?"
            connection.cursor.execute(query, (date_id,))
            result = connection.cursor.fetchone()
            return result[0] if result else None
        except sqlite3.Error as e:
            print(f"Error al obtener ID de fecha: {e}")
            return None
        finally:
            connection.close_conexion()
    
    def _row_to_model(self, row: tuple) -> DIM_DATE_MODEL:
        """
        Convierte una fila de base de datos en un modelo de fecha.
        
        Args:
            row (tuple): Tupla con los datos de la fila de la base de datos
            
        Returns:
            DIM_DATE_MODEL: Instancia del modelo de fecha poblada
        """
        return DIM_DATE_MODEL(
            DIM_DateId=row[0],
            FiscalYear=row[1],
            FiscalMonth=row[2],
            FiscalQuarter=row[3],
            FiscalWeek=row[4],
            FiscalDay=row[5],
            Year=row[6],
            Month=row[7],
            Week=row[8],
            Day=row[9]
        )
    
    def _insert_year_dates(self, registers: list[tuple]) -> bool:
        """
        Inserta un conjunto de registros de fechas en la base de datos.
        
        Args:
            registers (list[tuple]): Lista de tuplas con datos de fechas a insertar
            
        Returns:
            bool: True si la inserción fue exitosa, False si ocurrió un error
            
        Raises:
            ValueError: Si la lista de registros está vacía
        """
        if not registers:
            raise ValueError("La lista de registros no puede estar vacía")
        
        handler_connection = Conexion()
        try:
            query = """
            INSERT OR IGNORE INTO DIM_Date (
                DIM_DateId, FiscalYear, FiscalMonth, FiscalQuarter,
                FiscalWeek, FiscalDay, Year, Month, Week, Day
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """
            handler_connection.cursor.executemany(query, registers)
            handler_connection.save_changes()
            return True
        except sqlite3.Error as e:
            print(f"Error al insertar registros: {e}")
            return False
        finally:
            handler_connection.close_conexion()
    
    def obtener_prefijos(self) -> dict[str, str]:
        """
        Genera representaciones codificadas de los componentes de fecha actual.
        
        Returns:
            dict: Diccionario con prefijos fiscales:
                - FiscalDay: Día en formato 'Ddd'
                - FiscalMonth: Mes en formato 'Mmm'
                - FiscalYear: Año en formato 'Yaa' (aa = últimos dos dígitos del año)
        """
        date = datetime.datetime.now(pytz.timezone("America/Mexico_City"))
        year_two_digits = str(date.year)[-2:]
        
        return {
            "FiscalDay": f"D{date.day:02d}",
            "FiscalMonth": f"M{date.month:02d}",
            "FiscalYear": f"Y{year_two_digits}",
        }
    
    def generar_fechas(self, prefijo: str) -> Optional[dict]:
        """
        Genera representaciones de fecha según el tipo de prefijo solicitado.
        
        Args:
            prefijo (str): Tipo de representación deseada:
                - "FiscalDay": Retorna todos los componentes
                - "FiscalMonth": Retorna mes y año
                - "FiscalYear": Retorna solo el año
        
        Returns:
            Optional[dict]: Diccionario con los componentes solicitados, None si el prefijo no es válido
        """
        fechas = self.obtener_prefijos()
        
        if prefijo == "FiscalDay":
            return fechas
        elif prefijo == "FiscalMonth":
            return {"FiscalMonth": fechas["FiscalMonth"], "FiscalYear": fechas["FiscalYear"]}
        elif prefijo == "FiscalYear":
            return {"FiscalYear": fechas["FiscalYear"]}
        
        return None
    
    def get_end_date(self) -> str:
        """
        Obtiene la fecha actual en formato ISO (YYYY-MM-DD).
        
        Returns:
            str: Fecha formateada como 'YYYY-MM-DD'
        """
        year, month, day = self._get_full_date()
        return f"{year}-{str(month).zfill(2)}-{str(day).zfill(2)}"
    
    def get_age(self, CustomerBirthDate: str) -> int:
        """
        Calcula la edad a partir de una fecha de nacimiento.
        
        Args:
            CustomerBirthDate (str): Fecha de nacimiento en formato 'YYYY-MM-DD'
            
        Returns:
            int: Edad calculada en años
            
        Raises:
            ValueError: Si la fecha de nacimiento tiene un formato inválido
        """
        try:
            birth_date = datetime.datetime.strptime(CustomerBirthDate, "%Y-%m-%d").date()
            
            # Obtener fecha actual
            today = date.today()
            
            # Calcular edad
            age = today.year - birth_date.year
            
            # Ajustar si aún no ha pasado el cumpleaños este año
            if (today.month, today.day) < (birth_date.month, birth_date.day):
                age -= 1
            
            return age
        except ValueError as e:
            print(f"Error al calcular edad: {e}")
            raise ValueError("Formato de fecha inválido. Use 'YYYY-MM-DD'")

def generar_anio_real(id_anio: int) -> List[tuple]:
    """
    Genera registros diarios para un año completo con semanas que se reinician cada mes.
    
    Args:
        id_anio (int): Año para generar (ej: 2023)
        
    Returns:
        List[tuple]: Lista de tuplas listas para INSERT
    """
    prefijos = {
        "trimestral": "Q", 
        "mensual": "M",
        "diario": "D",
        "semanal": "W"
    }
    
    registros = []
    dias_por_mes = {
        1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
        7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
    }
    
    for mes in range(1, 13):
        trimestre = (mes - 1) // 3 + 1
        semana_mes = 1
        dia_semana = 0  # Contador de días en la semana actual
        
        for dia in range(1, dias_por_mes[mes] + 1):
            # Incrementar semana cada 7 días
            dia_semana += 1
            if dia_semana > 7:
                semana_mes += 1
                dia_semana = 1
            
            date_id = int(f"{id_anio}{mes:02d}{dia:02d}")
            
            registro = DIM_DATE_MODEL(
                DIM_DateId=date_id,
                FiscalYear=f"Y{str(id_anio)[2:]}",
                FiscalMonth=f"{prefijos['mensual']}{mes:02d}",
                FiscalQuarter=f"{prefijos['trimestral']}{trimestre}",
                FiscalWeek=f"{prefijos['semanal']}{semana_mes:02d}",
                FiscalDay=f"{prefijos['diario']}{dia:02d}",
                Year=id_anio,
                Month=f"{mes:02d}",
                Week=f"{semana_mes:02d}",
                Day=f"{dia:02d}"
            )
            
            registros.append(registro.to_tuple())

        
    
    print(f"Total registros generados: {len(registros)}")
    return registros
if __name__ == "__main__":
    #ejecutar el script para que genere un anio completo en la tabla
    dim_date = DIM_DATE()
    id = 2025
    anio2025 = generar_anio_real(id)

    print(dim_date._insert_year_dates(anio2025))


