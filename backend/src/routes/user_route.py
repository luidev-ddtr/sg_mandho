# Blueprint del usuario, se hace para separar el codigo y dejar app.py limpio

from flask import Blueprint, request

from src.users.user import UserCrud

user_options = UserCrud()

#Traer mensje de error dinamicos 
from src.routes.handle_message import send_error, send_success

user_route = Blueprint('user_route', __name__)

"""
Si los entopins llegan a no funcionar probar agregando un / Slash
"""
@user_route.route('/api/user/create_user/', methods=['POST'])
def create_user():
    """
    Este endpoint se encargara de crear un nuevo usuario aunque no tiene argumentos si se conecta mediante
    la api create
    
    Args:
        user_json (dict): Un diccionario que contiene la información del usuario.
    
    Returns:
        llama a la funcion send_error o send_success las cuales no son mas que un acortador de codigo
        pero en si esas funciones se encargan de enviar el mensaje en formato json
        
        Se debe cambiar esta parte ya que la api ahira reuqiere obligatoriamente estos campos
        USUARIO VALIDO 
        {
        "success": true,
        "id": "12345abcde",  // El ID del usuario creado
        "message": "Usuario registrado exitosamente"
        }

        USUARIO NO VALIDO
        {
        "success": false,
        "message": "El o EL ERROR QUE HAYA HABIDO ya está registrado",
        "errors": {
            "email": "El correo ya existe"
                }
        }
        dict: Un diccionario con la respuesta de la API, incluyendo:
            - el estado de la petición (por ejemplo, 200 para éxito).
            - el mensaje de éxito o de error.
            
    """
    try:
        user_json = request.json

        #print(user_json)
        if not user_json:
            return send_error("No se recibieron datos", 400)
        
        
        estado, mensaje, persona_id = user_options.insert_user(user_json['data'])
        
        if 200 <= estado <= 205:
            data = {
                "success": True,
                "id": persona_id,
                "message": mensaje
            }
            print(mensaje)
            return send_success(None, data,estado)
        else:
            print(mensaje)
            return send_error(mensaje, estado)
        
    except Exception as e:
        print(e)
        return send_error(str(e), 500)




@user_route.route("/api/user/read_user/", methods=["POST"])  # Sin slash
def send_info():
    """
    Endpoint de prueba para ver si funciona la configuracion con el backend
    
    Returns:
        dict: Un diccionario con la información de prueba
        este diccionario esta serializado para ser Json
    """
    try:
        request_data = request.json

        if not request_data:
            return send_error("No se recibieron datos", 400)
        
        state, message, data = user_options.read_user(request_data['data'])
        print(state)
        if 200 <= state <= 206:
            print(f'{message}-{data}-{state}')
            return send_success(message, data, 200)
        else:
            return send_error(message, state)
        
    except Exception as e:
        print(e)
        return send_error(str(e), 500)
    

"""
Informacion de rpeuba para enviar al frontend

        info_prueba = [{
            "id": "fsdng12fcs",
            "nombre": "John",
            "segundo_nombre": "Doe",
            "apellido": "Torres",
            "segundo_apellido": "Garcia",
            "fecha_nacimiento": "1990-01-01",
            "fecha_inicio": "2022-01-01",
            "fecha_fin": "2025-12-31",
            "manzana": "A",
            "calle": "Main Street",
            "numero_ext": "123",
        }]"""
    

