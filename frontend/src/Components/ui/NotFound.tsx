import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FaHome, 
  FaSearch, 
  FaExclamationTriangle,
  FaArrowLeft,
  FaRocket,
  FaGhost,
  FaQuestionCircle,
  FaSadTear,
  FaCompass,
  FaGrinStars,
  FaArrowRight
} from 'react-icons/fa'

const NotFound: React.FC = () => {
  // Suggested pages
  const suggestions = [
    { name: 'Dashboard', path: '/dashboard', icon: FaHome, color: 'text-indigo-500' },
    { name: 'Projects', path: '/projects', icon: FaCompass, color: 'text-purple-500' },
    { name: 'Teams', path: '/teams', icon: FaRocket, color: 'text-pink-500' },
    { name: 'Support', path: '/support', icon: FaQuestionCircle, color: 'text-blue-500' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/30">
          {/* Header with Ghost Icon */}
          <div className="flex flex-col items-center text-center">
            {/* Animated 404 with Ghost */}
            <div className="relative mb-6 group">
              <div className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 select-none">
                404
              </div>
              <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-3 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
                <FaGhost className="text-white text-2xl sm:text-3xl" />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <FaSadTear className="text-indigo-500 text-2xl" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Page Lost in Space
              </h2>
            </div>

            <p className="text-gray-600 text-base sm:text-lg mb-2">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full mt-2 mb-6 border border-gray-200">
              <FaExclamationTriangle className="text-yellow-500" />
              <span>Error 404 - Page Not Found</span>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FaCompass className="text-indigo-500" />
              Try these pages instead:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {suggestions.map(({ name, path, icon: Icon, color }) => (
                <Link
                  key={path}
                  to={path}
                  className="group flex flex-col items-center justify-center p-3 bg-gray-50 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 border border-transparent hover:border-indigo-200"
                >
                  <Icon className={`${color} text-2xl group-hover:scale-110 transition-transform duration-200 mb-1`} />
                  <span className="text-xs font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                    {name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
            >
              <FaHome className="group-hover:scale-110 transition-transform" />
              <span>Go Home</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 font-semibold rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Go Back</span>
            </button>

            <Link
              to="/search"
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105"
            >
              <FaSearch className="group-hover:rotate-12 transition-transform" />
              <span>Search</span>
            </Link>
          </div>

          {/* Footer with fun facts */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400 border-t border-gray-100 pt-4">
            <span className="flex items-center gap-1">
              <FaGrinStars className="text-yellow-400" />
              Don't panic!
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <FaGhost className="text-indigo-400" />
              This page is haunted
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <span className="text-lg">🚀</span>
              Keep exploring
            </span>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-40"
              style={{ 
                width: `${16 + i * 8}px`,
                transitionDelay: `${i * 50}ms`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotFound