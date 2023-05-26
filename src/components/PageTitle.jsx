// import React from 'react'

const PageTitle = ({ title, children }) => {
    return (
        <div className="py-3 text-center">
            <h1 className="display-4 fw-normal">{title}
                {/* <button id="btn-cargar-solicitudes" className="btn btn-danger shadow ms-3" >
                        <i className="bi bi-cloud-download"></i>
                    </button> */}
            </h1>
            <hr />
            {children}
        </div>
    )
}

export default PageTitle