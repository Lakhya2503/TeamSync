import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-yellow-200 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-white text-sm">
            TS
          </div>
          <span className="text-lg font-bold text-gray-800">
            Team<span className="text-yellow-500">Sync</span>
          </span>
        </div>
        <p className="text-sm text-gray-500">
          © 2026 TeamSync. Built with 🤍 for better teamwork.
        </p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">LinkedIn</a>
          <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer