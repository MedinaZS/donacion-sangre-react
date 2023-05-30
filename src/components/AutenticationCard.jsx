
const AutenticationCard = ({onSubmitHandler, children}) => {
    return (
        <div className=" col-lg-10 mx-auto my-3">
            <div className="card rounded-4 shadow">
                <div className="row g-0">
                    {/* Image */}
                    <div id="login-image" className="col-lg-5 d-none d-lg-block rounded-start-4"></div>
                    
                    <div className="col-lg-7 d-flex align-items-center">
                        {/* Form */}
                        <form onSubmit={onSubmitHandler} className="card-body p-3 text-black">

                            <div className="d-flex align-items-center mb-3 pb-1">
                                <i className="h2 bi bi-heart-pulse-fill m-0 me-3 text-danger "></i>
                                <span className="h2 fw-bold mb-0">Donación Sangre Paraguay</span>
                            </div>

                            {children}


                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AutenticationCard