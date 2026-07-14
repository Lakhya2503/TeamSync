import React, { useEffect } from 'react'
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

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {  
  const { isAuthenticated, getUser } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      getUser().catch(() => {});
    }
  }, []);


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

const AppRouter = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/help' element={<HelpPage />} />
      
      {/* AUTH ROUTES */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* PROTECTED ROUTES WITH LAYOUT */}
      <Route element={
        <ProtectedRoute>
          <Layout /> {/* Layout uses Outlet internally */}
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<div> page on creating Dashboard </div>} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<div> page on creating pjage </div>} />
      </Route>
    </Routes>
  )
}

export default AppRouter