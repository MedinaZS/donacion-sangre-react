import { useState } from "react"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import AutenticationCard from "../components/AutenticationCard"


const Login = () => {

	const [viewPassword, setViewPassword] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
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

		return noError
	}

	const handleViewPassword = () => {
		setViewPassword(!viewPassword)

	}

	return (
		<AutenticationCard onSubmitHandler={onSubmitHandler}>
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
				<div className="form-text">La contraseña debe de tener minimo 8 caracteres</div>
			</div>

			<div className="d-grid pt-1 mb-4">
				<button type='submit' className="btn btn-danger btn-block fw-bold" >Iniciar Sesión</button>
			</div>

			<div className="text-center">
				<Link to={'/forgot-password'} className="text-danger"> ¿Olvidaste tu contraseña?</Link>
				<p className="my-3">¿Aun no tienes una cuenta?
					<Link to={'/register'} className="text-danger"> Registrate aquí</Link>
				</p>
			</div>

		</AutenticationCard>

	)
}

export default Login