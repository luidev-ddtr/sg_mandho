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

def test_create_fact_revenue_success(payment_handler, valid_payment_data):
    """
    Test caso de éxito - Verifica que con datos válidos completos:
    1. Se crea correctamente el registro de pago
    2. Devuelve el código 201
    3. Devuelve el mensaje de éxito esperado
    """
    status_code, message = payment_handler.create_fact_revenue(valid_payment_data)
    
    assert status_code == 201
    assert message == "Pago creado satisfactoriamente"

def test_missing_required_fields(payment_handler, valid_payment_data):
    """
    Test validación de campos requeridos:
    1. Verifica que al faltar cualquier campo requerido se devuelve error 400
    2. El mensaje de error indica claramente qué campo falta
    """
    required_fields = [
        'DIM_OnwerCustomerId', 'DIM_AccountId', 'DIM_CustomerId', 
        'ServiceName', 'serviceDetailsType', 'amount', 
        'AnioPago', 'FactAmount', 'movementName'
    ]
    
    for field in required_fields:
        # Crear copia de datos sin el campo actual
        invalid_data = valid_payment_data.copy()
        del invalid_data[field]
        
        status_code, message = payment_handler.create_fact_revenue(invalid_data)
        
        assert status_code == 400
        assert f"Falta el campo '{field}'" in message

def test_invalid_field_types(payment_handler, valid_payment_data):
    """
    Test validación de tipos de datos:
    1. Verifica que con tipos incorrectos se devuelve error 400
    2. El mensaje de error indica claramente el tipo esperado
    """
    type_test_cases = [
        ('amount', "100", "debe ser de tipo float"),  # string en lugar de float
        ('AnioPago', "2022", "debe ser de tipo int"),  # string en lugar de int
        ('FactAmount', True, "debe ser de tipo float"),  # boolean en lugar de float
        ('ServiceName', 123, "debe ser de tipo str"),  # int en lugar de string
    ]
    
    for field, invalid_value, expected_error in type_test_cases:
        invalid_data = valid_payment_data.copy()
        invalid_data[field] = invalid_value
        
        status_code, message = payment_handler.create_fact_revenue(invalid_data)
        
        assert status_code == 400
        assert expected_error in message

def test_invalid_service_details_type(payment_handler, valid_payment_data):
    """
    Test validación de serviceDetailsType:
    1. Verifica que con un tipo de servicio inválido se devuelve error 400
    2. El mensaje de error indica que no se encontró el tipo de servicio
    """
    invalid_data = valid_payment_data.copy()
    invalid_data['serviceDetailsType'] = 'tipo_invalido'
    
    status_code, message = payment_handler.create_fact_revenue(invalid_data)
    
    assert status_code == 400
    assert "no se encontró" in message
    assert "tipo_invalido" in message

def test_negative_amount_values(payment_handler, valid_payment_data):
    """
    Test valores negativos en campos numéricos:
    1. Verifica que con valores negativos se devuelve error 400
    2. El mensaje de error indica que los valores no pueden ser negativos
    """
    numeric_fields = ['amount', 'FactAmount', 'AnioPago']
    
    for field in numeric_fields:
        invalid_data = valid_payment_data.copy()
        invalid_data[field] = -1
        
        status_code, message = payment_handler.create_fact_revenue(invalid_data)
        
        # Asumiendo que validate_data también valida valores negativos
        # Si no lo hace, este test debería adaptarse
        assert status_code == 400
        assert "no puede ser negativo" in message

def test_server_error_handling(mocker, payment_handler, valid_payment_data):
    """
    Test manejo de errores internos:
    1. Simula un error inesperado al crear el registro
    2. Verifica que se devuelve error 500
    3. El mensaje de error es genérico (no expone detalles internos)
    """
    # Mockeamos la función create_fact_revenue para que lance una excepción
    mocker.patch.object(payment_handler.fact_revenue_handler, 'create_fact_revenue', 
                       side_effect=Exception("Error simulado"))
    
    status_code, message = payment_handler.create_fact_revenue(valid_payment_data)
    
    assert status_code == 500
    assert "Error creando el pago" in message
    assert "Error simulado" not in message  # No exponer detalles internos

def test_partial_data_success(payment_handler, valid_payment_data):
    """
    Test que campos adicionales no requeridos no afectan el funcionamiento:
    1. Verifica que con datos adicionales (no requeridos) se crea correctamente
    """
    extra_data = valid_payment_data.copy()
    extra_data['campo_extra'] = 'valor_extra'
    extra_data['otro_campo'] = 123
    
    status_code, message = payment_handler.create_fact_revenue(extra_data)
    
    assert status_code == 201
    assert message == "Pago creado satisfactoriamente"