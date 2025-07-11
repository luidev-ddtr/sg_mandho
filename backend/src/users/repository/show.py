import sqlite3
# Aun se debe crear el modulo de coneccion de la abse de datos, para que funciona bien esta parte, ya que como tal 
# Esto aun no funciona 
from src.users.repository.bd_prueba import BD_users
class conexion_db:
    def conexion():

        pass
def read(id_user = None, filters = None) -> list:
    """
    Funcion la cual se encargara de ir a la base de datos y buscar los registro y aplicar filtros segun sean necesarios
    Args:
        id_user (str, optional): Id del usuario. Defaults to None.
        filters (dict, optional): Filtros a aplicar. Defaults to None.
    Returns: 
        list: Registros encontrados la cual tendra la siguiente estructura:
        [
            {
                "date_id": str,
                "id_user": str,
                "first_name": str,
                "second_name": str,
                "last_name": str,
                "second_last_name": str,
                "date_of_birth": str,
                "date_user_start": str,
                "date_user_end": str,
                "user_manzana": str,
                "user_street": str,
                "user_number_ext": str
            }
        ]
        # Esta estructura puede cambiar ya que depende que filtros se apliquen la tabla resultante podra cambiar, el objetivo
        # es que sea dinamica. Sin embargo esa implementacion aun no se aplica 

    comments:
        Caso 1: Solo hay id_user - Buscar información específica de un usuario
        Caso 2: Solo hay filters - Aplicar filtros 
        Caso 3: si los filtros tienen solo el campo ninguno solamente se seleccionaran todos los campos y se enviaran esos datos
    """

    if id_user and filters is None:
        # eSTE SERIA EL CODIGO QUE DEBERIA DE TENER
        # conexion, cursor = conexion_db.conexion()
        
        # query = """
        # SELECT *
        # FROM DIM_CUSTOMER   
        # WHERE id = ?
        # """
        # cursor.execute(query, (id_user,))
        # registro = cursor.fetchone()
        
        # if not registro:
        #     print(f"\n⚠️ No se encontró persona con ID {id_user}\n")
        #     return None
        
        # persona = User(**registro)
        
        # datos = [persona.__dict__] #Diccionario con la informacion de la persona dentro

        # return datos

        datas = BD_users()
        for data in datas:
            if data['id_user'] == id_user:
                return data  #para los casos reales tenemos que Segir lo que ya se recibe no podemos
                #simplemente entregar el el formato que se quiere
            
    elif id_user is None and filters is not None:

        if filters == {}:
            data = BD_users()
            return data
        #para los casos reales tenemos que Segir lo que ya se recibe no podemos
                #simplemente entregar el el formato que se quiere
    else:
        return [{}]