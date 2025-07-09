# Blueprint del usuario, se hace para separar el codigo y dejar app.py limpio

from flask import Blueprint, request

from src.account.main import AccountCrud


account_options = AccountCrud()

from src.routes.handle_message import send_error, send_success

account_route = Blueprint('account_route', __name__)

#Recordar poner el / si es que los enpoins dan error


account_route.route('/api/account/create', methods=['POST'])
def crate_account():
    """Enpoint el cual servira para crear una nueva cuenta
    debe recibir algunos datos, asi como el ID de la persona

    Terminar de documentar dosctring
    """
    try:
        account_json = request.json()

        if not account_json:
            return send_error("No se recibieron datos", 400)
        
        estado, mensaje = account_options.insert_account(account_json['data'])

        if 200 <= estado <= 205:
            return send_success(mensaje,None, estado)
        else:
            return send_error(mensaje, estado)
    except Exception as e:
        return send_error(str(e), 500)


account_route.route('/api/account/read', methods=['POST'])
def crate_account():
    """
    En este endpoint se se enviara al frontend la informacion de las cuenta
    , se quiere hacer que tenga 2 mods, uno con el id de la persona para solo mostrar un registro, y otro, con el
    que solamente sea para enviar todas las cuentas 
    Args:
        account_json (dict): Un diccionario que contiene la información del usuario.
        None: Si es que la peticion es GET y solamente pide informacion

    Returns:
        llama a la funcion send_error o send_success las cuales no son mas que un acortador de codigo
        pero en si esas funciones se encargan de enviar el mensaje en formato json

    """
    try:

        if request.method == 'GET':
           pass
           # se deja para despues esta implementacion de get


        elif request.method == 'POST':
            account_json = request.json()

            if not account_json:
                return send_error("No se recibieron datos", 400)
            
            estado, mensaje = account_options.insert_account(account_json['data'])

            if 200 <= estado <= 205:
                return send_success(mensaje,None, estado)
            else:
                return send_error(mensaje, estado)
    except Exception as e:
        return send_error(str(e), 500)