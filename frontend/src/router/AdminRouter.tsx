import React from 'react'
import { Route, Routes } from 'react-router-dom'
import useAuthStore from '../app/authStore';

const AdminDashboard = React.lazy(() => import('../Components/Dashboard/admin/AdminDashboard'));
const AdminUsers = React.lazy(() => import('../Components/Dashboard/admin/AdminUsers'));

const AdminRouter = () => {
  const role = useAuthStore((state) => state.role)

  return (
    <Routes>
      {/* Fix the spelling here */}
      <Route path={`/${role}/dashboard`} element={<AdminDashboard />} />
      <Route path={`/${role}/users`} element={<AdminUsers />} />
      <Route path={`/${role}/needs`} element={<div>Page for creating needs</div>} />
      <Route path={`/${role}/sessions`} element={<div>Page for creating sessions</div>} />
      <Route path={`/${role}/plan`} element={<div>Page for creating plan</div>} />
      <Route path={`/${role}/evaluations`} element={<div>Page for creating evaluations</div>} />
      <Route path={`/${role}/catalogs`} element={<div>Page for creating catalogs</div>} />
      <Route path={`/${role}/reports`} element={<div>Page for creating reports</div>} />
      <Route path={`/${role}/settings`} element={<div>Page for creating settings</div>} />
      <Route path={`/${role}/support`} element={<div>Page for creating support</div>} />
      <Route path={`/${role}/notifications`} element={<div>Page for notifications</div>} />
      <Route path={`/${role}/profile`} element={<div>Page for profile</div>} />
    </Routes>
  )
}

export default AdminRouter