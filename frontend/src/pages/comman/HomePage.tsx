import React, { useState, useEffect } from 'react'
import {
  FaRocket,
  FaChartLine,
  FaBell,
  FaShieldAlt,
  FaArrowRight,
  FaPlay,
  FaBolt,
  FaClock,
  FaUsers as FaUsersGroup,
  FaUserPlus,
  FaHeadset,
  FaCog,
  FaRegCalendarAlt,
  FaRegFileAlt,
  FaRegClock,
  FaRegSmile,
  FaQuoteLeft,
  FaStar,
  FaRegLightbulb,
  FaRegPaperPlane,
  FaTrophy,
  FaChevronRight,
  FaCheck,
  FaCrown,
  FaMedal,
  FaFire,
  FaRocket as FaRocketIcon,
  FaHashtag,
  FaCircle,
  FaCalendarCheck,
  FaTasks,
  FaPercentage,
  FaSync,
  FaUserFriends
} from 'react-icons/fa'

// --- clay tokens ---------------------------------------------------------
const clayRaised =
  'bg-[#e0e5ec] shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]'
const clayRaisedSm =
  'bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]'
const clayInset =
  'bg-[#e0e5ec] shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]'
const clayPuck =
  'flex items-center justify-center rounded-full bg-[#e0e5ec] shadow-[5px_5px_12px_#b8bec7,-5px_-5px_12px_#ffffff]'
const clayButton =
  'bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa] text-white font-bold ' +
  'shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff] ' +
  'transition-all duration-150 hover:from-[#6b8cf4] hover:to-[#9d7cf8] ' +
  'hover:shadow-[10px_10px_24px_#b8bec7,-10px_-10px_24px_#ffffff] ' +
  'active:shadow-[inset_5px_5px_12px_rgba(90,70,200,0.4),inset_-5px_-5px_12px_rgba(255,255,255,0.5)]'

const HomePage = () => {
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, name: 'Sarah Johnson', team: 'Design Sprint', tasks: 47, completed: 42, avatar: 'SJ', status: 'online' },
    { id: 2, name: 'Michael Chen', team: 'Project Alpha', tasks: 53, completed: 48, avatar: 'MC', status: 'online' },
    { id: 3, name: 'Emily Rodriguez', team: 'Marketing Q4', tasks: 38, completed: 29, avatar: 'ER', status: 'away' },
    { id: 4, name: 'David Kim', team: 'Design Sprint', tasks: 41, completed: 36, avatar: 'DK', status: 'online' },
  ])

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

  const getCompletionRate = (completed: number, total: number) => Math.round((completed / total) * 100)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <FaCircle className="text-emerald-500 text-[8px]" />
      case 'away': return <FaClock className="text-amber-500 text-[9px]" />
      default: return <FaCircle className="text-[#a0aec0] text-[8px]" />
    }
  }

  const getRankGradient = (index: number) => {
    switch (index) {
      case 0: return 'from-amber-300 to-amber-400'
      case 1: return 'from-slate-300 to-slate-400'
      case 2: return 'from-orange-400 to-orange-500'
      default: return 'from-[#7c9cf5] to-[#a78bfa]'
    }
  }

  const getPerformanceLevel = (rate: number) => {
    if (rate >= 90) return { icon: <FaFire className="text-rose-500" />, label: 'On Fire!' }
    if (rate >= 75) return { icon: <FaRocketIcon className="text-indigo-500" />, label: 'Fast Track' }
    if (rate >= 50) return { icon: <FaTasks className="text-amber-500" />, label: 'Steady' }
    return { icon: <FaClock className="text-[#a0aec0]" />, label: 'Building' }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#e0e5ec]">
      {/* pastel clay blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#a3b1c6]/40 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-[#c4b5fd]/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[#a5b4fc]/40 blur-3xl" />
      </div>

      <main className="relative z-10">
        {/* ========== HERO ========== */}
        <section className="px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              {/* Left */}
              <div className="space-y-8">
                <h1 className="text-4xl font-extrabold leading-tight text-[#4a5568] md:text-5xl">
                  Sync Your Team,
                  <span className="block bg-gradient-to-r from-[#7c9cf5] to-[#a78bfa] bg-clip-text text-transparent">
                    Supercharge Results
                  </span>
                </h1>
                <p className="text-lg font-medium leading-relaxed text-[#718096]">
                  TeamSync brings your team together with powerful collaboration tools,
                  real-time updates, and seamless project management — all in one place.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <button className={`inline-flex items-center gap-2 rounded-2xl px-8 py-3 ${clayButton}`}>
                    <FaRocket />
                    Start Free Trial
                    <FaArrowRight />
                  </button>
                  <button className={`inline-flex items-center gap-2 rounded-2xl px-8 py-3 text-[#4a5568] ${clayRaised} hover:shadow-[10px_10px_24px_#b8bec7,-10px_-10px_24px_#ffffff] active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]`}>
                    <FaPlay className="text-indigo-500" />
                    Watch Demo
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  {[
                    { icon: FaUsersGroup, value: '2,000+', label: 'Teams', color: 'text-indigo-500' },
                    { icon: FaChartLine, value: '98%', label: 'Satisfaction', color: 'text-emerald-500' },
                    { icon: FaHeadset, value: '24/7', label: 'Support', color: 'text-violet-500' },
                  ].map((s, i) => (
                    <div key={i} className={`rounded-2xl p-4 ${clayRaisedSm}`}>
                      <div className="flex items-center gap-2">
                        <s.icon className={`text-lg ${s.color}`} />
                        <p className="text-xl font-extrabold text-[#4a5568]">{s.value}</p>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-[#718096]">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Trust */}
                <div className="flex items-center gap-5">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-10 w-10 rounded-full border-2 border-[#e0e5ec] bg-gradient-to-br ${getRankGradient(i - 1)} text-sm font-bold text-white ${clayRaisedSm}`}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          {String.fromCharCode(64 + i)}
                        </div>
                      </div>
                    ))}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#e0e5ec] bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa] text-white shadow-[4px_4px_10px_#b8bec7,-4px_-4px_10px_#ffffff]">
                      <FaUserPlus />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#718096]">
                    <span className="font-bold text-[#4a5568]">2,000+</span> teams trust TeamSync
                  </span>
                </div>
              </div>

              {/* Right — Leaderboard */}
              <div className="relative">
                <div className={`rounded-[2rem] p-6 ${clayRaised}`}>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-9 w-9 ${clayPuck}`}>
                          <FaTrophy className="text-lg text-amber-500" />
                        </div>
                        <h3 className="text-lg font-extrabold text-[#4a5568]">Live Leaderboard</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaSync className="animate-spin text-xs text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-500">Live</span>
                        <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
                      </div>
                    </div>

                    {/* List */}
                    <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                      {leaderboardData.map((member, index) => {
                        const rate = getCompletionRate(member.completed, member.tasks)
                        const perf = getPerformanceLevel(rate)
                        return (
                          <div key={member.id} className={`rounded-2xl p-3 ${clayRaisedSm}`}>
                            <div className="flex items-center gap-3">
                              {/* Avatar + status */}
                              <div className="relative flex-shrink-0">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${getRankGradient(index)} text-sm font-bold text-white`}>
                                  {member.avatar}
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#e0e5ec] shadow-[2px_2px_5px_#b8bec7,-2px_-2px_5px_#ffffff]">
                                  {getStatusIcon(member.status)}
                                </div>
                              </div>

                              {/* Info */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <p className="truncate text-sm font-bold text-[#4a5568]">{member.name}</p>
                                    {index === 0 && <FaCrown className="text-xs text-amber-400" />}
                                  </div>
                                  <div className="flex items-center gap-1 text-[10px] font-semibold text-[#a0aec0]">
                                    <FaUserFriends />
                                    <span>{member.team}</span>
                                  </div>
                                </div>
                                <div className="mt-1 flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#718096]">
                                    <FaTasks className="text-indigo-400" />
                                    <span>{member.completed}/{member.tasks}</span>
                                    <span className="text-[#c3cad5]">|</span>
                                    <FaPercentage className="text-indigo-400" />
                                    <span className={rate >= 80 ? 'text-emerald-500' : rate >= 50 ? 'text-amber-500' : 'text-rose-500'}>
                                      {rate}%
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 text-[10px] font-semibold text-[#a0aec0]">
                                    {perf.icon}
                                    <span>{perf.label}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Inset progress track */}
                            <div className={`mt-2 h-2 w-full overflow-hidden rounded-full ${clayInset}`}>
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${getRankGradient(index)} transition-all duration-1000`}
                                style={{ width: `${rate}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-[#c3cad5]/50 pt-3">
                      <div className="flex items-center gap-3 text-[11px] font-semibold">
                        <div className="flex items-center gap-1 text-[#718096]">
                          <FaUserFriends />
                          <span>{leaderboardData.length} members</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-500">
                          <FaCircle className="text-[6px]" />
                          <span>{leaderboardData.filter(m => m.status === 'online').length} online</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#a0aec0]">
                        <FaCalendarCheck className="text-indigo-400" />
                        <span>Updated now</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== FEATURES ========== */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <span className="text-sm font-extrabold uppercase tracking-wider text-indigo-500">Features</span>
              <h2 className="mt-2 text-4xl font-extrabold text-[#4a5568]">
                Why Choose <span className="bg-gradient-to-r from-[#7c9cf5] to-[#a78bfa] bg-clip-text text-transparent">TeamSync</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-medium text-[#718096]">
                Everything you need to keep your team aligned and productive
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: FaUsersGroup, title: 'Team Collaboration', desc: 'Share files, chat, and collaborate in real-time' },
                { icon: FaChartLine, title: 'Project Tracking', desc: 'Monitor progress with intuitive dashboards' },
                { icon: FaBell, title: 'Smart Notifications', desc: 'Stay updated with intelligent alerts' },
                { icon: FaShieldAlt, title: 'Secure & Reliable', desc: 'Enterprise-grade security for your data' },
              ].map((feature, idx) => (
                <div key={idx} className={`rounded-[2rem] p-8 ${clayRaised} transition-transform duration-200 hover:-translate-y-1`}>
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${clayRaisedSm}`}>
                    <feature.icon className="text-2xl text-indigo-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-extrabold text-[#4a5568]">{feature.title}</h3>
                  <p className="text-sm font-medium text-[#718096]">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== ADVANCED TOOLS ========== */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <span className="text-sm font-extrabold uppercase tracking-wider text-indigo-500">Advanced Tools</span>
              <h2 className="mt-2 text-4xl font-extrabold text-[#4a5568]">
                Everything You Need to <span className="bg-gradient-to-r from-[#7c9cf5] to-[#a78bfa] bg-clip-text text-transparent">Succeed</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { icon: FaRegCalendarAlt, title: 'Smart Scheduling', desc: 'AI-powered meeting planning and calendar management' },
                { icon: FaRegFileAlt, title: 'Document Hub', desc: 'Centralized storage with version control and sharing' },
                { icon: FaRegClock, title: 'Time Tracking', desc: 'Monitor productivity with detailed time analytics' },
                { icon: FaRegSmile, title: 'Employee Engagement', desc: 'Keep morale high with recognition tools' },
                { icon: FaRegLightbulb, title: 'Idea Management', desc: 'Capture and develop team innovations' },
                { icon: FaRegPaperPlane, title: 'Instant Messaging', desc: 'Secure chat with threaded conversations' },
              ].map((feature, idx) => (
                <div key={idx} className={`flex items-start gap-4 rounded-2xl p-6 ${clayRaisedSm}`}>
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${clayPuck}`}>
                    <feature.icon className="text-xl text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-extrabold text-[#4a5568]">{feature.title}</h3>
                    <p className="text-sm font-medium text-[#718096]">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== TESTIMONIALS ========== */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <span className="text-sm font-extrabold uppercase tracking-wider text-indigo-500">Testimonials</span>
              <h2 className="mt-2 text-4xl font-extrabold text-[#4a5568]">
                Loved by Teams <span className="bg-gradient-to-r from-[#7c9cf5] to-[#a78bfa] bg-clip-text text-transparent">Worldwide</span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                { name: 'Sarah Johnson', role: 'CEO, TechFlow', quote: 'TeamSync completely transformed how we work. Our productivity increased by 40% in just two months.', rating: 5 },
                { name: 'Michael Chen', role: 'Product Lead, InnovateCo', quote: "The real-time collaboration features are incredible. It feels like we're all in the same room.", rating: 5 },
                { name: 'Emily Rodriguez', role: 'Marketing Director, GrowthLab', quote: "Best project management tool we've ever used. The analytics dashboard is a game-changer.", rating: 5 },
              ].map((t, idx) => (
                <div key={idx} className={`rounded-[2rem] p-8 ${clayRaised}`}>
                  <FaQuoteLeft className="mb-4 text-3xl text-indigo-300" />
                  <p className="mb-6 font-medium leading-relaxed text-[#4a5568]">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa] font-bold text-white">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-extrabold text-[#4a5568]">{t.name}</p>
                      <p className="text-xs font-semibold text-[#718096]">{t.role}</p>
                      <div className="mt-1 flex gap-0.5">
                        {[...Array(t.rating)].map((_, i) => (
                          <FaStar key={i} className="text-sm text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== PRICING ========== */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <span className="text-sm font-extrabold uppercase tracking-wider text-indigo-500">Pricing</span>
              <h2 className="mt-2 text-4xl font-extrabold text-[#4a5568]">
                Choose Your <span className="bg-gradient-to-r from-[#7c9cf5] to-[#a78bfa] bg-clip-text text-transparent">Plan</span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                { name: 'Starter', price: '$9', features: ['10 team members', '5 projects', 'Basic analytics', 'Email support', '1GB storage'], popular: false },
                { name: 'Professional', price: '$29', features: ['50 team members', 'Unlimited projects', 'Advanced analytics', 'Priority support', '50GB storage', 'Custom integrations'], popular: true },
                { name: 'Enterprise', price: 'Custom', features: ['Unlimited members', 'Unlimited projects', 'Enterprise analytics', '24/7 support', 'Unlimited storage', 'Custom development'], popular: false },
              ].map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-[2rem] p-8 transition-transform duration-200 hover:-translate-y-1 ${
                    plan.popular
                      ? 'bg-[#e0e5ec] shadow-[inset_6px_6px_14px_#b8bec7,inset_-6px_-6px_14px_#ffffff]'
                      : clayRaised
                  }`}
                >
                  {plan.popular && (
                    <div className={`mb-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white ${clayButton}`}>
                      <FaStar /> Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-extrabold text-[#4a5568]">{plan.name}</h3>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-extrabold text-[#4a5568]">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="font-semibold text-[#718096]">/month</span>}
                  </div>
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-semibold text-[#718096]">
                        <FaCheck className="flex-shrink-0 text-indigo-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full rounded-2xl py-3 ${
                      plan.popular
                        ? clayButton
                        : `${clayRaisedSm} text-[#4a5568] hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff] active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]`
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== STATS BANNER ========== */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className={`rounded-[2rem] p-10 ${clayRaised}`}>
              <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                {[
                  { number: '2,000+', label: 'Active Teams', icon: FaUsersGroup },
                  { number: '98%', label: 'Satisfaction Rate', icon: FaChartLine },
                  { number: '24/7', label: 'Customer Support', icon: FaHeadset },
                  { number: '50+', label: 'Integrations', icon: FaCog },
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className={`mx-auto mb-1 flex h-14 w-14 items-center justify-center rounded-full ${clayPuck}`}>
                      <stat.icon className="text-xl text-indigo-500" />
                    </div>
                    <p className="text-3xl font-extrabold text-[#4a5568]">{stat.number}</p>
                    <p className="text-sm font-semibold text-[#718096]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== CTA ========== */}
        <section className="px-4 pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className={`rounded-[2.5rem] p-10 ${clayRaised}`}>
              <h2 className="mb-4 text-4xl font-extrabold text-[#4a5568]">
                Ready to <span className="bg-gradient-to-r from-[#7c9cf5] to-[#a78bfa] bg-clip-text text-transparent">Get Started</span>?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl font-medium text-[#718096]">
                Join thousands of teams already using TeamSync to streamline their workflow and achieve more together.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className={`inline-flex items-center gap-2 rounded-2xl px-8 py-3 ${clayButton}`}>
                  <FaRocket /> Start Free Trial <FaArrowRight />
                </button>
                <button className={`inline-flex items-center gap-2 rounded-2xl px-8 py-3 text-[#4a5568] ${clayRaisedSm} hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff] active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]`}>
                  <FaHeadset className="text-indigo-500" /> Contact Sales <FaChevronRight className="text-indigo-500" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage