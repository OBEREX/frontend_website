import React from 'react'
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
  PieChart, 
  Pie, 
  Cell 
} from 'recharts'
import { BarChart3 } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface ScanSession {
  id: string
  name: string
  startTime: Date
  endTime?: Date
  scanType: 'basic' | 'standard' | 'premium'
  totalScans: number
  totalCost: number
  status: 'active' | 'completed' | 'paused'
}

interface InventoryAnalyticsProps {
  sessions: ScanSession[]
}

const scanPricing = {
  basic: 0.02,
  standard: 0.04,
  premium: 0.05
}

export default function InventoryAnalytics({ sessions }: InventoryAnalyticsProps) {
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

  // Daily scan data
  const dailyData = [
    { day: 'Mon', scans: 45, cost: 2.25, accuracy: 98.5 },
    { day: 'Tue', scans: 52, cost: 2.60, accuracy: 97.8 },
    { day: 'Wed', scans: 38, cost: 1.90, accuracy: 99.1 },
    { day: 'Thu', scans: 61, cost: 3.05, accuracy: 98.3 },
    { day: 'Fri', scans: 58, cost: 2.90, accuracy: 98.7 },
    { day: 'Sat', scans: 42, cost: 2.10, accuracy: 97.9 },
    { day: 'Sun', scans: 29, cost: 1.45, accuracy: 98.2 },
  ]

  // Weekly scan data
  const weeklyData = [
    { week: 'Week 1', scans: 245, cost: 12.25, basic: 120, standard: 85, premium: 40 },
    { week: 'Week 2', scans: 312, cost: 15.60, basic: 150, standard: 110, premium: 52 },
    { week: 'Week 3', scans: 278, cost: 13.90, basic: 135, standard: 95, premium: 48 },
    { week: 'Week 4', scans: 356, cost: 17.80, basic: 180, standard: 125, premium: 51 },
  ]

  // Monthly scan data
  const monthlyData = [
    { month: 'Jan', scans: 1245, cost: 62.25, accuracy: 98.2 },
    { month: 'Feb', scans: 1312, cost: 65.60, accuracy: 98.5 },
    { month: 'Mar', scans: 1278, cost: 63.90, accuracy: 98.8 },
    { month: 'Apr', scans: 1356, cost: 67.80, accuracy: 99.1 },
    { month: 'May', scans: 1423, cost: 71.15, accuracy: 98.9 },
    { month: 'Jun', scans: 1489, cost: 74.45, accuracy: 99.2 },
  ]

  // Scan type distribution
  const scanTypeData = [
    { name: 'Basic', value: 45, color: '#3B82F6' },
    { name: 'Standard', value: 35, color: '#10B981' },
    { name: 'Premium', value: 20, color: '#F59E0B' },
  ]

  // Cost breakdown by scan type
  const costBreakdown = [
    { type: 'Basic', scans: 585, cost: 11.70, avgCost: 0.02 },
    { type: 'Standard', scans: 415, cost: 16.60, avgCost: 0.04 },
    { type: 'Premium', value: 240, cost: 12.00, avgCost: 0.05 },
  ]

  const totalScans = sessions.reduce((sum, s) => sum + s.totalScans, 0)
  const totalCost = sessions.reduce((sum, s) => sum + s.totalCost, 0)
  const avgCostPerScan = totalScans > 0 ? totalCost / totalScans : 0

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Scans</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalScans}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12.5% vs last month</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${totalCost.toFixed(2)}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">+8.3% vs last month</p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Cost/Scan</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${avgCostPerScan.toFixed(3)}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">-2.1% vs last month</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Sessions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {sessions.filter(s => s.status === 'active').length}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Currently running</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Usage Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Daily Scan Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="day" stroke={axisStroke} />
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
            <Line type="monotone" dataKey="scans" stroke="#3b82f6" strokeWidth={2} name="Scans" />
            <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly and Monthly Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Weekly Scan Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="week" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="basic" fill="#3b82f6" name="Basic" />
              <Bar dataKey="standard" fill="#10b981" name="Standard" />
              <Bar dataKey="premium" fill="#f59e0b" name="Premium" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="month" stroke={axisStroke} />
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
              <Line type="monotone" dataKey="scans" stroke="#3b82f6" strokeWidth={2} name="Scans" />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scan Type Distribution and Cost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Scan Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={scanTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {scanTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {scanTypeData.map((type) => (
              <div key={type.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="text-gray-600 dark:text-gray-400">{type.name}</span>
                </div>
                <span className="text-gray-900 dark:text-gray-100">{type.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Cost Breakdown by Scan Type</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {costBreakdown.map((item) => {
              const scanCount = item.scans || item.value || 0
              const maxCost = Math.max(...costBreakdown.map(i => i.cost))
              const costPercentage = (item.cost / maxCost) * 100
              const scanPercentage = (scanCount / Math.max(...costBreakdown.map(i => i.scans || i.value || 0))) * 100
              
              return (
                <div key={item.type} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.type}</h4>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      ${item.avgCost}/scan
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Scan Count Progress */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Scan Volume</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {scanCount} scans
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${scanPercentage}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Cost Progress */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Total Cost</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          ${item.cost}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${costPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Summary Stats */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="font-medium text-blue-900 dark:text-blue-100">Volume Share</div>
                        <div className="text-blue-600 dark:text-blue-400">{scanPercentage.toFixed(1)}%</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <div className="font-medium text-green-900 dark:text-green-100">Cost Share</div>
                        <div className="text-green-600 dark:text-green-400">{costPercentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Session Performance Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Session Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Session Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Scans
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {session.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      session.scanType === 'premium' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : session.scanType === 'standard'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {session.scanType.charAt(0).toUpperCase() + session.scanType.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {session.totalScans}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    ${session.totalCost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      session.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : session.status === 'completed'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {session.endTime 
                      ? Math.round((session.endTime.getTime() - session.startTime.getTime()) / 60000)
                      : Math.round((Date.now() - session.startTime.getTime()) / 60000)
                    } min
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
