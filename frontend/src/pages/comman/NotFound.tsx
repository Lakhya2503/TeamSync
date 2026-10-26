import React from 'react'
import { Link } from 'react-router-dom'

type ItemsType = { id: number; name: string; path: string }

const NotFound = () => {
  const items: ItemsType[] = [
    { id: 1, name: 'Login', path: '/login' },
    { id: 2, name: 'Home', path: '/' },
  ]

  const clayRaised = 'bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]'

  return (
    <div className="relative flex min-h-[60vh] w-full flex-col items-center justify-center gap-5 overflow-hidden bg-[#e0e5ec] px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-[#a3b1c6]/40 blur-3xl" />
        <div className="absolute -bottom-28 right-1/4 h-80 w-80 rounded-full bg-[#c4b5fd]/40 blur-3xl" />
      </div>

      <div className={`relative z-10 flex flex-col items-center gap-4 rounded-[2.5rem] px-10 py-12 text-center ${clayRaised}`}>
        <div className={`flex h-24 w-24 items-center justify-center rounded-full ${clayRaised}`}>
          <span className="text-4xl font-extrabold text-indigo-500">404</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#4a5568]">Page Not Found</h1>
        <p className="text-sm font-medium text-[#718096]">The page you're looking for doesn't exist.</p>

        <div className="mt-2 flex items-center justify-center gap-3">
          {items.map((i) => (
            <Link
              key={i.id}
              to={i.path}
              className="rounded-2xl px-5 py-2.5 text-sm font-bold text-white
                bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa]
                shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]
                transition-all duration-150
                hover:from-[#6b8cf4] hover:to-[#9d7cf8]
                hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff]
                active:shadow-[inset_4px_4px_10px_rgba(90,70,200,0.4),inset_-4px_-4px_10px_rgba(255,255,255,0.5)]"
            >
              {i.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotFound