"""Fichero el cual serivra para obtener el el rol de un usuario. Habran VARIOS tipos de usuarios.
Y empezara desde el administrador, hasta usuarios los cuales puedne variar a roles como, ranchero, vecino, estudiante etc, inclusive inactivo. Para el usuario comun no en star y end date no 
se pondra nada, mientras que para el usuario root y los otors se debera crear un sistema para que solo pueda existir 1 de cada uno a la vez
sin que existan mas"""
from typing import Literal
from src.utils.id_generator import create_id

from src.dim_roles.models.DIM_role import DIM_ROLE
from src.dim_roles.repository.create import insert_role
class Role:
    """"
    Clase la cual manejara los roles de los usuarios, tendra asociaciones con cuenta y con la tabla rol
    de la base de datos para saber que rol tiene un usuario, ademas se e encargara de la creacion de los roles
    modificacion de los mismos 
    """
    def insert_role(self, role_data: dict) -> tuple[Literal[False], Literal['No se puede crear un rol con start date y end date']] | tuple[Literal[True], Literal['Rol creado exitosamente']]:
        """
        Inserta un nuevo rol para un usuario. Esta función se encarga de validar la 
        información proporcionada para el rol y luego crear el rol en la base de datos.

        Args:
            role_data (dict): Un diccionario que contiene la información necesaria para 
                            crear el rol del usuario, incluyendo el tipo de rol y 
                            cualquier otra información relevante.
                ejemplo: {
                    "role_name": "estudiante",
                    "start_date": "2022-01-01",
                    "end_date": "" # End date siempre debe estar bvacio al crear un rol
                }
        Returns:
            bool: Retorna True si el rol fue creado exitosamente.
            str: Mensaje indicando el resultado de la operación.

        -Notas:
                Se espera que desdela interfaz solamente se envie el rol del usuario, los roles de administrador aun no pueden 
                ser creados desde la interfaz. Se debe crear un sistema para que este metodo no sea violado. 
        """
        #Faltan por agregar algunos roles
        roles = {
                    "delegado": "administrador", 
                    "comitiva": "administrador", 
                    "subdelegado": "administrador",

                    "estudiante": "usuario", 
                    "ranchero": "usuario",
                    "vecino": "usuario",
                    "inmigrante": "usuario",
                    "pequeño propietario" : "usuario",

                    "invalido": "inactivo", 
                }
        
        if role_data["start_date"] and (not role_data["end_date"] == ""):
            return False, "","No se puede crear un rol con start date y end date"
        
        role_format = {
            "DIM_RoleID": create_id([role_data["status"], role_data["customer_id"], roles[role_data["status"]]]),
            "RoleName": role_data["status"],
            "RoleType": roles[role_data["status"]],
            "RoleStartDate": role_data["start_date"],
            "RoleEndDate": role_data["end_date"],
        }
        dim_role_data = DIM_ROLE(**role_format)
        is_vaild = insert_role(dim_role_data)

        if is_vaild:
            return True, dim_role_data.DIM_RoleID,"Rol creado exitosamente"
        else:
            return False, "", "No se pudo ingresar el rol"