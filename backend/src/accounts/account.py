# Importaciones generale sobre la parte de cuentas
from src.utils.validate_data import validate_data
from src.dim_dates.dim_date import DIM_DATE
from src.utils.id_generator import create_id

# importaciones espeficias de insert_account
from src.accounts.repository.insert import insert
from src.accounts.services.validate import validate_account
from src.accounts.models.DIM_account import DIM_Account
from src.dim_status.status import DIM_status

#Importaciones de mostrar o leer ceuntas
from src.accounts.repository.show import show_account
from src.accounts.services.validate import convertir_a_formato_legible, validate_status

#importacion de roles
from src.dim_roles.role import Role

#Manejadro de los roles para cuenta, ya que es a donde esta asociado
handler_role = Role()

class AccountCrud():
    """
    Clase la cual sera el metodo principal de la parte de cuentas
    contara con todas las funcionalides principales, ya sea crear, actualizar, leer, eliminar

    AUN SE DEBEN CORREGIR VARIOS ERRORES RELACIONADOS CON LA CUENTA Y LOS USUARIOS
    """
    def insert_account(self, account_json = dict[str: str|int]) -> tuple: 
        """
        Funcion la cual se encarga de la opcion create 
        Tiene todo lo nesesario, hace las validaciones, y si toda la informacion esta bien retorna 
        un 200 y mensaje de exito aqui se deben hacer 2 particones principales , primera es para poder crear el estado, el cual 
        se eligira por el usuario 

        Args:
            account_json (dict): Un diccionario que contiene la información del usuario.

        Returns:
            int: Se retorna un codigo de error o exito
            str: Se retorna un string de error o exito especifico de que falto o si esta bien
        """
        
        # Validamos si el estatus es ativo
        campos = ["status", "customer_id", "start_date", "end_date"]
        tipo_campos = [str, str, str, str]
        
        resultado, mensaje = validate_data(account_json,campos, tipo_campos, "account")
        
        if resultado:
            #Creamos la instancia de clases que se ingresaran a la bd
            dim_date = DIM_DATE()
            
            # Se crea el rol asociado y se obtiene el id
            valid, dim_role_id, message = handler_role.insert_role(account_json)
            
            print(f"El id del rol es: {dim_role_id} {message} {valid}")
            if not valid:
                print("Termino porque no era valido al insertr el rol")
                return 501, message
            
            
            #Estatus sera para ver si el pago ya esta pendiente o pagado, los roles seran los que tomaran la fucniona ctual de estatus
            estado = DIM_status()
            valido = validate_account(account_json["customer_id"])
            
            #Validaciones para ver si la cuenta debe ser activa u inactiva
            status_name = estado.get_status_id("","account")

            is_active, Status, EndDate = validate_status(account_json["status"])  

            #En caso de no ser activas las variables se asignan como desactivadas
            if not is_active:
                status_id = Status
                account_json["end_date"] = EndDate
            else:

                status_id = status_name
            if estado and dim_date and valido:
                
                account_data = {
                    "DIM_AccountId": create_id([dim_role_id, account_json["customer_id"], dim_date.dateId]),
                    "DIM_DateId": dim_date.dateId, 
                    "DIM_CustomerId": account_json["customer_id"],
                    "DIM_RoleId": dim_role_id,
                    "DIM_StatusId":  status_id, 
                    "StartDate": account_json["start_date"],
                    "EndDate": account_json["end_date"]
                    # timestamp se omite para que se genere automáticamente
                }
                
                # Ingresar los datos a la base de datos 
                cuenta = DIM_Account(**account_data)
                
                request, message = insert(cuenta)

                if request:
                    mensaje = "Cuenta creada con exito"
                    return 200, mensaje
                else:
                    return 501, f"Error inesperado: {message}"
            else:
                print("Termino por que estado, o dim_date o valido es falso")
                return 501, mensaje
        else:
            return 400, mensaje
        
        
    def read_account(self, persona_id: str = None) -> tuple[int, str, list]:
        """
        Esta función retorna información de cuentas. Puede manejar tres escenarios:
        1. Cuando no se proporciona ID (None) - Retorna todas las cuentas
        2. Cuando se proporciona un ID vacío ("") - Retorna todas las cuentas
        3. Cuando se proporciona un ID válido - Retorna información específica de esa cuenta

        La información se retorna en un formato legible para el cliente, donde los IDs
        son reemplazados por información descriptiva cuando es necesario.

        Args:
            persona_id (str, optional): El id de la cuenta que se desea mostrar. 
                                    Si es None o vacío (""), retorna todas las cuentas.
                                    Defaults to None.

        Returns:
            tuple: Contiene tres elementos:
                - int: Código de estado (200 para éxito, 400 para error)
                - str: Mensaje descriptivo del resultado
                - list: Lista de diccionarios con información de las cuentas, 
                        cada diccionario contiene:
                        {
                            "DIM_AccountId": str,  # ID de la cuenta
                            "DIM_DateId": str,     # Información legible de fecha
                            "customer_id": str,    # ID del cliente
                            "DIM_RoleId": str,     # Rol legible (ej: "Admin", "Usuario")
                            "DIM_StatusId": str,  # Estado legible (ej: "Activo", "Inactivo")
                            "startDate": str,      # Fecha de inicio en formato YYYY-MM-DD
                            "endDate": str,        # Fecha de fin en formato YYYY-MM-DD
                        }
                        
                        Si no se encuentran cuentas, retorna lista vacía []

        Ejemplo de retorno exitoso:
            (200, "Datos obtenidos correctamente", [
                {
                    "DIM_AccountId": "1qwger$whtwefa",
                    "DIM_DateId": "Enero 2022 - Diciembre 2022",
                    "customer_id": "weargsrheynbFGTGFHTWRg",
                    "DIM_RoleId": "Administrador",
                    "DIM_StatusId": "Activo",
                    "startDate": "2022-01-01", 
                    "endDate": "2022-12-31",
                }
                # ... más registros
            ])

        Ejemplo de error:
            (400, "No se encontraron cuentas", [])
        """
        campos_requeridos = ["id_user"]
        tipo_campos = [str]
        esvalido, mensaje = validate_data(persona_id, campos_requeridos, tipo_campos, "account")

        if esvalido:
            if persona_id['id_user']:
                # Caso: Mostrar cuenta específica
                
                datos = show_account(persona_id['id_user'])
                if datos:
                    # Aquí se transformarían los IDs a información legible
                    datos_legibles = convertir_a_formato_legible(datos)
                    return 200, "Cuenta obtenida correctamente", datos_legibles
                else:
                    mensaje = "No se encontró la cuenta especificada"
                    return 404, mensaje, []
        else:
            return 400, mensaje, []
