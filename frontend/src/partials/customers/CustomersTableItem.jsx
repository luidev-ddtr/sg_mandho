
// Tabla donde se renderiza cada fila
import React from 'react';
import Image01 from '../../images/user-40-01.jpg';
import Image02 from '../../images/user-40-02.jpg';
import Image03 from '../../images/user-40-03.jpg';
import ActionMenu from '../../components/customers/ActionMenu';

function CustomersTableItem(props) {
    const imageMap = {
        'Image01': Image01,
        'Image02': Image02,
        'Image03': Image03,
        // Añade más imágenes según necesites
    };

    // Determinar qué imagen usar basado en date_of_end
    const getImage = () => {
        if (props.date_of_end && props.date_of_end.toLowerCase() !== 's/n') {
            return Image03; // Usuario inactivo
        }
        return imageMap[props.image] || Image01; // Usuario activo o imagen por defecto
    };

    const userImage = getImage();

    return (
        <tr>
            {/* Imagen del usuario */}
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <div className="flex items-center">
                    <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                        <img className="rounded-full" src={userImage} width="40" height="40" alt={props.name} />
                    </div>
                </div>
            </td>

            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="text-left">{props.name}</div>
            </td>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="text-left">{props.last_name}</div>
            </td>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="text-center">{props.birth_date}</div>
            </td>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="text-center font-medium text-sky-600">{props.manzana}</div>
            </td>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="text-left font-medium text-green-600">{props.address}</div>
            </td>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap visible">
                <div className="text-center">{props.date_of_start}</div>
            </td>
            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="text-center">{props.date_of_end}</div>
            </td>

            <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                {/* Menu button */}
                <ActionMenu 
                    id_user={props.id}
                    onUpdate={props.onEditSuccess} // Pasamos la prop hacia abajo
                />
            </td>
        </tr>
    );
}

export default CustomersTableItem;