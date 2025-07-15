# Blueprint del usuario, se hace para separar el codigo y dejar app.py limpio

from typing import Literal
from flask import Blueprint, Response, request, jsonify
from src.users.user import UserCrud

from src.routes.handle_message import send_error, send_success

personas = UserCrud()

search_route = Blueprint('search_route', __name__,url_prefix='/api/search/')

#Recordar poner el / si es que los enpoins dan error
@search_route.route("search_client/", methods=["GET"])
def busqueda_tiempo_real() -> tuple[Response, Literal[400]] | Response | tuple[Response, Literal[500]]:
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
        return send_error(str(e), 500)