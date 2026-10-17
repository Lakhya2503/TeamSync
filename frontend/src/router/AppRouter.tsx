import React, { useEffect, useState, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuthStore from '../app/authStore';
import Loader from '../Components/ui/Loader';
import Navbar from '../Components/ui/Navbar';
import Footer from '../Components/ui/Footer';
import ForgetPasswordRequestPage from '../pages/auth/ForgetPasswordRequestPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import OtpPage from '../pages/auth/OtpPage';
import NotFound from '../Components/ui/NotFound';

const AdminRouter = React.lazy(() => import('./AdminRouter'));
const ManagerRouter = React.lazy(() => import('./ManagerRouter'));
const UserRouter = React.lazy(() => import('./UserRouter'));

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
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      if (!isAuthenticated) {
        try {
          await getUser();
        } catch (error) {
          console.error('Authentication failed:', error);
        }
      }
      if (mounted) setChecking(false);
    };

    checkAuth();
    return () => {
      mounted = false;
    };
  }, [isAuthenticated, getUser]);

  // Show loader while restoring session
  if (checking) return <Loader />;

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
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

const AppRouter = () => {
  const { user, isAuthenticated } = useAuthStore();

  // Normalize role to lowercase for consistent routing
  const userRole = (user?.role || '').toLowerCase();
  const isUserLoaded = isAuthenticated && !!userRole;

  // Render the correct role-based router
  const getRoleRouter = () => {
    if (!isUserLoaded) return <Loader />;

    switch (userRole) {
      case 'admin':
        return <AdminRouter />;
      case 'manager':
        return <ManagerRouter />;
      case 'user':
        return <UserRouter />;
      default:
        return <NotFound />;
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* AUTH ROUTES */}
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
          {/* Dashboard redirect to role-specific dashboard */}
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

          {/* Role-based nested routes */}
          {isUserLoaded && (
            <Route path={`/${userRole}/*`} element={getRoleRouter()} />
          )}
        </Route>

        {/* PUBLIC ROUTES - keep last so auth/protected take precedence */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;