from src.utils.conexion import Conexion

def insert(data:object)  -> bool:
    """
    Esta funcion se encargara de insertar una cuenta en la base de datos, para cuando se inrtes, ya se habran hechos todas las 
    validaciones y rekacciiones correspondientes con otras tablas de la base de datos
    """
    object_conecction = Conexion()
    try:
        
        # Consulta con columnas explícitas (ajustadas al número correcto de parámetros)
        query = """
        INSERT INTO DIM_Account (
            DIM_AccountId,
            DIM_DateId,
            DIM_CustomerId,
            DIM_RoleId,
            DIM_StatusId,
            StartDate,
            EndDate 
            ) VALUES (?,?,?,?,?,?,?)
            """
        values = (
            data.DIM_AccountId,
            data.DIM_DateId,
            data.DIM_CustomerId,
            data.DIM_RoleId,
            data.DIM_StatusId,
            data.StartDate,
            data.EndDate
        )
        object_conecction.cursor.execute(query, values)
        object_conecction.save_changes()
        object_conecction.close_conexion()
        print("Rol insertado correctamente. Desde src.accounts.repository.insert_account")
        return True, ""
    except Exception as e:
        object_conecction.close_conexion()
        print(e)
        return False, str(e)