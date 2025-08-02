class DIM_Details:
    """
    Clase encargada de manejar los detalles del servicio.
    """
    
    def __init__(self, DIM_ServiceDetailsId, DIM_DateId, DIM_ServiceId, ServiceDetailsType, amount) -> None:
        """Constructor de la clase DIM_ServiceDetails."""
        self.DIM_ServiceDetailsId = DIM_ServiceDetailsId
        self.DIM_DateId = DIM_DateId
        self.DIM_ServiceId = DIM_ServiceId        
        self.ServiceDetailsType = ServiceDetailsType
        self.amount = amount
        
    def to_dict(self) -> dict[str, str | float]:
        """Convierte el objeto a un diccionario."""
        return {
            "DIM_ServiceDetailsId": self.DIM_ServiceDetailsId,
            "DIM_DateId": self.DIM_DateId,
            "DIM_ServiceId": self.DIM_ServiceId,
            "ServiceDetailsType": self.ServiceDetailsType,
            "amount": self.amount
        }