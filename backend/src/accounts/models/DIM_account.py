class DIM_Account:
    def __init__(self, DIM_AccountId, DIM_DateId, DIM_CustomerId, DIM_RoleId, DIM_StatusId, StartDate, EndDate=None, timestamp=None) -> None:
        """
        Clase que mapea exactamente la tabla DIM_Account de la base de datos.
        Los nombres de los parámetros coinciden exactamente con los nombres de las columnas.
        """
        self.DIM_AccountId = DIM_AccountId
        self.DIM_DateId = DIM_DateId
        self.DIM_CustomerId = DIM_CustomerId
        self.DIM_RoleId = DIM_RoleId
        self.DIM_StatusId = DIM_StatusId
        self.StartDate = StartDate
        self.EndDate = EndDate

    def __str__(self) -> str:
        """
        Returns a string representation of the DIM_Account object.

        This method provides a readable format of the account details,
        including all the key attributes such as account ID, date ID,
        customer ID, role ID, status ID, start date, and end date.

        Returns:
            str: A formatted string representing the account.
        """
        return (f"DIM_Account("
                f"DIM_AccountId={self.DIM_AccountId}, "
                f"DIM_DateId={self.DIM_DateId}, "
                f"DIM_CustomerId={self.DIM_CustomerId}, "
                f"DIM_RoleId={self.DIM_RoleId}, "
                f"DIM_StatusId={self.DIM_StatusId}, "
                f"StartDate={self.StartDate}, "
                f"EndDate={self.EndDate} ")