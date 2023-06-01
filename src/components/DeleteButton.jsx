// import React from 'react'

const DeleteButton = ({ id }) => {

    // console.log(id)

    const eliminarSolicitud = () => {
        alert("Eliminar solicitud id: " + id)
    }

    return (
        <a href="#" className="link-light me-3" onClick={eliminarSolicitud}><i className="bi bi-trash"></i></a>
    )
}

export default DeleteButton