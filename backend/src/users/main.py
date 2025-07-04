# Este sera el archio el cual una toda la parte usuarios, 
# estara encapsulada en esta parte, aqui se recibirar los datos de los entpoins y tambien se 
# envirarar los datos de los entpoins y a la bd
import time

from src.users.models.user import User, validate_user
from src.utils.dim_date import DIM_DATE
from src.utils.id_generator import create_id
from src.users.repository.bd_prueba import BdPrueba

#base_de_datos = BdPrueba()

class Crud:
    """
    Clase la cual hara la mayoria del curd, aun no hara la parte de mostrar ya que esta se esta legando la bd
    tal vez se haga pero solo como funciones nadamas
    """
    def insert_user(self, user_json= dict):
        """
        Se centrara en la Insersion de un usuario si el usuario cumple con todas las verificaciones se
        pasara, al siguiente flujo (Insertara en la bd)si le falta alguna o esta mal retorna error.
        
        Args:
            user_json (dict): Un diccionario que contiene la información del usuario.
        
        Returns:
            bool: Se retorna true o false
            str: Se retorna un string de error o exito especifico de que falto o si esta bien 
        """
        dim_date_data = DIM_DATE()
        
        es_valido = validate_user(user_json) # <--- Retorna boleano y el mensaje del error
        
        if es_valido[0]:
            
            user_data = {
                    "date_id": dim_date_data.dateId,#create_id(),
                    "id_user": create_id(),  # Puedes generar un UUID aquí
                    "first_name": user_json["nombre"],
                    "second_name": user_json.get("segundo_nombre", "s/n"),
                    "last_name": user_json["apellido"],
                    "second_last_name": user_json.get("segundo_apellido", "s/n"),
                    "date_of_birth": user_json["fecha_nacimiento"],
                    "date_user_start": user_json["fecha_inicio"],
                    "date_user_end": user_json.get("fecha_fin", "s/n"),
                    "user_manzana": user_json.get("manzana", "s/n"),
                    "user_street": user_json.get("calle", "s/n"),
                    "user_number_ext": user_json.get("numero_ext", "s/n")
                }
            
            
            persona = User(user_data)
            
            
            persona.mostrar_datos()
            #dim_date_registro.mostrar_datos()
            
            if persona:
                return 200, "Se instacio a la persona correctamente"  #persona, dim_date_registro
            else:
                return 400, "No se pudo guardar la informacion",#persona, dim_date_registro
        else:
            return 400, es_valido[1]
