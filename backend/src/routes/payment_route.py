
from flask import Blueprint, request, Response
from src.routes.handle_message import send_error, send_success

#importacion del manejo de pagos
from src.payments.payment import PaymentCrud

payment_options = PaymentCrud()

payment_route = Blueprint('payment_route', __name__, url_prefix='/api/payment/')

@payment_route.route('create/', methods=['POST'])
def create_payment():# -> tuple[Any, Literal[400]] | tuple | tuple[Any, Literal[500]]:
    """Endpoint to create a new payment record.
    
    This endpoint expects a JSON payload with payment details.
    """
    try:
        payment_json = request.json
        if not payment_json:
            return send_error("No se recibieron datos", 400)
        
        # Assuming PaymentCrud is defined elsewhere and has an insert_payment method
        estado, mensaje = payment_options.create_payment(payment_json)

        if 200 <= estado <= 205:
            return send_success(mensaje, None, estado)
        else:
            return send_error(mensaje, estado)
    except Exception as e:
        print(f"Error al crear el pago: {e}")
        return send_error(str(e), 500)
    