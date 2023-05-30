import { useEffect, useState } from "react";
import CardList from "../components/CardList"
import FiltroSolicitudes from "../components/FiltroSolicitudes";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import { IP_DIRECTION } from "../helpers/utility";

const Solicitudes = () => {
    const [listaSolicitudes, setListaSolicitudes] = useState([])

    useEffect(() => {
        axios.get(IP_DIRECTION + "/api/solicitudes")
            .then(response => {
                let data = response.data.data;
                // console.log(data)
                setListaSolicitudes(data)
            })
            .catch(error => console.log("Error", error))
    }, [])


    return (
        <>
            <PageTitle title={"Solicitudes"}>
                <FiltroSolicitudes />
            </PageTitle>
            <CardList listaSolicitudes={listaSolicitudes} />
        </>
    )
}

export default Solicitudes