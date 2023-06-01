import { useEffect, useState } from "react";
import CardList from "../components/CardList"
import FiltroSolicitudes from "../components/FiltroSolicitudes";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import { API_ROUTES } from "../helpers/utility";

const Solicitudes = () => {
    const [listaSolicitudes, setListaSolicitudes] = useState([])

    useEffect(() => {
        axios.get(API_ROUTES.SOLICITUDES)
            .then(response => {
                let data = response.data.data;
                // console.log(data)
                setListaSolicitudes(data)
            })
            .catch(error => console.log("Error", error))
    }, [])


    return (
        <>
            <PageTitle title={"Solicitudes"} icon={'bi-plus'} href={'/crear-solicitud'}>
                <FiltroSolicitudes />
            </PageTitle>
            <CardList listaSolicitudes={listaSolicitudes} />
        </>
    )
}

export default Solicitudes