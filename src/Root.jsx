import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from './helpers/utility';
import { Toaster } from 'react-hot-toast';

function Root() {

  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (location.pathname == '/')
      navigate(APP_ROUTES.SOLICITUDES)

  }, [])


  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <div className='container h-100'>
        <div><Toaster /></div>
        <Outlet />
      </div>
      <Footer />
    </div >
  )
}

export default Root
