from src.dim_roles.role import Role 

def test_insert_role() -> None:
    handler_role = Role()
    role_data = {
        "status": "majaderias",
        "start_date": "2025-02-01",
        "customer_id": "080c33d3-7f33-55d7", # id de evio emanuel
        "end_date": "" # End date siempre debe estar bvacio al crear un rol
    }
    result, DIM_role, message = handler_role.insert_role(role_data)

    print(f"Resultado: {result}, Mensaje: {message}, ID del rol: {DIM_role}")
    assert result == False
    assert message == "No se pudo obtener el rol"
    assert DIM_role == ""