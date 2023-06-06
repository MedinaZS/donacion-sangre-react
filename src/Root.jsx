import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from './helpers/utility';
import { Toaster } from 'react-hot-toast';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es';
import { useSelector } from 'react-redux';

function Root() {

  const navigate = useNavigate();
  const location = useLocation().pathname

  const tokenRedux = useSelector(state => state.token)

  useEffect(() => {
    if (tokenRedux) {
      if (location == APP_ROUTES.LOGIN || location == APP_ROUTES.SIGN_UP) {
        navigate(APP_ROUTES.SOLICITUDES)
      }
    } else {
      navigate(APP_ROUTES.LOGIN)
    }

  }, [tokenRedux])

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar/>
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
