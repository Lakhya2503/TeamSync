import React, { type ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/comman/HomePage'
import AboutPage from '../pages/comman/AboutPage'
import ContactPage from '../pages/comman/ContactPage'
import HelpPage from '../pages/comman/HelpPage'
import RegisterPage from '../pages/auth/RegisterPage'
import LoginPage from '../pages/auth/LoginPage'
import Dashboard from '../Components/Dashboard/Dashboard'
import useAuthStore from '../app/authStore'
import Layout from '../Components/Dashboard/layout/Layout'
import Loader from '../Components/ui/Loader'
import Users from '../Components/Dashboard/admin/Users'


function ProtectedRoute({ children }) {  
  const isAuth = useAuthStore((state)=> state.isAuthenticated)

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}


interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <>{children}</>;
};


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

      <Route element={
        <ProtectedRoute>
          <DashboardLayout>
            <Layout />
          </DashboardLayout>
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Route>



      {/*  GENERAL ROUTES */}



      {/*  GENERAL ROUTES */}

    </Routes>
  )
}

export default AppRouter