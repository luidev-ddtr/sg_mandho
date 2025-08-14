from typing import Any

from src.utils.conexion import Conexion
from src.accounts.models.DIM_account import DIM_Account
def show_account(account_id: str|None) -> list[DIM_Account]|list[Any]:
    """
    Funcion la cual se engara de obtener la informacion de la cuenta que se desea mostrar
    recibe un parametro si el parametro es none devuelve toda la informacion de las cuentas
    y si es string busca las cuentas las cuales tengan ese id_persona asociado y las devuelve

    Args:
        account_id (str|None): El id de la cuenta que se desea mostrar

    Returns:
        dict[str, str]: La informacion de la cuenta

    constrains:
            Si no se encuentra el id se retorna un diccionario vacio
    """

    if account_id is None:
        conecion = Conexion()

        query = f"SELECT * FROM DIM_Account"
        conecion.cursor.execute(query)

        accounts = conecion.cursor.fetchall()

        conecion.close_conexion()
        print("Datos crudos de la bd: ", accounts)
        if accounts:
            return [DIM_Account(*account) for account in accounts]
        else:
            return []
        
    elif account_id:
        conecion = Conexion()

        query = f"SELECT * FROM DIM_Account WHERE DIM_CustomerId = ?"
        conecion.cursor.execute(query, (account_id,))

        accounts = conecion.cursor.fetchall()

        conecion.close_conexion()
        if accounts:
            
            return [DIM_Account(*account) for account in accounts]
        else:
            return []