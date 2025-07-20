class DIM_ROLE:
    def __init__(self, DIM_RoleID: str, RoleName: str, RoleType: str, RoleStartDate: str, RoleEndDate: str) -> None:
        """
        Constructor para la asignación de roles.
        
        Args:
            DIM_RoleID: Identificador único del rol
            RoleName: Nombre del rol
            RoleType: Tipo de rol
            RoleStartDate: Fecha de inicio del rol (formato YYYY-MM-DD)
            RoleEndDate: Fecha de fin del rol (formato YYYY-MM-DD o None)
        """
        self.DIM_RoleID = DIM_RoleID
        self.RoleName = RoleName
        self.RoleType = RoleType
        self.RoleStartDate = RoleStartDate
        self.RoleEndDate = RoleEndDate

    def __str__(self) -> str:
        """Representación legible del objeto"""
        return (f"FACT_ROLE_ASSIGMENT(DIM_RoleID={self.DIM_RoleID}, "
                f"RoleName='{self.RoleName}', RoleType='{self.RoleType}', "
                f"RoleStartDate={self.RoleStartDate}, RoleEndDate={self.RoleEndDate})")

    def to_dict(self) -> dict:
        """
        Convierte el objeto a diccionario para serialización.
        
        Returns:
            Diccionario con todos los atributos del objeto
        """
        return {
            "DIM_RoleID": self.DIM_RoleID,
            "RoleName": self.RoleName,
            "RoleType": self.RoleType,
            "RoleStartDate": self.RoleStartDate,
            "RoleEndDate": self.RoleEndDate
        }