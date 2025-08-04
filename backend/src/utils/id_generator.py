import uuid

def create_id(data: list) -> str:
    """
    Genera un identificador único de 18 caracteres basado en datos de entrada.
    Su funcionamiento es el siguiente, se desempaquetan los 3 datos del array y se pasan a string
    despues se capitalizan y se toman solo 3 letras como maximo, por ultimo se hashean y se genera un
    id determinista, que quiere decir, si le das la misma entrada te generara el mismo uuid
    
    Args:
        data (list): Lista con campos para construir el ID (3 elementos máximo)
        
    Returns:
        str: Identificador único de 18 caracteres
    """
    fields = [str(field).capitalize()[:3] if field is not None else "" for field in data[:3]]
    
    part1 = fields[0] if len(fields) > 0 else ""
    part2 = fields[1] if len(fields) > 1 else ""
    part3 = fields[2] if len(fields) > 2 else ""
    
    # Construir el ID base
    uuid_base_string = f"{part1}-{part2}-{part3}"
    
    namespace = uuid.NAMESPACE_URL
    uuid_obj = uuid.uuid5(namespace, uuid_base_string)
    uuid_string = str(uuid_obj)
    
    return uuid_string[:18]  # SE retornan caracteres totalmente aleatorios


if __name__ == "__main__":
    #Generar id para la tabla DIM_Role  #Las fechas son para startdate, enddate se puede poner dentro de 100 anios
    # info = [
    #     ["delegado", "administrador", "2000-01-01"],
    #     ["comitiva", "administrador", "2000-01-01"],
    #     ["subdelegado", "administrador", "2000-01-01"],
    #     ["estudiante", "usuario", "2000-01-01"],
    #     ["ranchero", "usuario", "2000-01-01"],
    #     ["vecino", "usuario", "2000-01-01"],
    #     ["inmigrante", "usuario", "2000-01-01"],
    #     ["pequeño propietario", "usuario", "2000-01-01"],
    #     ["invalido", "inactivo", "2000-01-01"]
    # ]
    # datos =[
    # ["Juan", "Perez", "2025-01-01"],
    # [None, None, None]
    # ]

    # datos = [
    #     ["ingreso"],
    #     ["egreso"]
    # ]

    # datos = [
    #     ["agua", "comitiva"],
    #     ["feria", "comitiva"],
    #     ["panteon", "comitiva"],
    #     ["delegacion", "comitiva"],
    # ]

    # datos = [
    #     ["consumo", '350.00']
    # ]

    datos = [
        ['1fbd9d83-7a85-50ec', 'tomas', '2025-12-31'],
        ['e2d33355-5186-597c', 'faenap', '2025-12-31'],
        ['e2d33355-5186-597c', 'cooperacionp', '2025-12-31'],
    ]

    for registro in datos:
        print(create_id(registro))
    #     data = info[i]
    #     print(create_id(data))
