import sqlite3
from src.utils.conexion import Conexion


def get_amount_by_id( serviceDetails_id: str) -> float:
    """Obtiene el monto de un servicio por su ID.

    Busca en la base de datos el monto asociado a un `DIM_ServiceDetailsId`.
    Si el ID no se encuentra o hay un error, devuelve 0.0.

    Args:
        serviceDetails_id (str): El ID del detalle del servicio.

    Returns:
        float: El monto del servicio como un número flotante. Retorna 0.0 si
            el ID no existe o si ocurre un error.
    """
    object_conecttion = Conexion()
    try:
        query = "SELECT amount FROM DIM_ServiceDetails WHERE DIM_ServiceDetailsId = ?"
        object_conecttion.cursor.execute(query, (serviceDetails_id,))
        result = object_conecttion.cursor.fetchone()
        
        if result is not None:
            return result[0]
        else:
            return 0.0
        
    except Exception as e:
        print(f"Error retrieving amount: {str(e)}")
        return 0.0
            
def get_service_detailsIS_by_ServiceType( serviceType: str) -> str:
    """Obtiene el ID de un detalle de servicio por su tipo.

    Busca un ID de `DIM_ServiceDetails` basado en el `ServiceDetailsType`.
    Si no se encuentra o hay un error, devuelve una cadena vacía.

    Args:
        serviceType (str): El tipo de servicio a buscar.

    Returns:
        str: El ID del detalle del servicio si se encuentra. Retorna una
            cadena vacía ("") si no se encuentra o si ocurre un error.
    """
    try:
        object_conecttion = Conexion()
        query = "SELECT DIM_ServiceDetailsId FROM DIM_ServiceDetails WHERE ServiceDetailesType = ?"
        object_conecttion.cursor.execute(query, (serviceType,))
        result = object_conecttion.cursor.fetchone()
        
        if result is not None:
            return result[0]
        else:
            return ""
    except Exception as e:
        print(f"Error retrieving service details: {str(e)}")
        return ""