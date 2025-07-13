import uuid

def create_id(data: list) -> str:
    """
    Genera un identificador único de 18 caracteres basado en datos de entrada.
    
    Args:
        data (list): Lista con campos para construir el ID (3 elementos máximo)
        
    Returns:
        str: Identificador único de 18 caracteres
    """
    fields = [str(field).capitalize()[:3] if field is not None else "" for field in data[:3]]
    
    part1 = fields[0] if len(fields) > 0 else ""
    part2 = fields[1] if len(fields) > 1 else ""
    part3 = fields[2] if len(fields) > 2 else ""
    random_part = uuid.uuid4().hex[:6]  
    
    # Construir el ID base
    uuid_string = f"{part1}-{part2}-{part3}-{random_part}"
    
    # Asegurar longitud de 18 caracteres
    if len(uuid_string) < 18:
        
        needed = 18 - len(uuid_string)
        
        extra_chars = uuid.uuid4().hex[:needed]
        uuid_string += extra_chars
    elif len(uuid_string) > 18:
        
        uuid_string = uuid_string[:18]
    
    return uuid_string