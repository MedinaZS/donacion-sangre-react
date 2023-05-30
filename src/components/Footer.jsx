// import React from 'react'

const Footer = () => {
    return (
        <div className="container-fluid px-5 mt-auto">
            <footer className="d-flex flex-wrap justify-content-between align-items-center p-2 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <a href="/"
                        className="me-2 mb-md-0 text-body-secondary text-decoration-none d-flex align-items-center "><i
                            className="bi bi-heart-pulse-fill"></i>
                        <span className="ms-3 mb-md-0 text-body-secondary d-none d-sm-inline">Donación de Sangre</span>
                    </a>
                </div>
                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><a className="text-body-secondary" href="#"><i className="bi bi-twitter fs-3"></i></a></li>
                    <li className="ms-3"><a className="text-body-secondary" href="#"><i className="bi bi-instagram fs-3 "></i></a>
                    </li>
                    <li className="ms-3"><a className="text-body-secondary" href="#"><i className="bi bi-facebook fs-3"></i></a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer