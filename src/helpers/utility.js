export const APP_ROUTES = {
    HOME: '/',
    SOLICITUDES: '/solicitudes',
    PUNTOS_DE_DONACION: '/puntos-de-donacion',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    CERTIFICADOS: '/certificados'
}

const IP = "192.168.16.90"
// const IP = "27.0.0.1"
const PORT = "8000"

const API_URL = `http://${IP}:${PORT}/api`

export const API_ROUTES = {
    LOGIN: `${API_URL}/login`,
    SOLICITUDES: `${API_URL}/solicitudes`,
    PUNTOS_DE_DONACION: `${API_URL}/locales`,
    CERTFICADOS: `${API_URL}/certificados`,
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