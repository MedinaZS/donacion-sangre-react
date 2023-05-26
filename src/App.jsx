import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { APP_ROUTES } from './helpers/utility'
import Solicitudes from './views/Solicitudes'
import PuntosDonacion from './views/PuntosDonacion'

function App() {


  return (
    <div className="min-vh-100 d-flex flex-column">

      < BrowserRouter >
        <Navbar />
        <div className='container-fluid'>
          <Routes>
            <Route path={APP_ROUTES.SOLICITUDES} element={<Solicitudes />} />
            <Route path={APP_ROUTES.PUNTOS_DE_DONACION} element={<PuntosDonacion />} />
            <Route path="*" element={<p className='text-center fs-1 my-auto'>404 Path not resolved</p>} />
          </Routes>
        </div>
        <Footer />
      </ BrowserRouter>

    </div >
  )
}

export default App
