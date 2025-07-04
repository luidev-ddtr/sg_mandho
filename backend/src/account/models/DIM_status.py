
class DIM_status:
    def __init__(self, dim_status_id, status_name):
        """
        Constructor de la clase DIM_status: Mapea la informacion de la base de datos y la guarda en un diccionario
        y la pasa a la base de datos
        """
        self.dim_status_id = dim_status_id
        self.status_name = status_name