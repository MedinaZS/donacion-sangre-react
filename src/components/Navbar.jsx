// import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg border-bottom py-2 px-3 bg-danger">
            <div className="container-fluid p-0">
                <a href="#" className="navbar-brand text-white">
                    <i className="fs-3 bi bi-heart-pulse-fill me-1"></i>
                    <span className="fs-3 d-none d-sm-inline">Donación de Sangre</span>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="me-auto"></div>
                    <ul className="navbar-nav mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <a className="nav-link rounded-2 active" aria-current="page" href="#">Puntos de Donación</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link rounded-2 rounded-2" href="#">Solicitudes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link rounded-2" href="#">Certificados</a>
                        </li>
                        <button className="btn btn-outline-light ms-3">Login</button>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar