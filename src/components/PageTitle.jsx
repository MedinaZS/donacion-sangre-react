// import React from 'react'

import { Link } from "react-router-dom"

const PageTitle = ({ title, children, icon, href }) => {
    return (
        <div className="py-3 text-center">
            <h1 className="display-4 fw-normal">{title}
                {icon && <Link to={href} className="btn btn-danger fw-bold shadow ms-3 p-0 px-2" >
                    <i className={"bi " + icon + ' fw-bold fs-2'}></i>
                </Link>}
            </h1>
            <hr />
            {children}
        </div>
    )
}

export default PageTitle