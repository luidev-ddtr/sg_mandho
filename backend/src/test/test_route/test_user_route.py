from src.routes.user_route import send_info

# Este entpoint no se ha podido implementar satisfactoriamente
#
def test_read_user():
    json = {
        "data": {
            "id_user": "fsdng12fcs",
            'filters': ""
        }

    }
    response = send_info(json)
    assert response == {
        "message": "Se Cargo la informacion correctamente",
        "data": [{
            "date_id": "---q3ri3guyefceudx",
            "id_user": "JUA-LON-CERR-322h2fwiu",
            "first_name": "John",
            "second_name": "s/n",
            "last_name": "Torres",
            "second_last_name": "Garcia",
            "date_of_birth": "1990-01-01",
            "date_user_start": "2022-01-01",
            "date_user_end": "s/n",
            "manzana": "Yhonda",
            "street": "Main Street",
            "number_ext": "s/n"
        }],
        "status": 200
    }