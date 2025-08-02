from src.utils.validate_data import validate_data

from src.fact_revenues.Fact_revenue import factRevenueCrud 
from src.dim_servicedetails.serviceDetails  import ServiceDetailsCrud
from src.dim_serviceonwers.dim_serviceOnwers import DIM_ServiceOnwersCrud

fact_revenue_handler = factRevenueCrud()
dim_service_details_handler = ServiceDetailsCrud()
handler_dim_service_owner = DIM_ServiceOnwersCrud()

class PaymentCrud:
    """Class to handle CRUD operations for payments."""


    def create_payment(self, data_json: dict):# -> tuple[Literal[400], Any] | tuple | tuple[Literal[500], str] | tuple[Literal[201], Literal['Payment created successfully']]:
        """Create a new payment record."""
        fields_required = ['DIM_OnwerCustomerId', 'DIM_AccountId', 'DIM_CustomerId', 'ServiceName', 'serviceDetailsType', 'amount', 'AnioPago', 'FactAmount','movementName']
        type_fields = [str, str, str, str, str, float, int, float, str]

        is_valid, message = validate_data(data_json, fields_required, type_fields, "payment")

        if not is_valid:
            return 400, message
        
        else:
            try:
                #Separar la informacion de pago para diferentes tablas
                
                # Para el servicio y detalles del servicio
                status_code, dim_sercice_detaild_id = dim_service_details_handler.insert_service_details(data_json)
                
                if status_code != 201:
                    print(f"El estado {status_code}  Mensaje: {message}, pertenece a la tabla de detalles de servicio")
                    return status_code, dim_sercice_detaild_id
                
                data_json['DIM_ServiceDetailsId'] = dim_sercice_detaild_id #Se agrega el nuevo servicio detalles id al json
                # Para el servicio de facturCION
                code, message = fact_revenue_handler.create_fact_revenue(data_json) #SE pasa toda la informacion 

                if code != 201:
                    print(f"El estado {code}  Mensaje: {message}, pertenece a la tabla de facturacion")
                    return code, message
                
                # Para el propietario del servicio
                code, message = handler_dim_service_owner.insert_service_owner(data_json)
                if code != 201:
                    print(f"El estado {code}  Mensaje: {message}, pertenece a la tabla de propietarios")
                    return code, message
                
                return 201, "Payment created successfully"
            except Exception as e:
                return 500, f"Error creating payment: {str(e)}"