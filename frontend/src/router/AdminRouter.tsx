import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { BiSupport } from 'react-icons/bi';
import useAuthStore from '../app/authStore';

const AdminDashboard = React.lazy(() => import('../Components/Dashboard/admin/AdminDashboard'));
const AdminUsers = React.lazy(() => import('../Components/Dashboard/admin/AdminUsers'));
const AdminSession = React.lazy(() => import('../Components/Dashboard/admin/AdminSession'));
const AdminPlane = React.lazy(() => import('../Components/Dashboard/admin/AdminPlane'));
const AdminEvalutions = React.lazy(() => import('../Components/Dashboard/admin/AdminEvalutions'));
const AdminCatlog = React.lazy(() => import('../Components/Dashboard/admin/AdminCatlog'));
const AdminReports = React.lazy(() => import('../Components/Dashboard/admin/AdminReports'));
const AdminSettings = React.lazy(() => import('../Components/Dashboard/admin/AdminSettings'));
const AdminProfile = React.lazy(() => import('../Components/Dashboard/admin/AdminProfile'));

interface AdminRouterProps {
  basePath?: string;
}


const AdminRouter : React.FC<AdminRouterProps> = ({ basePath }) => {

  const role = useAuthStore((state) => state.role);
  const pathPrefix = basePath || `/${role || ''}`;

  if (!pathPrefix || pathPrefix === '/') {
    return null;
  }

  return (
    <Routes>
      <Route path={`/dashboard`} element={<AdminDashboard />} />
      <Route path={`//users`} element={<AdminUsers />} />
      <Route path={`/needs`} element={<div>Page for creating needs</div>} />
      <Route path={`/sessions`} element={<AdminSession/>} />
      <Route path={`/plan`} element={<AdminPlane/>} />
      <Route path={`/evaluations`} element={<AdminEvalutions/>} />
      <Route path={`/catalogs`} element={<AdminCatlog/>} />
      <Route path={`/reports`} element={<AdminReports/>} />
      <Route path={`/setting`} element={<AdminSettings/>} />
      <Route path={`/support`} element={<BiSupport/>} />
      {/* <Route path={`/notifications`} element={<AdminNotification>} /> */}
      <Route path={`/profile`} element={<AdminProfile/>} />
    </Routes>
  );
};

export default AdminRouter;