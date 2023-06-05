import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { API_ROUTES, APP_ROUTES, getTokenFromLocalStorage } from './helpers/utility';
import { Toaster } from 'react-hot-toast';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es';
import axios from 'axios';

function Root() {

  const navigate = useNavigate();
  const location = useLocation().pathname
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = getTokenFromLocalStorage()
    if (token) {
      if (location == APP_ROUTES.LOGIN || location == APP_ROUTES.SIGN_UP) {
        navigate(APP_ROUTES.SOLICITUDES)
      }
      getUser(token)
    } else {
      navigate(APP_ROUTES.LOGIN)
    }
  }, [])

  const getUser = (token) => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get(API_ROUTES.MI_PERFIL, config)
      .then(response => {
        // console.log(response.data)
        setUser(response.data)
        
      })
      .catch(error => console.log("Error", error))
  }


  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar user={user} />
      <div className='container h-100'>
        <div><Toaster /></div>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
          <Outlet context={{ user }} />
        </LocalizationProvider>
      </div>
      <Footer />
    </div >
  )
}

export default Root
