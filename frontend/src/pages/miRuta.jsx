export default miRuta = () => {
    return (
        <>
            <h1>Mi Ruta</h1>
            <ul>
                {misDatos().map((item) => (
                    <li key={item.id}>
                        {item.nombre} {item.apellido} {item.edad}
                    </li>
                ))}
            </ul>
        </>
    );
};

function misDatos() {
    return [
        {
            id: 1,
            nombre: "juan",
            apellido: "Garcia",
            edad: 32,
        },
        {
            id: 2,
            nombre: "nacho",
            apellido: "Garcia",
            edad: 12,
        },
        {
            id: 3,
            nombre: "pero",
            apellido: "Garcia",
            edad: 25,
        },
    ];
}