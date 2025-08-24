import React, { useState } from 'react'
import {
  CreditCard, WifiOff, Download, 
  Settings, RefreshCw, AlertCircle, CheckCircle, Clock, 
  DollarSign, Calendar, BarChart3, Receipt,
  Plus, Edit, Trash2, Eye, Activity,
  Smartphone as MobileMoney, CreditCard as CardIcon,
  Wifi as OnlineIcon, WifiOff as OfflineIcon
} from 'lucide-react'


// Types
interface PaymentMethod {
  id: string
  name: string
  type: 'mpesa' | 'mtn' | 'airtel' | 'card' | 'bank'
  status: 'active' | 'inactive' | 'pending' | 'error'
  balance: number
  lastSync: Date
  isOnline: boolean
  icon: React.ComponentType<any>
  color: string
}

interface PaymentTransaction {
  id: string
  method: string
  amount: number
  type: 'credit' | 'debit'
  status: 'completed' | 'pending' | 'failed'
  timestamp: Date
  description: string
  receiptUrl?: string
}

interface Subscription {
  id: string
  name: string
  type: 'basic' | 'standard' | 'premium' | 'enterprise'
  status: 'active' | 'expired' | 'cancelled' | 'pending'
  startDate: Date
  endDate: Date
  autoRenewal: boolean
  scansIncluded: number
  scansUsed: number
  dailyLimit: number
  cost: number
  features: string[]
}

interface UsageStats {
  scansRemaining: number
  dailyScansUsed: number
  dailyLimit: number
  monthlyScansUsed: number
  monthlyLimit: number
  costProjection: number
  nextBillingDate: Date
}

interface OfflinePayment {
  id: string
  amount: number
  method: string
  timestamp: Date
  status: 'pending' | 'synced' | 'failed'
  retryCount: number
}

// Mock Data
const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    name: 'M-Pesa',
    type: 'mpesa',
    status: 'active',
    balance: 1250.50,
    lastSync: new Date(),
    isOnline: true,
    icon: MobileMoney,
    color: '#00A651'
  },
  {
    id: '2',
    name: 'MTN Mobile Money',
    type: 'mtn',
    status: 'active',
    balance: 890.25,
    lastSync: new Date(Date.now() - 300000), // 5 minutes ago
    isOnline: true,
    icon: MobileMoney,
    color: '#FFC107'
  },
  {
    id: '3',
    name: 'Airtel Money',
    type: 'airtel',
    status: 'inactive',
    balance: 0,
    lastSync: new Date(Date.now() - 86400000), // 1 day ago
    isOnline: false,
    icon: MobileMoney,
    color: '#FF6B35'
  },
  {
    id: '4',
    name: 'Credit Card',
    type: 'card',
    status: 'active',
    balance: 2500.00,
    lastSync: new Date(),
    isOnline: true,
    icon: CardIcon,
    color: '#3B82F6'
  }
]

const recentTransactions: PaymentTransaction[] = [
  {
    id: '1',
    method: 'M-Pesa',
    amount: 50.00,
    type: 'debit',
    status: 'completed',
    timestamp: new Date(),
    description: 'Scan session payment',
    receiptUrl: '/receipts/1.pdf'
  },
  {
    id: '2',
    method: 'MTN Mobile Money',
    amount: 25.00,
    type: 'debit',
    status: 'completed',
    timestamp: new Date(Date.now() - 3600000),
    description: 'Premium scan upgrade'
  },
  {
    id: '3',
    method: 'Credit Card',
    amount: 500.00,
    type: 'credit',
    status: 'completed',
    timestamp: new Date(Date.now() - 7200000),
    description: 'Monthly subscription renewal'
  }
]

const subscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Premium Plan',
    type: 'premium',
    status: 'active',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-02-01'),
    autoRenewal: true,
    scansIncluded: 10000,
    scansUsed: 7245,
    dailyLimit: 500,
    cost: 500.00,
    features: ['Unlimited scans', 'Priority support', 'Advanced analytics', 'API access']
  },
  {
    id: '2',
    name: 'Basic Plan',
    type: 'basic',
    status: 'expired',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2023-12-31'),
    autoRenewal: false,
    scansIncluded: 1000,
    scansUsed: 1000,
    dailyLimit: 100,
    cost: 50.00,
    features: ['Basic scans', 'Email support']
  }
]

const usageStats: UsageStats = {
  scansRemaining: 2755,
  dailyScansUsed: 245,
  dailyLimit: 500,
  monthlyScansUsed: 7245,
  monthlyLimit: 10000,
  costProjection: 275.50,
  nextBillingDate: new Date('2024-02-01')
}

const offlinePayments: OfflinePayment[] = [
  {
    id: '1',
    amount: 25.00,
    method: 'M-Pesa',
    timestamp: new Date(Date.now() - 1800000),
    status: 'pending',
    retryCount: 0
  },
  {
    id: '2',
    amount: 15.00,
    method: 'MTN Mobile Money',
    timestamp: new Date(Date.now() - 3600000),
    status: 'synced',
    retryCount: 1
  }
]

export default function IntegrationManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'subscriptions' | 'usage' | 'offline'>('overview')
  const [showSyncModal, setShowSyncModal] = useState(false)
  const [showExportDropdown, setShowExportDropdown] = useState(false)
  const exportDropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target as Node)) {
        setShowExportDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 dark:text-green-400'
      case 'inactive': return 'text-gray-600 dark:text-gray-400'
      case 'pending': return 'text-yellow-600 dark:text-yellow-400'
      case 'error': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'inactive': return AlertCircle
      case 'pending': return Clock
      case 'error': return AlertCircle
      default: return AlertCircle
    }
  }

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    // Mock export functionality
    console.log(`Exporting data in ${format} format`)
    setShowExportDropdown(false)
  }

  const handleSyncOfflinePayments = () => {
    setShowSyncModal(true)
    // Mock sync functionality
    setTimeout(() => setShowSyncModal(false), 2000)
  }

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Integration Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage payment integrations, subscriptions, and usage tracking
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => handleSyncOfflinePayments()}
            className="btn-primary flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Offline
          </button>
          <div className="relative">
            <button 
              onClick={toggleExportDropdown}
              className="btn-primary flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            {showExportDropdown && (
              <div 
                ref={exportDropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
              >
                <button 
                  onClick={() => handleExport('csv')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Export as CSV
                </button>
                <button 
                  onClick={() => handleExport('excel')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Export as Excel
                </button>
                <button 
                  onClick={() => handleExport('pdf')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Export as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'payments', name: 'Payment Integrations', icon: CreditCard },
            { id: 'subscriptions', name: 'Subscriptions', icon: Calendar },
            { id: 'usage', name: 'Usage Tracking', icon: Activity },
            { id: 'offline', name: 'Offline Queue', icon: WifiOff }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Payment Integration Status */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Payment Integration Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paymentMethods.map((method) => {
                const StatusIcon = getStatusIcon(method.status)
                const MethodIcon = method.icon
                return (
                  <div key={method.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <MethodIcon className="h-5 w-5" style={{ color: method.color }} />
                        <span className="font-medium text-gray-900 dark:text-gray-100">{method.name}</span>
                      </div>
                      <StatusIcon className={`h-4 w-4 ${getStatusColor(method.status)}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Balance</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">${method.balance.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Status</span>
                        <div className="flex items-center space-x-1">
                          {method.isOnline ? (
                            <OnlineIcon className="h-3 w-3 text-green-500" />
                          ) : (
                            <OfflineIcon className="h-3 w-3 text-red-500" />
                          )}
                          <span className={getStatusColor(method.status)}>
                            {method.isOnline ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Balance</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${paymentMethods.reduce((sum, m) => sum + m.balance, 0).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Subscriptions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {subscriptions.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scans Remaining</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{usageStats.scansRemaining}</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Offline Payments</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {offlinePayments.filter(p => p.status === 'pending').length}
                  </p>
                </div>
                <WifiOff className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="space-y-8">
          {/* Payment Methods Management */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Payment Methods</h3>
              <button className="btn-primary flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {paymentMethods.map((method) => {
                const StatusIcon = getStatusIcon(method.status)
                const MethodIcon = method.icon
                return (
                  <div key={method.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${method.color}20` }}>
                          <MethodIcon className="h-6 w-6" style={{ color: method.color }} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{method.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Last sync: {method.lastSync.toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`h-4 w-4 ${getStatusColor(method.status)}`} />
                        <span className={`text-sm ${getStatusColor(method.status)}`}>
                          {method.status.charAt(0).toUpperCase() + method.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Current Balance</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">${method.balance.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Connection Status</span>
                        <div className="flex items-center space-x-1">
                          {method.isOnline ? (
                            <OnlineIcon className="h-3 w-3 text-green-500" />
                          ) : (
                            <OfflineIcon className="h-3 w-3 text-red-500" />
                          )}
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {method.isOnline ? 'Connected' : 'Disconnected'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Sync
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Settings className="h-4 w-4 mr-1" />
                        Settings
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Transaction History */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Transactions</h3>
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {transaction.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        <span className={transaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {transaction.timestamp.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                            <Eye className="h-4 w-4" />
                          </button>
                          {transaction.receiptUrl && (
                            <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                              <Receipt className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'subscriptions' && (
        <div className="space-y-8">
          {/* Active Subscriptions */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Active Subscriptions</h3>
              <button className="btn-primary flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Upgrade Plan
              </button>
            </div>
            <div className="space-y-6">
              {subscriptions.filter(s => s.status === 'active').map((subscription) => (
                <div key={subscription.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">{subscription.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {subscription.startDate.toLocaleDateString()} - {subscription.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Active
                      </span>
                      <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scans Used</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {subscription.scansUsed.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        of {subscription.scansIncluded.toLocaleString()} included
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Daily Limit</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {subscription.dailyLimit}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">scans per day</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Cost</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        ${subscription.cost}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {subscription.autoRenewal ? 'Auto-renewal enabled' : 'Auto-renewal disabled'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Usage Progress</span>
                      <span className="text-gray-900 dark:text-gray-100">
                        {Math.round((subscription.scansUsed / subscription.scansIncluded) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((subscription.scansUsed / subscription.scansIncluded) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Plan Features</p>
                    <div className="flex flex-wrap gap-2">
                      {subscription.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Settings
                    </button>
                    <button className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </button>
                  </div>
                </div>
              ))}
              
              {subscriptions.filter(s => s.status === 'active').length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Active Subscriptions</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">You don't have any active subscriptions at the moment.</p>
                  <button className="btn-primary">Get Started</button>
                </div>
              )}
            </div>
          </div>

          {/* Auto Renewal Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Auto Renewal Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Auto Renewal</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically renew subscriptions when they expire</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 dark:bg-gray-700"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Low Balance Alerts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when balance is low for auto-renewal</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 dark:bg-gray-700"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Subscription History */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Subscription History</h3>
              <button className="btn-secondary flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download History
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Plan Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Scans Used
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {subscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {subscription.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subscription.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : subscription.status === 'expired'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            : subscription.status === 'cancelled'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                        }`}>
                          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {subscription.startDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {subscription.endDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        ${subscription.cost}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {subscription.scansUsed.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="space-y-8">
          {/* Usage Overview */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Usage Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scans Used Today</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {usageStats.dailyScansUsed.toLocaleString()}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scans Remaining Today</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {usageStats.dailyLimit - usageStats.dailyScansUsed}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scans Used This Month</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {usageStats.monthlyScansUsed.toLocaleString()}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scans Remaining This Month</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {usageStats.monthlyLimit - usageStats.monthlyScansUsed}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Next Billing Date</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {usageStats.nextBillingDate.toLocaleDateString()}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cost Projection</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      ${usageStats.costProjection.toFixed(2)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Usage History */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Usage History</h3>
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Scans Used
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Mock data for usage history */}
                  {[
                    { date: new Date('2024-01-20'), scans: 150, cost: 15.00, type: 'Scan Session', status: 'Completed' },
                    { date: new Date('2024-01-18'), scans: 200, cost: 20.00, type: 'Scan Session', status: 'Completed' },
                    { date: new Date('2024-01-15'), scans: 100, cost: 10.00, type: 'Scan Session', status: 'Completed' },
                    { date: new Date('2024-01-10'), scans: 50, cost: 5.00, type: 'Scan Session', status: 'Completed' },
                    { date: new Date('2024-01-05'), scans: 20, cost: 2.00, type: 'Scan Session', status: 'Completed' },
                    { date: new Date('2024-01-01'), scans: 10, cost: 1.00, type: 'Scan Session', status: 'Completed' },
                  ].map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {item.date.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {item.scans.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        ${item.cost.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'Completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'offline' && (
        <div className="space-y-8">
          {/* Offline Payments */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Offline Payments</h3>
              <button className="btn-primary flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {offlinePayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {payment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {payment.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : payment.status === 'synced'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {payment.timestamp.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                            <RefreshCw className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sync Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-spin" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Syncing Offline Payments</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Please wait while we sync your offline transactions...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
