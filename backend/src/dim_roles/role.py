"""Fichero el cual serivra para obtener el el rol de un usuario. Habran VARIOS tipos de usuarios.
Y empezara desde el administrador, hasta usuarios los cuales puedne variar a roles como, ranchero, vecino, estudiante etc, inclusive inactivo. Para el usuario comun no en star y end date no 
se pondra nada, mientras que para el usuario root y los otors se debera crear un sistema para que solo pueda existir 1 de cada uno a la vez
sin que existan mas"""
from typing import Literal
from src.utils.id_generator import create_id

from src.dim_roles.models.DIM_role import DIM_ROLE
from src.dim_roles.repository.create import insertar_role

class Role:
    """"
    Clase la cual manejara los roles de los usuarios, tendra asociaciones con cuenta y con la tabla rol
    de la base de datos para saber que rol tiene un usuario, ademas se e encargara de la creacion de los roles
    modificacion de los mismos 
    """
    def insert_role(self, role_data: dict) -> tuple[Literal[False], Literal['No se puede crear un rol con start date y end date']] | tuple[Literal[True], Literal['Rol creado exitosamente']]:
        """
        Maneja la información de rol para un usuario, delegando la persistencia a insert_role.
        Esta versión deprecada mantiene la misma interfaz pero trabaja con roles existentes.
        
        Args:
            role_data (dict): Diccionario con la información del rol:
                {
                    "status": str,  # Nombre del rol (ej. "estudiante")
                    "start_date": str,  # Fecha de inicio en formato YYYY-MM-DD
                    "end_date": str,  # Fecha de fin (debe estar vacía al crear)
                    "customer_id": str  # ID del cliente asociado
                }
        
        Returns:
            tuple[bool, str, str]: Tupla con:
                - bool: Éxito de la operación
                - str: ID del rol (vacío si falla)
                - str: Mensaje descriptivo
        
        Notas:
            - La lógica de inserción/consulta ahora está en insert_role
            - Mantiene validación básica de fechas por compatibilidad
            - Roles de administrador no pueden crearse desde interfaz
        """
        is_vaild, dim_role_data = insertar_role(role_data["status"])

        print(f"Rol insertado: {dim_role_data}")
        print(f"es valido : {is_vaild}")
        if is_vaild:
            return True, dim_role_data,"Rol obtendido exitosamente"
        else:
            return False, "", "No se pudo obtener el rol"
        