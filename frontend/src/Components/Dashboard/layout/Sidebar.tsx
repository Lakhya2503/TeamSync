import React, { useState } from 'react'
import { 
  HomeIcon, 
  UsersIcon, 
  SettingsIcon, 
  LogOutIcon,
  MenuIcon,
  XIcon 
} from 'lucide-react'

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  
  const navItems: NavItem[] = [
    { icon: <HomeIcon size={20} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <UsersIcon size={20} />, label: 'Users', href: '/users' },
    { icon: <SettingsIcon size={20} />, label: 'Settings', href: '/settings' },
  ]

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-gray-900 text-white
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? 'w-64' : 'w-0 lg:w-20'}
        overflow-hidden
      `}>
        {/* Brand */}
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <span className={`font-bold text-xl ${!isOpen && 'lg:hidden'}`}>
            MyApp
          </span>
          {isOpen && <span className="ml-2 text-sm text-gray-400">v1.0</span>}
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    {item.icon}
                  </span>
                  <span className={`${!isOpen && 'lg:hidden'} text-sm`}>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full">
            <LogOutIcon size={20} className="text-gray-400" />
            <span className={`text-sm ${!isOpen && 'lg:hidden'}`}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar