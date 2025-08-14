from src.users.user import UserCrud

def test_descativate_user() -> None:
    """ESTE TEST ESTA RARO, yA QUE DICE QUE NO SE CORRIO NINGUN TEST. sIN EMNARGO YA S EPROBO LA FUNCIONALIDAD NADAMAS AHORA SE VERIFICARA QUE SI FUNCIONE CORRECTAMENTE
    """
    user_options = UserCrud()
    data = { "DIM_CustomerId": "162671ab-432a-507f"}
    estado , mensaje, informacion = user_options.defuncion_user(data)

    print(f"""El estado {estado}  Mensaje: {mensaje}, la informacion {informacion}""")
    assert estado == 400