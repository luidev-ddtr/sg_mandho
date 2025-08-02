from src.dim_dates.dim_date import DIM_DATE
from src.utils.id_generator import create_id
from src.dim_serviceonwers.models.DIM_ServiceOnwers import DIM_ServiceOnwers

from src.dim_service.DIM_Service import DIM_Service

hanlder_dim_date = DIM_DATE()
class DIM_ServiceOnwersCrud:
    """Class to handle CRUD operations for service owners."""
    
    def insert_service_owner(self, service_owner_json: dict) -> tuple:
        """
        Insert a new service owner record if the provided data is valid.

        Args:
            service_owner_json (dict): A dictionary containing service owner information.

        Returns:
            tuple: A tuple containing the status code and a message.
        """
        handler_service = DIM_Service()
        service_id = handler_service.get_service_id(service_owner_json['ServiceName'])
        if not service_id:
            return 404, "Service not found"
        try:
            data_format = {
                "DIM_ServiceOnwersId": create_id([service_owner_json['DIM_OnwerCustomerId'], service_id]),
                "DIM_DateId": hanlder_dim_date.dateId,
                "DIM_serviceId": service_id,
                "DIM_CustomerId": service_owner_json['DIM_OnwerCustomerId'],
                "StartDate": service_owner_json['StartDate'], # Estos aun no existen
                "EndDate": service_owner_json['EndDate'] # ni este sajsvnfk
            }
            service_owner = DIM_ServiceOnwers(**data_format)
            print(service_owner)
            return 201, "Service owner created successfully"
        except Exception as e:
            return 500, f"Error creating service owner: {str(e)}"