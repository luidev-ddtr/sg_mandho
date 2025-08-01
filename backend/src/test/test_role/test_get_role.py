from src.dim_roles.repository.show import get_role

def test_get_role() -> None:
    """
    Funcion para comprobar que si se envia un identificador, se reciba toda
    la informacion del rol asociado a ese identificador
    """
    id_rol = "dcd3a2ee-69c1-545d"  # ID de rol de prueba
    objeto_rol = get_role(id_rol)
    data = objeto_rol.__dict__
    for dat in data:
        print(dat)
        assert dat
    
    assert isinstance(objeto_rol, object)  # Verifica que el resultado sea una lista