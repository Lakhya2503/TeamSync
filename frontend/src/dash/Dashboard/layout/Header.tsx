import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  BellIcon,
  SearchIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  InfoIcon,
  MessageCircleIcon
} from 'lucide-react'
import useAuthStore from '../../../app/authStore'
import type { userType } from '../../../types/user.type'
import { useNavigate } from 'react-router-dom'
import { User_image } from '../../../assets'

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

// Clay tokens
const clayRaised =
  'bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]'
const clayInset =
  'bg-[#e0e5ec] shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]'

// Notification Item Component
const NotificationItem: React.FC<{
  notification: Notification
  onMarkAsRead: (id: string) => void
  onClose: () => void
}> = ({ notification, onMarkAsRead, onClose }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircleIcon size={20} className="text-emerald-500" />
      case 'warning':
        return <AlertCircleIcon size={20} className="text-amber-500" />
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
        mx-2 my-1 rounded-2xl px-3 py-3 cursor-pointer transition-all duration-150
        ${!notification.isRead
          ? `${clayRaised} text-[#4a5568] hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff]`
          : `bg-[#e0e5ec]/60 text-[#718096] shadow-[inset_2px_2px_6px_#b8bec7,inset_-2px_-2px_6px_#ffffff] hover:shadow-[inset_3px_3px_8px_#b8bec7,inset_-3px_-3px_8px_#ffffff]`
        }
      `}
      onClick={() => {
        if (!notification.isRead) {
          onMarkAsRead(notification.id)
        }
        if (notification.link) {
          onClose()
        }
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${clayRaised}`}>
            {getIcon()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm ${!notification.isRead ? 'font-bold text-[#4a5568]' : 'font-semibold text-[#718096]'}`}>
              {notification.title}
            </p>
            <span className="text-[10px] font-medium text-[#a0aec0] whitespace-nowrap">
              {getTimeAgo(notification.timestamp)}
            </span>
          </div>
          <p className="text-xs text-[#718096] mt-1 line-clamp-2">
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
  const user: userType | null = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.userLogout)
  const navigate = useNavigate()

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
      await logout()
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
    setIsDropdownOpen(false)
  }

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
  const avatar = user?.avatar ? user.avatar : User_image 

  if (!user) {
    return (
      <header className="sticky top-0 z-30 bg-[#e0e5ec] px-4 pt-4">
        <div className={`flex items-center justify-between rounded-[1.75rem] px-6 py-4 ${clayRaised}`}>
          <div className="h-10 w-32 animate-pulse rounded-2xl bg-[#d4dae4]" />
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-30 bg-[#e0e5ec] px-4 pt-4">
      <div className={`flex items-center justify-between rounded-[1.75rem] px-4 py-3 md:px-6 ${clayRaised}`}>
        {/* Left Section - Search (inset clay field) */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <div className={`pointer-events-none absolute left-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full ${clayRaised}`}>
              <SearchIcon size={14} className="text-indigo-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search"
              className="w-full rounded-2xl border-none bg-[#e0e5ec] py-2.5 pl-12 pr-4 text-sm font-medium text-[#4a5568] placeholder-[#a0aec0] shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:ring-offset-0 transition-shadow duration-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Notifications Button — clay puck */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={toggleNotification}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full ${clayRaised} text-indigo-500 transition-all duration-150 hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff] active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]`}
              aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
              aria-expanded={isNotificationOpen}
            >
              <BellIcon size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa] px-1 text-[10px] font-bold text-white shadow-[2px_2px_6px_#b8bec7,-2px_-2px_6px_#ffffff]">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown — clay panel */}
            {isNotificationOpen && (
              <div className={`absolute right-0 mt-3 w-[380px] max-w-[90vw] overflow-hidden rounded-[1.75rem] ${clayRaised} animate-slideDown`}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3">
                  <h3 className="text-sm font-extrabold text-[#4a5568]">Notifications</h3>
                  <div className="flex items-center gap-2">
                    {notifications.length > 0 && (
                      <>
                        <button
                          onClick={handleMarkAllAsRead}
                          className="rounded-lg px-2 py-1 text-[11px] font-bold text-indigo-500 transition-colors hover:text-indigo-600 hover:underline"
                        >
                          Mark all read
                        </button>
                        <span className="text-[#c3cad5]">|</span>
                        <button
                          onClick={handleClearAll}
                          className="rounded-lg px-2 py-1 text-[11px] font-bold text-rose-500 transition-colors hover:text-rose-600 hover:underline"
                        >
                          Clear all
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-4 h-px bg-[#c3cad5]/60" />

                {/* Notification List */}
                <div className="max-h-[400px] overflow-y-auto py-2">
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
                    <div className="flex flex-col items-center justify-center px-4 py-10">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${clayInset}`}>
                        <BellIcon size={28} className="text-indigo-300" />
                      </div>
                      <p className="mt-3 text-sm font-bold text-[#718096]">No notifications</p>
                      <p className="text-xs font-medium text-[#a0aec0]">You're all caught up!</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <>
                    <div className="mx-4 h-px bg-[#c3cad5]/60" />
                    <div className="px-4 py-3">
                      <a
                        href="/notifications"
                        className="flex items-center justify-center gap-1 text-sm font-bold text-indigo-500 transition-colors hover:text-indigo-600"
                      >
                        View all notifications
                        <ChevronDownIcon size={16} className="rotate-[-90deg]" />
                      </a>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* User Profile Dropdown — clay pill */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`flex items-center gap-2 rounded-full ${clayRaised} p-1.5 pr-3 transition-all duration-150 hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff] active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa] text-sm font-bold text-white shadow-[inset_2px_2px_5px_rgba(90,70,200,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.4)]`}>
                  <img src={avatar} alt={user.name} className="h-full w-full object-cover" />
              </div>

              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-[#4a5568]">{user.name}</p>
                <p className="text-[10px] font-medium text-[#718096]">{user.email}</p>
              </div>
              <ChevronDownIcon size={16} className="text-[#a0aec0]" />
            </button>

            {/* User Dropdown — clay panel */}
            {isDropdownOpen && (
              <div className={`absolute right-0 mt-3 w-52 overflow-hidden rounded-[1.5rem] ${clayRaised} py-2 animate-slideDown`}>
                <div className="px-4 py-2 md:hidden">
                  <p className="text-sm font-bold text-[#4a5568]">{user.name}</p>
                  <p className="text-xs font-medium text-[#718096] truncate">{user.email}</p>
                </div>

                <a
                  href="/profile"
                  className="mx-2 block rounded-xl px-3 py-2 text-sm font-semibold text-[#4a5568] transition-all hover:bg-[#e0e5ec] hover:text-indigo-500 hover:shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="mx-2 block rounded-xl px-3 py-2 text-sm font-semibold text-[#4a5568] transition-all hover:bg-[#e0e5ec] hover:text-indigo-500 hover:shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]"
                >
                  Settings
                </a>

                <div className="mx-4 my-1 h-px bg-[#c3cad5]/60" />

                <button
                  onClick={handleLogout}
                  className="mx-2 block w-[calc(100%-1rem)] rounded-xl px-3 py-2 text-left text-sm font-bold text-rose-500 transition-all hover:bg-rose-50 hover:shadow-[inset_3px_3px_6px_#e8b8c0,inset_-3px_-3px_6px_#ffffff]"
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