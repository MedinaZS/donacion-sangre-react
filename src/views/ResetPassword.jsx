import { useState } from 'react'
import FormCard from '../components/FormCard'
import { Link, useNavigate } from 'react-router-dom'
import { API_ROUTES, APP_ROUTES, capitalizeFirstLetter } from '../helpers/utility'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const ResetPassword = () => {

	const [email, setEmail] = useState('')
	
	const emailPattern = /\S+@\S+\.\S+/
    const message = "Por favor intente de nuevo";

	const navigate = useNavigate()

	const onSubmitHandler = (event) => {
		event.preventDefault();

		if (validateFields()) {

			axios.post(API_ROUTES.RESET_PASSWORD, { email })
				.then(response => {
					console.log(response)
                    const successMessage = response?.data?.message
					if (successMessage) {
						toast.success(successMessage)
					}
					navigate(APP_ROUTES.LOGIN)
				})
				.catch(error => {
                    // console.log(error)
                    const errorMessage = error.response?.data?.errors
					if (errorMessage) {
                        console.log(Object.keys(errorMessage))
                        handleErrors(Object.keys(errorMessage))
					}
                })
		}
	}

    const handleErrors = (errors) =>{
        let timeout = 0;
        errors.forEach(element => {
            timeout +=200;
            setTimeout(() => {
                toast.error(capitalizeFirstLetter(element) + ' requerido. Por favor intente de nuevo')
            }, timeout);
        });

    }

	const isEmpty = (str) => {
        return str.trim() == ''
    }

	const validateFields = () => {
		let noError = true;
		toast.dismiss()
		let timeout = 0;

		if (isEmpty(email) || !emailPattern.test(email)) {
			timeout += 200;
			setTimeout(() => { toast.error("Email inválido. " + message) }, timeout);
			noError = false;
		}
		

		return noError
	}

    return (
        <FormCard title={"Reestablecer Contraseña"} onSubmitHandler={onSubmitHandler} hasImage={true}>
            <div className="mb-2">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="d-grid pt-1 mb-4">
				<button type='submit' className="btn btn-danger btn-block fw-bold" >Restablecer</button>
			</div>

        
            <div className="text-center">
                <Link to={'/forgot-password'} className="text-danger"> ¿Olvidaste tu contraseña?</Link>
                <p className="my-3">¿Aun no tienes una cuenta?
                    <Link to={APP_ROUTES.SIGN_UP} className="text-danger"> Registrate aquí</Link>
                </p>
            </div>

        </FormCard>
    )
}

export default ResetPassword