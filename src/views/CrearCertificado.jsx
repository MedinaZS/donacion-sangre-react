import { useEffect, useState } from "react"
import FormCard from "../components/FormCard"
import axios from "axios"
import { API_ROUTES, APP_ROUTES, getFormattedDate } from "../helpers/utility"
import { toast } from "react-hot-toast"
import { DatePicker } from "@mui/x-date-pickers"
import { useNavigate } from "react-router-dom"
import BlockButton from "../components/BlockButton"
import { useSelector } from "react-redux"


const CrearCertificado = () => {
    const navigate = useNavigate()

    const [establecimiento, setEstablecimiento] = useState('')
    const [fechaDonacion, setFechaDonacion] = useState('')
    const [listaEstablecimientos, setListaEstablecimientos] = useState(null)

    const tokenRedux = useSelector(state => state.token)

    const message = "Por favor intente de nuevo";

    useEffect(() => {
        axios.get(API_ROUTES.PUNTOS_DE_DONACION)
            .then(response => {
                let data = response.data.data;
                // console.log("Se carga los locales")
                setListaEstablecimientos(data)
            })
            .catch(error => console.log("Error getting localidades", error))
    }, [])


    const onSubmitHandler = (event) => {
        event.preventDefault();


        if (validateFields()) {
            // toast.success("Validado")

            const data = {
                fecha_donacion: getFormattedDate(fechaDonacion.$d),
                local_donacion_id: establecimiento
            }
            // toast.success("Solicitud creada con éxito")
            // console.log(data)
            saveToDatabase(data)
        }

    }

    

    const saveToDatabase = (data) => {

        axios.post(API_ROUTES.CREAR_CERTIFICADO, data, {
            headers: {
                Authorization: `Bearer ${tokenRedux}`
            }
        }).then(response => {
            // console.log(response)
            toast.success("Certificado creado con éxito")
            navigate(APP_ROUTES.CERTIFICADOS)
        })
            .catch(error => console.log(error))
    }

    const isEmpty = (str) => {
        return str.trim() == ''
    }

    const validateFields = () => {
        toast.dismiss()
        let noError = true;
        let timeout = 0;
        const delay = 300;

        if (isEmpty(establecimiento)) {
            timeout += delay;
            setTimeout(() => { toast.error("Establecimiento inválido. " + message) }, timeout);
        }
        if (fechaDonacion == '') {
            timeout += delay;
            setTimeout(() => { toast.error("Fecha limite inválida. " + message) }, timeout);
        }
        if (timeout != 0) noError = false

        return noError
    }



    const handleInputChange = (event) => {
        // date.toLocaleDateString("es-PY")
        let { id, value } = event.target;
        value = value.trim();
        switch (id) {
            case "establecimiento": setEstablecimiento(value); break;
            default:
                break;
        }
    }

    return (
        <FormCard title={"Crear Certificado"} onSubmitHandler={onSubmitHandler} hasImage={false} backIcon={true} backHref={APP_ROUTES.CERTIFICADOS}>

            <div className='mb-4'>
                <label htmlFor="fechaNacimiento" className="form-label">Fecha Limite</label>
                <DatePicker className="form-control"
                    onChange={(newValue) => setFechaDonacion(newValue)} format="DD/MM/YYYY" slotProps={{ textField: { size: 'small' } }} />
            </div>

            <div className='mb-4'>
                <label htmlFor="establecimiento" className="form-label">Establecimiento</label>
                <select id="establecimiento" className="form-select" onChange={handleInputChange} defaultValue={''}>
                    <option value='' disabled>Seleccione..</option>
                    {listaEstablecimientos && listaEstablecimientos.map((item, index) => (
                        <option key={index} value={item.id}>{item.local_donacion}</option>
                    ))}
                </select>
            </div>

            <BlockButton title={"Generar Certificado"}/>
            
        </FormCard>
    )
}

export default CrearCertificado