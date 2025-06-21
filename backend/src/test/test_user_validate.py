from src.users.models.user import validate_user

def test_validate_user():
    
    user_json = {
        "nombre": "John",
        "segundo_nombre": "Doe",
        "apellido": "Torres",
        "segundo_apellido": "Garcia",
        "fecha_nacimiento": "1990-01-01",
        "fecha_inicio": "2022-01-01",
        "fecha_fin": "2025-12-31",
        "manzana": "A",
        "calle": "Main Street",
        "numero_ext": "123",
        "dim_date": {
            "fiscalDate": "2022-01-01",
            "fiscalYear": "2022",
            "fiscalMonth": "01",
            "fiscalDay": "01",
            "week": "01",
            "year": "2022",
            "month": "01",
            "day": "01"
        }
    }
    
    es_valido, mensaje = validate_user(user_json)
    
    assert es_valido
    assert mensaje == "Todo bien"
