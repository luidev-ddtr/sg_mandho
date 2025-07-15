def show_account(account_id: str|None) -> dict[str, str]:
    """
    Funcion la cual se engara de obtener la informacion de la cuenta que se desea mostrar
    recibe un parametro si el parametro es none devuelve toda la informacion de las cuentas
    y si es string busca las cuentas las cuales tengan ese id_persona asociado y las devuelve

    Args:
        account_id (str|None): El id de la cuenta que se desea mostrar

    Returns:
        dict[str, str]: La informacion de la cuenta

    constrains:
            Si no se encuentra el id se retorna un diccionario vacio
    """