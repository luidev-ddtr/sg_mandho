def validate_data(data: dict, fields_required: list, type_fields: list, from_message: str) -> tuple:
    """Funcion para validar la informacion proveniente de los endpoints, 
    Args:
        data (dict): Diccionario con la informacion de la cuenta
        fields_required (list): Lista con los campos requeridos
        type_fields (list): Lista con los tipos de los campos

    Returns:
        bool: Se retorna true o false
        str: Se retorna un string de error o exito especifico de que falto o si esta bien
    """
    if len(fields_required) != len(type_fields):
        return False, "Error en el tamaño de los campos o los tipos de los campos"
    
    claves_cuenta = set(data.keys())
    for clave in fields_required:
        
        if (not clave in claves_cuenta):
            return False, f"El campo {clave} es requerido en {from_message}"
        
        if (type(data[clave]) != type_fields[fields_required.index(clave)]):
            return False, f"El tipo de dato es incorrecto"
        
    return True, "Todo bien"