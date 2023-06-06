import { showFormattedDate } from "../helpers/utility";
import DeleteButton from "./Solicitudes/DeleteButton";
import ShareButton from "./Solicitudes/ShareButton";
import { useSelector } from "react-redux";

const Card = ({ solicitud, certificado, listaSolicitudes, setListaSolicitudes }) => {

    const type = ["A+", "A-", "B+", "B-", "O+", "O-", "AB-", "AB+"]
    const iconSrc = (solicitud && "https://res.cloudinary.com/dhzoxdo6q/image/upload/donacion-sangre/" + type[solicitud.tipo_sangre - 1] + ".png")

    const userRedux = useSelector(state => state.user)
    let userId = userRedux.id


    return (
        <div className={"col d-flex align-items-stretch"}>
            <div className="card mb-4 rounded-4 shadow w-100 border border-danger">

                {/* Header */}
                <div className={"card-header border-danger border-3 py-3 text-white rounded-top-4 bg-danger opacity-5 " + (solicitud && 'd-flex justify-content-between align-items-center ')}>
                    <h4 className={solicitud ? "text-start" : 'text-center'}>{solicitud ? solicitud.nombre_apellido_donatario : "Certificado Donación"}</h4>

                    {(solicitud) &&
                        <div className="fs-5">
                            {userId == solicitud.creado_por && <DeleteButton id={solicitud.id} listaSolicitudes={listaSolicitudes} setListaSolicitudes={setListaSolicitudes} />}
                            <ShareButton solicitud={solicitud} />
                        </div>}

                </div>


                <div className="card-body text-start ">
                    <p className="d-flex justify-content-between">
                        <span className="fw-bold">{solicitud ? 'Teléfono' : 'Establecimiento'}:</span>
                        <span>{solicitud ? solicitud.telefono_contacto : certificado.local_donacion}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        <span className="fw-bold">{solicitud ? 'C.I' : 'Apellido'}:</span>
                        <span>{solicitud ? solicitud.cedula_donatario : certificado.user.surname}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        <span className="fw-bold"> {solicitud ? 'Lugar de donación' : 'Nombre'}:</span>
                        <span>{solicitud ? solicitud.establecimiento : certificado.user.name}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        <span className="fw-bold">{solicitud ? 'RH' : 'Sexo'}:</span>
                        <span>{solicitud ? <img className='icon-blood-type' src={iconSrc}></img> : certificado.user.sexo}</span>

                    </p>
                    <p className="d-flex justify-content-between">
                        <span className="fw-bold">{solicitud ? 'Volúmenes' : 'Numero de Cedula'}:</span>
                        <span>{solicitud ? solicitud.volumenes_necesarios : certificado.user.nro_cedula}</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        <span className="fw-bold">{solicitud ? 'Fecha Limite' : 'Fecha de Donacion'}:</span>
                        <span>{solicitud ? showFormattedDate(solicitud.fecha_limite) :  showFormattedDate(certificado.fecha_donacion)}</span>
                    </p>
                </div>
                {solicitud && <div className="card-footer border-danger">
                    <span className="fs-5">{solicitud.solicitud}</span>
                </div>}
            </div>
        </div>

    )
}

export default Card