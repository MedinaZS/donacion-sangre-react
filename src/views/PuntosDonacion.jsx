import { useEffect, useState } from "react"
import PageTitle from "../components/PageTitle"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Accordion from "../components/Accordion/Accordion";

const PuntosDonacion = () => {

	const ZOOM_LEVEL = 13

	const [locales, setLocales] = useState([])
	const [center, setCenter] = useState(null)

	const link = 'https://www.google.com/maps/search/?api=1&query='

	useEffect(() => {
		axios.get("http://192.168.16.90:8000/api/locales")
			.then(response => {
				let data = response.data.data;
				// console.log(data)
				setLocales(data)
				let position = [data[0].latitud, data[0].longitud]
				// console.log(position)
				setCenter(position)
			})
			.catch(error => console.log("Error", error))
	}, [])


	return (
		<div className="container">
			<PageTitle title={"Puntos de Donación"} />


			<Accordion title={"Puntos"} items={locales} />
			<br />

			{center &&
				(<MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					{locales && locales.map((item, index) => (
						<Marker key={index} position={[item.latitud, item.longitud]}>
							<Popup>
								<span className="fw-bold">{item.local_donacion}</span> <br />
								<span></span>
								{item.direccion ? (
									<><span>{item.direccion}</span><br /></>
								) : ''}
								{(item.hora_apertura && item.hora_cierre) ? (
									<><span>Horario : {item.hora_apertura + 'hs a '}{item.hora_cierre + 'hs'}</span><br /></>
								) : ''}
								<br />
								<a target="_blank" rel="noreferrer" href={link + item.latitud + '%2C' + item.longitud}>Ir en Google Maps</a>
							</Popup>
						</Marker>
					))}

				</MapContainer>)
			}




		</div>
	)
}

export default PuntosDonacion