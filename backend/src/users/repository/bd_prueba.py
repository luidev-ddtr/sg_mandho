# ase de prueba para ver si si se guarda la informacion 


class BdPrueba:
    def __init__(self):
        self.users = list(),
        self.dim_date = list(),
        self.count = 0 
    
    def save_data(self, user_data = object, dim_date_data = object):
            self.users.append(user_data)
            self.dim_date.append(dim_date_data)
            self.count += 1
    
    def show_data(self):
        print(self.users)
        print(self.dim_date)
        print(self.count)
