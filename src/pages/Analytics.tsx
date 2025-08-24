import { 
  Clock, 
  DollarSign, 
  TrendingUp, 

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
  Cell,
  ComposedChart
} from 'recharts'
import { useTheme } from '../contexts/ThemeContext'
import { useState } from 'react'

const monthlyData = [
  { month: 'Jan', scans: 45000, cost: 2250, savings: 6750, accuracy: 97.2 },
  { month: 'Feb', scans: 52000, cost: 2600, savings: 7800, accuracy: 97.8 },
  { month: 'Mar', scans: 48000, cost: 2400, savings: 7200, accuracy: 98.1 },
  { month: 'Apr', scans: 61000, cost: 3050, savings: 9150, accuracy: 98.3 },
  { month: 'May', scans: 58000, cost: 2900, savings: 8700, accuracy: 98.5 },
  { month: 'Jun', scans: 67000, cost: 3350, savings: 10050, accuracy: 98.7 },
]



// Separate data for better visualization
const dailyData = [
  { day: 'Monday', scans: 8500, accuracy: 98.2 },
  { day: 'Tuesday', scans: 9200, accuracy: 98.5 },
  { day: 'Wednesday', scans: 9800, accuracy: 98.7 },
  { day: 'Thursday', scans: 9500, accuracy: 98.4 },
  { day: 'Friday', scans: 10200, accuracy: 98.9 },
  { day: 'Saturday', scans: 7800, accuracy: 97.8 },
  { day: 'Sunday', scans: 6200, accuracy: 97.5 },
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

// Cost breakdown and savings opportunities data
const costSavingsData = [
  { month: 'Jan', timeSaved: 120, cost: 2250, savings: 9750, efficiency: 85.2 },
  { month: 'Feb', timeSaved: 135, cost: 2600, savings: 10900, efficiency: 87.1 },
  { month: 'Mar', timeSaved: 128, cost: 2400, savings: 10400, efficiency: 88.3 },
  { month: 'Apr', timeSaved: 152, cost: 3050, savings: 12150, efficiency: 89.7 },
  { month: 'May', timeSaved: 145, cost: 2900, savings: 11600, efficiency: 91.2 },
  { month: 'Jun', timeSaved: 168, cost: 3350, savings: 13450, efficiency: 92.8 },
]

// Inventory forecasting data - actual inventory items/goods (Full year)
const forecastingDataFull = [
  // First half of the year
  { month: 'Jan', currentStock: 8500, forecastedDemand: 9200, reorderPoint: 6000, confidence: 88 },
  { month: 'Feb', currentStock: 9200, forecastedDemand: 10500, reorderPoint: 6500, confidence: 87 },
  { month: 'Mar', currentStock: 9800, forecastedDemand: 11800, reorderPoint: 7000, confidence: 86 },
  { month: 'Apr', currentStock: 10500, forecastedDemand: 12800, reorderPoint: 7200, confidence: 85 },
  { month: 'May', currentStock: 11200, forecastedDemand: 13500, reorderPoint: 7500, confidence: 84 },
  { month: 'Jun', currentStock: 11800, forecastedDemand: 14200, reorderPoint: 7800, confidence: 83 },
  // Second half of the year
  { month: 'Jul', currentStock: 12500, forecastedDemand: 14200, reorderPoint: 8000, confidence: 85 },
  { month: 'Aug', currentStock: 11800, forecastedDemand: 15600, reorderPoint: 8500, confidence: 82 },
  { month: 'Sep', currentStock: 13200, forecastedDemand: 16800, reorderPoint: 9000, confidence: 79 },
  { month: 'Oct', currentStock: 14500, forecastedDemand: 18200, reorderPoint: 9500, confidence: 76 },
  { month: 'Nov', currentStock: 15800, forecastedDemand: 19500, reorderPoint: 10000, confidence: 73 },
  { month: 'Dec', currentStock: 17200, forecastedDemand: 20800, reorderPoint: 10500, confidence: 70 },
]

// Seasonal inventory patterns by category
const seasonalInventoryData = [
  { category: 'Electronics', q1: 8500, q2: 9200, q3: 10500, q4: 7800, trend: 'up' },
  { category: 'Clothing', q1: 6200, q2: 6800, q3: 7200, q4: 9500, trend: 'up' },
  { category: 'Food & Beverage', q1: 4500, q2: 5200, q3: 5800, q4: 6500, trend: 'up' },
  { category: 'Home & Garden', q1: 3800, q2: 4200, q3: 4800, q4: 5200, trend: 'up' },
  { category: 'Automotive', q1: 2800, q2: 3200, q3: 3500, q4: 3800, trend: 'up' },
]

// Seasonal trend data with all 4 quarters
const seasonalData = [
  { quarter: 'Q1 (Jan-Mar)', scans: 145000, growth: 8.5, trend: 'up' },
  { quarter: 'Q2 (Apr-Jun)', scans: 186000, growth: 28.3, trend: 'up' },
  { quarter: 'Q3 (Jul-Sep)', scans: 210000, growth: 12.9, trend: 'up' },
  { quarter: 'Q4 (Oct-Dec)', scans: 195000, growth: -7.1, trend: 'down' },
]

export default function Analytics() {
  const { isDark } = useTheme()
  const [timeView, setTimeView] = useState<'daily' | 'hourly'>('daily')
  const [forecastPeriod, setForecastPeriod] = useState<'firstHalf' | 'secondHalf'>('secondHalf')

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
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Busiest Times</h3>
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setTimeView('daily')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  timeView === 'daily'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setTimeView('hourly')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  timeView === 'hourly'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Hourly
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeView === 'daily' ? dailyData : hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis 
                dataKey={timeView === 'daily' ? 'day' : 'hour'} 
                stroke={axisStroke}
                angle={-45}
                textAnchor="end"
                height={80}
              />
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
              <Bar 
                dataKey="scans" 
                fill={timeView === 'daily' ? '#3b82f6' : '#10b981'}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {timeView === 'daily' ? 'Peak Day' : 'Peak Hour'}
              </h4>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {timeView === 'daily' ? 'Friday' : '12PM'}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                {timeView === 'daily' ? '10,200 scans' : '1,200 scans'}
              </p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-green-900 dark:text-green-100">
                {timeView === 'daily' ? 'Lowest Day' : 'Lowest Hour'}
              </h4>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                {timeView === 'daily' ? 'Sunday' : '6AM'}
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                {timeView === 'daily' ? '6,200 scans' : '120 scans'}
              </p>
            </div>
          </div>
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Cost Breakdown & Savings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={costSavingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="month" stroke={axisStroke} />
              <YAxis yAxisId="left" stroke={axisStroke} />
              <YAxis yAxisId="right" orientation="right" stroke={axisStroke} />
              <Tooltip 
                contentStyle={tooltipStyle}
                formatter={(value, name) => {
                  if (name === 'timeSaved') {
                    return [`${value} hrs`, 'Time Saved'];
                  }
                  if (name === 'efficiency') {
                    return [`${value}%`, 'Efficiency'];
                  }
                  return [`$${value.toLocaleString()}`, name];
                }}
              />
              <Bar yAxisId="left" dataKey="cost" fill="#ef4444" name="Cost" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="savings" fill="#10b981" name="Savings" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#8b5cf6" strokeWidth={2} name="Efficiency" />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-green-900 dark:text-green-100">Total Savings</h4>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">$68,250</p>
              <p className="text-xs text-green-700 dark:text-green-300">vs Manual Process</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100">Efficiency Rate</h4>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">92.8%</p>
              <p className="text-xs text-purple-700 dark:text-purple-300">Current Month</p>
            </div>
          </div>
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
                {paymentData.map((_, index) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalData.map((quarter, index) => (
            <div key={quarter.quarter} className={`text-center p-4 rounded-lg border ${
              index === 0 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
              index === 1 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
              index === 2 ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' :
              'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
            }`}>
              <h4 className={`font-medium ${
                index === 0 ? 'text-blue-900 dark:text-blue-100' :
                index === 1 ? 'text-green-900 dark:text-green-100' :
                index === 2 ? 'text-purple-900 dark:text-purple-100' :
                'text-orange-900 dark:text-orange-100'
              }`}>{quarter.quarter}</h4>
              <p className={`text-2xl font-bold mt-2 ${
                index === 0 ? 'text-blue-600 dark:text-blue-400' :
                index === 1 ? 'text-green-600 dark:text-green-400' :
                index === 2 ? 'text-purple-600 dark:text-purple-400' :
                'text-orange-600 dark:text-orange-400'
              }`}>{(quarter.scans / 1000).toFixed(0)}K</p>
              <p className={`text-sm ${
                index === 0 ? 'text-blue-700 dark:text-blue-300' :
                index === 1 ? 'text-green-700 dark:text-green-300' :
                index === 2 ? 'text-purple-700 dark:text-purple-300' :
                'text-orange-700 dark:text-orange-300'
              }`}>Total Scans</p>
              <p className={`text-xs mt-1 ${
                index === 0 ? 'text-blue-600 dark:text-blue-400' :
                index === 1 ? 'text-green-600 dark:text-green-400' :
                index === 2 ? 'text-purple-600 dark:text-purple-400' :
                'text-orange-600 dark:text-orange-400'
              }`}>
                {quarter.growth > 0 ? '+' : ''}{quarter.growth}% vs previous
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Forecasting */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Inventory Forecasting & Demand Planning</h3>
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setForecastPeriod('firstHalf')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                forecastPeriod === 'firstHalf'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Jan-Jun
            </button>
            <button
              onClick={() => setForecastPeriod('secondHalf')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                forecastPeriod === 'secondHalf'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Jul-Dec
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={forecastPeriod === 'firstHalf' ? forecastingDataFull.slice(0, 6) : forecastingDataFull.slice(6, 12)}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="month" stroke={axisStroke} />
            <YAxis stroke={axisStroke} />
            <Tooltip 
              contentStyle={tooltipStyle}
              formatter={(value, name) => {
                if (name === 'forecastedDemand') {
                  return [`${value.toLocaleString()} units`, 'Forecasted Demand'];
                }
                if (name === 'currentStock') {
                  return [`${value.toLocaleString()} units`, 'Current Stock'];
                }
                if (name === 'reorderPoint') {
                  return [`${value.toLocaleString()} units`, 'Reorder Point'];
                }
                if (name === 'confidence') {
                  return [`${value}%`, 'Confidence'];
                }
                return [value, name];
              }}
            />
            <Bar dataKey="forecastedDemand" fill="#3b82f6" name="Forecasted Demand" radius={[4, 4, 0, 0]} />
            <Bar dataKey="currentStock" fill="#10b981" name="Current Stock" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="reorderPoint" stroke="#ef4444" strokeWidth={2} name="Reorder Point" />
            <Line type="monotone" dataKey="confidence" stroke="#f59e0b" strokeWidth={2} name="Confidence" />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {forecastPeriod === 'firstHalf' ? 'Next Month Demand' : 'Next Month Demand'}
            </h4>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {forecastPeriod === 'firstHalf' ? '9,200 units' : '14,200 units'}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              {forecastPeriod === 'firstHalf' ? '88% confidence' : '85% confidence'}
            </p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="text-sm font-medium text-green-900 dark:text-green-100">Current Stock Level</h4>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              {forecastPeriod === 'firstHalf' ? '8,500 units' : '12,500 units'}
            </p>
            <p className="text-xs text-green-700 dark:text-green-300">Available inventory</p>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 className="text-sm font-medium text-red-900 dark:text-red-100">Reorder Alert</h4>
            <p className="text-lg font-bold text-red-600 dark:text-red-400">
              {forecastPeriod === 'firstHalf' ? '6,000 units' : '8,000 units'}
            </p>
            <p className="text-xs text-red-700 dark:text-red-300">Trigger point</p>
          </div>
        </div>
      </div>

      {/* Seasonal Inventory Patterns */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Seasonal Inventory Patterns by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={seasonalInventoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="category" stroke={axisStroke} />
            <YAxis stroke={axisStroke} />
            <Tooltip 
              contentStyle={tooltipStyle}
              formatter={(value, name) => {
                return [`${value.toLocaleString()} units`, name];
              }}
            />
            <Bar dataKey="q1" fill="#3b82f6" name="Q1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="q2" fill="#10b981" name="Q2" radius={[4, 4, 0, 0]} />
            <Bar dataKey="q3" fill="#f59e0b" name="Q3" radius={[4, 4, 0, 0]} />
            <Bar dataKey="q4" fill="#ef4444" name="Q4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Key Insights:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h5 className="text-sm font-medium text-yellow-900 dark:text-yellow-100">Peak Season</h5>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Electronics peak in Q3, Clothing in Q4</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 className="text-sm font-medium text-blue-900 dark:text-blue-100">Stock Planning</h5>
              <p className="text-sm text-blue-700 dark:text-blue-300">Increase inventory 15-20% for peak quarters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

