import { Link, NavLink, useNavigate } from "react-router-dom"
import { APP_ROUTES } from "../helpers/utility"
import { useDispatch, useSelector } from "react-redux"

const Navbar = () => {

    const navigate = useNavigate()
    const dispatcher = useDispatch()
    const userRedux = useSelector(state => state.user)

    const links = [
        { text: 'Puntos de Donación', url: APP_ROUTES.PUNTOS_DE_DONACION },
        { text: 'Solicitudes', url: APP_ROUTES.SOLICITUDES },
        { text: 'Certificados', url: APP_ROUTES.CERTIFICADOS }
    ]

    const logout = () => {
        // Delete all from store
        dispatcher({ type: 'logout' })
        navigate(APP_ROUTES.LOGIN)
    }

    return (
        <nav className="navbar navbar-expand-lg border-bottom py-2  px-3 px-lg-5 bg-danger navbar-dark">
            <div className="container-fluid p-0">
                <a href="#" className="navbar-brand">
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

                        {userRedux &&

                            <>
                                {links.map((link, index) => (
                                    <li key={index} className="nav-item">
                                        <NavLink to={link.url} className="nav-link rounded-2"> {link.text}</NavLink>
                                    </li>
                                ))}
                                <div className="dropdown mt-4 mt-lg-0 ms-lg-4 ">
                                    <button className="btn btn-light px-4 rounded-pill dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-person-fill me-2"></i>
                                        {userRedux.name} {userRedux.surname}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <Link to={APP_ROUTES.MI_PERFIL} className="dropdown-item">
                                                <i className="bi bi-person-vcard me-3"></i>
                                                Mi perfil
                                            </Link>
                                        </li>
                                        <hr />
                                        <li>
                                            <button className="dropdown-item" onClick={logout}>
                                                <i className="bi bi-box-arrow-right me-3"></i>
                                                Cerrar Sesión
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </>

                        }


                        {!userRedux &&
                            <>
                                <NavLink to={APP_ROUTES.SIGN_UP} className="nav-link rounded-2"><i className="bi bi-person-fill me-2"></i>Registrarse</NavLink>
                                <NavLink to={APP_ROUTES.LOGIN} className="nav-link rounded-2"><i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión</NavLink>
                            </>
                        }

                        {/* {userRedux &&
                            <div className="dropdown mt-4 mt-lg-0 ms-lg-4 ">
                                <button className="btn btn-light px-4 rounded-pill dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-fill me-2"></i>
                                    {userRedux.name} {userRedux.surname}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link to={APP_ROUTES.MI_PERFIL} className="dropdown-item">
                                            <i className="bi bi-person-vcard me-3"></i>
                                            Mi perfil
                                        </Link>
                                    </li>
                                    <hr />
                                    <li>
                                        <button className="dropdown-item" onClick={logout}>
                                            <i className="bi bi-box-arrow-right me-3"></i>
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>} */}

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar