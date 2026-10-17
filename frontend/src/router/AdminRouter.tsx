import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../Components/ui/Loader';
import NotFound from '../Components/ui/NotFound';

const AdminDashboard = React.lazy(() => import('../Components/Dashboard/admin/AdminDashboard'));
const AdminUsers = React.lazy(() => import('../Components/Dashboard/admin/AdminUsers'));
const AdminSession = React.lazy(() => import('../Components/Dashboard/admin/AdminSession'));
const AdminPlane = React.lazy(() => import('../Components/Dashboard/admin/AdminPlane'));
const AdminEvalutions = React.lazy(() => import('../Components/Dashboard/admin/AdminEvalutions'));
const AdminCatlog = React.lazy(() => import('../Components/Dashboard/admin/AdminCatlog'));
const AdminReports = React.lazy(() => import('../Components/Dashboard/admin/AdminReports'));
const AdminSettings = React.lazy(() => import('../Components/Dashboard/admin/AdminSettings'));
const AdminProfile = React.lazy(() => import('../Components/Dashboard/admin/AdminProfile'));


const AdminNeedsPlaceholder = () => <div>Page for creating needs</div>;

const AdminRouter: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Redirect /admin -> /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="needs" element={<AdminNeedsPlaceholder />} />
        <Route path="sessions" element={<AdminSession />} />
        <Route path="plan" element={<AdminPlane />} />
        <Route path="evaluations" element={<AdminEvalutions />} />
        <Route path="catalogs" element={<AdminCatlog />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="setting" element={<AdminSettings />} />
        <Route path="profile" element={<AdminProfile />} />

        {/* Unknown sub-route under /admin */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRouter;