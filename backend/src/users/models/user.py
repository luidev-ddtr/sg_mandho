class User:
    def __init__(self,  DIM_CustomerId: str, DIM_DateId: str, CustomerName: str, 
                 CustomerMiddleName: str = "s/n", CustomerLastName: str = "", 
                 CustomerSecondLastName: str = "s/n", CustomerDateBirth: str = "", 
                 CustomerDateStart: str = "", CustomerDateEnd: str = "s/n", 
                 CustomerFraction: str = "", CustomerAdress: str = "", 
                 CustomerNumberExt: str = "") -> None:
        """
        Modelo de usuario: representa a una persona registrada en el sistema.

        Este constructor se encarga de inicializar los datos del usuario, los cuales 
        deben coincidir con los campos definidos en la base de datos.

        Args:
            DIM_DateId (str): ID de la fecha relacionada.
            DIM_CustomerId (str): ID único del usuario.
            CustomerName (str): Nombre del usuario.
            CustomerMiddleName (str, opcional): Segundo nombre del usuario. Default "s/n".
            CustomerLastName (str): Apellido paterno del usuario.
            CustomerSecondLastName (str, opcional): Apellido materno del usuario. Default "s/n".
            CustomerDateBirth (str): Fecha de nacimiento del usuario.
            CustomerStartDate (str): Fecha de inicio de registro o actividad.
            CustomerDateEnd (str, opcional): Fecha de finalización. Default "s/n".
            CustomerFraction (str): Nombre de la manzana (zona) del usuario.
            CustomerAdress (str): Dirección o calle del usuario.
            CustomerNumberext (str): Número exterior del domicilio del usuario.
        """
        self.DIM_CustomerId = DIM_CustomerId
        self.DIM_DateId = DIM_DateId
        self.CustomerName = CustomerName
        self.CustomerMiddleName = CustomerMiddleName
        self.CustomerLastName = CustomerLastName
        self.CustomerSecondLastName = CustomerSecondLastName
        self.CustomerDateBirth = CustomerDateBirth
        self.CustomerStartDate = CustomerDateStart
        self.CustomerEndDate = CustomerDateEnd
        self.CustomerFraction = CustomerFraction
        self.CustomerAddress = CustomerAdress
        self.CustomerNumberExt = CustomerNumberExt

    def __str__(self) -> str:
        """
        Representación legible del usuario. Útil para depuración rápida o impresión simple.
        """
        return (f"User({self.DIM_CustomerId}): {self.CustomerName} {self.CustomerMiddleName} "
                f"{self.CustomerLastName} {self.CustomerSecondLastName}, "
                f"Nacido el {self.CustomerDateBirth}, "
                f"Inicio: {self.CustomerStartDate}, Fin: {self.CustomerEndDate}, "
                f"Dirección: {self.CustomerFraction}, {self.CustomerAddress} #{self.CustomerNumberExt}")

    def mostrar_datos(self) -> None:
        """
        Imprime los datos del usuario en un formato más legible para consola o depuración.
        No retorna nada.
        """
        print(f"""📄 Información del Usuario
        ID Fecha:              {self.DIM_DateId}
        ID Usuario:            {self.DIM_CustomerId}
        Nombre:                {self.CustomerName}
        Segundo Nombre:        {self.CustomerMiddleName}
        Apellido:              {self.CustomerLastName}
        Segundo Apellido:      {self.CustomerSecondLastName}
        Fecha de Nacimiento:   {self.CustomerDateBirth}
        Fecha de Inicio:       {self.CustomerStartDate}
        Fecha de Fin:          {self.CustomerEndDate}
        Manzana (Fracción):    {self.CustomerFraction}
        Calle:                 {self.CustomerAddress}
        Número Exterior:       {self.CustomerNumberExt}
        """)

    def to_dict(self) -> dict[str, str]:
        """Funcion la cual devuelve los datos de la tabla formateados, para poder ser enviados 
        en formato de diccionario, esta informacion se envia al frontend"""
        return {
            "DIM_CustomerId": self.DIM_CustomerId,
            "DIM_DateId": self.DIM_DateId,
            "CustomerName": self.CustomerName,
            "CustomerMiddleName": self.CustomerMiddleName,
            "CustomerLastName": self.CustomerLastName,
            "CustomerSecondLastName": self.CustomerSecondLastName,
            "CustomerDateBirth": self.CustomerDateBirth,
            "CustomerStartDate": self.CustomerStartDate,
            "CustomerEndDate": self.CustomerEndDate,
            "CustomerFraction": self.CustomerFraction,
            "CustomerAddress": self.CustomerAddress,
            "CustomerNumberExt": self.CustomerNumberExt
        }

def to_edit(campos_editables: dict) -> dict[str, str]:
    """
    Función para verificar o completar la información recibida y poner alguna por defecto
    si es que el valor del campo es nulo o una cadena vacía.

    Args:
        campos_editables (dict): Un diccionario que contiene los campos a verificar.
                                 Las claves son los nombres de los campos y los valores
                                 son los datos a procesar.

    Returns:
        dict[str, str]: El mismo diccionario 'campos_editables' pero con los valores
                        nulos o vacíos reemplazados por un valor por defecto ('s/n').
                        Se devuelve un diccionario con claves de tipo string y valores de tipo string.

    Ejemplo:
        >>> datos = {'CustomerName': 'Juan', 'CustomerMiddleName': '', 'CustomerLastName': None, 'CustomerFraction': '2'}
        >>> to_edit(datos)
        {'CustomerName': 'Juan', 'CustomerMiddleName': 's/n', 'CustomerLastName': 's/n', 'CustomerFraction': '2'}
    """
    # Define los campos que deben tener un valor por defecto y sus respectivos valores
    fields_with_defaults = {
        'CustomerName': 's/n',
        'CustomerMiddleName': 's/n',
        'CustomerLastName': 's/n',
        'CustomerSecondLastName': 's/n',
        'CustomerFraction': 's/n',
        'CustomerAddress': 's/n',
        'CustomerNumberExt': 's/n'
    }

    # Itera sobre los campos definidos en fields_with_defaults para verificar y asignar
    for field_name, default_value in fields_with_defaults.items():
        # Obtiene el valor actual del campo en campos_editables.
        # .get() devuelve None si la clave no existe en el diccionario.
        current_value = campos_editables.get(field_name)

        # Verifica si el valor actual es None o una cadena vacía.
        # .strip() elimina los espacios en blanco iniciales y finales, asegurando
        # que cadenas como ' ' o '\t' también se consideren vacías.
        if current_value is None or (isinstance(current_value, str) and current_value.strip() == ''):
            campos_editables[field_name] = default_value
    
    return campos_editables
