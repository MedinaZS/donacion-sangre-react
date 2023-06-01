export const APP_ROUTES = {
    HOME: '/',
    SOLICITUDES: '/solicitudes',
    PUNTOS_DE_DONACION: '/puntos-de-donacion',
    LOGIN: '/login',
    SIGN_UP: '/sign-up',
    PROFILE: '/profile',
    CERTIFICADOS: '/certificados',
    CREAR_SOLICITUD: '/crear-solicitud'
}


// const IP = "27.0.0.1"
const API_URL = 'http://192.168.16.90:8000/api'

export const API_ROUTES = {
    LOGIN: `${API_URL}/login`,
    SOLICITUDES: `${API_URL}/solicitudes`,
    PUNTOS_DE_DONACION: `${API_URL}/locales`,
    CERTFICADOS: `${API_URL}/certificados?desc=1`,
    // http://192.168.16.90:8000/api/certificados?desc=1
    // LOGOUT: `${API_URL}/user/logout`,
    // REGISTER: `${API_URL}/user/register`,
    // GET_USER: `${API_URL}/user/auth`,
    // UPDATE_USER: `${API_URL}/user/edit`,
    // DELETE_USER: `${API_URL}/user/delete/`, //se pasa id por eso la ultima barra

    // SAVE_ORDER: `${API_URL}/order/new`,
    // GET_ORDERS: `${API_URL}/order/list/`, //se pasa id por eso la ultima barra
    // UPDATE_ORDER: `${API_URL}/order/edit`,
    // GET_ONE_ORDER: `${API_URL}/order/`, //se pasa id por eso la ultima barra
}