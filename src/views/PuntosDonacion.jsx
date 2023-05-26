import { useEffect, useState } from "react"
import PageTitle from "../components/PageTitle"
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Accordion from "../components/Accordion/Accordion";
import Map from "../components/Map/Map";

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


	const [latlng, setLatlng] = useState(null)


	return (
		<div className="container">
			<PageTitle title={"Puntos de Donación"} />

			<Accordion title={"Ver todos los puntos"} items={locales} link={link} setLatlng={setLatlng} />
			<br />

			{locales && <Map locales={locales} latlng={latlng}></Map>}

		</div>
	)
}

export default PuntosDonacion