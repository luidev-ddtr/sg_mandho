from typing import Any, Literal
from src.utils.validate_data import validate_data
from src.fact_revenues.Fact_revenue import factRevenueCrud 
from src.dim_servicedetails.serviceDetails import ServiceDetailsCrud
from src.dim_serviceonwers.dim_serviceOnwers import DIM_ServiceOnwersCrud

# Se importa la funcion para obtener el id de detalles del servicio
from src.dim_servicedetails.repository.show import get_service_detailsIS_by_ServiceType

fact_revenue_handler = factRevenueCrud()
dim_service_details_handler = ServiceDetailsCrud()
handler_dim_service_owner = DIM_ServiceOnwersCrud()

class PaymentCrud:
    """Clase para manejar las operaciones CRUD de pagos."""

    def create_fact_revenue(self, data_json: dict) -> tuple[int, Any]:
        """Crea un nuevo registro de pago en la tabla FACT_Revenue.

        Esta función valida los datos de entrada, obtiene los IDs de servicios
        necesarios e inserta el registro de pago en la base de datos.

        Args:
            data_json (dict): Un diccionario con los datos del pago. Debe contener los
                              campos requeridos.

        Returns:
            tuple[int, Any]: Una tupla con el código de estado HTTP y un mensaje.
                             - (400, "message"): Datos faltantes o inválidos.
                             - (500, "message"): Error interno del servidor.
                             - (201, "message"): Pago creado exitosamente.
        """
        #pasar amount a float
        data_json['amount'] = float(data_json['amount'])
        data_json['FactAmount'] = float(data_json['FactAmount'])
        fields_required = ['DIM_OnwerCustomerId', 'DIM_AccountId', 'DIM_CustomerId', 'ServiceName', 'serviceDetailsType', 'amount', 'AnioPago', 'FactAmount','movementName']
        type_fields = [str, str, str, str, str, float, int, float, str]

        is_valid, message = validate_data(data_json, fields_required, type_fields, "payment")

        if not is_valid:
            return 400, message
        
        try:
            # Obtener el ID del detalle del servicio
            dim_service_detail_id = get_service_detailsIS_by_ServiceType(data_json['serviceDetailsType'])
            
            # Si el ID no existe, devolver un error
            if not dim_service_detail_id:
                return 400, f"serviceDetailsType '{data_json['serviceDetailsType']}' no se encontró."

            data_json['DIM_ServiceDetailsId'] = dim_service_detail_id

            # Crear el registro de ingresos en la tabla de facturación
            code, message = fact_revenue_handler.create_fact_revenue(data_json)
            
            if code != 201:
                return code, message

            return 201, "Pago creado satisfactoriamente"
        
        except Exception as e:
            # Capturar cualquier excepción inesperada y devolver un error del servidor
            return 500, f"Error creando el pago: {str(e)}"