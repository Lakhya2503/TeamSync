import React, { useState, useEffect } from 'react'
import {
  FaRocket,
  FaUsers,
  FaChartLine,
  FaBell,
  FaShieldAlt,
  FaArrowRight,
  FaPlay,
  FaCheckCircle,
  FaBolt,
  FaClock,
  FaUsers as FaUsersGroup,
  FaProjectDiagram,
  FaChartPie,
  FaRegStar,
  FaRegHeart,
  FaRegComments,
  FaUserPlus,
  FaCloudUploadAlt,
  FaMobileAlt,
  FaHeadset,
  FaCog,
  FaRegCalendarAlt,
  FaRegFileAlt,
  FaRegClock,
  FaRegSmile,
  FaQuoteLeft,
  FaStar,
  FaStarHalfAlt,
  FaUserCircle,
  FaRegLightbulb,
  FaRegPaperPlane,
  FaRegHandshake,
  FaRegBuilding,
  FaTrophy,
  FaAward,
  FaRegGem,
  FaGlobe,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaRegEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaChevronRight,
  FaCheck,
  FaArrowUp,
  FaArrowDown,
  FaRegCircle,
  FaRegDotCircle,
  FaInfinity,
  FaLayerGroup,
  FaRegLifeRing,
  FaUsersCog,
  FaCrown,
  FaMedal,
  FaFire,
  FaUserAstronaut,
  FaRocket as FaRocketIcon,
  FaHashtag,
  FaCircle,
  FaUser,
  FaCalendarCheck,
  FaTasks,
  FaPercentage,
  FaSync,
  FaUserFriends
} from 'react-icons/fa'
import { MdOutlineRealEstateAgent } from 'react-icons/md'
import { HiOutlineLightningBolt } from 'react-icons/hi'

const HomePage = () => {
  // Live leaderboard data with initial values
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, name: 'Sarah Johnson', team: 'Design Sprint', tasks: 47, completed: 42, avatar: 'SJ', status: 'online' },
    { id: 2, name: 'Michael Chen', team: 'Project Alpha', tasks: 53, completed: 48, avatar: 'MC', status: 'online' },
    { id: 3, name: 'Emily Rodriguez', team: 'Marketing Q4', tasks: 38, completed: 29, avatar: 'ER', status: 'away' },
    { id: 4, name: 'David Kim', team: 'Design Sprint', tasks: 41, completed: 36, avatar: 'DK', status: 'online' },
    { id: 5, name: 'Lisa Thompson', team: 'Project Alpha', tasks: 35, completed: 33, avatar: 'LT', status: 'offline' },
    { id: 6, name: 'James Wilson', team: 'Marketing Q4', tasks: 29, completed: 21, avatar: 'JW', status: 'online' },
  ])

  // Live update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboardData(prevData => {
        const updatedData = prevData.map(item => {
          const shouldUpdate = Math.random() > 0.6
          if (shouldUpdate) {
            const increment = Math.floor(Math.random() * 3) + 1
            const newTotal = item.tasks + increment
            const newCompleted = Math.min(item.completed + Math.floor(Math.random() * 2), newTotal)
            return {
              ...item,
              tasks: newTotal,
              completed: newCompleted,
              status: Math.random() > 0.8 ? 'away' : Math.random() > 0.9 ? 'offline' : 'online'
            }
          }
          return item
        })
        return updatedData.sort((a, b) => (b.completed / b.tasks) - (a.completed / a.tasks))
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Calculate completion percentage
  const getCompletionRate = (completed, total) => {
    return Math.round((completed / total) * 100)
  }

  // Get color based on rank
  const getRankColor = (index) => {
    switch(index) {
      case 0: return 'from-yellow-400 to-yellow-500'
      case 1: return 'from-gray-300 to-gray-400'
      case 2: return 'from-amber-600 to-amber-700'
      default: return 'from-indigo-400 to-indigo-500'
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'online': return <FaCircle className="text-green-500 text-xs" />
      case 'away': return <FaClock className="text-yellow-500 text-xs" />
      case 'offline': return <FaCircle className="text-gray-400 text-xs" />
      default: return <FaCircle className="text-gray-400 text-xs" />
    }
  }

  // Get rank icon
  const getRankIcon = (index) => {
    switch(index) {
      case 0: return <FaCrown className="text-yellow-400 text-lg" />
      case 1: return <FaMedal className="text-gray-400 text-lg" />
      case 2: return <FaMedal className="text-amber-600 text-lg" />
      default: return <FaHashtag className="text-indigo-400 text-sm" />
    }
  }

  // Get performance level
  const getPerformanceLevel = (rate) => {
    if (rate >= 90) return { icon: <FaFire className="text-red-500" />, label: 'On Fire!' }
    if (rate >= 75) return { icon: <FaRocketIcon className="text-blue-500" />, label: 'Fast Track' }
    if (rate >= 50) return { icon: <FaTasks className="text-yellow-500" />, label: 'Steady' }
    return { icon: <FaClock className="text-gray-400" />, label: 'Building' }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-white via-indigo-50 to-white py-10 px-4 relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 leading-tight">
                  Sync Your Team,
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Supercharge Results</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  TeamSync brings your team together with powerful collaboration tools, 
                  real-time updates, and seamless project management — all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-300/50 transition-all duration-200 transform hover:scale-105 group">
                    <FaRocket className="group-hover:translate-x-1 transition-transform" />
                    Start Free Trial
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-indigo-300 hover:border-indigo-400 text-gray-700 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg group">
                    <FaPlay className="text-indigo-500 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-indigo-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2">
                      <FaUsersGroup className="text-indigo-500 text-xl" />
                      <p className="text-2xl font-bold text-indigo-600">2,000+</p>
                    </div>
                    <p className="text-xs text-gray-500">Teams</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-indigo-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2">
                      <FaChartLine className="text-green-500 text-xl" />
                      <p className="text-2xl font-bold text-indigo-600">98%</p>
                    </div>
                    <p className="text-xs text-gray-500">Satisfaction</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-indigo-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2">
                      <FaHeadset className="text-purple-500 text-xl" />
                      <p className="text-2xl font-bold text-indigo-600">24/7</p>
                    </div>
                    <p className="text-xs text-gray-500">Support</p>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-300 border-2 border-white flex items-center justify-center text-indigo-700 font-bold text-sm shadow-md">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                      <FaUserPlus className="text-lg" />
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">2,000+</span> teams trust TeamSync
                  </span>
                </div>
              </div>

              {/* Right Column - Live Leaderboard */}
              <div className="relative group">
                {/* Animated Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border-2 border-indigo-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-indigo-300">
                  <div className="space-y-4">
                    {/* Leaderboard Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FaTrophy className="text-2xl text-yellow-500 animate-pulse" />
                        <h3 className="text-lg font-bold text-gray-800">Live Leaderboard</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaSync className="text-green-500 text-xs animate-spin" />
                        <span className="text-xs text-green-500 font-medium">Live</span>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                      </div>
                    </div>

                    {/* Leaderboard List */}
                    <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                      {leaderboardData.map((member, index) => {
                        const completionRate = getCompletionRate(member.completed, member.tasks)
                        const rankColor = getRankColor(index)
                        const performance = getPerformanceLevel(completionRate)
                        
                        return (
                          <div 
                            key={member.id} 
                            className={`bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-x-1 border-l-4 border-transparent hover:border-${rankColor.split(' ')[1].split('-')[1]}-500 group relative`}
                          >
                            <div className="flex items-center gap-3">
                              {/* Rank */}
                              {/* <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${rankColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                {getRankIcon(index)}
                              </div> */}

                              {/* Avatar with status */}
                              <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-semibold text-sm">
                                  {member.avatar}
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5">
                                  {getStatusIcon(member.status)}
                                </div>
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <p className="font-semibold text-sm text-gray-800 truncate">{member.name}</p>
                                    {index === 0 && <FaCrown className="text-yellow-400 text-xs" />}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs">
                                    <FaUserFriends className="text-gray-400" />
                                    <span className="text-gray-500">{member.team}</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <FaTasks className="text-indigo-400" />
                                    <span>{member.completed}/{member.tasks}</span>
                                    <span className="text-gray-300">|</span>
                                    <FaPercentage className="text-indigo-400" />
                                    <span className={`font-semibold ${completionRate >= 80 ? 'text-green-500' : completionRate >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                                      {completionRate}%
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                    {performance.icon}
                                    <span>{performance.label}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-1000 bg-gradient-to-r ${index === 0 ? 'from-yellow-400 to-yellow-500' : index === 1 ? 'from-gray-300 to-gray-400' : index === 2 ? 'from-amber-600 to-amber-700' : 'from-indigo-400 to-indigo-500'}`}
                                style={{ width: `${completionRate}%` }}
                              ></div>
                            </div>

                            {/* Hover effect */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex items-center gap-1 text-[10px] text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full">
                                <FaBolt className="text-xs" />
                                <span>updating</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Live Stats Footer */}
                    <div className="flex justify-between items-center pt-3 border-t border-indigo-200">
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1 text-gray-500">
                          <FaUserFriends />
                          <span>{leaderboardData.length} members</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-500">
                          <FaCircle className="text-[6px]" />
                          <span>{leaderboardData.filter(m => m.status === 'online').length} online</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <FaCalendarCheck className="text-indigo-400" />
                        <span className="text-gray-500">Updated: now</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    <div className="w-1 h-1 bg-indigo-300 rounded-full"></div>
                    <div className="w-1 h-1 bg-indigo-300 rounded-full"></div>
                    <div className="w-1 h-1 bg-indigo-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Features</span>
              <h2 className="text-4xl font-bold text-gray-800 mt-2">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">TeamSync</span>
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Everything you need to keep your team aligned and productive</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: FaUsersGroup, title: 'Team Collaboration', desc: 'Share files, chat, and collaborate in real-time', color: 'from-blue-400 to-blue-500' },
                { icon: FaChartLine, title: 'Project Tracking', desc: 'Monitor progress with intuitive dashboards', color: 'from-green-400 to-green-500' },
                { icon: FaBell, title: 'Smart Notifications', desc: 'Stay updated with intelligent alerts', color: 'from-yellow-400 to-yellow-500' },
                { icon: FaShieldAlt, title: 'Secure & Reliable', desc: 'Enterprise-grade security for your data', color: 'from-red-400 to-red-500' }
              ].map((feature, idx) => (
                <div key={idx} className="group bg-white rounded-2xl p-8 border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Extended Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Advanced Tools</span>
              <h2 className="text-4xl font-bold text-gray-800 mt-2">
                Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Succeed</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: FaRegCalendarAlt, title: 'Smart Scheduling', desc: 'AI-powered meeting planning and calendar management' },
                { icon: FaRegFileAlt, title: 'Document Hub', desc: 'Centralized storage with version control and sharing' },
                { icon: FaRegClock, title: 'Time Tracking', desc: 'Monitor productivity with detailed time analytics' },
                { icon: FaRegSmile, title: 'Employee Engagement', desc: 'Keep morale high with recognition tools' },
                { icon: FaRegLightbulb, title: 'Idea Management', desc: 'Capture and develop team innovations' },
                { icon: FaRegPaperPlane, title: 'Instant Messaging', desc: 'Secure chat with threaded conversations' }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-xl text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
              <h2 className="text-4xl font-bold text-gray-800 mt-2">
                Loved by Teams <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Worldwide</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah Johnson', role: 'CEO, TechFlow', quote: 'TeamSync completely transformed how we work. Our productivity increased by 40% in just two months.', rating: 5 },
                { name: 'Michael Chen', role: 'Product Lead, InnovateCo', quote: 'The real-time collaboration features are incredible. It feels like we\'re all in the same room.', rating: 5 },
                { name: 'Emily Rodriguez', role: 'Marketing Director, GrowthLab', quote: 'Best project management tool we\'ve ever used. The analytics dashboard is a game-changer.', rating: 5 }
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-indigo-100">
                  <FaQuoteLeft className="text-3xl text-indigo-300 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
              <h2 className="text-4xl font-bold text-gray-800 mt-2">
                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Plan</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Starter', price: '$9', features: ['10 team members', '5 projects', 'Basic analytics', 'Email support', '1GB storage'], popular: false },
                { name: 'Professional', price: '$29', features: ['50 team members', 'Unlimited projects', 'Advanced analytics', 'Priority support', '50GB storage', 'Custom integrations'], popular: true },
                { name: 'Enterprise', price: 'Custom', features: ['Unlimited members', 'Unlimited projects', 'Enterprise analytics', '24/7 support', 'Unlimited storage', 'Custom development'], popular: false }
              ].map((plan, idx) => (
                <div key={idx} className={`rounded-2xl p-8 border-2 transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-xl' : 'border-gray-200 hover:border-indigo-300 hover:shadow-lg'}`}>
                  {plan.popular && (
                    <div className="bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                      <FaStar className="inline mr-1" /> Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-gray-500">/month</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheck className="text-indigo-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${plan.popular ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg' : 'border-2 border-gray-300 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'}`}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { number: '2,000+', label: 'Active Teams', icon: <FaUsersGroup className="text-3xl mb-2 mx-auto" /> },
                { number: '98%', label: 'Satisfaction Rate', icon: <FaChartLine className="text-3xl mb-2 mx-auto" /> },
                { number: '24/7', label: 'Customer Support', icon: <FaHeadset className="text-3xl mb-2 mx-auto" /> },
                { number: '50+', label: 'Integrations', icon: <FaCog className="text-3xl mb-2 mx-auto" /> }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  {stat.icon}
                  <p className="text-4xl font-bold">{stat.number}</p>
                  <p className="text-indigo-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Get Started</span>?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using TeamSync to streamline their workflow and achieve more together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-300/50 transition-all duration-200 transform hover:scale-105 group">
                <FaRocket className="group-hover:translate-x-1 transition-transform" />
                Start Free Trial
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-300 hover:border-indigo-300 text-gray-700 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg">
                <FaHeadset className="text-indigo-500" />
                Contact Sales
                <FaChevronRight className="text-indigo-500" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage