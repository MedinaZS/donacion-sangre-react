export const APP_ROUTES = {
    HOME: '/',
    LOGIN: '/iniciar-sesion',
    RESET_PASSWORD: '/reset-password',
    MI_PERFIL: '/mi-perfil',
    EDITAR_PERFIL: 'editar-perfil',
    CAMBIAR_PASSWORD: `cambiar-password`,
    SIGN_UP: '/registrate',
    SOLICITUDES: '/solicitudes',
    CREAR_SOLICITUD: '/crear-solicitud',
    PUNTOS_DE_DONACION: '/puntos-de-donacion',
    CERTIFICADOS: '/certificados',
    CREAR_CERTIFICADO: '/crear-certificado',
}


// const IP = "27.0.0.1"
const API_URL = 'http://192.168.16.90:8000/api'

export const API_ROUTES = {
    LOGIN: `${API_URL}/login`,
    REGISTRO: `${API_URL}/registro`,
    RESET_PASSWORD: `${API_URL}/reset-password`,
    MI_PERFIL: `${API_URL}/user`,
    EDITAR_PERFIL: `${API_URL}/editar-perfil`,
    CAMBIAR_PASSWORD: `${API_URL}/cambiar-password`,
    SOLICITUDES: `${API_URL}/solicitudes`,
    MIS_SOLICITUDES: `${API_URL}/solicitudes-protegido`,
    CREAR_SOLICITUD: `${API_URL}/solicitudes`,
    PUNTOS_DE_DONACION: `${API_URL}/locales`,
    CERTFICADOS: `${API_URL}/certificados?desc=1`,
    CREAR_CERTIFICADO: `${API_URL}/certificados`,
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

export const getFormattedDate = (date) => {

    // Get year, month, and day part from the date
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + "-" + month + "-" + day;
    // console.log(formattedDate);  // Prints: 2022-05-04
    return formattedDate;
}


export const setTokenToLocalStorage = (token) => {
    localStorage.setItem("token", token)
}
export const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token")
}


export const setUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
}
export const getUserFromLocalStorage = () => {
    return  JSON.parse(localStorage.getItem("user"))
}


export const clearLocalStorage = () => {
    localStorage.clear()
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
