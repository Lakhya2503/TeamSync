import React, { useState, useRef, useEffect, useCallback } from 'react'
import { 
  BellIcon, 
  SearchIcon, 
  ChevronDownIcon,
  XIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  InfoIcon,
  MessageCircleIcon
} from 'lucide-react'
import useAuthStore from '../../../app/authStore'
import type { userType } from '../../../types/user.type'
import { useNavigate } from 'react-router-dom'

// Types
type NotificationType = 'info' | 'success' | 'warning' | 'message'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  link?: string
}

// Notification Item Component
const NotificationItem: React.FC<{ 
  notification: Notification
  onMarkAsRead: (id: string) => void
  onClose: () => void
}> = ({ notification, onMarkAsRead, onClose }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircleIcon size={20} className="text-green-500" />
      case 'warning':
        return <AlertCircleIcon size={20} className="text-yellow-500" />
      case 'message':
        return <MessageCircleIcon size={20} className="text-indigo-500" />
      default:
        return <InfoIcon size={20} className="text-indigo-500" />
    }
  }

  const getTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div 
      className={`
        px-4 py-3 hover:bg-indigo-50 transition-colors cursor-pointer
        ${!notification.isRead ? 'bg-indigo-50/60' : ''}
      `}
      onClick={() => {
        if (!notification.isRead) {
          onMarkAsRead(notification.id)
        }
        if (notification.link) {
          // Navigate to link
          onClose()
        }
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-gray-900">
              {notification.title}
            </p>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {getTimeAgo(notification.timestamp)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  )
}

// Header Component
const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Task Completed',
      message: 'Your project "Website Redesign" has been approved.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Storage Limit',
      message: 'You have reached 85% of your storage limit.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: false
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'Sarah sent you a message about the upcoming meeting.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true
    },
    {
      id: '4',
      type: 'info',
      title: 'System Update',
      message: 'New features are available. Update your profile.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isRead: true
    }
  ])

  const dropdownRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  const user : userType | null = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.userLogout);
  const navigate = useNavigate();

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close notifications when dropdown opens and vice versa
  useEffect(() => {
    if (isDropdownOpen) setIsNotificationOpen(false)
  }, [isDropdownOpen])

  useEffect(() => {
    if (isNotificationOpen) setIsDropdownOpen(false)
  }, [isNotificationOpen])

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  const toggleNotification = useCallback(() => {
    setIsNotificationOpen((prev) => !prev)
  }, [])

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setIsDropdownOpen(false)
  };

  const handleMarkAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }, [])

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    )
  }, [])

  const handleClearAll = useCallback(() => {
    setNotifications([])
    setIsNotificationOpen(false)
  }, [])

  const unreadCount = notifications.filter(n => !n.isRead).length

  if (!user) {
    return (
      <header className="bg-white border-b border-indigo-100 sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="animate-pulse h-10 w-32 bg-indigo-100 rounded"></div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white border-b border-indigo-100 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search"
              className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-indigo-300 transition-colors"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications Button */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={toggleNotification}
              className="relative p-2 rounded-lg hover:bg-indigo-50 transition-colors"
              aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
              aria-expanded={isNotificationOpen}
            >
              <BellIcon size={26} className="text-indigo-600 hover:text-indigo-700 transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[18px] h-[18px] bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 shadow-sm">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-[380px] max-w-[90vw] bg-white rounded-lg shadow-lg border border-indigo-100 overflow-hidden animate-slideDown">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-white">
                  <h3 className="text-sm font-semibold text-indigo-900">Notifications</h3>
                  <div className="flex items-center gap-2">
                    {notifications.length > 0 && (
                      <>
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                        >
                          Mark all read
                        </button>
                        <span className="text-indigo-200">|</span>
                        <button
                          onClick={handleClearAll}
                          className="text-xs text-red-500 hover:text-red-700 transition-colors font-medium"
                        >
                          Clear all
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Notification List */}
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onClose={() => setIsNotificationOpen(false)}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 px-4">
                      <BellIcon size={48} className="text-indigo-200 mb-2" />
                      <p className="text-sm text-gray-500">No notifications</p>
                      <p className="text-xs text-indigo-400">You're all caught up!</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="border-t border-indigo-100 px-4 py-2 bg-gradient-to-r from-indigo-50 to-white">
                    <a 
                      href="/notifications" 
                      className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors flex items-center justify-center gap-1 font-medium"
                    >
                      View all notifications
                      <ChevronDownIcon size={16} className="rotate-[-90deg]" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-50 transition-colors border-2 border-transparent hover:border-indigo-200"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 w-10 h-10 flex items-center justify-center text-white font-semibold overflow-hidden shadow-sm">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                )}
              </div>

              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-indigo-500">{user.email}</p>
              </div>
              <ChevronDownIcon size={20} className="text-indigo-400" />
            </button>

            {/* User Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-indigo-100 py-2 animate-slideDown">
                <div className="px-4 py-2 border-b border-indigo-100 md:hidden">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-indigo-500 truncate">{user.email}</p>
                </div>
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                  Profile
                </a>
                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                  Settings
                </a>
                <hr className="my-1 border-indigo-100" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </header>
  )
}

export default Header