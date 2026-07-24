import React from 'react'
import { Route, Routes } from 'react-router-dom'
const AdminDashboard = React.lazy(() => import('../Components/Dashboard/admin/AdminDashboard'));
const AdminUsers = React.lazy(() => import('../Components/Dashboard/admin/AdminUsers'));

const AdminRouter = () => {
  return (
   <>
      <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<AdminUsers />} />
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
      </Routes>
   </>
  )
}
export default AdminRouter
