import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'

interface LeaderboardUser {
  id: number
  name: string
  points: number
  likes?: number
}

interface LikeUpdate {
  totalLikes: number
}

const Dashboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [likes, setLikes] = useState<number>(0)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5
    })
    setSocket(newSocket)

    // Connection events
    newSocket.on('connect', () => {
      setIsConnected(true)
      console.log('Connected to server')
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
      console.log('Disconnected from server')
    })

    // Listen for leaderboard updates
    newSocket.on('leaderboard_update', (data: LeaderboardUser[]) => {
      setLeaderboard(data)
    })

    // Listen for like updates
    newSocket.on('like_update', (data: LikeUpdate) => {
      setLikes(data.totalLikes)
    })

    // Cleanup on unmount
    return () => {
      newSocket.disconnect()
    }
  }, [])

  const handleLike = (): void => {
    if (socket && isConnected) {
      socket.emit('add_like')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-gray-200">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
            <span className="text-sm text-gray-500">
              {isConnected ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>
        <button
          onClick={handleLike}
          disabled={!isConnected}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-full font-semibold
            transition-all duration-200 transform hover:scale-105 active:scale-95
            ${isConnected 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-red-300' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <span className="text-xl">❤️</span>
          <span>{likes} Likes</span>
        </button>
      </div>

      {/* Leaderboard Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            🏆 Live Leaderboard
            {isConnected && (
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                Live Sync
              </span>
            )}
          </h2>
          <span className="text-sm text-gray-400">
            {leaderboard.length} players
          </span>
        </div>

        <div className="overflow-hidden">
          {leaderboard.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {leaderboard.map((user, index) => (
                <li
                  key={user.id}
                  className={`
                    flex items-center justify-between px-4 py-3
                    transition-all duration-200 hover:bg-gray-50
                    ${index < 3 ? 'bg-gradient-to-r from-yellow-50 to-transparent' : ''}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className={`
                      w-8 h-8 flex items-center justify-center rounded-full font-bold
                      ${index === 0 ? 'bg-yellow-400 text-white' : ''}
                      ${index === 1 ? 'bg-gray-300 text-white' : ''}
                      ${index === 2 ? 'bg-amber-600 text-white' : ''}
                      ${index > 2 ? 'bg-gray-100 text-gray-600' : ''}
                    `}>
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-700">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-semibold text-blue-600">
                      {user.points} pts
                    </span>
                    {user.likes !== undefined && (
                      <span className="flex items-center gap-1 text-red-500">
                        <span>❤️</span>
                        <span>{user.likes}</span>
                      </span>
                    )}
                    {index < 3 && (
                      <span className="text-xs font-semibold">
                        {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {isConnected ? 'Loading leaderboard...' : 'Waiting for connection...'}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard