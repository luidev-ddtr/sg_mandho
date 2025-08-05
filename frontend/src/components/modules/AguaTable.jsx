const DynamicAguaTable = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Consumo</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.fecha}</td>
                        <td>{item.consumo}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export default DynamicAguaTable;