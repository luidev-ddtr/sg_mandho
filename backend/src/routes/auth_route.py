from flask import Blueprint, request
from src.users.user import UserCrud
from src.routes.handle_message import send_error, send_success
from src.atuh.get_data import get_admin_account
user_options = UserCrud()

auth_route = Blueprint('auth_route', __name__, url_prefix='/api/auth/')

# 1. Obtener información de la URL como PARÁMETROS DE RUTA
#    Ejemplo de URL: /api/auth/read_user/123 (donde 123 es el user_id)
@auth_route.route('read_user/<string:user_id>', methods=['GET'])
def obtener_usuario_por_id(user_id):# -> tuple[Response, Literal[404]] | Any | tuple[Response, Lit...:
    """
    Obtiene la información de un usuario específico por su ID de la URL.

    Args:
        user_id (int): El ID del usuario a buscar, extraído de la URL.

    Returns:
        dict: Información del usuario.

    Por el momento esta funcion aun no se implementara sin embargo, se mandaran los datos del ususario que funga como administrador
    y se retornara un mensaje de que se obtuvo la informacion correctamente.
    ESTA FUNCION ES SOLAMENTE DE TESTEO YA QUE NO RESPETA LA SEGURIDAD Y LA LOGICA IMPLEMENTADA ES SOLO PARA UNA 
    PARTE DEL NEGOCIO SE DEBE MOFICIAR DESPUES
    """
    try:
        # Aquí user_id ya está disponible directamente como un argumento de la función
        # Flask lo extrae automáticamente de la URL y lo convierte al tipo especificado (int)
        # Si necesitas usar tu user_options para buscar al usuario
        data = {'id_user': '', 'filters': {'rol': 'administrador'}}
        user_data = get_admin_account()  # Llamamos a la función que obtiene la cuenta de administrador

        #user_data = user_options.read_user(user_id) # Suponiendo que UserCrud tiene este método
        if not user_data:
            return send_error(f"Usuario con ID {user_id} no encontrado", 404)
        mensaje = f"Usuario con ID {user_id} encontrado correctamente"
        return send_success(mensaje, user_data, 200)

    except Exception as e:
        print(f"Error al obtener el usuario por ID: {e}")
        return send_error(str(e), 500)
