from typing import Literal
from src.fact_revenues.services.service import get_status_payment
from src.fact_revenues.models.fact_revenue import FACT_Revenue
from src.utils.id_generator import create_id
from src.dim_dates.dim_date import DIM_DATE

#importacion para obtener el estado del pago
from src.dim_status.status import DIM_status

#importacion para la validacion de cantidad
from src.fact_revenues.services.service import valide_amount

from src.fact_revenues.repository.insert import insert_fact_revenue
# Importacion del handler de movimiento
from src.dim_movement.DIM_movent import DIM_Movement 

handler_movement = DIM_Movement()
handler_status = DIM_status()
class factRevenueCrud():
    def create_fact_revenue(self, data_json: dict) -> tuple[Literal[500], Literal['Error creating payment']] | tuple[Literal[201], Literal['Payment created successfully']]:
        """Esta es la funcion que se encargara de crear una nuevo pago, debera validar la informacion y registrar el pago como venga desde el frontend
        Args:
            data_json (dict): Informacion del pago
        """
        isvalid = valide_amount(data_json['amount'], data_json['DIM_ServiceDetailsId'])

        if not isvalid:
            return 400, "La cantidad registrada no coincide con la del servicio"
        
        statusName = get_status_payment(data_json['amount'], data_json['FactAmount'])

        estatus_id = handler_status.get_status_id(statusName, "fact_revenue")

        dim_date_data = DIM_DATE()
        #Validar como se debe guardar el pago
        data_format = {
            'FACT_RevenueId': create_id([statusName, data_json['DIM_AccountId'], data_json['FactAmount'], data_json['DIM_ServiceDetailsId']]),
            'DIM_DateId': dim_date_data.dateId,
            'DIM_AccountId': data_json['DIM_AccountId'],
            'DIM_ServiceDetailsId': data_json['DIM_ServiceDetailsId'],
            'DIM_MovementId': handler_movement.get_movement_id(data_json['movementName']),
            'DIM_StatusId': estatus_id,
            'amount': data_json['FactAmount']
        }
        
        fact_register = FACT_Revenue(**data_format)
        revenuer = fact_register.to_dict()

        for key, value in revenuer.items():
            print(f"{key}: {value}")

        isvalid = insert_fact_revenue(fact_register)

        if not isvalid:
            return 500, "Error creating payment"
        #fALTA POR AGREGAR A LA BASE DE DATOS LA INFORMACION 
        return 201, "Payment created successfully"