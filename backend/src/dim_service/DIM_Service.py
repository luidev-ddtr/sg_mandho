from src.utils.conexion import Conexion

class DIM_Service:
    """Class to handle CRUD operations for DIM_Service."""

    def __init__(self):
        self.DIM_ServiceId = None
        self.ServiceName = None

    def get_service_id(self, service_name: str) -> str:
        """Funcion la cual se encargara de obtener el id del servicio
        Args:
            service_name (str): Nombre del servicio
        Returns:
            str: ID del servicio
        Constrains:
            Si el servicio no existe, se retorna un id vacio"""
        handler_conexion = Conexion()
        try:
            query = """
                SELECT DIM_ServiceId
                FROM DIM_Service
                WHERE ServiceName = ?
            """
            handler_conexion.cursor.execute(query, (service_name,))
            result = handler_conexion.cursor.fetchone()
            if result is None:
                return ""
            return result[0]

        except Exception as e:
            print(f"Error al obtener el ID del servicio: {e}")
            return ""
        finally:
            handler_conexion.close_conexion()