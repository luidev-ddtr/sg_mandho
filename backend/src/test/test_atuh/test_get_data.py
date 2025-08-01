from src.atuh.get_data import get_admin_account

def test_get_admin_account():
    get_admin_account_result = get_admin_account()
    assert isinstance(get_admin_account_result, dict)