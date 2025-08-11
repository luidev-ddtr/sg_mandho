from src.accounts.account import AccountCrud

#TEST para ingresar cuenta pasado con exito.Ahora solo falta probarlo desde la interfaz
def test_insert_account():
    crud = AccountCrud()
    account_json = {
        "status": "estudiante",
        "customer_id": "c6bad113-64ce-5fd0",
        "start_date": "2025-01-01",
        "end_date": "s/n"
    }
    
    status_code, message = crud.insert_account(account_json)
    
    print(f"El estado {status_code}  Mensaje: {message}")
    assert status_code == 200
    assert message == "Cuenta creada con exito"