from src.dim_dates.dim_date import DIM_DATE

def test_dim_date() -> None:
    objeto = DIM_DATE()
    
    assert objeto.dateId == 2025080