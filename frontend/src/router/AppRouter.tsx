import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/comman/HomePage'
import AboutPage from '../pages/comman/AboutPage'
import ContactPage from '../pages/comman/ContactPage'
import HelpPage from '../pages/comman/HelpPage'
import RegisterPage from '../pages/auth/RegisterPage'
import LoginPage from '../pages/auth/LoginPage'
import Dashboard from '../Components/Dashboard/Dashboard'
import useAuthStore from '../app/authStore'



const PrivteRouter = () => {
  const isAuth = useAuthStore((state)=> state.isAuthenticated)
  console.log("isAuth", isAuth)
  if(isAuth){
    return <Dashboard/>
  }
}

const AppRouter = () => {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/help' element={<HelpPage/>}/>
      </Route>

      {/*  AUTH ROUTES */}
      <Route>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        {/* <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/help' element={<HelpPage/>}/> */}
      </Route>

      <Route element={<PrivteRouter/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>



      {/*  GENERAL ROUTES */}



      {/*  GENERAL ROUTES */}

    </Routes>
  )
}

export default AppRouter