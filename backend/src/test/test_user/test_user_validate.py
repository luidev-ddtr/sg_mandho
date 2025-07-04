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
    }
    
    es_valido, mensaje = validate_user(user_json)
    
    assert es_valido == True
    mensaje == "Todo bien"
