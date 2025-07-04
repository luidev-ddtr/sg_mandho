from src.users.main import UserCrud


def test_insert_user():
    crud = UserCrud()
    user_json = {
        "nombre": "John",
        "segundo_nombre": "Doe",
        "apellido": "Torres",
        "segundo_apellido": "",
        "fecha_nacimiento": "1990-01-01",
        "fecha_inicio": "2022-01-01",
        "fecha_fin": "",
        "manzana": "A",
        "calle": "Main Street",
        "numero_ext": "123"
    }
    
    status_code, message = crud.insert_user(user_json)
    
    assert status_code == 200
    
    # assert user == {
    #         "id_user": "1",
    #         "first_name": "John",
    #         "second_name": "Doe",
    #         "last_name": "Torres",
    #         "second_last_name": "Garcia",
    #         "date_of_birth": "1990-01-01",
    #         "date_user_start": "2022-01-01",
    #         "date_user_end": "2025-12-31",
    #         "user_manzana": "A",
    #         "user_street": "Main Street",
    #         "user_number_ext": "123",
    #     }
    
    assert message == "Se instacio a la persona correctamente"
    
    #assert dates == {
    #         "dateId": "1",
    #         "fiscal_date": "2022-01-01",
    #         "fiscal_year": "2022",
    #         "fiscal_month": "01",
    #         "fiscal_day": "01",
    #         "week": "01",
    #         "year": "2022",
    #         "month": "01",
    #         "day": "01"
    #     }