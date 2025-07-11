# Blueprint del usuario, se hace para separar el codigo y dejar app.py limpio

from flask import Blueprint, request, jsonify
from src.account.account import AccountCrud
from src.users.user import UserCrud

from src.routes.handle_message import send_error, send_success

account_options = AccountCrud()
personas = UserCrud()

account_route = Blueprint('account_route', __name__,url_prefix='/api/account/')

#Recordar poner el / si es que los enpoins dan error

@account_route.route("search_client/", methods=["GET"])
def busqueda_tiempo_real():
    """
    Endpoint para búsqueda en tiempo real de clientes/usuarios.
    
    Realiza una búsqueda case-insensitive en múltiples campos de los usuarios y devuelve
    resultados coincidentes en formato estandarizado.
    
    Parámetros GET:
    ---------------
    q : str
        Término de búsqueda (mínimo 3 caracteres). Se busca en:
        - first_name
        - second_name
        - last_name
        - id_user
        - manzana
    
    Respuestas:
    ----------
    200 - Éxito:
        {
            "status": "success",
            "count": int,
            "results": [
                {
                    "id": str,               # ID único del usuario
                    "text": str,             # Nombre formateado
                    "data": dict,            # Datos completos del usuario
                    "selectable": bool,       # Siempre True en esta implementación
                    "reason": str            # Siempre vacío en esta implementación
                },
                ...
            ]
        }
    
    400 - Búsqueda inválida (menos de 3 caracteres):
        {
            "results": [],
            "message": "Ingrese mínimo 3 caracteres"
        }
    
    500 - Error del servidor:
        {
            "status": "error",
            "message": str  # Descripción del error
        }
    
    Ejemplo de uso:
    --------------
    GET /api/account/search_client?q=torres
    
    Ejemplo de respuesta exitosa:
    {
        "status": "success",
        "count": 2,
        "results": [
            {
                "id": "JUA-LON-CERR-322h2fwiu",
                "text": "John",
                "data": {
                    "date_id": "---q3ri3guyefceudx",
                    "id_user": "JUA-LON-CERR-322h2fwiu",
                    "first_name": "John",
                    ...
                },
                "selectable": true,
                "reason": ""
            }
        ]
    }
    """
    # 1. Validación del parámetro de búsqueda
    search_term = request.args.get('q', '').lower().strip()

    if not search_term or len(search_term) < 3:
        return jsonify({
            'results': [], 
            'message': 'Ingrese mínimo 3 caracteres'
        }), 400  # Cambiado a 400 (Bad Request es más apropiado que 401)

    try:
        # 2. Obtener todos los usuarios (filtro vacío)
        data = {'id_user': '', 'filters': {}}
        estado, mensaje, todos_los_datos = personas.read_user(data)
        
        if not estado:
            raise RuntimeError(f"Error al leer usuarios: {mensaje}")
        
        # 3. Filtrar resultados
        resultados = []
        
        for registro in todos_los_datos:
            # Campos donde se buscará (todos convertidos a minúsculas)
            campos_relevantes = [
                registro.get('first_name', '').lower(),
                registro.get('second_name', '').lower(),
                registro.get('last_name', '').lower(),
                registro.get('id_user', ''),
                registro.get('manzana', '').lower()
            ]
            
            # Buscar coincidencia en cualquier campo
            if any(search_term in campo for campo in campos_relevantes):
                resultados.append({
                    'id': registro['id_user'],
                    'text': registro['first_name'],
                    'data': registro,
                    'selectable': True,  # Todos seleccionables en esta implementación
                    'reason': ''        # Sin motivo de restricción
                })
        
        # 4. Retornar respuesta exitosa
        return jsonify({
            'status': 'success',
            'count': len(resultados),
            'results': resultados
        })
        
    except Exception as e:
        # 5. Manejo de errores
        print(f"Error en búsqueda: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': f"Error en búsqueda: {str(e)}"
        }), 500


account_route.route('create/', methods=['POST'])
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
        print(e)
        return send_error(str(e), 500)


account_route.route('/read/', methods=['POST'])
def read_account():
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