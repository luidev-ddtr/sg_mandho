# Importaciones generale sobre la parte de cuentas
from src.utils.validate_data import validate_data
from src.utils.dim_date import DIM_DATE
from src.utils.id_generator import create_id

# importaciones espeficias de insert_account
from src.account.services.create import create_status
from src.account.models.DIM_account import DIM_account

class AccountCrud():
    """
    Clase la cual sera el metodo principal de la parte de cuentas
    contara con todas las funcionalides principales, ya sea crear, actualizar, leer, eliminar
    """
    def insert_account(self, account_json= dict) -> tuple: 
        """
        Funcion la cual se encarga de la opcion create 
        Tiene todo lo nesesario, hace las validaciones, y si toda la informacion esta bien retorna 
        true y si no retorna false
        """
        
        # Validamos si el estatus es ativo
        campos = ["status", "customer_id", "start_date", "end_date"]
        tipo_campos = [str, str, str, str]
        
        resultado, mensaje = validate_data(account_json,campos, tipo_campos, "account")
        
        if resultado:
            #Creamos la instancia de clases que se ingresaran a la bd
            dim_date = DIM_DATE()
        
            estado = create_status(account_json["status"])
            
            if estado and dim_date:
                
                account_data = {
                    "dim_account_id": create_id( [account_json["start_date"], account_json["end_date"], None]),
                    "dim_date_id": dim_date.dateId,
                    "dim_customer_id": account_json["customer_id"],
                    "dim_status_id": estado.dim_status_id,
                    "start_date": account_json["start_date"],
                    "end_date": account_json["end_date"]
                }
                
                mensaje = "Cuenta creada con exito"
                
                # Ingresar los datos a la base de datos 
                cuenta = DIM_account(**account_data)
                
                return 200, mensaje
            else:
                
                return 501, mensaje
        else:
            return 400, mensaje
    