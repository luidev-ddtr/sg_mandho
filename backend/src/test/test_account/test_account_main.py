from src.account.main import AccountCrud

def test_insert_account():
    crud = AccountCrud()
    account_json = {
        "status": "active",
        "customer_id": "1",
        "start_date": "2022-01-01",
        "end_date": "s/n"
    }
    
    status_code, message = crud.insert_account(account_json)
    
    assert status_code == 200
    assert message == "Cuenta creada con exito"