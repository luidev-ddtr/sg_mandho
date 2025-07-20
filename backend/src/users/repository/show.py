from src.utils.conexion import Conexion

#Se instancia la clase para todas las funciones 
object_conection = Conexion() 

def read(id_user = str(), filters = {} ) -> list:
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
        Caso 2: si los filtros tienen solo el campo ninguno solamente se seleccionaran todos los campos y se enviaran esos datos
        Caso 3: Solo hay filters - Aplicar filtros 
    """
    if id_user and filters is None: 
        
        query = f"""SELECT * FROM DIM_Customer WHERE DIM_CustomerId  = '{str(id_user)}'"""
        object_conection.cursor.execute(query)
        registros = object_conection.cursor.fetchall()

        return [registros]
            
    elif (filters == {} or filters) and id_user is None:
        if filters == {}:
            query = """SELECT * FROM DIM_Customer"""
            object_conection.cursor.execute(query)
            
            registros = object_conection.cursor.fetchall()
            
            data_format = []
            #Registros mapeados a como deben de llamarse en el frontend
            for registro in registros:
                #Mapeado a como se enviaran en el frontend
                persona = {
                    "id_user": registro[0],
                    "date_id": registro[1],
                    "first_name": registro[2],
                    "second_name": registro[3],
                    "last_name": registro[4],
                    "second_last_name": registro[5],
                    "date_of_birth": registro[6],
                    "date_user_start": registro[7],
                    "date_user_end": registro[8],
                    "manzana": registro[9],
                    "street": registro[10],
                    "number_ext": registro[11]
                }
                data_format.append(persona)
            return data_format
        else:
            pass
    else:
        return []