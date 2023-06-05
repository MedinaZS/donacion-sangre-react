import { useState } from "react"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import FormCard from "../components/FormCard"
import { DatePicker } from "@mui/x-date-pickers"
import axios from "axios"
import { API_ROUTES, APP_ROUTES, MIN_PASS_LENGTH, capitalizeFirstLetter, getFormattedDate, setTokenToLocalStorage, setUserToLocalStorage } from "../helpers/utility"
import BlockButton from "../components/BlockButton"



const SingUp = () => {

    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [cedulaIdentidad, setCedulaIdentidad] = useState('')
    const [sexo, setSexo] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const [viewPassword, setViewPassword] = useState(false)
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false)


    const message = "Por favor intente de nuevo";
    const emailPattern = /\S+@\S+\.\S+/
    const numberPattern = /^\d+$/

    const navigate = useNavigate()

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (validateFields()) {
            // toast.success("Validado")

            const data = {
                name: nombres,
                surname: apellidos,
                password,
                email,
                fecha_nacimiento: getFormattedDate(fechaNacimiento.$d),
                sexo,
                nro_cedula: cedulaIdentidad
            }

            // console.log(data)
            saveToDatabase(data)
        }

    }

    const saveToDatabase = (data) => {
        axios.post(API_ROUTES.REGISTRO, data)
            .then(response => {
                // console.log(response.data)
                setTokenToLocalStorage(response.data.token)
                setUserToLocalStorage(response.data.user)
                navigate(APP_ROUTES.SOLICITUDES)
            })
            .catch(error => {
                // console.log(error)
                const errorsMessage = error.response?.data?.errors
                if (errorsMessage) {
                    // console.log(Object.keys(errorsMessage))
                    handleErrors(Object.keys(errorsMessage))
                }
                const cedulaExistente = error.response?.data?.message
                if (cedulaExistente.toUpperCase().includes('CEDULA')) {
                    toast.error(cedulaExistente + ' . Por favor intente de nuevo')
                }
            })
    }

    const handleErrors = (errors) => {
        let timeout = 0;
        errors.forEach(element => {
            timeout += 200;
            setTimeout(() => {
                toast.error(capitalizeFirstLetter(element) + ' debe ser unico. Por favor intente de nuevo')
            }, timeout);
        });

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
        if (isEmpty(password) || password.length < MIN_PASS_LENGTH) {
            timeout += delay;
            setTimeout(() => { toast.error("Contraseña inválida. " + message) }, timeout);
        }
        if (isEmpty(confirmPassword) || confirmPassword.length < MIN_PASS_LENGTH) {
            timeout += delay;
            setTimeout(() => { toast.error("Confirmar contraseña inválida. " + message) }, timeout);
        }
        if (confirmPassword != password) {
            timeout += delay;
            setTimeout(() => { toast.error("Las contraseñas no coinciden. " + message) }, timeout);
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
            case "password": setPassword(value); break;
            case "confirmPassword": setConfirmPassword(value); break;
            default:
                break;
        }
    }


    return (

        <FormCard onSubmitHandler={onSubmitHandler} hasImage={true}>
            <div className="row row-cols-lg-2">
                <div className='mb-2'>
                    <label htmlFor="nombres" className="form-label">Nombres</label>
                    <input type="text" className="form-control" id="nombres" onChange={handleInputChange} />
                </div>

                <div className='mb-2'>
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input type="text" className="form-control" id="apellidos" onChange={handleInputChange} />
                </div>
            </div>

            <div className="row row-cols-lg-2">
                <div className='mb-2'>
                    <label htmlFor="cedulaIdentidad" className="form-label">Cedula de Identidad</label>
                    <input type="text" className="form-control" id="cedulaIdentidad" onChange={handleInputChange} />
                </div>

                <div className='mb-2'>
                    <label htmlFor="sexo" className="form-label">Sexo</label>
                    <select id="sexo" className="form-select" onChange={handleInputChange} defaultValue={''}>
                        <option value='' disabled>Seleccione..</option>
                        <option value='M'>Femenino</option>
                        <option value='H'>Masculino</option>
                    </select>
                </div>
            </div>

            <div className="row row-cols-lg-2">
                <div className='mb-2'>
                    <label htmlFor="fechaNacimeinto" className="form-label">Fecha de Nacimiento</label>
                    <DatePicker className="form-control" disableFuture
                        onChange={(newValue) => setFechaNacimiento(newValue)} format="DD/MM/YYYY" slotProps={{ textField: { size: 'small' } }} />
                </div>

                <div className='mb-2'>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>


            <div className="row row-cols-lg-2">
                <div className='mb-2'>
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <div className="input-group">
                        <input id="password" className="form-control border-end-0" type={viewPassword ? "text" : "password"} onChange={handleInputChange} />
                        <span className="input-group-text bg-white"><i className={"bi bi-eye" + (viewPassword ? '-slash' : '')} onClick={() => setViewPassword(!viewPassword)}></i></span>
                    </div>
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                    <div className="input-group">
                        <input id="confirmPassword" className="form-control border-end-0" type={viewConfirmPassword ? "text" : "password"} onChange={handleInputChange} />
                        <span className="input-group-text bg-white"><i className={"bi bi-eye" + (viewConfirmPassword ? '-slash' : '')} onClick={() => setViewConfirmPassword(!viewConfirmPassword)}></i></span>
                    </div>
                </div>
            </div>

            <div id="emailHelp" className="form-text mb-2">La contraseña debe de tener minimo {MIN_PASS_LENGTH} caracteres</div>

            <BlockButton title={"Registrarse"} />

            <p className="text-center my-3">¿Ya tienes una cuenta?
                <Link to={APP_ROUTES.LOGIN} className="text-danger"> Inicia sesión</Link>
            </p>


        </FormCard>
    )
}

export default SingUp