from typing import Any, Literal
from src.utils.conexion import Conexion

def insertar_role(rolename: str)  -> tuple[Literal[True], Any] | tuple[Literal[False], Literal['']] | None:
    """Método responsable de insertar un rol a la base de datos
    
    Tabla: Table DIM_Role {
        "DIM_RoleID" uuid [pk]
        "RoleName" varchar(50)
        "RoleType" varchar(50)
        "RoleStartDate" date
        "RoleEndDate" date
        "timestamp" timestamp # Se genera en la bd
    }

    Args:
        data (object): Instancia de la clase rol con los datos a insertar
        
    Returns:
        bool: True si se insertó correctamente, False si hubo error
    """
    object_conecction = Conexion()
    try:
        # Consulta con columnas explícitas (ajustadas al número correcto de parámetros)
        query = f"""
        SELECT DIM_RoleId FROM DIM_Role WHERE RoleName = '{rolename}'"""


        object_conecction.cursor.execute(query)
        
        id = object_conecction.cursor.fetchone()
        object_conecction.close_conexion()
        print(f"ID obtenido: {id}")
        if id is not None:
            return True, id[0]
        else:
            print(f"ID obtenido: {id}, y su tipo es: {type(id)}")
            return False, ""
        
    except Exception as e:
        print(e)
        object_conecction.close_conexion()
        return False, ""
