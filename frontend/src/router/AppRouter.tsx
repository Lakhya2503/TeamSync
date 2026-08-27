import React, { useEffect, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuthStore from '../app/authStore';
import Loader from '../Components/ui/Loader';
import Navbar from '../Components/ui/Navbar';
import Footer from '../Components/ui/Footer';
import ForgetPasswordRequestPage from '../pages/auth/ForgetPasswordRequestPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import OtpPage from '../pages/auth/OtpPage';
import NotFound from '../Components/ui/NotFound';
import AdminRouter from './AdminRouter';
import ManagerRouter from './ManagerRouter';
import UserRouter from './UserRouter';

const HomePage = React.lazy(() => import('../pages/comman/HomePage'));
const AboutPage = React.lazy(() => import('../pages/comman/AboutPage'));
const ContactPage = React.lazy(() => import('../pages/comman/ContactPage'));
const HelpPage = React.lazy(() => import('../pages/comman/HelpPage'));
const RegisterPage = React.lazy(() => import('../pages/auth/RegisterPage'));
const LoginPage = React.lazy(() => import('../pages/auth/LoginPage'));
const Layout = React.lazy(() => import('../Components/Dashboard/layout/Layout'));

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, getUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        try {
          await getUser();
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      }
    };
    checkAuth();
  }, [isAuthenticated, getUser]);

  // Show loading while checking authentication

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const PublicRoutes = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

const AppRouter = () => {
  const { user, isAuthenticated } = useAuthStore();
  
  // Get role in lowercase for consistent routing
  const userRole = user?.role?.toLowerCase() || '';
  const isUserLoaded = isAuthenticated && userRole;

  // Determine which router to render based on role
  const getRoleRouter = () => {
    if (userRole === 'admin') {
      return <AdminRouter basePath={`/${userRole}`} />;
    } else if (userRole === 'manager') {
      return <ManagerRouter basePath={`/${userRole}`} />;
    } else if (userRole === 'user') {
      return <UserRouter basePath={`/${userRole}`} />;
    }
    return <NotFound />;
  };

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* PUBLIC ROUTES - No layout needed */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* AUTH ROUTES - No layout needed */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordRequestPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<OtpPage />} />

        {/* PROTECTED ROUTES WITH LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard redirect */}
          <Route 
            path="/dashboard" 
            element={
              isUserLoaded ? (
                <Navigate to={`/${userRole}/dashboard`} replace />
              ) : (
                <Loader />
              )
            } 
          />

          {/* Role-based routes - only render if user is loaded */}
          {isUserLoaded && (
            <Route 
              path={`/${userRole}/*`} 
              element={getRoleRouter()} 
            />
          )}

          {/* Catch any other protected routes and redirect to dashboard */}
          <Route 
            path="/*" 
            element={
              isUserLoaded ? (
                <Navigate to={`/${userRole}/dashboard`} replace />
              ) : (
                <Loader />
              )
            } 
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;