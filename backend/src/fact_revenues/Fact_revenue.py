from src.fact_revenues.services.service import get_status_payment
from src.fact_revenues.models.fact_revenue import FACT_Revenue
from src.utils.id_generator import create_id
from src.dim_dates.dim_date import DIM_DATE

#importacion para obtener el estado del pago
from src.dim_status.status import DIM_status

# Importacion del handler de movimiento
from src.dim_movement.DIM_movent import DIM_Movement 

handler_movement = DIM_Movement()
handler_status = DIM_status()
class factRevenueCrud():
    def create_fact_revenue(self, data_json: dict):
        """Esta es la funcion que se encargara de crear una nuevo pago, debera validar la informacion y registrar el pago como venga desde el frontend
        Args:
            data_json (dict): Informacion del pago
        """
        try:
            statusName = get_status_payment(data_json['amount'], data_json['FactAmount'])

            estatus_id = handler_status.get_status_id(statusName, "fact_revenue")

            dim_date_data = DIM_DATE()
            #Validar como se debe guardar el pago
            data_format = {
                'FACT_RevenueId': create_id([statusName, data_json['DIM_AccountId'], data_json['FactAmount']]),
                'DIM_DateId': dim_date_data.dateId,
                'DIM_AccountId': data_json['DIM_AccountId'],
                'DIM_ServiceDetailsId': data_json['DIM_ServiceDetailsId'],
                'DIM_MovementId': handler_movement.get_movement_id(data_json['movementName']),
                'DIM_StatusId': estatus_id,
                'amount': data_json['FactAmount']
            }
            
            fact_register = FACT_Revenue(**data_format)

            #fALTA POR AGREGAR A LA BASE DE DATOS LA INFORMACION 
            return 201, "Payment created successfully"
        except Exception as e:
            return 500, f"Error creating payment: {str(e)}"