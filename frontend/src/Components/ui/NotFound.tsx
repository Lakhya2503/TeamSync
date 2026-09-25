import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

type ItemsType = {
  id: number,
  name: string,
  path: string
}

const NotFound = () => {
  const navigate = useNavigate()

  const items: ItemsType[] = [
    { id: 1, name: "Login", path: '/login' },
    { id: 2, name: "Home", path: '/' }
  ]

  return (
    <div className="h-[50vh] w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-gray-600">The page you're looking for doesn't exist.</p>
      
      <div className="flex gap-2 items-center justify-center">
        {items.map((i) => (
          <Link
            key={i.id}
            to={i.path}
            className='bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition-colors'
          >
            {i.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NotFound