import  { useState } from 'react'
import FormCard from '../components/FormCard'
import { useNavigate } from 'react-router-dom'
import { API_ROUTES, APP_ROUTES, MIN_PASS_LENGTH } from '../helpers/utility'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import BlockButton from '../components/BlockButton'
import { useSelector } from 'react-redux'

const CambiarPassword = () => {
	const [oldPassword, setOldPassword] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [viewOldPassword, setViewOldPassword] = useState(false)
	const [viewPassword, setViewPassword] = useState(false)
	const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

	const tokenRedux = useSelector(state => state.token)

	const message = "Por favor intente de nuevo";
	const navigate = useNavigate()


	const onSubmitHandler = (event) => {
		event.preventDefault();

		if (validateFields()) {

			const data = {
				old_password: oldPassword,
				password
			}

			// console.log(data)
			saveToDatabase(data)
		}

	}

	const saveToDatabase = (data) => {
		
		const config = {
			headers: {
				Authorization: `Bearer ${tokenRedux}`
			}
		}
		axios.post(API_ROUTES.CAMBIAR_PASSWORD, data, config)
			.then(response => {
				// console.log(response.data)
				const successMessage = response?.data?.message
				toast.success(successMessage)
				navigate(APP_ROUTES.MI_PERFIL)
			})
			.catch(error => {
				// console.log(error)
				const errorMessage = error.response?.data?.message
				if(errorMessage){
					toast.error("La contraseña actual no coincide. " +message )
				}
			})
	}

	const isEmpty = (str) => {
		return str.trim() == ''
	}

	const validateFields = () => {
		toast.dismiss()
		let noError = true;
		let timeout = 0;
		const delay = 300;


		if (isEmpty(oldPassword) || oldPassword.length < MIN_PASS_LENGTH) {
			timeout += delay;
			setTimeout(() => { toast.error("Contraseña actual inválida. " + message) }, timeout);
		}
		if (isEmpty(password) || password.length < MIN_PASS_LENGTH) {
			timeout += delay;
			setTimeout(() => { toast.error("Contraseña nueva inválida. " + message) }, timeout);
		}
		if (isEmpty(confirmPassword) || confirmPassword.length < MIN_PASS_LENGTH) {
			timeout += delay;
			setTimeout(() => { toast.error("Confirmar contraseña inválida. " + message) }, timeout);
		}
		if (password != confirmPassword) {
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
			case "oldPassword": setOldPassword(value); break;
			case "password": setPassword(value); break;
			case "confirmPassword": setConfirmPassword(value); break;
			default:
				break;
		}
	}

	return (
		<FormCard title={"Cambiar mi Contraseña"} onSubmitHandler={onSubmitHandler} hasImage={false} backIcon={true} backHref={APP_ROUTES.MI_PERFIL}>

			<div className='col-md-10 col-lg-8 mx-auto'>
				<div className='mb-2'>
					<label htmlFor="oldPassword" className="form-label">Contraseña actual</label>
					<div className="input-group">
						<input id="oldPassword" className="form-control border-end-0" type={viewOldPassword ? "text" : "password"} onChange={handleInputChange} />
						<span className="input-group-text bg-white"><i className={"bi bi-eye" + (viewOldPassword ? '-slash' : '')} onClick={() => setViewOldPassword(!viewOldPassword)}></i></span>
					</div>
				</div>
				<div>
					<label htmlFor="password" className="form-label">Nueva contraseña</label>
					<div className="input-group">
						<input id="password" className="form-control border-end-0" type={viewPassword ? "text" : "password"} onChange={handleInputChange} />
						<span className="input-group-text bg-white"><i className={"bi bi-eye" + (viewPassword ? '-slash' : '')} onClick={() => setViewPassword(!viewPassword)}></i></span>
					</div>
				</div>
				<div>
					<label htmlFor="confirmPassword" className="form-label">Confirmar nueva contraseña</label>
					<div className="input-group">
						<input id="confirmPassword" className="form-control border-end-0" type={viewConfirmPassword ? "text" : "password"} onChange={handleInputChange} />
						<span className="input-group-text bg-white"><i className={"bi bi-eye" + (viewConfirmPassword ? '-slash' : '')} onClick={() => setViewConfirmPassword(!viewConfirmPassword)}></i></span>
					</div>
				</div>
				
				<div id="emailHelp" className="form-text mb-2">Las contraseña debe de tener minimo {MIN_PASS_LENGTH} caracteres</div>

				<BlockButton title={"Actualizar"}/>
			</div>
		</FormCard>

	)
}

export default CambiarPassword