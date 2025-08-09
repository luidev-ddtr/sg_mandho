from src.utils.conexion import Conexion
import sqlite3
class Create():
    def insert_user(self, data: object) -> bool:
        """Método responsable de insertar un usuario a la base de datos
        
        Tabla: Table DIM_Customer {
            DIM_CustomerId uuid [pk]
            DIM_DateId uuid
            CustomerName varchar(50)
            CustomerMiddleName varchar(50)
            CustomerLastName varchar(50)
            CustomerSecondLastName varchar(50)
            CustomerAdress varchar(100)
            CustomerFraction varchar(50)
            CustomerPhone varchar(12)
            CustomerStartDate date
            CustomerEndDate date
            timestamp timestamp
        }

        Args:
            data (object): Instancia de la clase persona con los datos a insertar
            
        Returns:
            bool: True si se insertó correctamente, False si hubo error
        """
        try:
            object_conecction = Conexion()
            
            # Consulta con columnas explícitas (ajustadas al número correcto de parámetros)
            query = """
            INSERT INTO DIM_Customer (
                DIM_CustomerId, 
                DIM_DateId, 
                CustomerName, 
                CustomerMiddleName,
                CustomerLastName, 
                CustomerSecondLastName, 
                CustomerDateBirth,
                CustomerStartDate, 
                CustomerEndDate, 
                CustomerFraction, 
                CustomerAddress, 
                CustomerNumberExt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """

            values = (
                str(data.DIM_CustomerId),
                str(data.DIM_DateId),
                data.CustomerName,
                data.CustomerMiddleName,
                data.CustomerLastName,
                data.CustomerSecondLastName,
                data.CustomerDateBirth,  # Agregado este campo que faltaba
                data.CustomerStartDate,
                data.CustomerEndDate,
                data.CustomerFraction,
                data.CustomerAddress,
                data.CustomerNumberExt  # Agregado este campo que faltaba
            )

            object_conecction.cursor.execute(query, values)
            
            object_conecction.save_changes()  # Comentado según lo indicado
            object_conecction.close_conexion()
            
            return True
        except sqlite3.Error as e:
            object_conecction.close_conexion()
            print(f"Error al insertar la persona: {e}")
            return False