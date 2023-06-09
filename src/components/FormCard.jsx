import { Link } from "react-router-dom"

const FormCard = ({ onSubmitHandler, children, title, hasImage, backIcon, backHref }) => {

    return (
        <div className=" col-lg-10 mx-auto my-3">
            <div className="card rounded-4 shadow">
                <div className="row g-0">
                    {/* Image */}
                    {hasImage && <div id="login-image" className="col-lg-5 d-none d-lg-block rounded-start-4"></div>}

                    <div className={"d-flex align-items-center " + (hasImage && 'col-lg-7')}>
                        {/* Form */}
                        <form onSubmit={onSubmitHandler} className="card-body p-3 text-black">

                            <div className={"d-flex align-items-center mb-3 pb-1 " + (!hasImage && 'justify-content-center')}>
                                {backIcon && <Link to={backHref} className="bi bi-arrow-left-circle-fill text-danger fs-2 position-absolute pos-top-10 pos-start-10"></Link>}

                                {!backIcon && <i className="fs-2 bi bi-heart-pulse-fill me-3 text-danger "></i>}
                                <span className="h2 fw-bold mb-0">{title ? title : 'Donación Sangre Paraguay'}</span>

                            </div>
                            {children}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormCard