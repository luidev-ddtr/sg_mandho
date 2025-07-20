
class FACT_ROLE_ASSIGMENT():
    def __init__(self, AssigmentId: str, roleId: str, CustomerId: str, RoleStartDate: str, RoleEndDate: str, Active: int) -> None:
        self.AssigmentId = AssigmentId
        self.RoleId = roleId
        self.CustomerId = CustomerId
        self.RoleStartDate = RoleStartDate
        self.RoleEndDate = RoleEndDate
        self.Active = Active

    def __str__(self) -> str:
        return f"Role Assigment {self.AssigmentId} {self.RoleId} {self.CustomerId} {self.RoleStartDate} {self.RoleEndDate} {self.Active}"
    
    def __dict__(self) -> dict:
        return {
            "AssigmentId": self.AssigmentId,
            "RoleId": self.RoleId,
            "CustomerId": self.CustomerId,
            "RoleStartDate": self.RoleStartDate,
            "RoleEndDate": self.RoleEndDate,
            "Active": self.Active
        }