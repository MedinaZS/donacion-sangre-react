// import React from 'react'
const ShareButton = ({ solicitud }) => {

    const type = ["A+", "A-", "B+", "B-", "O+", "O-", "AB-", "AB+"]

    let link_whatsapp = 'whatsapp://send?text=*SOLICITUD DONACIÓN DE SANGRE*\n' +
        `Nombre Donatario: ${solicitud.nombre_apellido_donatario}\n` +
        `Teléfono: ${solicitud.telefono_contacto}\n` +
        `C.I: ${solicitud.cedula_donatario}\n` +
        `Lugar donación: ${solicitud.establecimiento}\n` +
        `RH: ${type[solicitud.tipo_sangre - 1]} \n` +
        `Volumenes Necesarios: ${solicitud.volumenes_necesarios}\n` +
        `Fecha Limite: ${solicitud.fecha_limite}\n` +
        `Solicitud: ${solicitud.solicitud}\n` +
        `Link: http://localhost:5500/index.html\n`

    link_whatsapp = link_whatsapp.replaceAll(' ', '%20')
    link_whatsapp = link_whatsapp.replaceAll('\n', '%0a')
    // Symbols for blood types
    link_whatsapp = link_whatsapp.replace('+', '%2B')
    link_whatsapp = link_whatsapp.replace('-', '%2D')

    return (
        <a href={link_whatsapp} className="link-danger" ><i className="bi bi-share"></i></a>
    )
}

export default ShareButton