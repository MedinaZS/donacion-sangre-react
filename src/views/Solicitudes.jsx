import { useState } from "react";
import CardList from "../components/CardList"
import PageTitle from "../components/PageTitle";
import EmptyListMessage from "../components/EmptyListMessage";
import FiltroSolicitudes from '../components/Solicitudes/FiltroSolicitudes'
import { APP_ROUTES } from "../helpers/utility";

const Solicitudes = () => {
    const [listaSolicitudes, setListaSolicitudes] = useState(null)
    

    return (
        <>
            <PageTitle title={"Solicitudes"} icon={'bi-plus'} href={APP_ROUTES.CREAR_SOLICITUD}>
                <FiltroSolicitudes setListaSolicitudes={setListaSolicitudes} />
            </PageTitle>

            {listaSolicitudes &&
				(listaSolicitudes.length == 0
					? <EmptyListMessage title={"solicitudes"} />
					: <CardList listaSolicitudes={listaSolicitudes} setListaSolicitudes={setListaSolicitudes} />)
			}
        </>
    )
}

export default Solicitudes