#Fichero el cual creara la instancia de flask # 
from flask import Flask, jsonify
from flask.wrappers import Response
from flask_cors import CORS  # Importa CORS

#HARCODEAR LAS URL
import os

from src.routes.user_route import user_route
from src.routes.account_route import account_route
from src.routes.search_real_time import search_route
#from src.routes.
##Esto esta comentado ya que es solo de produccion
#from dotenv import load_dotenv  # Importa load_dotenv
# Carga el .env con ruta ABSOLUTA (crítico en PythonAnywhere)
#load_dotenv('/home/luigas/sg_mandho/backend/.env')

app = Flask(__name__)
app.register_blueprint(user_route)
app.register_blueprint(account_route)
app.register_blueprint(search_route)


CORS(app, resources={
    r"/api/*": {
        "origins": [os.getenv('URL_FRONTEND')],
        "methods": ["GET", "POST", "PUT", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": False

    },
    r"/auth/*": {
        "origins": [os.getenv('URL_FRONTEND')],
        "methods": ["POST"],
        "allow_headers": ["Authorization", "Content-Type"],
        "supports_credentials": False  
    }
})

@app.route('/')
def home() -> tuple[Response, Literal[200]]:
    """
    Solo devuelve un mensaje de prueba para saber si el servidor esta online
    Args:
        None    
    Returns:
        tuple[Response, Literal[200]]
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


if __name__ == '__main__':
    app.run(debug=True)