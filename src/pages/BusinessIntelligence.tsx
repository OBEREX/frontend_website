import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Target, 
  BarChart3,
  Smartphone,
  CheckCircle,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts'
import { useTheme } from '../contexts/ThemeContext'
import { useState } from 'react'

// Enhanced data with more detailed patterns
const dailyPatterns = [
  { day: 'Mon', scans: 1200, accuracy: 98.2, cost: 60.0 },
  { day: 'Tue', scans: 1350, accuracy: 98.5, cost: 67.5 },
  { day: 'Wed', scans: 1100, accuracy: 97.8, cost: 55.0 },
  { day: 'Thu', scans: 1600, accuracy: 98.7, cost: 80.0 },
  { day: 'Fri', scans: 1800, accuracy: 98.9, cost: 90.0 },
  { day: 'Sat', scans: 1400, accuracy: 98.1, cost: 70.0 },
  { day: 'Sun', scans: 1700, accuracy: 98.3, cost: 85.0 },
]

const weeklyPatterns = [
  { week: 'Week 1', scans: 8400, accuracy: 98.2, cost: 420.0 },
  { week: 'Week 2', scans: 9450, accuracy: 98.5, cost: 472.5 },
  { week: 'Week 3', scans: 7700, accuracy: 97.8, cost: 385.0 },
  { week: 'Week 4', scans: 11200, accuracy: 98.7, cost: 560.0 },
  { week: 'Week 5', scans: 12600, accuracy: 98.9, cost: 630.0 },
  { week: 'Week 6', scans: 9800, accuracy: 98.1, cost: 490.0 },
  { week: 'Week 7', scans: 11900, accuracy: 98.3, cost: 595.0 },
  { week: 'Week 8', scans: 13300, accuracy: 98.5, cost: 665.0 },
]

const monthlyPatterns = [
  { month: 'Jan', scans: 36000, accuracy: 97.5, cost: 1800 },
  { month: 'Feb', scans: 37800, accuracy: 97.8, cost: 1890 },
  { month: 'Mar', scans: 39200, accuracy: 98.1, cost: 1960 },
  { month: 'Apr', scans: 44800, accuracy: 98.3, cost: 2240 },
  { month: 'May', scans: 50400, accuracy: 98.5, cost: 2520 },
  { month: 'Jun', scans: 47600, accuracy: 98.7, cost: 2380 },
]

const costOptimization = [
  { month: 'Jan', subscription: 500, payPerScan: 2250, recommended: 'subscription' },
  { month: 'Feb', subscription: 500, payPerScan: 2600, recommended: 'subscription' },
  { month: 'Mar', subscription: 500, payPerScan: 2400, recommended: 'subscription' },
  { month: 'Apr', subscription: 500, payPerScan: 3050, recommended: 'subscription' },
  { month: 'May', subscription: 500, payPerScan: 2900, recommended: 'subscription' },
  { month: 'Jun', subscription: 500, payPerScan: 3350, recommended: 'subscription' },
]



const accuracyTracking = [
  { month: 'Jan', electronics: 97.2, clothing: 96.8, food: 95.5, home: 96.1 },
  { month: 'Feb', electronics: 97.8, clothing: 97.2, food: 96.1, home: 96.8 },
  { month: 'Mar', electronics: 98.1, clothing: 97.5, food: 96.8, home: 97.2 },
  { month: 'Apr', electronics: 98.3, clothing: 97.8, food: 97.2, home: 97.5 },
  { month: 'May', electronics: 98.5, clothing: 98.1, food: 97.5, home: 97.8 },
  { month: 'Jun', electronics: 98.7, clothing: 98.3, food: 97.8, home: 98.1 },
]

const paymentPerformance = [
  { method: 'M-Pesa', success: 98.5, speed: 2.3, cost: 0.15, satisfaction: 4.8, recommendation: 'Recommended', usage: 45 },
  { method: 'Card', success: 96.2, speed: 5.1, cost: 0.25, satisfaction: 4.2, recommendation: 'Good', usage: 35 },
  { method: 'Bank Transfer', success: 94.8, speed: 24.0, cost: 0.10, satisfaction: 3.9, recommendation: 'Alternative', usage: 15 },
  { method: 'Other', success: 92.1, speed: 8.5, cost: 0.30, satisfaction: 3.5, recommendation: 'Alternative', usage: 5 },
]

const optimizationSuggestions = [
  {
    type: 'cost',
    title: 'Switch to Subscription Plan',
    description: 'Based on your usage patterns, switching to the monthly subscription could save you $2,850/month.',
    impact: 'High',
    savings: '$2,850/month',
    icon: DollarSign,
    status: 'recommended'
  },
  {
    type: 'time',
    title: 'Optimize Scan Times',
    description: 'Peak usage is between 10AM-2PM. Consider scheduling non-urgent scans outside these hours.',
    impact: 'Medium',
    savings: '2.5 hrs/week',
    icon: Clock,
    status: 'suggestion'
  },
  {
    type: 'accuracy',
    title: 'Focus on Electronics Category',
    description: 'Electronics show the highest accuracy improvement. Consider expanding this category.',
    impact: 'High',
    savings: '+1.5% accuracy',
    icon: Target,
    status: 'opportunity'
  },
  {
    type: 'payment',
    title: 'Promote M-Pesa Usage',
    description: 'M-Pesa shows the best performance metrics. Consider offering incentives for M-Pesa payments.',
    impact: 'Medium',
    savings: '+2.3% success rate',
    icon: Smartphone,
    status: 'recommended'
  }
]

const peakUsageData = [
  { hour: '6AM', scans: 320, accuracy: 99.1 },
  { hour: '8AM', scans: 450, accuracy: 98.9 },
  { hour: '10AM', scans: 1200, accuracy: 98.7 },
  { hour: '12PM', scans: 1350, accuracy: 98.5 },
  { hour: '2PM', scans: 1100, accuracy: 98.3 },
  { hour: '4PM', scans: 800, accuracy: 98.1 },
  { hour: '6PM', scans: 600, accuracy: 97.9 },
  { hour: '8PM', scans: 320, accuracy: 97.6 },
]

export default function BusinessIntelligence() {
  const { isDark } = useTheme()
  const [selectedTimeframe, setSelectedTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily')

  const tooltipStyle = {
    backgroundColor: isDark ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
    border: isDark ? '1px solid rgb(75, 85, 99)' : '1px solid rgb(229, 231, 235)',
    borderRadius: '8px',
    color: isDark ? '#E5E7EB' : '#374151',
    boxShadow: isDark ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  }

  const axisStroke = isDark ? '#9CA3AF' : '#6B7280'
  const gridStroke = isDark ? '#374151' : '#E5E7EB'

  const getPatternData = () => {
    switch (selectedTimeframe) {
      case 'daily':
        return dailyPatterns
      case 'weekly':
        return weeklyPatterns
      case 'monthly':
        return monthlyPatterns
      default:
        return dailyPatterns
    }
  }

  const paymentMethodData = [
    { name: 'M-Pesa', value: 45, color: '#10B981' },
    { name: 'Card', value: 35, color: '#3B82F6' },
    { name: 'Bank Transfer', value: 15, color: '#F59E0B' },
    { name: 'Other', value: 5, color: '#EF4444' },
  ]

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Business Intelligence</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Advanced analytics and insights for strategic decision making
          </p>
        </div>
        <button className="btn-primary flex items-center px-6 py-3">
          <Download className="h-4 w-4 mr-2" />
          Export Insights
        </button>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Scan Efficiency</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">94.2%</p>
              <p className="text-sm text-green-600 dark:text-green-400">+5.8% vs baseline</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Cost Optimization</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">$2,850</p>
              <p className="text-sm text-green-600 dark:text-green-400">Monthly savings</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Accuracy Trend</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">+0.4%</p>
              <p className="text-sm text-green-600 dark:text-green-400">Monthly improvement</p>
            </div>
            <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">ROI</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">401%</p>
              <p className="text-sm text-green-600 dark:text-green-400">Return on investment</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Interactive Usage Charts */}
      <div className="card p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Interactive Usage Charts</h3>
          <div className="flex space-x-3">
            <button
              onClick={() => setSelectedTimeframe('daily')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === 'daily'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setSelectedTimeframe('weekly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === 'weekly'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelectedTimeframe('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === 'monthly'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        
        {/* Scan Volume Chart */}
        <div className="mb-10">
          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-6">Scan Volume</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getPatternData()}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey={selectedTimeframe === 'daily' ? 'day' : selectedTimeframe === 'weekly' ? 'week' : 'month'} stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="scans" fill="#3b82f6" name="Scans" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Accuracy and Cost Chart */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-6">Accuracy & Cost Trends</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={getPatternData()}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey={selectedTimeframe === 'daily' ? 'day' : selectedTimeframe === 'weekly' ? 'week' : 'month'} stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip 
                contentStyle={tooltipStyle}
                formatter={(value, name) => {
                  if (name === 'accuracy') {
                    return [`${value}%`, 'Accuracy'];
                  }
                  if (name === 'cost') {
                    return [`$${value}`, 'Cost'];
                  }
                  return [value, name];
                }}
              />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy" />
              <Line type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2} name="Cost" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cost Optimization and Subscription Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="card p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Cost Optimization Analysis</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={costOptimization}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="month" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="subscription" stroke="#10b981" strokeWidth={2} name="Subscription Cost" />
              <Line type="monotone" dataKey="payPerScan" stroke="#ef4444" strokeWidth={2} name="Pay-per-Scan Cost" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Recommendation: Switch to subscription plan to save $2,850/month
              </span>
            </div>
          </div>
        </div>

        <div className="card p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Payment Method Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RechartsPieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {paymentMethodData.map((method) => (
              <div key={method.name} className="flex items-center justify-between text-sm py-2">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: method.color }}
                  />
                  <span className="text-gray-600 dark:text-gray-400">{method.name}</span>
                </div>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{method.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Savings Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="card p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Hours Saved per Inventory Cycle</h3>
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Average Time Saved</h4>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">8.5 hrs</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">per cycle</p>
              </div>
              <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">Total Time Saved</h4>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">156 hrs</p>
                <p className="text-sm text-green-700 dark:text-green-300">this month</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">Manual counting time</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">12 hours</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">Pefoma scan time</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">3.5 hours</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Time saved per cycle</span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">8.5 hours</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Efficiency Gain:</strong> 70.8% reduction in inventory counting time
              </p>
            </div>
          </div>
        </div>

        <div className="card p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Accuracy Improvement Tracking</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={accuracyTracking}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="month" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip 
                contentStyle={tooltipStyle}
                formatter={(value, name) => {
                  if (typeof name === 'string' && ['electronics', 'clothing', 'food', 'home'].includes(name)) {
                    return [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)];
                  }
                  return [value, name];
                }}
              />
              <Line type="monotone" dataKey="electronics" stroke="#3b82f6" strokeWidth={2} name="Electronics" />
              <Line type="monotone" dataKey="clothing" stroke="#10b981" strokeWidth={2} name="Clothing" />
              <Line type="monotone" dataKey="food" stroke="#f59e0b" strokeWidth={2} name="Food & Beverage" />
              <Line type="monotone" dataKey="home" stroke="#ef4444" strokeWidth={2} name="Home & Garden" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Method Performance */}
      <div className="card p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Payment Method Performance Analysis (M-Pesa vs. Card vs. Other)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Processing Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cost per Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User Satisfaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Usage %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Recommendation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {paymentPerformance.map((method) => (
                <tr key={method.method} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {method.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      <span className="font-medium">{method.success}%</span>
                      {method.success >= 96 && <CheckCircle className="h-4 w-4 text-green-500 ml-2" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {method.speed}s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    ${method.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      <span className="font-medium">{method.satisfaction}/5</span>
                      <div className="flex ml-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full mr-1 ${
                              i < Math.floor(method.satisfaction) ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {method.usage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      method.recommendation === 'Recommended' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : method.recommendation === 'Good'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {method.recommendation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Peak Usage Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Peak Usage Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={peakUsageData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="hour" stroke={axisStroke} />
            <YAxis stroke={axisStroke} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="scans" stroke="#3b82f6" strokeWidth={3} name="Scans" />
            <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Optimization Suggestions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Cost Optimization Suggestions Based on Usage Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {optimizationSuggestions.map((suggestion) => (
            <div key={suggestion.title} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <suggestion.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  suggestion.status === 'recommended' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : suggestion.status === 'suggestion'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                }`}>
                  {suggestion.impact} Impact
                </span>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{suggestion.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{suggestion.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">{suggestion.savings}</span>
                <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription vs Pay-per-Scan Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Subscription vs Pay-per-Scan Recommendations</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-green-900 dark:text-green-100">Monthly Subscription</h4>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">$500/month</span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mb-3">Unlimited scans, predictable costs</p>
            <div className="text-xs text-green-600 dark:text-green-400 space-y-1">
              <p>• Best for: High volume users (10,000+ scans/month)</p>
              <p>• Savings: $2,850/month at current usage</p>
              <p>• Flexibility: No per-scan limits</p>
              <p>• ROI: 401% return on investment</p>
            </div>
            <div className="mt-4 p-2 bg-green-100 dark:bg-green-800/30 rounded">
              <p className="text-xs font-medium text-green-800 dark:text-green-200">
                🎯 RECOMMENDED for your usage pattern
              </p>
            </div>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Pay-per-Scan</h4>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">$0.05/scan</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Pay only for what you use</p>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <p>• Best for: Low volume users (&lt;10,000 scans/month)</p>
              <p>• Current cost: $3,350/month</p>
              <p>• Flexibility: No monthly commitment</p>
              <p>• Risk: Costs can vary significantly</p>
            </div>
            <div className="mt-4 p-2 bg-red-100 dark:bg-red-800/30 rounded">
              <p className="text-xs font-medium text-red-800 dark:text-red-200">
                ⚠️ NOT RECOMMENDED - 570% more expensive
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

