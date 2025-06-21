# Este modelo sera el que recibira la informacion de las personas y con ellas se crearan los usuarios
# tendra la informacion de los usuarios

class User:
    def __init__(self, id_user = str, first_name = str, second_name = "s/n", last_name = str, second_last_name = "s/n", date_of_birth = str, date_user_start = str, date_user_end = "s/n",user_manzana = str, user_street = str, user_number_ext = str):
        """
        Constructor de la clase User: Este constructor es el que se encargara de recibir la informacion de los usuarios y poder crearlos y guardarlos en la bd
        
        args:
            id_user (str): El id del usuario Requerido
            first_name (str): El nombre del usuario Requerido
            second_name (str): El segundo nombre del usuario
            last_name (str): El apellido del usuario Requerido
            second_last_name (str): El segundo apellido del usuario 
            date_of_birth (str): La fecha de nacimiento del usuario Requerido
            date_user_start (str): La fecha de inicio del usuario Requerido
            date_user_end (str): La fecha de fin del usuario 
            timestamp (str): El timestamp del usuario Requerido
            user_manzana (str): La manzana del usuario
        """
        self.id_user = id_user
        self.first_name = first_name
        self.second_name = second_name
        self.last_name = last_name
        self.second_last_name = second_last_name
        self.date_of_birth = date_of_birth
        self.manzana = user_manzana
        self.date_user_start = date_user_start
        self.date_user_end = date_user_end
        self.street = user_street
        self.number_ext = user_number_ext
        
    # Mostrar los datos que estan en el constructor si se desea
    def __str__(self):
        return f"User {self.id_user} {self.first_name} {self.second_name} {self.last_name} {self.second_last_name} {self.date_of_birth} {self.date_user_start} {self.date_user_end} {self.manzana} {self.street} {self.number_ext}"
    
    
def validate_user(user_json = dict):
    """
    Se centrara en la verificacion de un usuariom si el usuario cumple con todas las erificaciones se
    pasara, al siguiente flujo si le falta alguna o esta mal retorna error.
    
    Args:
        user_json (dict): Un diccionario que contiene la información del usuario.
    
    Returns:
        bool: Se retorna true o false
        str: Se retorna un string de error o exito especifico de que falto o si esta bien 
    """
    
    campos_requeridos_date = ["fiscal_year", "fiscal_month", "fiscal_day", "year", "month", "day"]
    
    claves_date = set(user_json["dim_date"].keys())
    for clave in campos_requeridos_date:
        if not clave in claves_date:
            return False, f"El campo {clave} es requerido en dim_date"
    
    
    campos_requeridos = ["nombre", "apellido", "fecha_nacimiento", "fecha_inicio", "manzana", "calle", "dim_date"]
    claves_usuario = set(user_json.keys())
    for clave in campos_requeridos:
        if not clave in claves_usuario:
            return False, f"El campo {clave} es requerido en el usuario"
        
    return True, "Todo bien"