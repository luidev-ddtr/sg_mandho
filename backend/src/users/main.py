# Este sera el archio el cual una toda la parte usuarios, 
# estara encapsulada en esta parte, aqui se recibirar los datos de los entpoins y tambien se 
# envirarar los datos de los entpoins y a la bd
import time

from src.users.models.user import User, validate_user
from src.users.models.DIM_DATE import DIM_DATE
from src.users.services.generar_records import create_id
from src.users.repository.bd_prueba import BdPrueba

#base_de_datos = BdPrueba()

class Crud:
    """
    Clase la cual hara la mayoria del curd, aun no hara la parte de mostrar ya que esta se esta legando la bd
    tal vez se haga pero solo como funciones nadamas
    """
    def insert_user(self, user_json= dict):
        
        es_valido = validate_user(user_json)
        
        if es_valido[0]:
            dim_date = user_json["dim_date"]
            
            
            user_data = {
                    "id_user": "1",#create_id(),  # Puedes generar un UUID aquí
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
            
            dim_date_data = {
                "dateId": "1",#create_id(),
                "fiscal_date": dim_date["fiscal_date"],
                "fiscal_year": dim_date.get("fiscal_year", time.strftime("%Y")), # Si no se conoce retorna el año 
                "fiscal_month": dim_date.get("fiscal_month", time.strftime("%m")), # Si no se conoce retorna el mes "fiscalMonth",
                "fiscal_day": dim_date.get("fiscal_day", "normal"), # Si no se conoce retorna el dia "fiscalDay"],
                "week": dim_date.get("week", time.strftime("%W")),     # Se deja pendiente por si nesesita la semana del mes o del año            
                "year": dim_date["year"],
                "month": dim_date["month"],
                "day": dim_date["day"],
            }
            
            persona = User(**user_data)
            dim_date_registro = DIM_DATE(**dim_date_data)
            
            
            #base_de_datos.save_data(persona, dim_date_registro)#persona, dim_date_registro)
            
            if persona and dim_date_registro:
                return 200, "Todo bien"  #persona, dim_date_registro
            else:
                return 400, "No se pudo guardar la informacion",#persona, dim_date_registro
        else:
            return 400, es_valido[1]

