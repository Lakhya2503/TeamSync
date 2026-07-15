import React from 'react'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-white via-yellow-50 to-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full">
                  🚀 Team Collaboration Redefined
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Sync Your Team,
                  <span className="block text-yellow-500">Supercharge Results</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  TeamSync brings your team together with powerful collaboration tools, 
                  real-time updates, and seamless project management — all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-yellow-300/50 transition-all duration-200 transform hover:scale-105">
                    Start Free Trial
                  </button>
                  <button className="px-8 py-3 bg-white border-2 border-yellow-300 hover:border-yellow-400 text-gray-700 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg">
                    Watch Demo →
                  </button>
                </div>
                {/* Trust Badge */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-yellow-200 border-2 border-white flex items-center justify-center text-yellow-700 font-bold text-sm">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">2,000+</span> teams trust TeamSync
                  </span>
                </div>
              </div>

              {/* Right Column - Illustration */}
              <div className="relative">
                <div className="bg-yellow-50 rounded-3xl p-8 border-2 border-yellow-200">
                  <div className="space-y-4">
                    {/* Feature Cards Mockup */}
                    <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-yellow-400">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Project Alpha</p>
                          <p className="text-xs text-gray-500">12 members • 80% complete</p>
                        </div>
                        <div className="ml-auto bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                          Active
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-yellow-300">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Design Sprint</p>
                          <p className="text-xs text-gray-500">8 members • 45% complete</p>
                        </div>
                        <div className="ml-auto bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                          In Progress
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-yellow-200">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Marketing Q4</p>
                          <p className="text-xs text-gray-500">6 members • 25% complete</p>
                        </div>
                        <div className="ml-auto bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                          Planning
                        </div>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Team Sync Status</span>
                        <span className="text-yellow-500 font-semibold">92%</span>
                      </div>
                      <div className="w-full bg-yellow-100 rounded-full h-2.5">
                        <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 border-2 border-yellow-300">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Real-time Sync</p>
                      <p className="text-[10px] text-gray-500">Live updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">
                Why Choose <span className="text-yellow-500">TeamSync</span>
              </h2>
              <p className="text-gray-600 mt-2">Everything you need to keep your team aligned and productive</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🤝', title: 'Team Collaboration', desc: 'Share files, chat, and collaborate in real-time' },
                { icon: '📊', title: 'Project Tracking', desc: 'Monitor progress with intuitive dashboards' },
                { icon: '🔔', title: 'Smart Notifications', desc: 'Stay updated with intelligent alerts' },
                { icon: '🔒', title: 'Secure & Reliable', desc: 'Enterprise-grade security for your data' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border-2 border-yellow-100 hover:border-yellow-300 hover:shadow-lg transition-all duration-200">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage