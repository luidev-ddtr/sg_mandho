from src.payments.payment import PaymentCrud
import datetime
import pytest

@pytest.fixture
def payment_handler():
    return PaymentCrud()



@pytest.fixture
def valid_payment_data():
    """Datos de pago válidos para usar como base en los tests"""
    return {
        "DIM_OnwerCustomerId": "ed37cb83-f080-5e41",
        "DIM_AccountId": "6fa65c53-dbc0-5bb3",
        "DIM_CustomerId": "c6bad113-64ce-5fd0",
        "ServiceName": "agua",
        "serviceDetailsType": "consumo",
        "amount": 360.0,
        "AnioPago": 2022,
        "FactAmount": 100.0,
        "movementName": "ingreso",
        "StartDate": "2022-01-01",
        "EndDate": "2022-12-31"
    }

def test_partial_data_success(payment_handler, valid_payment_data):
    """
    Test que campos adicionales no requeridos no afectan el funcionamiento:
    1. Verifica que con datos adicionales (no requeridos) se crea correctamente
    2. Si falla, verifica que el error sea por otra razón (no por los campos extra)
    """
    extra_data = valid_payment_data.copy()
    extra_data['campo_extra'] = 'valor_extra'
    extra_data['otro_campo'] = 123

    status_code, message = payment_handler.create_fact_revenue(extra_data)
    
    if status_code != 201:
        # Si falla, verificar que el error NO sea por los campos adicionales
        assert "campo_extra" not in str(message), "El sistema está rechazando campos adicionales innecesariamente"
        assert "otro_campo" not in str(message), "El sistema está rechazando campos adicionales innecesariamente"
        pytest.fail(f"Falló por otra razón: {message} (código {status_code})")
    else:
        assert status_code == 201
        assert message == "Pago creado satisfactoriamente"