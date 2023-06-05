import { useState } from "react"
import FormCard from "../components/FormCard"
import { useEffect } from "react"
import { API_ROUTES, APP_ROUTES, getTokenFromLocalStorage } from "../helpers/utility"
import axios from "axios"
import { Link, useOutletContext } from "react-router-dom"


const Perfil = () => {
	const {user} = useOutletContext()

	const links = [
		{ text: 'Editar Información', url: APP_ROUTES.EDITAR_PERFIL },
		{ text: 'Cambiar Contraseña', url: APP_ROUTES.CAMBIAR_PASSWORD }

	]

	const link = 'https://res.cloudinary.com/dhzoxdo6q/image/upload/v1685653069/Icons/'

	return (
		<>
			<FormCard title={"Mi user"} hasImage={false}>
				<hr />
				{user &&

					<div className="col-md-8 mx-auto">
						<div className="text-center mb-5">
							<img className="shadow rounded-circle" width={150} src={link + user.sexo + '.png'} alt="" />
							<h2 className="mt-3">{user.name} {user.surname}</h2>
						</div>

						<p className="row mb-4">
							<span className="col-sm-6 text-center text-sm-start"><strong>Fecha de nacimiento: </strong></span>
							<span className="col-sm-6 text-center text-sm-end">{user.fecha_nacimiento}</span>
						</p>
						<p className="row mb-4">
							<span className="col-sm-6 text-center text-sm-start"><strong>Email: </strong></span>
							<span className="col-sm-6 text-center text-sm-end">{user.email}</span>
						</p>
						<p className="row mb-4">
							<span className="col-sm-6 text-center text-sm-start"><strong>Última vez donado: </strong></span>
							<span className="col-sm-6 text-center text-sm-end">{user.ult_vez_donado ? user.ult_vez_donado : 'Sin donar'}</span>
						</p>
						<p className="row mb-4">
							<span className="col-sm-6 text-center text-sm-start"><strong>Sexo: </strong></span>
							<span className="col-sm-6 text-center text-sm-end">{user.sexo == 'M' ? 'Femenino' : (user.sexo == 'H' ? 'Masculino' : '-')}</span>
						</p>
						<p className="row mb-4">
							<span className="col-sm-6 text-center text-sm-start"><strong>C.I.: </strong></span>
							<span className="col-sm-6 text-center text-sm-end">{user.nro_cedula}</span>
						</p>
						<div className="d-grid mt-5">

							{links.map((item, index) => (
								<Link to={item.url} className="btn btn-danger mb-4" key={index}>{item.text}</Link>
							))}
						</div>
					</div>
				}
			</FormCard>
		</>
	)
}

export default Perfil