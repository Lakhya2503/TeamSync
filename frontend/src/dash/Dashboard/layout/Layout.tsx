import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout: React.FC = () => {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#e0e5ec]">
      {/* Soft claymorphic background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-[#a3b1c6]/30 blur-3xl" />
        <div className="absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-[#c4b5fd]/30 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-96 w-96 rounded-full bg-[#a5b4fc]/30 blur-3xl" />
      </div>

      <Sidebar />

      <div className="relative z-10 flex-1 flex flex-col ml-64 min-w-0">
        <Header />

        {/* Main clay workspace */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div
            className="min-h-full rounded-[2rem] bg-[#e0e5ec] p-4 md:p-6
              shadow-[inset_6px_6px_14px_#b8bec7,inset_-6px_-6px_14px_#ffffff]"
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout