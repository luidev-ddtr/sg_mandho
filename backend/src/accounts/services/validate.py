#from src.account.models.DIM_account import DIM_account
from src.utils.conexion import Conexion

def validate_account(user_id: str) -> bool:
    """Funcion la cual debera hacer una consulta a la base de datos para veficiar que no se pase el limite de cuentas
    el limite de cuentas es de 10, la funcion hara una consulta sql y verificara cuentas cuentas con esa persona hay
    
    Args:
        user_id (str): El id de la persona

    returns:
        bool: retorna false si se pasa el limite de cuentas, si no retorna false
    """
    object_connection = Conexion()
    #Se hace la conexion Verificar si funciona esta funcion
    query = f"SELECT COUNT(*) FROM DIM_account WHERE DIM_CustomerId = '{user_id}'"
    object_connection.cursor.execute(query)
    result = object_connection.cursor.fetchone()  # Obtiene la primera fila de resultados
        
    if result is None: # No hay cuentas asociadas a este id
        return True
    
    account_count = result[0]  # El COUNT(*) es el primer elemento de la tupla
    # Verificar el límite (menor a 10)
    return account_count < 10
    