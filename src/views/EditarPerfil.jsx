import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { API_ROUTES, APP_ROUTES, getFormattedDate, getTokenFromLocalStorage, getUserFromLocalStorage, setUserToLocalStorage } from "../helpers/utility"
import axios from "axios"
import FormCard from "../components/FormCard"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from 'dayjs';


const EditarPerfil = () => {

    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [cedulaIdentidad, setCedulaIdentidad] = useState('')
    const [sexo, setSexo] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState(null)
    const [email, setEmail] = useState('')
    const [fill, setFill] = useState(false)



    const message = "Por favor intente de nuevo";
    const emailPattern = /\S+@\S+\.\S+/
    const numberPattern = /^\d+$/

    const navigate = useNavigate()

    useEffect(() => {
        const user = getUserFromLocalStorage();
        if (user) {
            // console.log(user)
            setNombres(user.name)
            setApellidos(user.surname)
            setCedulaIdentidad(user.nro_cedula)
            setSexo(user.sexo)

            setFechaNacimiento(dayjs(user.fecha_nacimiento))
            setEmail(user.email)
            setFill(true)
        }

    }, [])


    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (validateFields()) {

            const data = {
                name: nombres,
                surname: apellidos,
                email,
                fecha_nacimiento: getFormattedDate(fechaNacimiento.$d),
                sexo
            }

            // console.log(data)
            saveToDatabase(data)
        }

    }

    const saveToDatabase = (data) => {
        const token = getTokenFromLocalStorage()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(API_ROUTES.EDITAR_PERFIL, data, config)
            .then(response => {
                console.log(response.data)
                toast.success("Datos actualizados correctamente")
                setUserToLocalStorage(response.data.user)
                navigate(APP_ROUTES.MI_PERFIL)
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


        if (isEmpty(nombres)) {
            timeout += delay;
            setTimeout(() => { toast.error("Nombres inválidos. " + message) }, timeout);
        }
        if (isEmpty(apellidos)) {
            timeout += delay;
            setTimeout(() => { toast.error("Apellidos inválidos. " + message) }, timeout);
        }
        if (isEmpty(cedulaIdentidad) | !numberPattern.test(cedulaIdentidad)) {
            timeout += delay;
            setTimeout(() => { toast.error("Cedula de Identidad inválida. " + message) }, timeout);
        }
        if (isEmpty(sexo)) {
            timeout += delay;
            setTimeout(() => { toast.error("Sexo inválido. " + message) }, timeout);
        }
        if (fechaNacimiento == '') {
            timeout += delay;
            setTimeout(() => { toast.error("Fecha de nacimiento inválida. " + message) }, timeout);
        }
        if (isEmpty(email) || !emailPattern.test(email)) {
            timeout += delay;
            setTimeout(() => { toast.error("Email inválido. " + message) }, timeout);
        }


        if (timeout != 0) noError = false

        return noError
    }



    const handleInputChange = (event) => {
        // date.toLocaleDateString("es-PY")
        const { id, value } = event.target;
        switch (id) {
            case "nombres": setNombres(value); break;
            case "apellidos": setApellidos(value); break;
            case "cedulaIdentidad": setCedulaIdentidad(value); break;
            case "sexo": setSexo(value); break;
            case "email": setEmail(value); break;
            default:
                break;
        }
    }


    return (

        <>
            {fill && 
            <FormCard title={"Editar mi perfil"} onSubmitHandler={onSubmitHandler} hasImage={false} backIcon={true} backHref={APP_ROUTES.MI_PERFIL}>
                <div className="row row-cols-lg-2">
                    <div className='mb-2'>
                        <label htmlFor="nombres" className="form-label">Nombres</label>
                        <input type="text" className="form-control" id="nombres" value={nombres} onChange={handleInputChange} />
                    </div>
            
                    <div className='mb-2'>
                        <label htmlFor="apellidos" className="form-label">Apellidos</label>
                        <input type="text" className="form-control" id="apellidos" value={apellidos} onChange={handleInputChange} />
                    </div>
                </div>
            
                <div className="row row-cols-lg-2">
                    <div className='mb-2'>
                        <label htmlFor="cedulaIdentidad" className="form-label">Cedula de Identidad</label>
                        <input type="text" className="form-control" id="cedulaIdentidad" value={cedulaIdentidad} onChange={handleInputChange} />
                    </div>
            
                    <div className='mb-2'>
                        <label htmlFor="sexo" className="form-label">Sexo</label>
                        <select id="sexo" className="form-select" onChange={handleInputChange} defaultValue={sexo} >
                            <option value='' disabled>Seleccione..</option>
                            <option value='M'>Femenino</option>
                            <option value='H'>Masculino</option>
                        </select>
                    </div>
                </div>
            
                <div className="row row-cols-lg-2">
                    <div className='mb-2'>
                        <label htmlFor="fechaNacimeinto" className="form-label">Fecha de Nacimiento</label>
                        <DatePicker className="form-control" disableFuture value={fechaNacimiento}
                            onChange={(newValue) => setFechaNacimiento(newValue)} format="DD/MM/YYYY" slotProps={{ textField: { size: 'small' } }} />
                    </div>
            
                    <div className='mb-2'>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
            
                <div className="d-grid pt-1 my-4">
                    <button type='submit' className="btn btn-danger btn-block fw-bold" >Editar datos</button>
                </div>
            
            </FormCard>}
        </>
    )
}

export default EditarPerfil