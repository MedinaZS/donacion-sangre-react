import { useState } from "react"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import AutenticationCard from "../components/AutenticationCard"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const Register = () => {

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
    const pattern = /\S+@\S+\.\S+/
    const minPasswordLenght = 8;

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (validateFields()) {
            toast.success("Validado")
        }

    }

    const validateFields = () => {
        let noError = true;
        toast.dismiss()
        let timeout = 0;

        if (nombres.trim() == '') {
            timeout += 200;
            setTimeout(() => { toast.error("Nombres inválidos. " + message) }, timeout);
            noError = false;
        }
        if (apellidos.trim() == '') {
            timeout += 200;
            setTimeout(() => { toast.error("Apellidos inválidos. " + message) }, timeout);
            noError = false;
        }
        if (cedulaIdentidad.trim() == '') {
            timeout += 200;
            setTimeout(() => { toast.error("Cedula de Identidad inválida. " + message) }, timeout);
            noError = false;
        }
        if (sexo.trim() == '') {
            timeout += 200;
            setTimeout(() => { toast.error("Sexo inválido. " + message) }, timeout);
            noError = false;
        }
        if (fechaNacimiento.trim() == '') {
            timeout += 200;
            setTimeout(() => { toast.error("Fecha de nacimiento inválida. " + message) }, timeout);
            noError = false;
        }

        if (email.trim() == '' || !pattern.test(email)) {
            timeout += 200;
            setTimeout(() => { toast.error("Email inválido. " + message) }, timeout);
            noError = false;
        }
        if (password.trim() == '' || password.length < minPasswordLenght) {
            timeout += 200;
            setTimeout(() => { toast.error("Contraseña inválida. " + message) }, timeout);
            noError = false;
        }
        if (confirmPassword.trim() == '' || confirmPassword.length < minPasswordLenght ) {
            timeout += 200;
            setTimeout(() => { toast.error("Confirmar contraseña inválida. " + message) }, timeout);
            noError = false;
        }
        if (confirmPassword != password) {
            timeout += 200;
            setTimeout(() => { toast.error("Las contraseñas no coinciden. " + message) }, timeout);
            noError = false;
        }


        return noError
    }

    

    const handleInputChange = (event) => {
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

        <AutenticationCard onSubmitHandler={onSubmitHandler}>
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
                        <option value='Femenino'>Femenino</option>
                        <option value='Masculino'>Masculino</option>
                    </select>
                </div>
            </div>

            <div className="row row-cols-lg-2">
                <div className='mb-2'>
                    <label htmlFor="fechaNacimeinto" className="form-label">Fecha de Nacimiento</label>
                    <DatePicker type='date' locale={'es'} className="form-control" selected={fechaNacimiento} onChange={(date) =>  console.log(date.toLocaleString())} />
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
                        <input id="password" className="form-control border-end-0" type={viewPassword ? "text" : "password"}  onChange={handleInputChange} />
                        <span className="input-group-text bg-white"><i className={"bi bi-eye" + (viewPassword ? '-slash' : '')} onClick={()=>setViewPassword(!viewPassword)}></i></span>
                    </div>
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                    <div className="input-group">
                        <input id="confirmPassword" className="form-control border-end-0" type={viewConfirmPassword ? "text" : "password"} onChange={handleInputChange} />
                        <span className="input-group-text bg-white"><i className={"bi bi-eye" + (viewConfirmPassword ? '-slash' : '')} onClick={()=>setViewConfirmPassword(!viewConfirmPassword)}></i></span>
                    </div>
                </div>
            </div>

            <div id="emailHelp" className="form-text mb-2">La contraseña debe de tener minimo 8 caracteres</div>

            <div className="d-grid pt-1 mb-4">
                <button type='submit' className="btn btn-danger btn-block fw-bold" >Registrarse</button>
            </div>


            <p className="text-center my-3">¿Ya una cuenta?
                <Link to={'/login'} className="text-danger"> Inicia sesión</Link>
            </p>


        </AutenticationCard>
    )
}

export default Register