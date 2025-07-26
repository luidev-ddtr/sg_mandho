import sqlite3
import os
from dotenv import load_dotenv
class Conexion:
    """
    Overview
    The Conexion class is designed to manage the connection to a SQLite database. It provides methods for opening, closing, and handling errors in the connection.

    Attributes
    __ruta: The path to the database file (default: "root(sg_mandho)/database/Gestion_mandho.db")
    conn: The SQLite connection object
    cursor: The SQLite cursor object
    Methods
    __init__
    Initializes the connection to the database.

    Returns: None
    get_route
    Returns the path to the database file.

    Returns: str
    save_changes
    Saves changes to the database and closes the connection. If an error occurs during commit or close, it raises an exception.

    Returns: None
    conexion
    Returns a tuple containing the connection and cursor objects. If the connection or cursor is not initialized, it raises an exception.

    Returns: tuple[Connection, Cursor]
    close_conexion
    Closes the connection and cursor. If an error occurs, it raises an exception.

    Returns: None
    Example Usage
    python
    conexion = Conexion()
    # Use the connection and cursor objects
    conn, cursor = conexion.conexion()
    # Save changes
    conexion.save_changes()
    # Close the connection
    conexion.close_conexion()
    Error Handling
    The Conexion class raises exceptions for errors that occur during connection, commit, and close operations. You can catch these exceptions using try-except blocks to handle errors programmatically.

    python
    try:
        conexion.save_changes()
    except sqlite3.Error as e:
        print(f"Error saving changes: {e}")
    """

    def __init__(self) -> None:
        self.__ruta = "C:\\Users\\angel\\Documents\\Github\\sg_mandho\\backend\\database\\sistema_mandho.db"#str(os.getenv('DATABASE_PATH'))
        self.conn = sqlite3.connect(self.get_route())
        self.cursor = self.conn.cursor()

    def get_route(self) -> str:
        return self.__ruta

    def save_changes(self) -> None:
        """
        Método que guarda los cambios en la base de datos y cierra la conexión.
        Si ocurre un error durante el commit o el cierre, se captura y se lanza una excepción.
        """
        try:
            # Intentar guardar los cambios
            self.conn.commit()
        except sqlite3.Error as e:
            # Capturar errores durante el commit
            print(f"Error al guardar los cambios: {e}")
            raise


    def conexion(self) -> tuple:
        """
        Devuelve una tupla con las variables para la conexión.
        Si la conexión o el cursor no están inicializados, lanza una excepción.
        """
        try:
            return self.conn, self.cursor
        except sqlite3.Error as e:
            print(f"Error al enviar conexiones: {e}")
            raise


    def close_conexion(self) -> None:
        """
        Cierra la conexión y el cursor.
        Si ocurre un error, se captura y se lanza una excepción.
        """
        try:
            if self.cursor:
                self.cursor.close()
            if self.conn:
                self.conn.close()
            print("Cerrado: Desde clase conexion ")
        except sqlite3.Error as e:
            print(f"Error al cerrar la conexión: {e}")
            raise
