import React, { useState, useEffect } from 'react'
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import useAuthStore from '../../../app/authStore'
import type { userType } from '../../../types/user.type'

// --- clay tokens ---------------------------------------------------------
const clayRaised =
  'bg-[#e0e5ec] shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]'
const clayRaisedSm =
  'bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]'
const clayInset =
  'bg-[#e0e5ec] shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]'
const clayPuck =
  'flex items-center justify-center rounded-2xl bg-[#e0e5ec] shadow-[5px_5px_12px_#b8bec7,-5px_-5px_12px_#ffffff]'

const AdminDashboard = () => {
  const user = useAuthStore((state) => state.user) as userType
  console.log("user : ", user)

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
    growth: 0
  })

  useEffect(() => {
    setStats({
      totalUsers: 1247,
      totalOrders: 856,
      revenue: 45230,
      growth: 12.5
    })
  }, [])

  const StatCard = ({ icon: Icon, title, value, change, color, trend }) => (
    <div className={`rounded-[1.75rem] p-6 ${clayRaised} transition-transform duration-200 hover:-translate-y-1`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#718096]">{title}</p>
          <p className="mt-1 text-2xl font-extrabold text-[#4a5568]">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color} shadow-[3px_3px_8px_#b8bec7,-3px_-3px_8px_#ffffff]`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center">
          {trend === 'up' ? (
            <ArrowUp className="mr-1 h-4 w-4 text-emerald-500" />
          ) : (
            <ArrowDown className="mr-1 h-4 w-4 text-rose-500" />
          )}
          <span className={`text-sm font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
            {change}%
          </span>
          <span className="ml-2 text-xs font-semibold text-[#a0aec0]">from last month</span>
        </div>
      )}
    </div>
  )

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Premium Plan', amount: 99.99, status: 'Completed', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Basic Plan', amount: 49.99, status: 'Pending', date: '2024-01-14' },
    { id: '#ORD-003', customer: 'Bob Johnson', product: 'Enterprise', amount: 299.99, status: 'Processing', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Alice Brown', product: 'Premium Plan', amount: 99.99, status: 'Completed', date: '2024-01-13' },
    { id: '#ORD-005', customer: 'Charlie Wilson', product: 'Basic Plan', amount: 49.99, status: 'Cancelled', date: '2024-01-13' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-emerald-100 text-emerald-700',
      'Pending': 'bg-amber-100 text-amber-700',
      'Processing': 'bg-indigo-100 text-indigo-700',
      'Cancelled': 'bg-rose-100 text-rose-700'
    }
    return colors[status] || 'bg-[#e0e5ec] text-[#718096]'
  }

  return (
    <div className="min-h-full bg-[#e0e5ec] p-4 md:p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#4a5568]">Dashboard</h1>
        <p className="mt-1 text-sm font-medium text-[#718096]">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats.totalUsers}
          change={8.2}
          trend="up"
          color="bg-gradient-to-br from-[#7c9cf5] to-[#6b8cf4]"
        />
        <StatCard
          icon={ShoppingCart}
          title="Total Orders"
          value={stats.totalOrders}
          change={5.1}
          trend="up"
          color="bg-gradient-to-br from-emerald-400 to-emerald-500"
        />
        <StatCard
          icon={DollarSign}
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          change={12.5}
          trend="up"
          color="bg-gradient-to-br from-[#a78bfa] to-[#9d7cf8]"
        />
        <StatCard
          icon={TrendingUp}
          title="Growth Rate"
          value={`${stats.growth}%`}
          change={3.2}
          trend="up"
          color="bg-gradient-to-br from-amber-400 to-amber-500"
        />
      </div>

      {/* Charts Section */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={`rounded-[1.75rem] p-6 ${clayRaised}`}>
          <div className="mb-4 flex items-center gap-3">
            <div className={`h-10 w-10 ${clayPuck}`}>
              <TrendingUp className="h-5 w-5 text-indigo-500" />
            </div>
            <h3 className="text-lg font-extrabold text-[#4a5568]">Revenue Overview</h3>
          </div>
          <div className={`flex h-64 items-center justify-center rounded-2xl ${clayInset}`}>
            <p className="text-sm font-semibold text-[#a0aec0]">Chart will be displayed here</p>
          </div>
        </div>

        <div className={`rounded-[1.75rem] p-6 ${clayRaised}`}>
          <div className="mb-4 flex items-center gap-3">
            <div className={`h-10 w-10 ${clayPuck}`}>
              <ShoppingCart className="h-5 w-5 text-indigo-500" />
            </div>
            <h3 className="text-lg font-extrabold text-[#4a5568]">Order Statistics</h3>
          </div>
          <div className={`flex h-64 items-center justify-center rounded-2xl ${clayInset}`}>
            <p className="text-sm font-semibold text-[#a0aec0]">Chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className={`rounded-[1.75rem] p-6 ${clayRaised}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#4a5568]">Recent Orders</h2>
          <button
            className={`rounded-xl px-3 py-1.5 text-sm font-bold text-indigo-500 ${clayRaisedSm}
              hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff]
              active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]`}
          >
            View All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Order ID', 'Customer', 'Product', 'Amount', 'Date', 'Status'].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-left text-[11px] font-extrabold uppercase tracking-wider text-[#a0aec0]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-2">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="group transition-all duration-150"
                >
                  <td className="px-3 py-2">
                    <div className={`rounded-xl px-3 py-2 text-sm font-bold text-[#4a5568] ${clayRaisedSm} group-hover:shadow-[7px_7px_16px_#b8bec7,-7px_-7px_16px_#ffffff]`}>
                      {order.id}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className={`rounded-xl px-3 py-2 text-sm font-semibold text-[#718096] ${clayRaisedSm} group-hover:shadow-[7px_7px_16px_#b8bec7,-7px_-7px_16px_#ffffff]`}>
                      {order.customer}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className={`rounded-xl px-3 py-2 text-sm font-semibold text-[#718096] ${clayRaisedSm} group-hover:shadow-[7px_7px_16px_#b8bec7,-7px_-7px_16px_#ffffff]`}>
                      {order.product}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className={`rounded-xl px-3 py-2 text-sm font-bold text-[#4a5568] ${clayRaisedSm} group-hover:shadow-[7px_7px_16px_#b8bec7,-7px_-7px_16px_#ffffff]`}>
                      ${order.amount}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className={`rounded-xl px-3 py-2 text-sm font-medium text-[#a0aec0] ${clayRaisedSm} group-hover:shadow-[7px_7px_16px_#b8bec7,-7px_-7px_16px_#ffffff]`}>
                      {order.date}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard