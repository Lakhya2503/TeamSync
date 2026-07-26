import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Components/Dashboard/Dashboard'

const UserRouter = () => {
  return (
   <>
       <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
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

export default UserRouter