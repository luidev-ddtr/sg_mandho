# Blueprint del usuario, se hace para separar el codigo y dejar app.py limpio

from typing import Literal
from flask import Blueprint, request
from flask.wrappers import Response
from src.accounts.account import AccountCrud
from src.users.user import UserCrud

from src.routes.handle_message import send_error, send_success

#Importaciones para crear cuenta

account_options = AccountCrud()
personas = UserCrud()

account_route = Blueprint('account_route', __name__,url_prefix='/api/account/')

@account_route.route('create/', methods=['POST'])
def crate_account():# -> tuple[Response, Literal[400]] | tuple[Response, Any] | tuple[Response, Literal[500]]:
    """Enpoint el cual servira para crear una nueva cuenta
    debe recibir algunos datos, asi como el ID de la persona

    Terminar de documentar dosctring
    """
    try:
        account_json = request.json

        if not account_json:
            return send_error("No se recibieron datos", 400)
        
        print(account_json)
        estado, mensaje = account_options.insert_account(account_json)

        if 200 <= estado <= 205:
            return send_success(mensaje,None, estado)
        else:
            return send_error(mensaje, estado)
    except Exception as e:
        print(f"Error al crear la cuenta: {e}")
        return send_error(str(e), 500)


@account_route.route('read/', methods=['POST'])
def read_account() -> tuple[Response, Literal[400]] | tuple[Response, int] | tuple[Response, Literal[500]] | None:
    """
    En este endpoint se se enviara al frontend la informacion de las cuenta
    , se quiere hacer que tenga 2 mods, uno con el id de la persona para solo mostrar un registro, y otro, con el
    que solamente sea para enviar todas las cuentas 
    Args:
        account_json (dict): Un diccionario que contiene la información del usuario. El cual puede ir vacio, lo que significa que se queiren ver las cuentas en general
        
    Returns:
        llama a la funcion send_error o send_success las cuales no son mas que un acortador de codigo
        pero en si esas funciones se encargan de enviar el mensaje en formato json

    """
    try:
        account_json = request.json

        if not account_json:
            return send_error("No se recibieron datos", 400)
        
        persona_id = account_json['id_user']
        
        estado, mensaje, datos = account_options.read_account(persona_id)
        if 200 <= estado <= 205:
            return send_success(mensaje,datos, estado)
        else:
            return send_error(mensaje, estado)
    except Exception as e:
        print(e)
        return send_error(str(e), 500)