from src.utils.conexion import Conexion

class DIM_Movement():
    def __init__(self) -> None:
        self.DIM_MovementId = None
        self.MovementName = None
    
    def to_dict(self) -> dict[str, None]:
        return {"DIM_MovementId": self.DIM_MovementId, "MovementName": self.MovementName}
    
    def get_movement_id(self, MovementName) -> str:
        """
        Funcion la cual hara una petcion a la base de datos para obtener el ID, del tipo de movimiento
        Args:
            MovementName (str): Nombre del movimiento
        Returns:
            str: ID del movimiento
        Constrains:
            El movimiento debe existir se retornara error en caos de no encontrarse
            str: "" Cadena vacia para que no pase las validaciones
        """
        conexion = Conexion()
        try:
            query = f"SELECT DIM_MovementId FROM DIM_Movement WHERE MovementName = ?"

            conexion.cursor.execute(query, (MovementName,))  

            result = conexion.cursor.fetchone()

            if result is not None:
                return result[0]
            else:
                return ""
            
        except Exception as e:
            print(f"Error al obtener el ID del movimiento: {e}")
            return ""
        finally:
            conexion.close_conexion()
