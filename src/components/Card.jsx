// import React from 'react'
// import { useEffect } from "react"
import DeleteButton from "./DeleteButton"
import ShareButton from "./ShareButton"

const Card = ({ solicitud }) => {

    const type = ["A+", "A-", "B+", "B-", "O+", "O-", "AB-", "AB+"]
    const iconSrc = "https://res.cloudinary.com/dhzoxdo6q/image/upload/donacion-sangre/" + type[solicitud.tipo_sangre - 1] + ".png"

    return (
        <div className="col d-flex align-items-stretch ">
            <div className="card mb-4 rounded-4 shadow w-100 border border-danger">
                <div className="card-header border-danger border-3 py-3 bg-white d-flex justify-content-between align-items-center rounded-top-4">
                    <h4 id="nombre-donatario" className="text-start">{solicitud.nombre_apellido_donatario}</h4>
                    <div className="fs-5">
                        <DeleteButton id={solicitud.id} />
                        <ShareButton solicitud={solicitud} />
                    </div>
                </div>
                <div className="card-body text-start ">
                    <p className="d-flex justify-content-between">
                        Teléfono:
                        <span>{solicitud.telefono_contacto}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        C.I:
                        <span>{solicitud.cedula_donatario}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        Lugar de donación:
                        <span>{solicitud.establecimiento}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        RH:
                        <img className='icon-blood-type' src={iconSrc}></img>
                    </p>
                    <p className="d-flex justify-content-between">
                        Volúmenes:
                        <span>{solicitud.volumenes_necesarios}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        Fecha Limite:
                        <span>{solicitud.fecha_limite}</span>
                    </p>
                </div>
                <div className="card-footer border-danger">
                    <span className="fs-5">{solicitud.solicitud}</span>
                </div>
            </div>
        </div>

    )
}

export default Card