import { useEffect, useState } from "react";
import CardList from "../components/CardList"
import FiltroSolicitudes from "../components/FiltroSolicitudes";
import PageTitle from "../components/PageTitle";

const Solicitudes = () => {
    const [listaSolicitudes, setListaSolicitudes] = useState([])

    useEffect(() => {
        fetch("http://192.168.16.90:8000/api/solicitudes")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setListaSolicitudes(data.data)
            });

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