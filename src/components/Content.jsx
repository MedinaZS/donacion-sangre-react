// import React from 'react'
import { useState } from "react";
import CardList from "./CardList"
import FiltroSolicitudes from "./FiltroSolicitudes";

const Content = () => {

    const [listaSolicitudes, setListaSolicitudes] = useState([])

    const obtenerSolicitudes = () => {
        fetch("http://192.168.16.90:8000/api/solicitudes")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setListaSolicitudes(data.data)
            });
    }

    return (
        <>
            <div className="p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-normal">Solicitudes
                    <button id="btn-cargar-solicitudes" className="btn btn-danger shadow ms-3" onClick={obtenerSolicitudes}>
                        <i className="bi bi-cloud-download"></i>
                    </button>
                </h1>
                <hr />
                <FiltroSolicitudes />
            </div>

            <CardList listaSolicitudes={listaSolicitudes} />
        </>
    )
}

export default Content