import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import { API_ROUTES, APP_ROUTES } from "../helpers/utility";
import CardList from "../components/CardList";
import EmptyListMessage from "../components/EmptyListMessage";
import { useSelector } from "react-redux";

const Certificados = () => {

	const [listaCertificados, setListaCertificados] = useState(null)
	const tokenRedux = useSelector(state => state.token)

	useEffect(() => {
		const config = {
			headers: {
				Authorization: `Bearer ${tokenRedux}`
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
			<PageTitle title={"Certificados"} icon={'bi-plus'} href={APP_ROUTES.CREAR_CERTIFICADO} />

			{listaCertificados &&
				(listaCertificados.length == 0
					? <EmptyListMessage title={"certificados"} />
					: <CardList listaCertificados={listaCertificados} />)
			}

		</>
	)
}

export default Certificados