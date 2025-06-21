# Blueprint del usuario, se hace para separar el codigo y dejar app.py limpio

from flask import Blueprint, request

from src.users.main import Crud

user_options = Crud()

#Traer mensje de error dinamicos 
from src.routes.handle_message import send_error, send_success

user_route = Blueprint('user_route', __name__)

@user_route.route('/create', methods=['POST'])
def create_user():
    """
    Este endpoint se encargara de crear un nuevo usuario aunque no tiene argumentos si se conecta mediante
    la api create
    
    Args:
        user_json (dict): Un diccionario que contiene la información del usuario.
    
    Returns:
        llama a la funcion send_error o send_success las cuales no son mas que un acortador de codigo
        pero en si esas funciones se encargan de enviar el mensaje en formato json
        
        dict: Un diccionario con la respuesta de la API, incluyendo:
            - el estado de la petición (por ejemplo, 200 para éxito).
            - el mensaje de éxito o de error.
            
    """
    try:
        user_json = request.json()
        
        if not user_json:
            return send_error("No se recibieron datos", 400)
        
        
        estado, mensaje = user_options.insert_user(user_json)
        
        if 200 <= estado < 300:
            return send_success(mensaje, estado)
        else:
            return send_error(mensaje, estado)
        
    except Exception as e:
        return send_error(str(e), 500)
    