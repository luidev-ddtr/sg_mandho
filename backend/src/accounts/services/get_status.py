#from src.account.models.DIM_account import DIM_account
from src.accounts.models.DIM_status import DIM_status
from src.utils.conexion import Conexion

object_connection = Conexion()

def create_status(status: str) -> DIM_status:
    """
    Esta funcion hara un apeticion a la base de datos, donde se compueba si el estado que se ingreso existe realmente
    en la base de datos si es asi solamente se toma el id y se retorna la instancia de la clase

    Args:
        status (str): El estado que se desea crear

    Returns:
        DIM_status: La instancia de la clase DIM_status
    """
    # Se debe corregir ya que aun no se puede buscar en la base de datos
    dim_status_id = None 
    
    status_name = status.lower()
    
    dim_status = DIM_status(dim_status_id, status_name)

    #Aqui deberia de ir la seccion en la que se compueba si el estado existe en la base de datos 
    # y si no existe se retorna falso aqui con el mensaje de que no existe
    
    return dim_status


def validate_account(user_id: str) -> bool:
    """Funcion la cual debera hacer una consulta a la base de datos para veficiar que no se pase el limite de cuentas
    el limite de cuentas es de 10, la funcion hara una consulta sql y verificara cuentas cuentas con esa persona hay
    
    Args:
        user_id (str): El id de la persona

    returns:
        bool: retorna false si se pasa el limite de cuentas, si no retorna false
    """

    #Se hace la conexion
    query = f"SELECT COUNT(*) FROM DIM_account WHERE DIM_CustomerId = '{user_id}'"
    n_cuentas = object_connection.cursor.execute(query)[0][0]
    
    if n_cuentas < 10:
        return True
    else:
        return False