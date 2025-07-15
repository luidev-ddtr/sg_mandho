
class DIM_account:
    def __init__(self, dim_account_id, dim_date_id, dim_customer_id, dim_status_id, start_date, end_date: str="s/n"):
        """
        Esta es la clase que mapeara la base de datos, una vez que los datos esten limpios pasan por esta clase la cual 
        los envia a la base de datos
        """
        self.dim_account_id = dim_account_id
        self.dim_date_id = dim_date_id
        self.dim_customer_id = dim_customer_id
        self.dim_status_id = dim_status_id
        self.start_date = start_date
        self.end_date = end_date
    def __str__(self):
        return f"Account {self.dim_account_id} {self.dim_date_id} {self.dim_customer_id} {self.dim_status_id} {self.start_date} {self.end_date}"

