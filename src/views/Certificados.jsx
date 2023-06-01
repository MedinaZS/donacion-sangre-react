import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import { API_ROUTES, getTokenFromLocalStorage } from "../helpers/utility";
import CardList from "../components/CardList";
import EmptyListMessage from "../components/EmptyListMessage";

const Certificados = () => {

	const [listaCertificados, setListaCertificados] = useState(null)

	useEffect(() => {
		const token = getTokenFromLocalStorage()
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}

		axios.get(API_ROUTES.CERTFICADOS, config)
			.then(response => {
				let data = response.data.data;
				// console.log(data)
				setListaCertificados(data)
			})
			.catch(error => console.log("Error", error))
	}, [])



	return (
		<>
			<PageTitle title={"Certificados"} icon={'bi-plus'} href={'/crear-certificado'} />

			{listaCertificados &&
				(listaCertificados.length == 0
					? <EmptyListMessage title={"certificados"} />
					: <CardList listaCertificados={listaCertificados} />)
			}

		</>
	)
}

export default Certificados