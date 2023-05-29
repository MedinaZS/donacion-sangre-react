import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { APP_ROUTES } from './helpers/utility.js';
import Root from './Root.jsx';
import Solicitudes from './views/Solicitudes';
import PuntosDonacion from './views/PuntosDonacion';

// You can do this:
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path={APP_ROUTES.SOLICITUDES} element={<Solicitudes />} />
      <Route path={APP_ROUTES.PUNTOS_DE_DONACION} element={<PuntosDonacion />} />
      <Route path="*" element={<p className='text-center fs-1 my-auto'>404 Path not resolved</p>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
