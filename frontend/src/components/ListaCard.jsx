export function ListaCard({lista}){
    //console.log("Datos recibidos:", lista);
    return (
                <div>
                    <h1 className="font-bold text-2xl color-green">{lista.nombre} {lista.apellido}</h1>
                    <p>{lista.calle}</p>
                    <hr />
                </div>
    )
};