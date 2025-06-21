#Fichero el cual creara la instancia de flask # 
from flask import Flask, jsonify
from flask_cors import CORS  # Importa CORS

#HARCODEAR LAS URL
import os

from src.routes.user_route import user_route
##Esto esta comentado ya que es solo de produccion
#from dotenv import load_dotenv  # Importa load_dotenv
# Carga el .env con ruta ABSOLUTA (crítico en PythonAnywhere)
#load_dotenv('/home/luigas/sg_mandho/backend/.env')

app = Flask(__name__)
app.register_blueprint(user_route)


CORS(app, resources={
    r"/api/*": {
        "origins": [os.getenv('URL_FRONTEND')],
        "methods": ["GET", "POST", "PUT", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True 


    },
    r"/auth/*": {
        "origins": [os.getenv('URL_FRONTEND')],
        "methods": ["POST"],
        "allow_headers": ["Authorization", "Content-Type"],
        "supports_credentials": True  
    }
})

## Endpoin solo de prueba para el saber si el servidor esta online 
## 
## Este endpoint solo devuelve un mensaje de prueba para saber si el servidor esta online
## 
## Returns:
##     Un JSON con un mensaje que indica que el servidor esta online
## 
@app.route('/')
def home():
    """
    Solo devuelve un mensaje de prueba para saber si el servidor esta online
    """
    return jsonify({'message':"¡Funciona!",
                    "index": {
                        "nose": {
                            "inge": [12,4,64,22,4,2,4],
                            'valido': True,
                        }
                    },
                    "final": ("si", True),
                    }),200


# EJEMPLO DE LOGIN SIN EMBARGO FALTA IMPLEMENTAR SEGURIDAD
# @app.route("/login", method = ["POST"])
# def login():
#     try:
#         datos = request.json()
#         usuario, contraseña = datos
        
#         if es_valido(usuario,contraseña):
#             informacion = obtener_info()
#             return jsonify({"message": "usuario identificado",
#                             "nombre": informacion.nombre,
#                             "cargo": informacion.cargo,
#                             "manazana": informacion.manzana
#                             },200)
#         else: 
#             return jsonify({"message": "usuario no identificado","status":"Error no encontrado"},404)
#     except Exception as e:
#         return jsonify({
#             "status":'error',
#             "message": str(e)
#         },500)

if __name__ == '__main__':
    app.run(debug=True)