class DIM_ServiceOnwers:
    """Class to handle CRUD operations for service owners."""
    
    def __init__(self, DIM_ServiceOnwersId: str, DIM_DateId: str, DIM_serviceId: str, DIM_CustomerId: str, StartDate: str, EndDate: str) -> None:
        self.DIM_ServiceOnwersId = DIM_ServiceOnwersId
        self.DIM_DateId = DIM_DateId
        self.DIM_serviceId = DIM_serviceId
        self.DIM_CustomerId = DIM_CustomerId
        self.StartDate = StartDate
        self.EndDate = EndDate

    def __str__(self):
        return f"DIM_ServiceOnwers(DIM_ServiceOnwersId={self.DIM_ServiceOnwersId}, DIM_DateId={self.DIM_DateId}, DIM_serviceId={self.DIM_serviceId}, DIM_CustomerId={self.DIM_CustomerId}, StartDate={self.StartDate}, EndDate={self.EndDate})"

    
    def to_dict(self) -> dict[str, str]:
        """Convert the instance to a dictionary."""
        return {
            "DIM_ServiceOnwersId": self.DIM_ServiceOnwersId,
            "DIM_DateId": self.DIM_DateId,
            "DIM_serviceId": self.DIM_serviceId,
            "DIM_CustomerId": self.DIM_CustomerId,
            "StartDate": self.StartDate,
            "EndDate": self.EndDate
        }