class FACT_Revenue:
    def __init__(self, FACT_RevenueId: str, DIM_DateId: str, DIM_AccountId: str, DIM_ServiceDetailsId: str, DIM_MovementId:str, DIM_StatusId: str, amount: float, ) -> None:
        self.Fact_RevenueId = FACT_RevenueId
        self.DIM_DateId = DIM_DateId
        self.DIM_AccountId = DIM_AccountId
        self.DIM_ServiceDetailsId = DIM_ServiceDetailsId
        self.DIM_MovementId = DIM_MovementId
        self.DIM_StatusId = DIM_StatusId
        self.amount = amount

    def to_dict(self) -> dict[str, str | float]:
        return {
            "Fact_RevenueId": self.Fact_RevenueId,
            "DIM_DateId": self.DIM_DateId,
            "DIM_AccountId": self.DIM_AccountId,
            "DIM_ServiceDetailsId": self.DIM_ServiceDetailsId,
            "DIM_MovementId": self.DIM_MovementId,
            "DIM_StatusId": self.DIM_StatusId,
            "amount": self.amount
        }
    
    