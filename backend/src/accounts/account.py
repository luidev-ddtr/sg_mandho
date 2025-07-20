# Importaciones generale sobre la parte de cuentas
from src.utils.validate_data import validate_data
from src.dim_dates.dim_date import DIM_DATE
from src.utils.id_generator import create_id

# importaciones espeficias de insert_account
from src.accounts.services.get_status import create_status
from src.accounts.models.DIM_account import DIM_account
from src.accounts.repository.show import show_account
from src.accounts.services.get_status import validate_account

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
            dim_role = 
            estado = create_status(account_json["status"]) # Retorna la instancia de la clase DIM_status para que aqui sea donde
                                                    # se inserte en la bd   
            valido = validate_account(account_json["customer_id"])

            if estado and dim_date and valido:
                
                account_data = {
                    "DIM_AccountId": create_id([account_json["start_date"], account_json["end_date"], None]),
                    "DIM_DateId": dim_date.DIM_DateId,  # Asumo que dim_date también sigue el mismo patrón de nombres
                    "DIM_CustomerId": account_json["customer_id"],
                    "DIM_RoleId": None,  # Añadido ya que es campo obligatorio en el modelo (falta en tu data original)
                    "DIM_StatusId": estado.DIM_StatusId,  # Asumo que 'estado' sigue el mismo patrón
                    "StartDate": account_json["start_date"],
                    "EndDate": account_json["end_date"]
                    # timestamp se omite para que se genere automáticamente
                }
                
                # Ingresar los datos a la base de datos 
                cuenta = DIM_account(**account_data)
                
                mensaje = "Cuenta creada con exito"
                return 200, mensaje
            else:
                
                return 501, mensaje
        else:
            return 400, mensaje
        
    
    def read_account(self, persona_id = str) -> tuple[int, str, list]:
        """
        Esta funcion es simple, solamente retornara cuentas, y si no el string que recibe 
        es none o vacio retornara todas las cuentas, y si si tiene un id valido retornara la informacion
        de esa cuenta

        Args:
            persona_id (str): El id de la cuenta que se desea mostrar

        Returns:
            int: Se retorna un codigo de error o exito
            str: Se retorna un string de error o exito especifico de que falto o si esta bien
            list: Se retorna un alista la cual debe contener en su interior los diccionarios que contengan la ifnomaccion de las cuentas asociadas
            se debe respetar este formato, ya que es asi como se pide en el frontend
        """
        campos_requeridos = ["id_user"]
        tipo_campos = [str]
        esvalido, mensaje = validate_data(persona_id, campos_requeridos, tipo_campos, "account")
        
        if esvalido:
            if persona_id['id_user'] == "":
                datos = show_account(None)
                if datos:
                    return 200, mensaje, datos
                else:
                    mensaje = "No se encontraron cuentas"
                    return 400, mensaje, [] 
                
            elif persona_id['id_user']:
                datos = show_account(persona_id['id_user'])

                if datos:
                    return 200, mensaje, datos
                else:
                    mensaje = "No se encontraron cuentas"
                    return 400, mensaje, []
        else:
            return 400, mensaje, []

    