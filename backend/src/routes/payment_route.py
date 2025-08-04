from flask import Blueprint, request, Response
from src.routes.handle_message import send_error, send_success

# importacion del manejo de pagos
from src.payments.payment import PaymentCrud

payment_options = PaymentCrud()

payment_route = Blueprint('payment_route', __name__, url_prefix='/api/payment/')

@payment_route.route('create/', methods=['POST'])
def create_payment() -> Response:
    """
    Maneja la creación de un nuevo pago a través de una solicitud POST.

    Este endpoint recibe los datos de un pago en formato JSON, los valida y
    los procesa a través de la lógica de negocio de la clase `PaymentCrud`.
    Devuelve una respuesta JSON con el estado de la operación.

    Returns:
        Response: Un objeto de respuesta de Flask que contiene un JSON con el
                  estado HTTP y un mensaje de éxito o error.
    """
    try:
        payment_json = request.json
        if not payment_json:
            return send_error("No se recibieron datos en el cuerpo de la solicitud", 400)
        
        estado, mensaje = payment_options.create_fact_revenue(payment_json)

        if 200 <= estado <= 205:
            return send_success(mensaje, None, estado)
        else:
            return send_error(mensaje, estado)
            
    except Exception as e:
        print(f"Error al crear el pago: {e}")
        return send_error(str(e), 500)
    