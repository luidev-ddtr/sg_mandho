# Este fichero seriva para poder generar un identificador aletorio de cada registro que se inserte
# debe devolver un string de 14 caracteres
import uuid 
def create_id():
    """"
    Esta funcion se encargara de crear un identificador unico
    
    args:
        None
    returns:
        str: Un identificador unico en formato uuid4
    """
    return str(uuid.uuid4())



