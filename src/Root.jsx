import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from './helpers/utility';

function Root() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate(APP_ROUTES.SOLICITUDES)
  }, [])


  return (
    <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <div className='container-fluid'>
          <Outlet />
        </div>
        <Footer />
    </div >
  )
}

export default Root
