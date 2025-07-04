# Este modelo sera el que recibira la informacion de las personas y con ellas se crearan los usuarios
# tendra la informacion de los usuarios

class User:
    def __init__(self, date_id = str, id_user = str, first_name = str, second_name = "s/n", last_name = str, second_last_name = "s/n", date_of_birth = str, date_user_start = str, date_user_end = "s/n",user_manzana = str, user_street = str, user_number_ext = str):
        """
        Constructor de la clase User: Este constructor es el que se encargara de recibir la informacion de los usuarios y poder crearlos y guardarlos en la bd
        
        args:
            date_id (str): El id de la fecha Requerido
            id_user (str): El id del usuario Requerido
            first_name (str): El nombre del usuario Requerido
            second_name (str): El segundo nombre del usuario
            last_name (str): El apellido del usuario Requerido
            second_last_name (str): El segundo apellido del usuario 
            date_of_birth (str): La fecha de nacimiento del usuario Requerido
            date_user_start (str): La fecha de inicio del usuario Requerido
            date_user_end (str): La fecha de fin del usuario 
            user_manzana (str): La manzana del usuario
        """
        self.date_id = date_id
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
        return f"User: {self.date_id} {self.id_user} {self.first_name} {self.second_name} {self.last_name} {self.second_last_name} {self.date_of_birth} {self.date_user_start} {self.date_user_end} {self.manzana} {self.street} {self.number_ext}"
    
    def mostrar_datos(self):
        print(f"""Id fecha {self.date_id}
        Id usuario {self.id_user}
        Nombre {self.first_name}
        Segundo Nombre {self.second_name}
        Apellido {self.last_name}
        Segundo Apellido {self.second_last_name}
        Fecha Nacimiento {self.date_of_birth}
        Fecha Inicio {self.date_user_start}
        Fecha Fin {self.date_user_end}    
        Manzana {self.manzana}    
        Calle {self.street}
        Numero Exterior {self.number_ext}""")
        


