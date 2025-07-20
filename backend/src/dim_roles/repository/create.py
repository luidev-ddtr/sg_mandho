from src.utils.conexion import Conexion

def insert_role(data: object) -> None:
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
        query = """
        INSERT INTO DIM_Role (
            DIM_RoleID,
            RoleName,
            RoleType,
            RoleStartDate,
            RoleEndDate
        ) VALUES ( ?, ?, ?, ?, ?)"""

        values = (
            data.DIM_RoleID,
            data.RoleName,
            data.RoleType,
            data.RoleStartDate,
            data.RoleEndDate,
        )
        object_conecction.cursor.execute(query, values)
        object_conecction.save_changes()
        object_conecction.close_conexion()
        print("Rol insertado correctamente.")
        return True
    except Exception as e:
        print(e)
        object_conecction.close_conexion()
        return False
