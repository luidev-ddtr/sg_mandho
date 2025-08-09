#from src.account.models.DIM_account import DIM_account
from src.utils.conexion import Conexion

#Importaciones de mostrar o leer ceuntas
from src.users.repository.show import get_user
from src.dim_roles.repository.show import get_role
from src.dim_status.status import DIM_status

#importacion de roles
from src.dim_roles.role import Role

#Manejadro de los roles para cuenta, ya que es a donde esta asociado
handler_role = Role()

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
    



def convertir_a_formato_legible(datos_crudos: list) -> list:
    """
    Función interna para convertir IDs a información legible para el usuario.
    
    Args:
        datos_crudos (list): Lista de diccionarios con datos crudos de la DB
    
    Returns:
        list: Lista de diccionarios con información legible
    """
    estado = DIM_status()
    datos_legibles = []
    for cuenta in datos_crudos:
        print("Dim role de la cuenta", cuenta.DIM_RoleId)
        persona = get_user(cuenta.DIM_CustomerId)
        rol = get_role(cuenta.DIM_RoleId)
        status = estado.get_status(cuenta.DIM_StatusId) 
        if not persona or not rol or not status:
            return {}
        
        legible = {
            "DIM_AccountId": cuenta.DIM_AccountId,
            # "DIM_DateId": self._formatear_fecha(cuenta.get("date_id")), Registro interno, no se envia
            "DIM_CustomerId": persona["CustomerName"] + " " + persona["CustomerMiddleName"] + " " + persona["CustomerLastName"] + " " + persona["CustomerSecondLastName"],
            "DIM_RoleId": rol.RoleName,
            "DIM_StatusId": status[1],  #para el nombre
            "startDate": cuenta.StartDate,
            "endDate": cuenta.EndDate
        }
        datos_legibles.append(legible)
    return datos_legibles

