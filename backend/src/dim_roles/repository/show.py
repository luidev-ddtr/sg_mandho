from src.utils.conexion import Conexion
from src.dim_roles.models.DIM_role import DIM_ROLE
import sqlite3

def get_role(id_role = str()):# -> DIM_ROLE | list:# -> DIM_ROLE | list:
    """
    Funcion la cual se encarga re obtener un registro con el id asociado
    a ese rol, se obtendra todo el registro completo, en caso de que el rol no exista se retornara un diccionario vacio
    se debera ponde runa valicacion para que si no se encuentre el rol se retorne un diccionario vacio
    Args:
        id_role (str, optional): Id del rol. Defaults to None.
    Returns:
        object: objeto con la informacion del rol
        ejemplo del objeto;
        {
            "DIM_RoleID": "1",
            "RoleName": "estudiante",
            "RoleType": "usuario",
            "RoleStartDate": "2022-01-01",
            "RoleEndDate": "" # End date siempre debe estar bvacio al crear un rol
        }
    """
    object_connection = Conexion()
    try:
        # Consulta con columnas explícitas (ajustadas al número correcto de parámetros)
        query = """SELECT DIM_RoleID, RoleName, RoleType, RoleStartDate, RoleEndDate FROM DIM_Role WHERE DIM_RoleID = ?"""
        # Ejecutar la consulta
        cursor = object_connection.cursor
        cursor.execute(query, (id_role,))

        # Obtener los resultados
        result = cursor.fetchone()
        object_connection.close_conexion()

        if result:  # Si se encontraron resultados
            # Tomamos el primer registro (asumiendo búsqueda por ID devuelve solo 1)
            role = DIM_ROLE(*result)
            return role
        else:
            return []

    except sqlite3.Error as error:
        print(f"Error al obtener el rol: {error}")
        object_connection.close_conexion()
        return []