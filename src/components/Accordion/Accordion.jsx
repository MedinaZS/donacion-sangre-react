
const Accordion = ({ title, items, link }) => {

    return (
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header ">
                    <button className="accordion-button collapsed bg-secondary-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        {title}
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <div className="row row-cols-md-2">
                            {items && items.map((item, index) => (
                                <div key={index}>
                                    <h5>{item.local_donacion}</h5>
                                    Dirección: {item.direccion} <br />
                                    Horario: {item.hora_apertura ? item.hora_apertura + ':00hs' : '00:00'} <br />
                                    <a className="me-3" href="#">Ver Más</a>
                                    <a href={link + item.latitud + '%2C' + item.longitud} target="_blank" rel="noreferrer" >Ver en Google Maps</a>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Accordion