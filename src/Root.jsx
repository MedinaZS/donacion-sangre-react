import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { APP_ROUTES, getTokenFromLocalStorage } from './helpers/utility';
import { Toaster } from 'react-hot-toast';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es';

function Root() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromLocalStorage()
    if (token) {
      navigate(APP_ROUTES.SOLICITUDES)
    }else{
      navigate(APP_ROUTES.LOGIN)
    }

  }, [])


  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <div className='container h-100'>
        <div><Toaster /></div>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
          <Outlet />
        </LocalizationProvider>
      </div>
      <Footer />
    </div >
  )
}

export default Root
