# ase de prueba para ver si si se guarda la informacion 

def BD_users():
    """
    Returns a dictionary containing user information for testing purposes.

    The dictionary includes fields such as date_id, id_user, first name, last name, 
    date of birth, user start date, and more. This function is used to simulate 
    retrieving user data from a database.
    """

    data = [
    {
        'date_id': '---q3ri3guyefceudx',
        'id_user': 'JUA-LON-CERR-322h2fwiu',
        'first_name': 'John',
        'second_name': 's/n',
        'last_name': 'Torres',
        'second_last_name': 'Garcia',
        'date_of_birth': '1990-01-01',
        'date_user_start': '2022-01-01',
        'date_user_end': 's/n',
        'manzana': 'Yhonda',
        'street': 'Main Street',
        'number_ext': 's/n'
    },
    {
        'date_id': '---a1b2c3d4e5f6g7h',
        'id_user': 'MAR-SOL-FLOR-123abc456',
        'first_name': 'María',
        'second_name': 'Isabel',
        'last_name': 'Solís',
        'second_last_name': 'Flores',
        'date_of_birth': '1985-05-15',
        'date_user_start': '2021-03-10',
        'date_user_end': '2023-12-31',
        'manzana': 'Tulipanes',
        'street': 'Avenida Central',
        'number_ext': '45-B'
    },
    {
        'date_id': '---x9y8z7w6v5u4t3',
        'id_user': 'CAR-PER-RODR-789xyz123',
        'first_name': 'Carlos',
        'second_name': 'Alberto',
        'last_name': 'Pérez',
        'second_last_name': 'Rodríguez',
        'date_of_birth': '1978-11-22',
        'date_user_start': '2020-07-05',
        'date_user_end': 's/n',
        'manzana': 'Yhonda',
        'street': 'Calle Norte',
        'number_ext': '1200'
    },
    {
        'date_id': '---m4n5b6v7c8x9z0',
        'id_user': 'ANA-LOP-SANC-456def789',
        'first_name': 'Ana',
        'second_name': 'Lucía',
        'last_name': 'López',
        'second_last_name': 'Sánchez',
        'date_of_birth': '1995-08-30',
        'date_user_start': '2023-02-14',
        'date_user_end': 's/n',
        'manzana': 'Girasoles',
        'street': 'Boulevard Oriente',
        'number_ext': '34-C'
    },
    {
        'date_id': '---p0o9i8u7y6t5r4',
        'id_user': 'JOS-MEN-DELG-321jkl654',
        'first_name': 'José',
        'second_name': 'Antonio',
        'last_name': 'Méndez',
        'second_last_name': 'Delgado',
        'date_of_birth': '1982-04-18',
        'date_user_start': '2019-11-25',
        'date_user_end': '2024-06-30',
        'manzana': 'Yhonda',
        'street': 'Callejón del Rosal',
        'number_ext': 's/n'
    },
    {
        'date_id': '---l3k2j1h0g9f8e7',
        'id_user': 'PAT-GOM-VARG-987mno321',
        'first_name': 'Patricia',
        'second_name': 's/n',
        'last_name': 'Gómez',
        'second_last_name': 'Vargas',
        'date_of_birth': '1993-07-07',
        'date_user_start': '2022-09-15',
        'date_user_end': 's/n',
        'manzana': 'Margaritas',
        'street': 'Avenida Siempre Viva',
        'number_ext': '742'
    },
    {
        'date_id': '---d6s5a4f3g2h1j8',
        'id_user': 'LUI-RAM-HERN-654pqr987',
        'first_name': 'Luis',
        'second_name': 'Miguel',
        'last_name': 'Ramírez',
        'second_last_name': 'Hernández',
        'date_of_birth': '1988-12-24',
        'date_user_start': '2021-05-30',
        'date_user_end': 's/n',
        'manzana': 'Yhonda',
        'street': 'Calle Sur',
        'number_ext': '85-A'
    },
    {
        'date_id': '---w2e3r4t5y6u7i8',
        'id_user': 'SOF-CAS-MONT-159tuv753',
        'first_name': 'Sofía',
        'second_name': 'Alejandra',
        'last_name': 'Castillo',
        'second_last_name': 'Montes',
        'date_of_birth': '1997-02-11',
        'date_user_start': '2023-04-01',
        'date_user_end': 's/n',
        'manzana': 'Claveles',
        'street': 'Diagonal Reforma',
        'number_ext': '220'
    },
    {
        'date_id': '---q1w2e3r4t5y6u7',
        'id_user': 'RIC-ORT-MOR-357rst159',
        'first_name': 'Ricardo',
        'second_name': 's/n',
        'last_name': 'Ortega',
        'second_last_name': 'Morales',
        'date_of_birth': '1975-10-05',
        'date_user_start': '2018-08-12',
        'date_user_end': '2023-10-15',
        'manzana': 'Yhonda',
        'street': 'Circuito Interior',
        'number_ext': 's/n'
    },
    {
        'date_id': '---z9x8c7v6b5n4m3',
        'id_user': 'FER-DIA-CRUZ-486uvw357',
        'first_name': 'Fernanda',
        'second_name': 'Guadalupe',
        'last_name': 'Díaz',
        'second_last_name': 'Cruz',
        'date_of_birth': '1991-09-19',
        'date_user_start': '2022-03-08',
        'date_user_end': 's/n',
        'manzana': 'Azaleas',
        'street': 'Paseo de la Reforma',
        'number_ext': '1500'
    },
    {
        'date_id': '---k1j2h3g4f5d6s7',
        'id_user': 'JAV-SER-REYE-753xyz159',
        'first_name': 'Javier',
        'second_name': 'Eduardo',
        'last_name': 'Serrano',
        'second_last_name': 'Reyes',
        'date_of_birth': '1980-06-27',
        'date_user_start': '2020-01-20',
        'date_user_end': 's/n',
        'manzana': 'Yhonda',
        'street': 'Avenida Juárez',
        'number_ext': '25-15'
    }
    ]
    return data