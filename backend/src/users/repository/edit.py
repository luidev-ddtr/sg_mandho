import sqlite3
from src.utils.conexion import Conexion

def edit_user(data_edit: dict) -> bool:
    """Esta funcion se encarga de editar la informacion de un usuario en la tabla DIM_Customer.

    La funcion recibe un diccionario con los datos a actualizar y el ID del usuario. 
    Se conecta a la base de datos, construye y ejecuta una consulta SQL para actualizar 
    la informacion del usuario con el 'DIM_CustomerId' proporcionado.

    Args:
        data_edit (dict): Un diccionario que contiene la informacion del usuario que se va a editar. 
        Debe contener el campo 'DIM_CustomerId' para identificar al usuario, y los demas campos 
        que se desean actualizar. Los campos posibles son:
        
        - "DIM_CustomerId": str, ID unico del cliente.
        - "CustomerName": str, Nombre del cliente.
        - "CustomerMiddleName": str, Segundo nombre del cliente.
        - "CustomerLastName": str, Apellido paterno del cliente.
        - "CustomerSecondLastName": str, Apellido materno del cliente.
        - "CustomerFraction": str, Fraccionamiento o colonia del cliente.
        - "CustomerAddress": str, Direccion completa del cliente.
        - "CustomerNumberExt": str, Numero exterior de la direccion.

    Returns:
        bool: Retorna True si la edicion se realizo correctamente, y False en caso de que ocurra
              un error durante la operacion, como un error de base de datos.
    """
    handler_coon = Conexion()
    try:

        print('Datos a ingresar', data_edit)
        query = """
        UPDATE DIM_Customer
                   SET
                   CustomerName = ?,
                   CustomerMiddleName = ?,
                   CustomerLastName = ?,
                   CustomerSecondLastName = ?,
                   CustomerFraction = ?,
                   CustomerAddress = ?,
                   CustomerNumberExt = ?
                   WHERE DIM_CustomerId = ?"""
        values = (
            data_edit['CustomerName'],
            data_edit['CustomerMiddleName'],
            data_edit['CustomerLastName'],
            data_edit['CustomerSecondLastName'],
            data_edit['CustomerFraction'],
            data_edit['CustomerAddress'],
            data_edit['CustomerNumberExt'],
            data_edit['DIM_CustomerId']
        )
        handler_coon.cursor.execute(query, values)

        handler_coon.save_changes()
        return True
    except sqlite3.Error as e:
        print("Error al editar el usuario", e)
        return False
    finally:
        handler_coon.close_conexion()