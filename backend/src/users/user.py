# Este sera el archio el cual una toda la parte usuarios, 
# estara encapsulada en esta parte, aqui se recibirar los datos de los entpoins y tambien se 
# envirarar los datos de los entpoins y a la bd
from src.utils.validate_data import validate_data
from src.utils.dim_date import DIM_DATE
from src.utils.id_generator import create_id

from src.users.models.user import User
from src.users.repository.show import read

#base_de_datos = BdPrueba()

class UserCrud:
    """ 
    Clase la cual hara la mayoria del curd, aun no hara la parte de mostrar ya que esta se esta legando la bd
    tal vez se haga pero solo como funciones nadamas
    """
    def insert_user(self, user_json= dict) -> tuple:
        """
        Se centrara en la Insersion de un usuario si el usuario cumple con todas las verificaciones se
        pasara, al siguiente flujo (Insertara en la bd)si le falta alguna o esta mal retorna error.
        
        Args:
            user_json (dict): Un diccionario que contiene la información del usuario.
        
        Returns:
            bool: Se retorna true o false
            str: Se retorna un string de error o exito especifico de que falto o si esta bien 
        """

        
        campos_requeridos = ["nombre", "apellido", "fecha_nacimiento", "fecha_inicio", "manzana", "calle"]
        tipo_campos = [str, str, str, str, str, str]
        
        es_valido = validate_data(user_json, campos_requeridos, tipo_campos, "user") # <--- Retorna boleano y el mensaje del error
        
        dim_date_data = DIM_DATE()
        
        if es_valido[0]:
            
            user_data = {
                    "date_id": dim_date_data.dateId,#create_id(),
                    "id_user": create_id([user_json["nombre"], user_json["apellido"], user_json["manzana"]]),  # Se requiere una lista pare generar el uuid
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
            
            
            persona = User(**user_data)
            
            
            persona.mostrar_datos()
            #dim_date_registro.mostrar_datos()
            
            if persona:
                return 200, "Se instacio a la persona correctamente", persona.id_user  #persona, dim_date_registro
            else:
                return 501, "No se pudo guardar la informacion", None#persona, dim_date_registro
        else:
            return 400, es_valido[1], None
        

    def read_user(self, data_json= dict) -> tuple:
        """
        Esta funcion se encargara de leer los usuarios de la base de datos, hara 2 cosas pricipales
        1;- Enviar toda la informacion de la tabla usuarios para ser mostrada en el frontend. Para este caso se planea
        Que ta,bien se puedan recibir algunos filtros, por ejemplo filtrar por edad, fecha de inicio, etc
        2;- Enviar la informacion de una persona en especifico para ser mostrada en el frontend

        args:
            data_json (dict): Un diccionario que contiene la información del usuario.
            El diccionario puede tener la siguiente estructura:
            {
                id_user: str, "id del usuario",
                filters: dict, "filtros para la busqueda de la informacion de la persona"
                # Ambos campos pueden estar vacios, y son mutualmente excluyentes ya que no se le aplicaran filtros
                a un usuario.
            }
        
        Returns:
            bool: Se retorna true o false
            str: Se retorna un string de error o exito especifico de que falto o si esta bien
            list: Se retorna una lista con la informacion de la persona en caso de que haya un id_user o los filtros

        comments:
            Caso 1: Solo hay id_user - Buscar información específica de un usuario
            Caso 2: Solo hay filters - Aplicar filtros

        constraints:
            1;- id_user y filters son mutuamente excluyentes
            2; En cualquier caso donde haya un problema la lista se retornara vacia
        """

        
        campos_requeridos = ["id_user", "filters"]
        tipo_campos = [str,dict]
        
        respuesta,mensaje = validate_data(data_json, campos_requeridos, tipo_campos, "user") # <--- Retorna boleano y el mensaje del error
        
        if respuesta:
            
            if "id_user" in data_json and data_json["id_user"]:
                # Caso 1: Solo hay id_user - Buscar información específica de un usuario
                datos = read(data_json["id_user"], None)
                
                if datos:
                    return 200, "Se encontró a la persona correctamente", datos
                else:
                    return 404, "No se encontró información para este usuario", []
                
            elif "filters" in data_json and data_json["filters"]:
                pass
                # Caso 2: Solo hay filters - Aplicar filtros
                # Aquí llamarías a tu función que maneja los filtros
                # resultado_filtros = aplicar_filtros(data_json["filters"])
                
                # if resultado_filtros:
                #     return 200, "Filtros aplicados correctamente", resultado_filtros
                # else:
                #     return 404, "No se encontraron resultados con estos filtros"
            else:
                # Caso 3: No hay ninguno o hay algún error
                return 400,  "Debes enviar un id_user o un filters", []
        
        else:
            return 400, mensaje, []

