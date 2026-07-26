import React, { useState, useEffect } from 'react'
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
    growth: 0
  })

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate fetching data
    setStats({
      totalUsers: 1247,
      totalOrders: 856,
      revenue: 45230,
      growth: 12.5
    })
  }, [])

  const StatCard = ({ icon: Icon, title, value, change, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center">
          {trend === 'up' ? (
            <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {change}%
          </span>
          <span className="text-sm text-gray-500 ml-2">from last month</span>
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
      'Completed': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Processing': 'bg-blue-100 text-blue-700',
      'Cancelled': 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats.totalUsers}
          change={8.2}
          trend="up"
          color="bg-blue-500"
        />
        <StatCard
          icon={ShoppingCart}
          title="Total Orders"
          value={stats.totalOrders}
          change={5.1}
          trend="up"
          color="bg-green-500"
        />
        <StatCard
          icon={DollarSign}
          title="Revenue"
          value={`$${stats.revenue}`}
          change={12.5}
          trend="up"
          color="bg-purple-500"
        />
        <StatCard
          icon={TrendingUp}
          title="Growth Rate"
          value={`${stats.growth}%`}
          change={3.2}
          trend="up"
          color="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-400">Chart will be displayed here</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Statistics</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-400">Chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.product}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">${order.amount}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{order.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
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