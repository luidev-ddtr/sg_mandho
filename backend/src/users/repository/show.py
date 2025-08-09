from src.utils.conexion import Conexion
from src.users.models.user import User
import sqlite3

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
    object_conection = Conexion() 
    try:
        print(f"Imprimeinto los datos recibidos {id_user} y {filters}")
        #Se instancia la clase para todas las funciones  
        if id_user and filters is None: 
            return get_user(id_user)
        

        elif (filters == {} or filters) and id_user is None:
            if filters == {}:
                conn ,cursor  = object_conection.conexion()
                query = """SELECT * FROM DIM_Customer"""
                cursor.execute(query)
                registros = cursor.fetchall()
                
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
                print("desde show en users")
                return data_format
            else:
                print("No se encontraron registros con los filtros proporcionados")
                pass
        else:
            print("Error inesperado")
            return []
    except sqlite3.Error as e:
        print(f"Error al realizar la consulta: {e}")
        return []
    finally:
        object_conection.close_conexion()
    
def get_user(id_user: str):# -> dict[str, str] | list:
    """
    Funcion para optener la informacion de un usuario en especifico
    Args:
        id_user (str, optional): Id del usuario. Defaults to None.
    Returns:
        list: Con el registro encontrado o error en caso contrario
    """

    print(f"Id de usuario: {id_user}")

    object_conection = Conexion() 
    

    try:
        # Se instancia la clase para todas las funciones  
        conn, cursor = object_conection.conexion()

        # Usando parámetros seguros para evitar SQL injection
        query = """SELECT  
        DIM_CustomerId,
        DIM_DateId,
        CustomerName,
        CustomerMiddleName,
        CustomerLastName,
        CustomerSecondLastName,
        CustomerDateBirth,
        CustomerStartDate,
        CustomerEndDate,
        CustomerFraction,    
        CustomerAddress,
        CustomerNumberext
        FROM DIM_Customer WHERE DIM_CustomerId = ?"""
        cursor.execute(query, (id_user,))

        registros = cursor.fetchall()
        object_conection.close_conexion()

        if registros:  # Si se encontraron resultados
            # Tomamos el primer registro (asumiendo búsqueda por ID devuelve solo 1)
            primer_registro = registros[0]
            
            # Mapeo manual de la tupla a los parámetros de User
            # IMPORTANTE: Asegúrate que el orden de las columnas coincide con tu SELECT *
            registro = User(*primer_registro)
            return registro.to_dict()  # Devuelve el objeto User directamente
        else:
            return []  # O puedes lanzar una excepción si lo prefieres
    
    except sqlite3.Error as e:
        print(f"Error al realizar la consulta: {e}")
        object_conection.close_conexion()
        return []