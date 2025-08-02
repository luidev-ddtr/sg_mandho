from src.payments.payment import PaymentCrud
import datetime
def test_payments_crud() -> None:
    payment_options = PaymentCrud()
    test_data = {
        "DIM_OnwerCustomerId": "ed37cb83-f080-5e41",      
        "DIM_AccountId": "6fa65c53-dbc0-5bb3",               
        "DIM_CustomerId": "c6bad113-64ce-5fd0",              
        "ServiceName": "agua",                  
        "fecha": datetime.datetime.now().strftime("%Y-%m-%d"),  
        "serviceDetailsType": "consumo",        
        "amount": 365.0,                    
        "AnioPago": 2022,                   
        "movementName": "ingreso",         
        "FactAmount": 100.0 ,
        "StartDate": "2022-01-01",  # Fecha de inicio del servicio
        "EndDate": "2022-12-31"     # Fecha de finalización          
    }
    status_code, message = payment_options.create_payment(test_data)
    print(f"El estado {status_code}  Mensaje: {message}")

    assert status_code == 201
    assert message == "Payment created successfully"

