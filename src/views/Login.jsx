import { useState } from "react"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import FormCard from "../components/FormCard"
import axios from "axios"
import { API_ROUTES, APP_ROUTES, MIN_PASS_LENGTH, setTokenToLocalStorage } from "../helpers/utility"
import BlockButton from "../components/BlockButton"


const Login = () => {

	const [viewPassword, setViewPassword] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const message = "Por favor intente de nuevo";
	const pattern = /\S+@\S+\.\S+/

	const navigate = useNavigate()

	const onSubmitHandler = (event) => {
		event.preventDefault();

		if (validateFields()) {

			axios.post(API_ROUTES.LOGIN, { email, password })
				.then(response => {
					// console.log(response.data)
					setTokenToLocalStorage(response.data.token)
					// setUserToLocalStorage(response.data.user)
					navigate(APP_ROUTES.SOLICITUDES)
				})
				.catch(error => {
					// console.log(error.response.data)
					const errorMessage = error.response?.data?.message
					if (errorMessage) {
						toast.error(errorMessage)
					}
				})
		}

	}

	const isEmpty = (str) => {
        return str.trim() == ''
    }

	const validateFields = () => {
		let noError = true;
		toast.dismiss()
		let timeout = 0;

		if (isEmpty(email) || !pattern.test(email)) {
			timeout += 200;
			setTimeout(() => { toast.error("Email inválido. " + message) }, timeout);
			noError = false;
		}
		if (isEmpty(password) || password.length < MIN_PASS_LENGTH) {
			timeout += 200;
			setTimeout(() => { toast.error("Contraseña inválida. " + message) }, timeout);
			noError = false;
		}

		return noError
	}

	const handleViewPassword = () => {
		setViewPassword(!viewPassword)

	}

	return (
		<FormCard onSubmitHandler={onSubmitHandler} hasImage={true}>
			<div className="mb-2">
				<label htmlFor="email" className="form-label">Email</label>
				<input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
			</div>

			<div className="mb-2">
				<label htmlFor="password" className="form-label">Contraseña</label>
				<div className="input-group">
					<input id="password" className="form-control border-end-0" type={viewPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} />
					<span className="input-group-text bg-white"><i className={"bi bi-eye" + (viewPassword ? '-slash' : '')} onClick={handleViewPassword}></i></span>
				</div>
				<div className="form-text">La contraseña debe de tener minimo {MIN_PASS_LENGTH} caracteres</div>
			</div>

			<BlockButton title={"Iniciar Sesión"}/>

			<div className="text-center">
				<Link to={APP_ROUTES.RESET_PASSWORD} className="text-danger"> ¿Olvidaste tu contraseña?</Link>
				<p className="my-3">¿Aun no tienes una cuenta?
					<Link to={APP_ROUTES.SIGN_UP} className="text-danger"> Registrate aquí</Link>
				</p>
			</div>

		</FormCard>

	)
}

export default Login