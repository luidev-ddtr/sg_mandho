from src.users.user import UserCrud

def test_read_user() -> None:
    user_options = UserCrud()
    data = { "id_user": '', "filters": {}}
    estado , mensaje, informacion = user_options.read_user(data)
    assert estado == 200
    assert mensaje == 'Se encontraron resultados con estos filtros'
    assert type(informacion) == list 


    

def test_read_user2() -> None:
    user_options = UserCrud()
    data = { "id_user": "74ca90c2-5657-5eef", "filters": {}}
    estado , mensaje, informacion = user_options.read_user(data)
    assert estado == 200
    assert mensaje == 'Se encontró a la persona correctamente'
    assert len(informacion) == 1 