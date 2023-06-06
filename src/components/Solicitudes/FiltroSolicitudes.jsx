// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react"
import { API_ROUTES } from "../../helpers/utility";
import { useSelector } from "react-redux";

const FiltroSolicitudes = ({ setListaSolicitudes }) => {

    const [filtro, setFiltro] = useState(false);

    const tokenRedux = useSelector(state => state.token)

    useEffect(() => {
        if (!filtro) {
            getAllSolicitudes()
        } else if (filtro) {
            getMisSolicitudes()
        }


    }, [filtro])

    const getAllSolicitudes = () => {
        axios.get(API_ROUTES.SOLICITUDES)
            .then(response => {
                let data = response.data.data;
                // console.log(data)
                setListaSolicitudes(data)
                // setMisSolicitudes(false) //Solo mostrar icono de eliminar al ser mi solicitud
            })
            .catch(error => console.log("Error", error))
    }

    const getMisSolicitudes = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${tokenRedux}`
            }
        }


        axios.get(API_ROUTES.MIS_SOLICITUDES, config)
            .then(response => {
                let data = response.data.data;
                // console.log(data)
                // console.log("solicitudes nuevas")
                setListaSolicitudes(data)
                // setMisSolicitudes(true) //Solo mostrar icono de eliminar al ser mi solicitud
            })
            .catch(error => console.log("Error", error))
    }



    // Add filter
    return (
        <div className="d-flex align-items-center justify-content-center fs-3">
            Mis Solicitudes
            <div className="form-check ms-2 d-flex justify-content-center">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" checked={filtro} onChange={() => setFiltro(!filtro)} />
            </div>
        </div>
    )
}

export default FiltroSolicitudes
