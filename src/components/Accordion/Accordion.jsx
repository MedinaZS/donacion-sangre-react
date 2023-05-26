
const Accordion = ({ title, items }) => {

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
                        {items.map((item, index) => (
                            <div key={index}>
                                <p>hola</p>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Accordion