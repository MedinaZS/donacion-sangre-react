import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { API_ROUTES, APP_ROUTES, getFormattedDate } from "../helpers/utility"
import axios from "axios"
import FormCard from "../components/FormCard"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from 'dayjs';
import BlockButton from "../components/BlockButton"
import { useDispatch, useSelector } from "react-redux"


const EditarPerfil = () => {

    // Get the user from store
    const userRedux = useSelector(state => state.user)

    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [sexo, setSexo] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState(null)
    const [email, setEmail] = useState('')
    const [fill, setFill] = useState(false)

    const tokenRedux = useSelector(state => state.token)
    const dispatch = useDispatch()

    const message = "Por favor intente de nuevo";
    const emailPattern = /\S+@\S+\.\S+/

    const navigate = useNavigate()

    useEffect(() => {
        if (userRedux) {
            // console.log(userRedux)
            setNombres(userRedux.name)
            setApellidos(userRedux.surname)
            setSexo(userRedux.sexo)
            setFechaNacimiento(dayjs(userRedux.fecha_nacimiento))
            setEmail(userRedux.email)
            setFill(true)
        }

    }, [userRedux])


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

            console.log(data)
            saveToDatabase(data)
        }

    }

    const saveToDatabase = (data) => {

        const config = {
            headers: {
                Authorization: `Bearer ${tokenRedux}`
            }
        }
        axios.post(API_ROUTES.EDITAR_PERFIL, data, config)
            .then(response => {
                // console.log(response.data)
                const successMessage = response.data?.message
                toast.success(successMessage)

                const user = response.data.user
                // Actualizar perfil
                dispatch({ type: 'setUser', payload: user })

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
                            <label htmlFor="sexo" className="form-label">Sexo</label>
                            <select id="sexo" className="form-select" onChange={handleInputChange} defaultValue={sexo} >
                                <option value='' disabled>Seleccione..</option>
                                <option value='M'>Femenino</option>
                                <option value='H'>Masculino</option>
                            </select>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="fechaNacimeinto" className="form-label">Fecha de Nacimiento</label>
                            <DatePicker className="form-control" disableFuture value={fechaNacimiento}
                                onChange={(newValue) => setFechaNacimiento(newValue)} format="DD/MM/YYYY" slotProps={{ textField: { size: 'small' } }} />
                        </div>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <BlockButton title={"Actualizar perfil"} />

                </FormCard>}
        </>
    )
}

export default EditarPerfil