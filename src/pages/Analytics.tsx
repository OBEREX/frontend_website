import { 
  Calendar, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  BarChart3,
  PieChart,
  Target,
  Users,
  Smartphone,
  Download
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts'
import { useTheme } from '../contexts/ThemeContext'

const monthlyData = [
  { month: 'Jan', scans: 45000, cost: 2250, savings: 6750, accuracy: 97.2 },
  { month: 'Feb', scans: 52000, cost: 2600, savings: 7800, accuracy: 97.8 },
  { month: 'Mar', scans: 48000, cost: 2400, savings: 7200, accuracy: 98.1 },
  { month: 'Apr', scans: 61000, cost: 3050, savings: 9150, accuracy: 98.3 },
  { month: 'May', scans: 58000, cost: 2900, savings: 8700, accuracy: 98.5 },
  { month: 'Jun', scans: 67000, cost: 3350, savings: 10050, accuracy: 98.7 },
]

const hourlyData = [
  { hour: '6AM', scans: 120, accuracy: 97.5 },
  { hour: '8AM', scans: 450, accuracy: 98.1 },
  { hour: '10AM', scans: 890, accuracy: 98.3 },
  { hour: '12PM', scans: 1200, accuracy: 98.7 },
  { hour: '2PM', scans: 1100, accuracy: 98.5 },
  { hour: '4PM', scans: 950, accuracy: 98.2 },
  { hour: '6PM', scans: 680, accuracy: 97.9 },
  { hour: '8PM', scans: 320, accuracy: 97.6 },
]

const categoryAccuracy = [
  { category: 'Electronics', accuracy: 99.2, scans: 25000 },
  { category: 'Clothing', accuracy: 98.8, scans: 18000 },
  { category: 'Food & Beverage', accuracy: 97.5, scans: 15000 },
  { category: 'Home & Garden', accuracy: 98.1, scans: 12000 },
  { category: 'Automotive', accuracy: 96.8, scans: 8000 },
]

const paymentData = [
  { method: 'M-Pesa', usage: 65, cost: 0.15 },
  { method: 'Card', usage: 25, cost: 0.25 },
  { method: 'Bank Transfer', usage: 8, cost: 0.10 },
  { method: 'Other', usage: 2, cost: 0.30 },
]

const roiData = [
  { month: 'Jan', laborCost: 12000, appCost: 2250, savings: 9750 },
  { month: 'Feb', laborCost: 13500, appCost: 2600, savings: 10900 },
  { month: 'Mar', laborCost: 12800, appCost: 2400, savings: 10400 },
  { month: 'Apr', laborCost: 15200, appCost: 3050, savings: 12150 },
  { month: 'May', laborCost: 14500, appCost: 2900, savings: 11600 },
  { month: 'Jun', laborCost: 16800, appCost: 3350, savings: 13450 },
]

export default function Analytics() {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics & Reporting</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Comprehensive insights into your inventory management performance
          </p>
        </div>
        <button className="btn-primary flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Scans</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">67,000</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">+15.2% vs last month</p>
            </div>
            <Smartphone className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cost per Scan</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$0.05</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">-8.3% vs last month</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Saved</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">156 hrs</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">+23.4% vs last month</p>
            </div>
            <Clock className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">ROI</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">401%</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">+23.1% vs last month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Monthly Usage Patterns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="month" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip 
                contentStyle={tooltipStyle}
                formatter={(value, name) => {
                  if (name === 'accuracy') {
                    return [`${value}%`, 'Accuracy'];
                  }
                  return [value, name];
                }}
              />
              <Area type="monotone" dataKey="scans" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Busiest Hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="hour" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip 
                contentStyle={tooltipStyle}
                formatter={(value, name) => {
                  if (name === 'accuracy') {
                    return [`${value}%`, 'Accuracy'];
                  }
                  return [value, name];
                }}
              />
              <Bar dataKey="scans" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">ROI Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="month" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="laborCost" stroke="#ef4444" strokeWidth={2} name="Labor Cost" />
              <Line type="monotone" dataKey="appCost" stroke="#3b82f6" strokeWidth={2} name="App Cost" />
              <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} name="Savings" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Payment Method Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="usage"
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={tooltipStyle}
                formatter={(value, name) => {
                  if (name === 'usage') {
                    return [`${value}%`, 'Usage'];
                  }
                  return [value, name];
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {paymentData.map((method) => (
              <div key={method.method} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{method.method}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-900 dark:text-gray-100">{method.usage}%</span>
                  <span className="text-gray-500 dark:text-gray-400">${method.cost}/scan</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Category Accuracy Improvements</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Accuracy Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Scans
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {categoryAccuracy.map((category) => (
                <tr key={category.category} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {category.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      <span className="font-medium">{category.accuracy}%</span>
                      <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {category.scans.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${category.accuracy - 95}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seasonal Trends */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Seasonal Trend Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Q1 (Jan-Mar)</h4>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">145K</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Total Scans</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">+8.5% vs previous Q1</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-900 dark:text-green-100">Q2 (Apr-Jun)</h4>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">186K</p>
            <p className="text-sm text-green-700 dark:text-green-300">Total Scans</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">+28.3% vs Q1</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-medium text-purple-900 dark:text-purple-100">Forecast Q3</h4>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">210K</p>
            <p className="text-sm text-purple-700 dark:text-purple-300">Expected Scans</p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">+12.9% vs Q2</p>
          </div>
        </div>
      </div>
    </div>
  )
}

