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

const scanData = [
  { day: 'Mon', scans: 1200, accuracy: 98.5 },
  { day: 'Tue', scans: 1350, accuracy: 98.8 },
  { day: 'Wed', scans: 1100, accuracy: 97.9 },
  { day: 'Thu', scans: 1600, accuracy: 99.1 },
  { day: 'Fri', scans: 1800, accuracy: 99.3 },
  { day: 'Sat', scans: 1400, accuracy: 98.7 },
  { day: 'Sun', scans: 900, accuracy: 98.2 },
]

const categoryData = [
  { name: 'Electronics', value: 35, color: '#3b82f6' },
  { name: 'Clothing', value: 25, color: '#10b981' },
  { name: 'Food & Beverage', value: 20, color: '#f59e0b' },
  { name: 'Home & Garden', value: 15, color: '#ef4444' },
  { name: 'Other', value: 5, color: '#8b5cf6' },
]

const stats = [
  {
    name: 'Total Scans Today',
    value: '1,247',
    change: '+12.5%',
    changeType: 'positive',
    icon: Smartphone,
  },
  {
    name: 'Time Saved',
    value: '8.5 hrs',
    change: '+2.3 hrs',
    changeType: 'positive',
    icon: Clock,
  },
  {
    name: 'Cost Savings',
    value: '$1,247',
    change: '+$156',
    changeType: 'positive',
    icon: DollarSign,
  },
  {
    name: 'Accuracy Rate',
    value: '98.7%',
    change: '+0.3%',
    changeType: 'positive',
    icon: Target,
  },
]

export default function Dashboard() {
  const { isDark } = useTheme()

  const tooltipStyle = {
    backgroundColor: isDark ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
    border: isDark ? '1px solid rgb(75, 85, 99)' : '1px solid rgb(229, 231, 235)',
    borderRadius: '8px',
    color: isDark ? '#E5E7EB' : '#374151',
    boxShadow: isDark ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  }

  const axisStroke = isDark ? '#9CA3AF' : '#6B7280'
  const gridStroke = isDark ? '#374151' : '#E5E7EB'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome to Pefoma - AI-powered inventory management at your fingertips
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`h-4 w-4 ${
                    stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm font-medium ml-1 ${
                    stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs yesterday</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scan Activity Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Scan Activity</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Scans</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Accuracy %</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={scanData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="day" stroke={axisStroke} />
              <YAxis yAxisId="left" stroke={axisStroke} />
              <YAxis yAxisId="right" orientation="right" stroke={axisStroke} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line yAxisId="left" type="monotone" dataKey="scans" stroke="#3b82f6" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Product Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{category.name}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 ml-auto">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <BarChart3 className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">View Analytics</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Detailed reports & insights</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Users className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">Team Management</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage users & permissions</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Zap className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">Start Scan</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Begin inventory count</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

