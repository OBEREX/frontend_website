import { useEffect, useState } from 'react'
import dashboardService, {
  DashboardOverview,
  ScanActivityData,
  CategoryDistribution,
  SystemStatus
} from '../services/dasboardService'

import { 
  Smartphone, 
  Clock, 
  DollarSign, 
  Target, 
  TrendingUp,
  BarChart3,
  Users,
  Zap
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts'
import { useTheme } from '../contexts/ThemeContext'
import { useUser } from '../contexts/UserContext'

export default function Dashboard() {
  const { isDark } = useTheme()
  const { user } = useUser()
  
  // State for API data
  const [overview, setOverview] = useState<DashboardOverview | null>(null)
  const [scanActivity, setScanActivity] = useState<ScanActivityData[]>([])
  const [categories, setCategories] = useState<CategoryDistribution[]>([])
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Get user name from context or use default
  const userName = user?.firstName || 'User'

  // Fetch all dashboard data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch all data in parallel
        const [overviewRes, activityRes, categoryRes, statusRes] = await Promise.all([
          dashboardService.getOverview(),
          dashboardService.getScanActivity('7d'),
          dashboardService.getCategoryDistribution(),
          dashboardService.getSystemStatus()
        ])

        if (overviewRes.success && overviewRes.data) {
          setOverview(overviewRes.data)
        }
        
        if (activityRes.success && activityRes.data) {
          setScanActivity(activityRes.data)
        }
        
        if (categoryRes.success && categoryRes.data) {
          setCategories(categoryRes.data)
        }
        
        if (statusRes.success) {
          setSystemStatus(statusRes)
        }
        
      } catch (err) {
        console.error('Dashboard data fetch error:', err)
        setError('Failed to load dashboard data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const tooltipStyle = {
    backgroundColor: isDark ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
    border: isDark ? '1px solid rgb(75, 85, 99)' : '1px solid rgb(229, 231, 235)',
    borderRadius: '8px',
    color: isDark ? '#E5E7EB' : '#374151',
    boxShadow: isDark ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  }

  const axisStroke = isDark ? '#9CA3AF' : '#6B7280'
  const gridStroke = isDark ? '#374151' : '#E5E7EB'

  // Statistics Cards Data - NOW USING API DATA
  const stats = [
    {
      name: 'Total Scans Today',
      value: overview?.total_scans_today.toLocaleString() || '0',
      change: overview?.scans_change || '0%',
      changeType: 'positive',
      icon: Smartphone,
    },
    {
      name: 'Time Saved',
      value: overview?.time_saved_today || '0 hrs',
      change: overview?.time_saved_change || '0%',
      changeType: 'positive',
      icon: Clock,
    },
    {
      name: 'Cost Savings',
      value: overview?.cost_savings_today || '$0',
      change: overview?.cost_savings_change || '0%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      name: 'Accuracy Rate',
      value: overview?.accuracy_rate_today || '0%',
      change: overview?.accuracy_change || '0%',
      changeType: 'positive',
      icon: Target,
    },
  ]

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Show error state with retry button
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary px-6 py-2"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 xl:space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 sm:mt-3">
            Welcome to Pefoma - AI-powered inventory management at your fingertips
          </p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
        <div className="lg:col-span-2">
          {/* Welcome Card */}
          <div className="card p-4 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">P</span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Good morning, {userName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Welcome to your inventory management dashboard
                </p>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  systemStatus?.color === 'green' ? 'bg-green-500' :
                  systemStatus?.color === 'yellow' ? 'bg-yellow-500' :
                  systemStatus?.color === 'red' ? 'bg-red-500' : 'bg-gray-500'
                }`}></div>
                <span>System status: {systemStatus?.status || 'Unknown'}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                <span>Last sync: {systemStatus?.last_sync || 'Never'}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  systemStatus?.ai_assistant_status === 'Online' ? 'bg-purple-500' : 'bg-gray-500'
                }`}></div>
                <span>AI Assistant: {systemStatus?.ai_assistant_status || 'Unknown'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Stats */}
          <div className="card p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              Today's Overview
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Scans</span>
                <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">
                  {overview?.total_scans_today.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Time Saved</span>
                <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">
                  {overview?.time_saved_today || '0 hrs'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</span>
                <span className="text-xs sm:text-sm font-medium text-green-600">
                  {overview?.accuracy_rate_today || '0%'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">{stat.name}</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">{stat.value}</p>
                <div className="flex items-center">
                  <span className={`text-xs sm:text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1 sm:ml-2">vs yesterday</span>
                </div>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
        {/* Weekly Scan Trends */}
        <div className="card p-4 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 lg:mb-8">Weekly Scan Trends</h3>
          <div className="h-60 sm:h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scanActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis 
                  dataKey="day" 
                  stroke={axisStroke}
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis 
                  stroke={axisStroke}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={tooltipStyle}
                  formatter={(value: any, name: any) => [
                    name === 'scans' ? `${value.toLocaleString()} scans` : `${value}%`,
                    name === 'scans' ? 'Scans' : 'Accuracy'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="scans" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card p-4 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 lg:mb-8">Category Distribution</h3>
          <div className="h-60 sm:h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={tooltipStyle}
                  formatter={(value: any) => [`${value.toLocaleString()} items`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center space-x-2 sm:space-x-3">
                <div 
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-4 sm:p-6 lg:p-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 lg:mb-8">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
          <Link to="/analytics">
            <button className="w-full flex items-center justify-center p-4 sm:p-5 lg:p-6 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              <span className="text-sm sm:text-base font-medium">View Analytics</span>
            </button>
          </Link>
          <Link to="/business-intelligence">
            <button className="w-full flex items-center justify-center p-4 sm:p-5 lg:p-6 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              <span className="text-sm sm:text-base font-medium">Business Intelligence</span>
            </button>
          </Link>
          <Link to="/user-management">
            <button className="w-full flex items-center justify-center p-4 sm:p-5 lg:p-6 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              <span className="text-sm sm:text-base font-medium">User Management</span>
            </button>
          </Link>
          <Link to="/settings">
            <button className="w-full flex items-center justify-center p-4 sm:p-5 lg:p-6 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              <span className="text-sm sm:text-base font-medium">Settings</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}