def get_status_payment(cost_service, amount) -> dict:
    """
    Funcion la cual se encargara de guardar el registro con un estado de pago dependiendo de como venga la informacion
    Args:
        cost_service (float): Costo del servicio
        amount (float): Monto pagado
    Returns:
        str: Retorna un string con la informacion del estado"""
    # if payment_status is not None:
    #     if payment_status == "pagado":
    #         data = "pagado"
    #     else:
    #         data = "pendiente"
    #     return data

    estado = cost_service - amount
    if estado == 0:
        data = "pagado"
    elif estado > 0:
        data = "pendiente"
    
    return data