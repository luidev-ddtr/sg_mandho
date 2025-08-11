from src.accounts.account import AccountCrud

def test_account_read() -> None:
    crud = AccountCrud()
    data = { "id_user": "c6bad113-64ce-5fd0"}
    status_code, message, data_account = crud.read_account(data)
    
    print(f"El estado {status_code}  Mensaje: {message}")
    assert status_code == 200
    assert  message == "Cuenta obtenida correctamente"
    assert len(data_account) > 0