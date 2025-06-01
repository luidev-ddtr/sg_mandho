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

if __name__ == '__main__':
    app.run(debug=True)