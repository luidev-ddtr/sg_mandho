#Fichero el cual creara la instancia de flask # 
from flask import Flask, jsonify
from flask_cors import CORS  # Importa CORS

#HARCODEAR LAS URL
import os
##Esto esta comentado ya que es solo de produccion

#from dotenv import load_dotenv  # Importa load_dotenv
# Carga el .env con ruta ABSOLUTA (crítico en PythonAnywhere)
#load_dotenv('/home/luigas/sg_mandho/backend/.env')

app = Flask(__name__)


CORS(app, resources={
    r"/api/*": {
        "origins": [os.getenv('URL_FRONTEND')],
        "methods": ["GET", "POST", "PUT", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True 

    },
    r"/auth/*": {
        "origins": [os.getenv('URL_FRONTEND')],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Authorization", "Content-Type"],
        "supports_credentials": True  
    }
})

# @app.route("/", methos["GET"])
# def index():
#     return jsonfy({"messaje": "Hola desde flask inge ige"})
string = "Hola mundo desde flask"

@app.route('/')
def home():
    return jsonify({'message':"¡Funciona!",
                    "index": {
                        "nose": {
                            "inge": [12,4,64,22,4,2,4],
                            'valido': True,
                        },
                        "mañoso": len(string)
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

#es_valido funcion para saber si los datos son correctos 
# obtener_info tiene que ser la funcion que obtiene la info de registro
# puede ser un objeto el cual tenga la informacion carga como su cargo, manzana, nombre
if __name__ == '__main__':
    app.run(debug=True)