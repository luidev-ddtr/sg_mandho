# Blueprint del usuario, se hace para separar el codigo y dejar app.py limpio
from typing import Literal, Any
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
def create_user():# -> tuple[Any, Literal[400]] | tuple | tuple[Any, Literal[500]]:
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
                "id": persona_id,
                }
            print(mensaje)
            return send_success(mensaje, data,estado)
        else:
            print(mensaje)
            return send_error(mensaje, estado)
        
    except Exception as e:
        print(e)
        return send_error(str(e), 500)




@user_route.route("/api/user/read_user/", methods=["POST"])  # Sin slash
def read_information():# -> tuple[Any, Literal[400]] | tuple[Any, Literal[200]] | tuple | tuple[Any, Literal[500]]:
    """
    Este endpoint se centra en manejar 2 casos principales, la lectura de todos los uaurios o de uno solo, 
    Funcionamiento:
        Dentro del post se deben agregar los campos dentro del json los caules son el id_usuario, y el filtro
        ambis son mutuamente excluyentes, por lo qu eno pueden venir los 2 cargados, por ejemplo, el usuario,
        puede venir solo como texto vacio, y el filtro el cual es un diccionariio, pueder venir vacio tambien o con sus
        filtros aplicados
    
    Args: 
        data_json (dict): Un diccionario que contiene la información del usuario.
        El diccionario puede tener la siguiente estructura:
        {
            id_user: str, "id del usuario",
            filters: dict, "filtros para la busqueda de la informacion de la persona"
        }
    
    Returns:
        Retorna un json con la informacion solicitada dependiendo si es solo un usuario o si es la informacion de mas personas
    """
    try:
        request_data = request.json

        if not request_data:
            return send_error("No se recibieron datos", 400)
        
        state, message, data = user_options.read_user(request_data)

        if 200 <= state <= 206:
            
            return send_success(message, data, 200)
        else:
            return send_error(message, state)
        
    except Exception as e:
        print(e, "error desde read users")
        return send_error(str(e), 500)
    

@user_route.route("/api/user/update_user/", methods=["POST"])
def update_info_user():
    """Endpoint para actualizar la información de un usuario.

    Este endpoint espera recibir datos en formato JSON a través de una solicitud POST.
    Llama a la función `user_options.edit_user` para procesar la actualización del usuario
    con los datos proporcionados.

    - Si la solicitud JSON está vacía, devuelve un error 400.
    - Si la actualización en `user_options.edit_user` es exitosa (códigos de estado 200-206),
      responde con un mensaje de éxito.
    - Si la actualización falla, devuelve un mensaje de error específico y el código de estado
      correspondiente.
    - Si ocurre una excepción inesperada, captura el error y devuelve una respuesta 500.

    Returns:
        tuple[Any, int]: Una tupla que contiene la respuesta (éxito o error) y el código de
        estado HTTP.
    """
    try:
        request_data = request.json
        if not request_data:
            return send_error("No se recibieron datos", 400)
        
        state, message, data = user_options.edit_user(request_data)

        if 200 <= state <= 206:
            return send_success(message, data, state)
        else:
            print(message)
            return send_error(message, state)
    except Exception as e:
        print(e)
        return send_error(str(e), 500)
    

@user_route.route("/api/user/delete_user/", methods=["PATCH"])
def userDefuncion() -> tuple[Any, Literal[400]] | tuple | tuple[Any, Literal[500]]:
    """
    Funcion para manejar la defuncion de un usuario, Se recibira un ID con esta informacion se haran los cambios en las tablas y se
    devolvera el mismo registro con la informacion cambiada en fecha de defuncion
    """
    try:
        defuncion_data = request.json
        if not defuncion_data:
            return send_error("No se recibieron datos", 400)
        
        state, message, data = user_options.defuncion_user(defuncion_data)

        if 201 == state :
            print(f"El estado {state}  Mensaje: {message}, la informacion {data}")
            return send_success(message, data, state)
        else:
            print(message)
            return send_error(message, state)
    except Exception as e:
        print(e)
        return send_error(str(e), 500)


