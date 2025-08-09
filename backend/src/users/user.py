# Este sera el archio el cual una toda la parte usuarios, 
# estara encapsulada en esta parte, aqui se recibirar los datos de los entpoins y tambien se 
# envirarar los datos de los entpoins y a la bd
from src.utils.validate_data import validate_data
from src.dim_dates.dim_date import DIM_DATE
from src.utils.id_generator import create_id

#validaciones del crud
from src.users.models.user import User, to_edit
from src.users.repository.create import Create
from src.users.repository.show import read

#importacion para editar usuario
from src.users.repository.edit import edit_user
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
            str: Se retorna el id del usuario
        """
        
        campos_requeridos = ["nombre", "apellido", "fecha_nacimiento", "fecha_inicio", "manzana", "calle"]
        tipo_campos = [str, str, str, str, str, str]
        
        es_valido = validate_data(user_json, campos_requeridos, tipo_campos, "user") # <--- Retorna boleano y el mensaje del error
        
        dim_date_data = DIM_DATE()
        
        if es_valido[0]:
            
            user_data = {
                "DIM_CustomerId": create_id([user_json["nombre"], user_json["apellido"], user_json["fecha_inicio"]]),
                "DIM_DateId": dim_date_data.dateId,
                "CustomerName": user_json["nombre"],
                "CustomerMiddleName": user_json.get("segundo_nombre") or "s/n",
                "CustomerLastName": user_json["apellido"],
                "CustomerSecondLastName": user_json.get("segundo_apellido") or "s/n",
                "CustomerDateBirth": user_json["fecha_nacimiento"],
                "CustomerDateStart": user_json["fecha_inicio"],
                "CustomerDateEnd": user_json.get("fecha_fin") or "s/n",
                "CustomerAdress": user_json.get("calle") or "s/n",
                "CustomerFraction": user_json.get("manzana") or "s/n",
                "CustomerNumberExt": user_json.get("numero_ext") or "s/n"
            }
            persona = User(**user_data)
            
            #BANDERA DE VALIDACION AQUI
            persona.mostrar_datos()
            
            object_insert = Create()

            #This method retuns true or false
            response = object_insert.insert_user(persona)
            #dim_date_registro.mostrar_datos()
            if response:
                return 200, "Se instacio a la persona correctamente", persona.DIM_CustomerId  
            else:
                return 501, "No se pudo guardar la informacion", None
        else:
            return 400, es_valido[1], None
        

    def read_user(self, data_json= dict) -> tuple:
        """
        Esta funcion se encargara de leer los usuarios de la base de datos, hara 2 cosas pricipales
        1;- Enviar toda la informacion de la tabla usuarios para ser mostrada en el frontend. Para este caso se planea
        Que tambien se puedan recibir algunos filtros, por ejemplo filtrar por edad, fecha de inicio, etc
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
            int: Se retorna un codigo de estado HTTP
            str: Se retorna un string de error o exito especifico de que falto o si esta bien
            list: Se retorna una lista con la informacion de la persona en caso de que haya un id_user o los filtros
        comments:
            Caso 1: Solo hay id_user - Buscar información específica de un usuario
            Caso 2: Solo hay filters - Aplicar filtros
        constraints:
            1;- id_user y filters son mutuamente excluyentes
            2; En cualquier caso donde haya un problema la lista se retornara vacia


            CREAR UN FILTRO PARA QUE RECHACE A TODOS LOS ADMINSITRADORES DESDE LA INTERFAZ DE USUARIO
        """
        
        campos_requeridos = ["id_user", "filters"]
        tipo_campos = [str,dict]
        
        respuesta,mensaje = validate_data(data_json, campos_requeridos, tipo_campos, "user") # <--- Retorna boleano y el mensaje del error
        if respuesta:
            
            if data_json["id_user"] and data_json['filters'] == {}:
                # Caso 1: Solo hay id_user - Buscar información específica de un usuario
                # Solamente se pasa el valor, ya no se pasa el diccionario
                datos = read(data_json["id_user"], None)
                
                if datos:
                    return 200, "Se encontró a la persona correctamente", datos
                else:
                    return 404, "No se encontró información para este usuario", []
                
            elif data_json["filters"] == {} and data_json['id_user'] == '':
                
                datos = read(None, data_json["filters"])
                
                if datos:
                    return 200, "Se encontraron resultados con estos filtros", datos
                else:
                    return 404, "No se encontraron resultados con estos filtros", []
                
                # Caso 2: Solo hay filters - Aplicar filtros
                # Aquí llamarías a tu función que maneja los filtros
                # resultado_filtros = aplicar_filtros(data_json["filters"])
                
                # if resultado_filtros:
                #     return 200, "Filtros aplicados correctamente", resultado_filtros
                # else:
                #     return 404, "No se encontraron resultados con estos filtros"
            
        else:
            return 400, mensaje, []
        
    def edit_user(self, data_edit: dict):# -> tuple[Literal[201], Literal['El usuario se ha actualizado...:
        """Endpoint para actualizar la información de un usuario existente.

        Esta función recibe un diccionario con los datos del usuario que se desea
        modificar. Realiza una validación de los datos para asegurarse de que
        contienen los campos requeridos y que los tipos de datos son correctos.
        En caso de que la validación sea exitosa, formatea los datos y llama
        a la función `edit_user` para aplicar los cambios en la base de datos.
        Finalmente, retorna una respuesta de éxito (código 201) o de error
        (código 400) junto con un mensaje descriptivo.

        Los campos requeridos para la actualización son:
        - DIM_CustomerId (str): Identificador único del usuario.
        - CustomerName (str): Nombre del usuario.
        - CustomerMiddleName (str): Segundo nombre del usuario.
        - CustomerLastName (str): Apellido paterno del usuario.
        - CustomerSecondLastName (str): Apellido materno del usuario.
        - CustomerAddress (str): Dirección del usuario.
        - CustomerFraction (str): Fraccionamiento o colonia del usuario.
        - CustomerNumberExt (str): Número exterior del domicilio.

        Args:
            data_edit (dict): Diccionario con los datos a editar.

        Returns:
            tuple[int, str]: Una tupla que contiene un código de estado HTTP
                             y un mensaje de éxito o error.
        """
        campos_requeridos = ["DIM_CustomerId","CustomerName", "CustomerMiddleName", "CustomerLastName", "CustomerSecondLastName", "CustomerAddress", "CustomerFraction", "CustomerNumberExt"]
        tipo_campos = [str, str, str, str, str, str, str, str]

        result , message = validate_data(data_edit, campos_requeridos, tipo_campos, "user")
        if result:
            format_data = to_edit(data_edit)

            print(format_data)
            isvalid = edit_user(format_data)

            if not isvalid:
                return 400, "No se pudo actualizar el registro"
            
            #Obtener el nuevo ususario para regresarlo en la respuesta
            new_user = read(data_edit["DIM_CustomerId"], None)

            return 201, "El usuario se ha actualizado correctamente", new_user
        else:
            return 400, message