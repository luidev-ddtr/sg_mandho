import sqlite3
from typing import Optional, List
from src.utils.conexion import Conexion
from src.dim_dates.model.modelo import DIM_DATE_MODEL
import datetime
from zoneinfo import ZoneInfo
import pytz 


class DIM_DATE:
    """
    Clase principal para interactuar con fechas desde otras partes del sistema.
    Maneja la interacción con la base de datos y proporciona una interfaz limpia.
    """
    def __init__(self) -> None:
        """
        Inicializa el gestor de fechas con la ruta a la base de datos.
        
        Args:
            none
        """
        self.dateId = self.get_id_by_object_date(*self._get_full_date())
        self.full_date = self._get_full_date()
    
    def _get_full_date(self) -> tuple:
        """
        Obtiene la fecha completa en formato Time.
        Trackea la fecha a la hora actual del centro de mexico y con eso ahce la conversion y devuelve el ide correspondiente

        Returns:
            Fecha completa en formato AAAAMMDD
        """
        
        now = datetime.datetime.now(pytz.timezone("America/Mexico_City")) 
        
        return [now.year, now.month, now.day]
    

    def get_by_id(self, date_id: int) -> Optional[DIM_DATE_MODEL]:
        """
        Obtiene una fecha por su ID completo (AAAAMMDD).
        
        Args:
            date_id: Identificador completo de la fecha (ej. 20230815)
            
        Returns:
            DIM_DATE_MODEL si se encuentra, None si no existe
        """
        try:
            pass
                
        except sqlite3.Error as e:
            print(f"Error al obtener fecha por ID: {e}")
            return None
    
    def get_by_object_date(self, year: int, month: int, day: int) -> Optional[DIM_DATE_MODEL]:
        """
        Obtiene una fecha por sus componentes (año, mes, día).
        
        Args:
            year: Año (ej. 2023)
            month: Mes (1-12)
            day: Día (1-31)
            
        Returns:
            DIM_DATE_MODEL si se encuentra, None si no existe
        """
        date_id = int(f"{year}{month:02d}{day:02d}")
        return self.get_by_id(date_id)
    
    def get_id_by_object_date(self, year: int, month: int, day: int) -> Optional[int]:
        """
        Obtiene el ID de una fecha por sus componentes (año, mes, día).
        
        Args:
            year: Año (ej. 2023)
            month: Mes (1-12)
            day: Día (1-31)
            
        Returns:
            ID de la fecha si se encuentra, None si no existe
        """
        date_id = int(f"{year}{month:02d}{day:02d}")
        conecttion = Conexion()
        try:
            query = "SELECT DIM_DateId FROM DIM_Date WHERE DIM_DateId = ?"
            conecttion.cursor.execute(query, (date_id,))
            result = conecttion.cursor.fetchone()
            
            if result is not None:
                return result[0]
            else:
                return None
            
        except sqlite3.Error as e:
            print(f"Error al obtener ID de fecha: {e}")
            return None
        
    
    def _row_to_model(self, row: tuple) -> DIM_DATE_MODEL:
        """
        Convierte una fila de la BD a un DIM_DATE_MODEL.
        
        Args:
            row: Tupla con los datos de la fila
            
        Returns:
            Instancia de DIM_DATE_MODEL
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
        Inserta un año completo de registros usando conversión directa a tuplas.
        
        Args:
            registers: Lista de objetos DIM_DATE_MODEL a insertar
            
        Returns:
            bool: True si se insertaron correctamente, False si hubo error
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

    
    def generar_fechas(self, prefijo) -> dict[str, str]:
        """
        Recibe un prefijo desde el frontend, Segun lo que reciba generara un registro de tiempo dinamico, donde se obtendran las fechas que coincidan con este prefijo.
        Args:
            prefijo (str): Prefijo para generar las fechas dinamicas.
        Returns:
                Retorna un diccionario con la informacion contendia en cada parametro de entrada
        """
        if prefijo == "FiscalDay":
            return self.obtener_prefijos()
        
        elif prefijo == "FiscalMonth":
            fechas = self.obtener_prefijos()
            
            fecha_formateada = dict()
            fecha_formateada["FiscalMonth"] = fechas["FiscalMonth"]
            fecha_formateada["FiscalYear"] = fechas["FiscalYear"]
            
            return fecha_formateada
        
        elif prefijo == "FiscalYear":
            fechas = self.obtener_prefijos()

            return dict(fechas["FiscalYear"])

        return 
    def obtener_prefijos(self) -> dict[str, str]:
        """Función donde se obtienen los prefijos de la fecha, en la que se buscará el registro
        """
        date = datetime.datetime.now(pytz.timezone("America/Mexico_City"))
        prefijos = {
            "mensual": "M",
            "diario": "D",
            "semanal": "W",
            "anual": "Y" 
        }

        # Obtenemos los últimos dos dígitos del año
        year_two_digits = str(date.year)[-2:]
        
        fiscal_date = {
            "FiscalDay": f"{prefijos['diario']}{date.day:02d}",
            "FiscalMonth": f"{prefijos['mensual']}{date.month:02d}",
            "FiscalYear": f"{prefijos['anual']}{year_two_digits}",
        }
        
        return fiscal_date
    
    def get_end_date(self):
        dia, mes, anio = self._get_full_date()

        return f"{str(anio)}-{str(mes).zfill(2)}-{str(dia).zfill(2)}"
    

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


