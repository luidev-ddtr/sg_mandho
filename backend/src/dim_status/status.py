from src.utils.conexion import Conexion
class DIM_status:
    """Esta clase tendra la unica funcion de devolder el id asociado a un nombre , de estado, por ejemplo
    para creacion de cuentas pueden haver haver varias, como lo son, el activo, inactivo, o alguna otra,
    y para tablas como fact revenue, pueden haver estados como pagado, no pagado, etc.
    """

    def __init__(self) -> None:
        StatusName = None
        StatusId = None

    def get_status_id(self, StatusName: str, from_message: str) -> int:
        """
        Se hara una peticion a la base de datos, donde si no se agrega un nombre de estado, y viene desde account, se generara
        como una cuenta nueva. EStatus activo, por el contrariro si se quiere camvbiar aqui tambien de deberia obtener el estatus
        Dependera de 2 opciones, 
        ARGRS:
            status name, El nombre del estado que se envia (Si no se enviea nombre se genera como activo en caso de accout)
            from_message, Para saber de cual de las 2 tablas que se utilizan proviene, si por ejemplo de account, o fact revenue

        returns:
            Retorna el id de estado segun el nombre que se haya elegido, aun falta implementar esta lfoca completamente para campos como crear 
            y agregar 
        """
        self.conexion = Conexion()
        if StatusName == "" and from_message == "account":
            query = "SELECT DIM_StatusId FROM DIM_status WHERE StatusName = 'activo'"
            self.conexion.cursor.execute(query)
            StatusId = self.conexion.cursor.fetchone()
            
            self.conexion.close_conexion()
            return StatusId[0]
        else:
            #Esta funcion aun no esta probada
            query = f"SELECT DIM_StatusId FROM DIM_status WHERE StatusName = '{StatusName}'"
            
            self.conexion.cursor.execute(query)

            StatusId = self.conexion.cursor.fetchone()

            self.conexion.close_conexion()
            return StatusId[0]