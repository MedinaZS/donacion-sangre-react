import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { APP_ROUTES } from './helpers/utility.js';
import Root from './Root.jsx';
import Solicitudes from './views/Solicitudes';
import PuntosDonacion from './views/PuntosDonacion';
import Profile from './views/Perfil';
import Login from './views/Login';
import Certificados from './views/Certificados';
import SingUp from './views/SingUp';
import CrearSolicitud from './views/CrearSolicitud';
import CrearCertificado from './views/CrearCertificado';
import Perfil from './views/Perfil';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path={APP_ROUTES.SOLICITUDES} element={<Solicitudes />} />
      <Route path={APP_ROUTES.PUNTOS_DE_DONACION} element={<PuntosDonacion />} />
      <Route path={APP_ROUTES.PROFILE} element={<Profile />} />
      <Route path={APP_ROUTES.LOGIN} element={<Login />} />
      <Route path={APP_ROUTES.SIGN_UP} element={<SingUp />} />
      <Route path={APP_ROUTES.CERTIFICADOS} element={<Certificados />} />
      <Route path={APP_ROUTES.CREAR_SOLICITUD} element={<CrearSolicitud />} />
      <Route path={APP_ROUTES.CREAR_CERTIFICADO} element={<CrearCertificado />} />
      <Route path={APP_ROUTES.MI_PERFIL} element={<Perfil />} />
      <Route path="*" element={<p className='text-center fs-1 my-auto'>404 Path not resolved</p>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
