import { useEffect, useState } from "react"
import FormCard from "../components/FormCard"
import { Link } from "react-router-dom"
import axios from "axios"
import { API_ROUTES } from "../helpers/utility"
import { toast } from "react-hot-toast"
import { DatePicker } from "@mui/x-date-pickers"


const CrearSolicitud = () => {
    const [nombreApellido, setNombreApellido] = useState('')
    const [cedulaIdentidad, setCedulaIdentidad] = useState('')
    const [tipoSangre, setTipoSangre] = useState('')
    const [establecimiento, setEstablecimiento] = useState('')
    const [volumen, setVolumen] = useState('')
    const [fechaLimite, setFechaLimite] = useState('')
    const [telefono, setTelefono] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const [listaEstablecimientos, setListaEstablecimientos] = useState(null)

    const type = ["A+", "A-", "B+", "B-", "O+", "O-", "AB-", "AB+"]
    const message = "Por favor intente de nuevo";
    const numberPattern = /^\d+$/

    useEffect(() => {
        axios.get(API_ROUTES.PUNTOS_DE_DONACION)
            .then(response => {
                let data = response.data.data;
                // console.log(data)
                setListaEstablecimientos(data)

            })
            .catch(error => console.log("Error", error))
    }, [])


    const onSubmitHandler = (event) => {
        event.preventDefault();

        // console.log(nombreApellido,cedulaIdentidad,tipoSangre,establecimiento,volumen,fechaLimite,telefono,descripcion)

        if (validateFields()) {
            toast.success("Validado")
        }

    }

    const isEmpty = (str) => {
        return str.trim() == ''
    }

    const validateFields = () => {
        toast.dismiss()
        let noError = true;
        let timeout = 0;
        const delay = 300;


        if (isEmpty(nombreApellido)) {
            timeout += delay;
            setTimeout(() => { toast.error("Nombre y Apellido inválidos. " + message) }, timeout);
        }
        if (isEmpty(cedulaIdentidad) | !numberPattern.test(cedulaIdentidad)) {
            timeout += delay;
            setTimeout(() => { toast.error("Cedula de Identidad inválida. " + message) }, timeout);
        }
        if (isEmpty(tipoSangre)) {
            timeout += delay;
            setTimeout(() => { toast.error("Tipo de Sangre inválido. " + message) }, timeout);
        }
        if (isEmpty(establecimiento)) {
            timeout += delay;
            setTimeout(() => { toast.error("Establecimiento inválido. " + message) }, timeout);
        }
        if (isEmpty(volumen) || !numberPattern.test(volumen)) {
            timeout += delay;
            setTimeout(() => { toast.error("Volumen inválido. " + message) }, timeout);
        }
        if (fechaLimite == '') {
            timeout += delay;
            setTimeout(() => { toast.error("Fecha limite inválida. " + message) }, timeout);
        }
        if (isEmpty(telefono) | !numberPattern.test(telefono)) {
            timeout += delay;
            setTimeout(() => { toast.error("Teléfono inválido ingrese solo números. " + message) }, timeout);
        }
        if (isEmpty(descripcion)) {
            timeout += delay;
            setTimeout(() => { toast.error("Descripcion inválida. " + message) }, timeout);
        }

        
        if (timeout != 0) noError = false

        return noError
    }



    const handleInputChange = (event) => {
        // date.toLocaleDateString("es-PY")
        const { id, value } = event.target;
        switch (id) {
            case "nombreApellido": setNombreApellido(value); break;
            case "cedulaIdentidad": setCedulaIdentidad(value); break;
            case "tipoSangre": setTipoSangre(value); break;
            case "establecimiento": setEstablecimiento(value); break;
            case "volumen": setVolumen(value); break;
            case "telefono": setTelefono(value); break;
            case "descripcion": setDescripcion(value); break;
            default:
                break;
        }
    }

    return (
        <FormCard title={"Crear Solicitud"} onSubmitHandler={onSubmitHandler} hasImage={false}>

            <div className='mb-2'>
                <label htmlFor="nombreApellido" className="form-label">Nombre y Apellido</label>
                <input type="text" className="form-control" id="nombreApellido" onChange={handleInputChange} placeholder="Escriba su nombre y apellido aqui" />
            </div>



            <div className="row row-cols-lg-2">
                <div className='mb-2'>
                    <label htmlFor="cedulaIdentidad" className="form-label">Cedula de Identidad</label>
                    <input type="text" className="form-control" id="cedulaIdentidad" onChange={handleInputChange} placeholder="Escriba su cédula aqui" />
                </div>

                <div className='mb-2'>
                    <label htmlFor="tipoSangre" className="form-label">Tipo de Sangre</label>
                    <select id="tipoSangre" className="form-select" onChange={handleInputChange} defaultValue={''}>
                        <option value='' disabled>Seleccione..</option>
                        {type && type.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row row-cols-lg-2">
                <div className='mb-2'>
                    <label htmlFor="establecimiento" className="form-label">Establecimiento</label>
                    <select id="establecimiento" className="form-select" onChange={handleInputChange} defaultValue={''}>
                        <option value='' disabled>Seleccione..</option>
                        {listaEstablecimientos && listaEstablecimientos.map((item, index) => (
                            <option key={index} value={item.id}>{item.local_donacion}</option>
                        ))}
                    </select>
                </div>
                <div className='mb-2'>
                    <label htmlFor="volumen" className="form-label">Volumen</label>
                    <input type="volumen" className="form-control" id="volumen" onChange={handleInputChange} placeholder="Escriba el volumen aqui" />
                    <span className="small text-secondary text-opacity-75">Ingrese solo numeros ej.: 10</span>
                </div>
            </div>


            <div className="row row-cols-lg-2">
                <div className='mb-2'>
                    <label htmlFor="fechaNacimiento" className="form-label">Fecha Limite</label>
                    <DatePicker className="form-control" disablePast
                        onChange={(newValue) => setFechaLimite(newValue)} format="DD/MM/YYYY" slotProps={{ textField: { size: 'small' } }} />
                </div>

                <div className='mb-2'>
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input type="telefono" className="form-control" id="telefono" onChange={handleInputChange} placeholder="Escriba el volumen aqui" />
                    <span className="small text-secondary text-opacity-75">Ingrese solo numeros ej.: 0981222333</span>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea className="form-control" id="descripcion" cols="30" rows="3" onChange={handleInputChange}></textarea>
            </div>

            <div className="d-grid pt-3 mb-4">
                <button type='submit' className="btn btn-danger btn-block fw-bold" >Ingresar</button>
            </div>
        </FormCard>
    )
}

export default CrearSolicitud