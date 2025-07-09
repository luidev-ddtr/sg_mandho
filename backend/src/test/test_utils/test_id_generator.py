from src.utils.id_generator import create_id


def test_create_id():
    """
    Este test solo funciona para generar los id, sin embargo si alguno de los datos que se 
    ingresan, son por ejemplo numericos (no alcanzara a rellenar los 3 espacios que le deriuan tocar, por lo
    que el uuid generado seria de un tamano diferente al esperado)
    Por loo que no se sabe si implementarse asi, o rellenar con mas uuid al final para alcanzar el tamano deseado"""
    data = [None,None,None]
    
    id = create_id(data)

    print(id)
    assert len(id) == 18

