from src.dim_servicedetails.repository.show import get_amount_by_id

def get_status_payment(cost_service: float, amount: float) -> str:
    """Determina el estado de pago de un servicio.

    Compara el costo total del servicio con el monto pagado para definir
    el estado. Si el monto pagado es igual al costo, el estado es "pagado".
    Si el monto pagado es menor, el estado es "pendiente".

    Args:
        cost_service (float): El costo total del servicio.
        amount (float): El monto que se ha pagado por el servicio.

    Returns:
        str: Retorna "pagado" si el monto coincide, o "pendiente" si el
             monto es menor al costo del servicio.
    """
    estado = cost_service - amount
    if estado == 0:
        data = "pagado"
    elif estado > 0:
        data = "pendiente"
    
    return data


def valide_amount(amount: float, id_amount: str) -> bool:
    """Valida si un monto recibido coincide con el valor registrado en la base de datos.

    Utiliza el ID de un servicio para buscar su monto correspondiente en la base de datos
    y lo compara con el monto proporcionado.

    Args:
        amount (float): El monto a validar.
        id_amount (str): El ID del detalle del servicio a consultar en la base de datos.

    Returns:
        bool: Retorna True si el monto coincide, o False si no hay coincidencia
              o si no se encuentra el ID en la base de datos.
    """
    amount_table = get_amount_by_id(id_amount)

    print(f"amount_table en fact_revenues: {amount_table}, cantidad: {amount}")
    if not amount_table:
        return False
    
    return amount_table == amount