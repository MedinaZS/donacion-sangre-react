// import React from 'react'

import axios from "axios"
import { API_ROUTES, APP_ROUTES, getTokenFromLocalStorage } from "../../helpers/utility"
import { toast } from "react-hot-toast"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const DeleteButton = ({ id, listaSolicitudes, setListaSolicitudes }) => {

    const token = getTokenFromLocalStorage()
    const navigate = useNavigate();

    const handleClick = () => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-secondary mx-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estas seguro de eliminar esta solicitud?',
            text: "¡No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarSolicitud()
            }
        })
    }

    const eliminarSolicitud = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.delete(API_ROUTES.ELIMINAR_SOLICITUD + id, config)
            .then(response => {
                // console.log(response)
                toast.success("Solicitud eliminada con éxito")
                actualizarLista()
            })
            .catch(error => {
                // console.log(error)
                const errorMessage = error.response?.data
                if (errorMessage) {
                    toast.error(errorMessage)
                } else {
                    toast.error("Hubo un error")
                }
            })
    }

    const actualizarLista = () => {
        const newList = listaSolicitudes.filter(element => element.id != id)
        setListaSolicitudes(newList)
    }

    return (
        <a href="#" className="link-light me-3" onClick={handleClick}><i className="bi bi-trash"></i></a>
    )
}

export default DeleteButton