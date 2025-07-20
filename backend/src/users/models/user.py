class User:
    def __init__(self, DIM_DateId: str, DIM_CustomerId: str, CustomerName: str, 
                 CustomerMiddleName: str = "s/n", CustomerLastName: str = "", 
                 CustomerSecondLastName: str = "s/n", CustomerDateBirth: str = "", 
                 CustomerDateStart: str = "", CustomerDateEnd: str = "s/n", 
                 CustomerFraction: str = "", CustomerAdress: str = "", 
                 CustomerNumberext: str = "") -> None:
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
        self.DIM_DateId = DIM_DateId
        self.DIM_CustomerId = DIM_CustomerId
        self.CustomerName = CustomerName
        self.CustomerMiddleName = CustomerMiddleName
        self.CustomerLastName = CustomerLastName
        self.CustomerSecondLastName = CustomerSecondLastName
        self.CustomerDateBirth = CustomerDateBirth
        self.CustomerStartDate = CustomerDateStart
        self.CustomerEndDate = CustomerDateEnd
        self.CustomerFraction = CustomerFraction
        self.CustomerAddress = CustomerAdress
        self.CustomerNumberext = CustomerNumberext

    def __str__(self) -> str:
        """
        Representación legible del usuario. Útil para depuración rápida o impresión simple.
        """
        return (f"User({self.DIM_CustomerId}): {self.CustomerName} {self.CustomerMiddleName} "
                f"{self.CustomerLastName} {self.CustomerSecondLastName}, "
                f"Nacido el {self.CustomerDateBirth}, "
                f"Inicio: {self.CustomerStartDate}, Fin: {self.CustomerEndDate}, "
                f"Dirección: {self.CustomerFraction}, {self.CustomerAddress} #{self.CustomerNumberext}")

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
        Número Exterior:       {self.CustomerNumberext}
        """)

