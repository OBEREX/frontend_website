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
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Welcome to Pefoma - AI-powered inventory management at your fingertips
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{stat.value}</p>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
                </div>
              </div>
              <div className="h-14 w-14 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <stat.icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {/* Weekly Scan Trends */}
        <div className="card p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Weekly Scan Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scanData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis 
                  dataKey="day" 
                  stroke={axisStroke}
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke={axisStroke}
                  fontSize={12}
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
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Category Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
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
                <Tooltip 
                  contentStyle={tooltipStyle}
                  formatter={(value: any) => [`${value}%`, 'Percentage']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <Link to="/analytics">
            <button className="flex items-center justify-center p-6 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
              <BarChart3 className="h-6 w-6 mr-3" />
              <span className="text-base font-medium">View Analytics</span>
            </button>
          </Link>
          <Link to="/business-intelligence">
            <button className="flex items-center justify-center p-6 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
              <TrendingUp className="h-6 w-6 mr-3" />
              <span className="text-base font-medium">Business Intelligence</span>
            </button>
          </Link>
          <Link to="/user-management">
            <button className="flex items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
              <Users className="h-6 w-6 mr-3" />
              <span className="text-base font-medium">User Management</span>
            </button>
          </Link>
          <Link to="/settings">
            <button className="flex items-center justify-center p-6 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
              <Zap className="h-6 w-6 mr-3" />
              <span className="text-base font-medium">Settings</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

