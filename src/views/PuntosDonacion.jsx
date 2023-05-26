import { useEffect, useState } from "react"
import PageTitle from "../components/PageTitle"
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Accordion from "../components/Accordion/Accordion";
import Map from "../components/Map";

const PuntosDonacion = () => {

	const [locales, setLocales] = useState(null)

	const link = 'https://www.google.com/maps/search/?api=1&query='

	useEffect(() => {
		axios.get("http://192.168.16.90:8000/api/locales")
			.then(response => {
				let data = response.data.data;
				// console.log(data)
				setLocales(data)
			})
			.catch(error => console.log("Error", error))
	}, [])

	


	return (
		<div className="container">
			<PageTitle title={"Puntos de Donación"} />

			<Accordion title={"Puntos"} items={locales} link={link} />
			<br />

			{locales && <Map locales={locales}></Map>}

			{/* {center &&
				(<MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					{locales && locales.map((item, index) => (
						<Marker key={index} position={[item.latitud, item.longitud]}>
							<Popup>

								<span className="fw-bold">{item.local_donacion}</span> <br />

								{item.direccion ? <>{item.direccion} <br /> </> : ''}

								Horario : {item.hora_apertura ? item.hora_apertura + ':00 ' : '00:00 '} a {item.hora_cierre ? item.hora_cierre + ':00 ' : '00:00'} <br />

								<a target="_blank" rel="noreferrer" href={link + item.latitud + '%2C' + item.longitud}>Ver en Google Maps</a>
							</Popup>
						</Marker>
					))}
					<LocationMarker />
				</MapContainer>)
			} */}




		</div>
	)
}

export default PuntosDonacion