import { useState } from "react";
import CardList from "../components/CardList"
import FiltroSolicitudes from "../components/FiltroSolicitudes";
import PageTitle from "../components/PageTitle";
import EmptyListMessage from "../components/EmptyListMessage";

const Solicitudes = () => {
    const [listaSolicitudes, setListaSolicitudes] = useState(null)

    return (
        <>
            <PageTitle title={"Solicitudes"} icon={'bi-plus'} href={'/crear-solicitud'}>
                <FiltroSolicitudes setListaSolicitudes={setListaSolicitudes} />
            </PageTitle>

            {listaSolicitudes &&
				(listaSolicitudes.length == 0
					? <EmptyListMessage title={"solicitudes"} />
					: <CardList listaSolicitudes={listaSolicitudes} />)
			}
        </>
    )
}

export default Solicitudes