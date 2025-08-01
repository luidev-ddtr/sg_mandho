from src.accounts.account import AccountCrud

def test_account_read() -> None:
    crud = AccountCrud()
    data = { "id_user": "74ca90c2-5657-5eef"}
    status_code, message, data_account = crud.read_account(data)
    
    print(f"El estado {status_code}  Mensaje: {message}")
    assert status_code == 200
    assert  message == "Cuenta obtenida correctamente"
    assert len(data_account) > 0