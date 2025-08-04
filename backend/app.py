#Fichero el cual creara la instancia de flask # 
from flask import Flask, jsonify
from flask.wrappers import Response
from flask_cors import CORS  # Importa CORS

from src.utils.conexion import Conexion

#HARCODEAR LAS URL
import os

from src.routes.user_route import user_route
from src.routes.account_route import account_route
from src.routes.search_real_time import search_route
from src.routes.auth_route import auth_route
from src.routes.payment_route import payment_route
#from src.routes.
##Esto esta comentado ya que es solo de produccion
#from dotenv import load_dotenv  # Importa load_dotenv
# Carga el .env con ruta ABSOLUTA (crítico en PythonAnywhere)
#load_dotenv('/home/luigas/sg_mandho/backend/.env')

app = Flask(__name__)
app.register_blueprint(user_route)
app.register_blueprint(account_route)
app.register_blueprint(search_route)
app.register_blueprint(auth_route)
app.register_blueprint(payment_route)

CORS(app, resources={
    r"/api/*": {
        "origins": [os.getenv('URL_FRONTEND')],
        "methods": ["GET", "POST", "PUT", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": False
    }
})

#cerrar todos los hilos 
# cnection = Conexion()
# cnection.close_all()

if __name__ == '__main__':
    app.run(debug=True)