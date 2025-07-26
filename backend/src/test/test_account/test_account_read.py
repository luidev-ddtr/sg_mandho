from src.accounts.account import AccountCrud

def test_account_read() -> None:
    crud = AccountCrud()
    data = { "id_user": ""}
    status_code, message,datos_legibles = crud.read_account(data)
    
    print(f"El estado {status_code}  Mensaje: {message}")
    assert status_code == 200
    assert  message == "Todas las cuentas obtenidas correctamente"
    assert len(datos_legibles) > 0