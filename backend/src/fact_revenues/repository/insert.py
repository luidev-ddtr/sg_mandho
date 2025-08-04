from src.utils.conexion import Conexion
import sqlite3

def insert_fact_revenue(data_revenue: object) -> bool:
    """Inserta un nuevo registro de ingresos en la tabla FACT_Revenue.

    Esta función toma un objeto de datos de ingresos y lo inserta en la base
    de datos, manejando la conexión y el commit.

    Args:
        data_revenue (object): Un objeto que contiene los atributos
                               necesarios para la inserción, como
                               Fact_RevenueId, DIM_DateId, etc.

    Returns:
        bool: Retorna True si la inserción fue exitosa y False en caso de error.
    """
    object_conetion = Conexion()
    try:
        query = """INSERT INTO FACT_Revenue (FACT_RevenueId, DIM_DateId, DIM_AccountId, DIM_ServiceDetailsId, DIM_MovementId, DIM_StatusId, amount)
            VALUES
        (?, ?, ?, ?, ?, ?, ?)"""
        
        valores = (
            data_revenue.Fact_RevenueId,
            data_revenue.DIM_DateId,
            data_revenue.DIM_AccountId,
            data_revenue.DIM_ServiceDetailsId,
            data_revenue.DIM_MovementId,
            data_revenue.DIM_StatusId,
            data_revenue.amount
        )
        object_conetion.cursor.execute(query, valores)
        object_conetion.save_changes()
        
        return True
    except sqlite3.Error as e:
        print(f"Error al insertar el pago: {str(e)}")
        return False
    finally:
        object_conetion.close_conexion()