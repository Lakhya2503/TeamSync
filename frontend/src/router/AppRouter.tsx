import React, { useEffect, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuthStore from '../app/authStore';
// import Loader from '../Components/ui/Loader';
import Navbar from '../Components/ui/Navbar';
import Footer from '../Components/ui/Footer';
import ForgetPasswordRequestPage from '../pages/auth/ForgetPasswordRequestPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import OtpPage from '../pages/auth/OtpPage';

const HomePage = React.lazy(() => import('../pages/comman/HomePage'));
const AboutPage = React.lazy(() => import('../pages/comman/AboutPage'));
const ContactPage = React.lazy(() => import('../pages/comman/ContactPage'));
const HelpPage = React.lazy(() => import('../pages/comman/HelpPage'));
const RegisterPage = React.lazy(() => import('../pages/auth/RegisterPage'));
const LoginPage = React.lazy(() => import('../pages/auth/LoginPage'));
const Dashboard = React.lazy(() => import('../Components/Dashboard/Dashboard'));
const Layout = React.lazy(() => import('../Components/Dashboard/layout/Layout'));
const Users = React.lazy(() => import('../Components/Dashboard/admin/Users'));


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


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
const PublicRoutes = () => {
  return (
    <>
      <Navbar />
      {/* <Suspense fallback={<Loader />}> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/teams" element={<div> page for Teams </div>} />
          <Route path="/projects" element={<div> page for Calendar </div>} />
          <Route path="/calendar" element={<div> page for Calendar </div>} />
        </Routes>
      {/* </Suspense> */}
      <Footer />
    </>
  );
};

const AppRouter = () => {
  return (
    // <Suspense fallback={<Loader />}>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* AUTH ROUTES - No layout needed */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordRequestPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/otp" element={<OtpPage />} />



        {/* PROTECTED ROUTES WITH LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/needs" element={<div>Page for creating needs</div>} />
          <Route path="/sessions" element={<div>Page for creating sessions</div>} />
          <Route path="/plan" element={<div>Page for creating plan</div>} />
          <Route path="/evalutions" element={<div>Page for creating evaluations</div>} />
          <Route path="/catalogs" element={<div>Page for creating catalogs</div>} />
          <Route path="/reports" element={<div>Page for creating reports</div>} />
          <Route path="/settings" element={<div>Page for creating settings</div>} />
          <Route path="/support" element={<div>Page for creating support</div>} />
          <Route path="/notifications" element={<div>Page for notifications</div>} />
          <Route path="/profile" element={<div>Page for profile</div>} />
        </Route>

        {/* Catch-all route for 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    // </Suspense>
  );
};

export default AppRouter;