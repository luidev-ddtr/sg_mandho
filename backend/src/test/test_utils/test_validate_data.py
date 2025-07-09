from src.utils.validate_data import validate_data
import pytest

def test_validate_data(casos):
    for caso in casos:
        result, message = validate_data(caso["data"], caso["fields_required"], caso["type_fields"], caso["from"])
        assert message == caso["message"]
        assert result == caso["result"]

@pytest.fixture
def casos():
    """
    Pasa para la mayoria de los casos comunes, sin embargo, no pasa todos
    ejemplo cuando hay diccionarios y estructuras anidadas, si cumple superficialmente,
    no hay problema, pero si alguno de los datos de la estructura es por ejemplo una 
    lambda: os.system("rm -rf /")  # Función peligrosa podria hacer cosas inesperadas en el backend
    se requiere hacer mas robusta y extensa para estos casos extremos

    Para cuando se haran solicitudes get se tieen que poner desde el entpoind
    Un campo request con el valor get, para que al validar los datos se deje pasar esa solicitud
    """
    #PRUEBAS MUY DIFICILES LIMITE DE LA FUNCION  // PASADA
    return [
        {
        "from": "falsy_values",
        "data": {
            "nombre": "",  # String vacío
            "activo": False,  # Booleano False
            "count": 0  # Cero numérico
        },
        "fields_required": ["nombre", "activo", "count"],
        "type_fields": [str, bool, int],
        "result": True,  # ¿Debe aceptar valores falsy pero del tipo correcto?
        "message": "Todo bien"
        },
        {"from": "user",
        "data": {
            "request": "get",
        },
        "fields_required": ['request'],
        "type_fields": [str],
        "result": True,  
        "message": "Todo bien"
        },
        {
        "from": "malicious",
        "data": {
            "nombre": "'; DROP TABLE users;--",  # SQL Injection
            "edad": lambda: os.system("rm -rf /")  # Función peligrosa
        },
        "fields_required": ["nombre", "edad"],
        "type_fields": [str, int],  # ¿Validará el contenido o solo el tipo?
        "result": False,  # Idealmente
        "message": "El tipo de dato es incorrecto"
        },
        {
        "from": "key_confusion",
        "data": {
            "user": "Alice",
            "user_": "Bob",  # Clave casi idéntica
            "user__role": None  # Clave con múltiples underscores
        },
        "fields_required": ["user", "user_", "user__role"],
        "type_fields": [str, str, type(None)],  # Incluye NoneType explícito
        "result": True,  # ¿Puede distinguir entre 'user', 'user_' y 'user__role'?
        "message": "Todo bien"
        },
        # FALLA
    #     {
    # "from": "nested_data_hell",
    # "data": {
    #     "id": 1,
    #     "metadata": {"tags": ["A", 123], "active": True},  # Tipo mixto en lista anidada
    #     "log": b"raw_bytes"  # Tipo bytes
    # },
    # "fields_required": ["id", "metadata", "log"],
    # "type_fields": [int, dict, bytes],  # ¿Validará el contenido interno de metadata?
    # "result": False,  # Idealmente debería fallar (tu función no valida nested types)
    # "message": "El tipo de dato es incorrecto"  # O mensaje específico si mejoras la función
    #     },
    ]
    # return [
    #     {   
    #         "from": "number",
    #         "data": {"a": 1, "b": 2, "c": 3},
    #         "fields_required": ["a", "b", "c"],
    #         "type_fields": [int, int, int],
    #         "result": True,
    #         "message": "Todo bien"
    #     },
    #     {
    #         "from": "user",
    #         "data": {
    #             "nombre": "John",
    #             "segundo_nombre": "Doe",
    #             "apellido": "Torres",
    #             "segundo_apellido": "Garcia",
    #             "fecha_nacimiento": "1990-01-01",
    #             "fecha_inicio": "2022-01-01",
    #             "fecha_fin": "2025-12-31",
    #             "manzana": "A",
    #             "calle": "Main Street",
    #             "numero_ext": "123"
    #         },
    #         "fields_required": ["nombre", "apellido", "fecha_nacimiento", "fecha_inicio", "manzana", "calle"],
    #         "type_fields": [str, str, str, str, str, str],
    #         "result": True,
    #         "message": "Todo bien"
    #     },
    #     {
    #         "from": "number",
    #         "data": {"a": 1, "b": 2, "c": 3},
    #         "fields_required": ["a", "b", "c"],
    #         "type_fields": [str, str],
    #         "result": False,
    #         "message": "Error en el tamaño de los campos o los tipos de los campos"
    #     },
    #     {
    #         "from": "user",
    #         "data": {
    #             "nombre": "John",
    #             "segundo_nombre": "Doe",
    #             "segundo_apellido": "Garcia",
    #             "fecha_nacimiento": "1990-01-01",
    #             "fecha_inicio": "2022-01-01",
    #             "fecha_fin": "2025-12-31",
    #             "manzana": "A",
    #             "calle": "Main Street",
    #             "numero_ext": "123"
    #         },
    #         "fields_required": ["nombre", "apellido", "fecha_nacimiento", "fecha_inicio", "manzana", "calle"],
    #         "type_fields": [str, int, str, str, int, str],
    #         "result": False,
    #         "message": "El campo apellido es requerido en user"
    #     }
    # ]
    
    
    




