# funcion la cual hara una busqueda de las cuentas que tengan usuario adminsitrador, ademas tambient raera la informacion del 
# usuario asociado a esa cuenta
from typing import Any
from src.utils.conexion import Conexion
# from src.accounts.models.DIM_account import DIM_Account
# from src.users.models.user import User

def get_admin_account() -> list[Any] | None:
    """
    Obtiene la información de cuentas administrativas junto con los datos de las personas asociadas.
    Filtra por el rol de administrador (DIM_RoleId = 'dbae332e-87a9-5fc3')
    Devuelve los datos combinados de cuenta y persona.
    """
    object_connection = Conexion()
    query = """
    SELECT 
        acc.DIM_AccountId,
        acc.DIM_CustomerId,
        acc.StartDate as AccountStartDate,
        acc.EndDate as AccountEndDate,
        cust.CustomerName,
        cust.CustomerMiddleName,
        cust.CustomerLastName,
        cust.CustomerSecondLastName,
        cust.CustomerDateBirth,
        rol.RoleName,
        stat.StatusName
    FROM 
        DIM_Account acc
    JOIN 
        DIM_Customer cust ON acc.DIM_CustomerId = cust.DIM_CustomerId
    JOIN 
        DIM_Role rol ON acc.DIM_RoleId = rol.DIM_RoleId
    LEFT JOIN 
        DIM_Status stat ON acc.DIM_StatusId = stat.DIM_StatusId
    WHERE 
        acc.DIM_RoleId = 'dbae332e-87a9-5fc3'
    ORDER BY 
        acc.StartDate DESC
    """
    
    try:
        object_connection.cursor.execute(query)
        row = object_connection.cursor.fetchone()  # Usamos fetchone ya que solo se debe obtener un regiastro para obtener todos los registros
        
        # # Mejor formato para imprimir los resultados
        #     print("-" * 50)
        #     print(row)
        #     print("-" * 50)
        #     print(f"\nCuenta ID: {row[0]}")
        #     print(f"Nombre: {row[3]} {row[4]} {row[5]} {row[6]}")
        #     print(f"Rol: {row[8]}")
        #     print(f"Estado: {row[9] if row[9] else 'No especificado'}")
        data_format = {
            'DIM_AccountId': row[0],
            'DIM_CustomerId': row[1],
            'UserFullName': f"{row[4]} {row[5]} {row[6]}",
            'RoleName': row[8],
            'StatusName': row[9] if row[9] else 'No especificado'
        }
        return data_format
        
    except Exception as e:
        print(f"Error al ejecutar la consulta: {e}")
        return None
        
    finally:
        object_connection.close_conexion()
