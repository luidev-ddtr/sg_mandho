#from src.account.models.DIM_account import DIM_account
from src.utils.id_generator import create_id
from src.account.models.DIM_status import DIM_status


def create_status(status: str) -> DIM_status:
    """
    Esta funcion es la que crea el estado para poder introducirlo en la base de datos
    
    Args:
        status (str): Nombre del estado
    Returns:
        DIM_status: Objeto con la informacion para ser introducida en la base de datos
    """
    dim_status_id = create_id()
    
    status_name = status
    
    dim_status = DIM_status(dim_status_id, status_name)
    
    return dim_status