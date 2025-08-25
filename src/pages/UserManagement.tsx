import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  User, CreditCard, Settings, BarChart3, Calendar,
  DollarSign, Activity, History,
  CheckCircle, Plus, Edit, Trash2, Eye, Download,
  Pause, Play, Crown, Award, Star, Target, Zap,
  Smartphone as MobileMoney, CreditCard as CardIcon
} from 'lucide-react'


// Tooltip Component
const Tooltip = ({ children, content, position = 'top' }: { children: React.ReactNode; content: string; position?: 'top' | 'bottom' | 'left' | 'right' }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  }

  return (
    <div className="relative inline-block" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      {children}
      {showTooltip && (
        <div className={`absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg whitespace-nowrap ${positionClasses[position]}`}>
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45 ${
            position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
            position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
            'right-full top-1/2 -translate-y-1/2 -mr-1'
          }`} />
        </div>
      )}
    </div>
  )
}

// Types
interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  joinDate: Date
  lastActive: Date
  status: 'active' | 'inactive' | 'suspended'
  tier: 'basic' | 'premium' | 'enterprise' | 'vip'
  preferences: UserPreferences
}

interface UserPreferences {
  paymentMode: 'pay-per-scan' | 'subscription'
  autoRenewal: boolean
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    billing: boolean
    usage: boolean
  }
  privacy: {
    dataSharing: boolean
    analytics: boolean
    marketing: boolean
  }
  theme: 'light' | 'dark' | 'auto'
  language: string
  timezone: string
}

interface PaymentMethod {
  id: string
  type: 'mpesa' | 'mtn' | 'airtel' | 'card' | 'bank'
  name: string
  last4?: string
  isDefault: boolean
  status: 'active' | 'inactive' | 'expired'
  balance?: number
  icon: React.ComponentType<any>
  color: string
}

interface Subscription {
  id: string
  plan: 'basic' | 'standard' | 'premium' | 'enterprise'
  status: 'active' | 'paused' | 'cancelled' | 'expired'
  startDate: Date
  endDate: Date
  autoRenewal: boolean
  price: number
  features: string[]
  usage: {
    scansUsed: number
    scansLimit: number
    dailyUsed: number
    dailyLimit: number
  }
}

interface SessionHistory {
  id: string
  date: Date
  scans: number
  cost: number
  paymentMethod: string
  status: 'completed' | 'pending' | 'failed'
  duration: number
  accuracy: number
  objects: number
}

interface UsageStats {
  totalScans: number
  totalCost: number
  averageAccuracy: number
  timeSaved: number
  monthlyTrend: number
  favoriteCategories: Array<{ name: string; count: number }>
  peakHours: Array<{ hour: string; scans: number }>
}

// Mock Data
const userProfile: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+254 700 123 456',
  avatar: '/avatars/john.jpg',
  joinDate: new Date('2023-06-15'),
  lastActive: new Date(),
  status: 'active',
  tier: 'premium',
  preferences: {
    paymentMode: 'subscription',
    autoRenewal: true,
    notifications: {
      email: true,
      sms: false,
      push: true,
      billing: true,
      usage: true
    },
    privacy: {
      dataSharing: true,
      analytics: true,
      marketing: false
    },
    theme: 'auto',
    language: 'en',
    timezone: 'Africa/Nairobi'
  }
}

const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'mpesa',
    name: 'M-Pesa',
    isDefault: true,
    status: 'active',
    balance: 1250.50,
    icon: MobileMoney,
    color: '#00A651'
  },
  {
    id: '2',
    type: 'card',
    name: 'Visa Card',
    last4: '4242',
    isDefault: false,
    status: 'active',
    icon: CardIcon,
    color: '#3B82F6'
  },
  {
    id: '3',
    type: 'mtn',
    name: 'MTN Mobile Money',
    isDefault: false,
    status: 'active',
    balance: 890.25,
    icon: MobileMoney,
    color: '#FFC107'
  }
]

const subscription: Subscription = {
  id: '1',
  plan: 'premium',
  status: 'active',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-02-01'),
  autoRenewal: true,
  price: 500.00,
  features: [
    'Unlimited scans',
    'Priority support',
    'Advanced analytics',
    'API access',
    'Custom branding',
    'Team collaboration'
  ],
  usage: {
    scansUsed: 7245,
    scansLimit: 10000,
    dailyUsed: 245,
    dailyLimit: 500
  }
}

const sessionHistory: SessionHistory[] = [
  {
    id: '1',
    date: new Date(),
    scans: 150,
    cost: 15.00,
    paymentMethod: 'M-Pesa',
    status: 'completed',
    duration: 45,
    accuracy: 98.5,
    objects: 150
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000),
    scans: 200,
    cost: 20.00,
    paymentMethod: 'Visa Card',
    status: 'completed',
    duration: 60,
    accuracy: 97.8,
    objects: 200
  },
  {
    id: '3',
    date: new Date(Date.now() - 172800000),
    scans: 100,
    cost: 10.00,
    paymentMethod: 'M-Pesa',
    status: 'completed',
    duration: 30,
    accuracy: 99.1,
    objects: 100
  }
]

const usageStats: UsageStats = {
  totalScans: 15750,
  totalCost: 1575.00,
  averageAccuracy: 98.2,
  timeSaved: 78.5,
  monthlyTrend: 12.5,
  favoriteCategories: [
    { name: 'Electronics', count: 2450 },
    { name: 'Clothing', count: 1890 },
    { name: 'Books', count: 1560 },
    { name: 'Food & Beverages', count: 1230 }
  ],
  peakHours: [
    { hour: '09:00', scans: 450 },
    { hour: '10:00', scans: 520 },
    { hour: '11:00', scans: 480 },
    { hour: '14:00', scans: 380 },
    { hour: '15:00', scans: 420 },
    { hour: '16:00', scans: 390 }
  ]
}

export default function UserManagement() {
  const navigate = useNavigate()
  const { tab } = useParams<{ tab: string }>()
  const [activeTab, setActiveTab] = useState<'profile' | 'payments' | 'subscription' | 'usage' | 'sessions' | 'preferences'>('profile')

  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [isSubscriptionPaused, setIsSubscriptionPaused] = useState(false)
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      sms: true,
      push: true,
      billing: true,
      usage: true
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      marketing: false
    }
  })

  useEffect(() => {
    if (tab) {
      setActiveTab(tab as any)
    }
  }, [tab])

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'vip': return Crown
      case 'enterprise': return Award
      case 'premium': return Star
      default: return User
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'vip': return 'text-purple-600 dark:text-purple-400'
      case 'enterprise': return 'text-blue-600 dark:text-blue-400'
      case 'premium': return 'text-yellow-600 dark:text-yellow-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }



  const handlePaymentModeChange = (mode: 'pay-per-scan' | 'subscription') => {
    console.log(`Payment mode changed to: ${mode}`)
  }

  const handleAutoRenewalToggle = () => {
    console.log('Auto-renewal toggled')
  }

  const handleSubscriptionPause = () => {
    if (isSubscriptionPaused) {
      // Resume subscription
      setIsSubscriptionPaused(false)
      console.log('Subscription resumed')
    } else {
      // Show pause confirmation modal
      setShowSubscriptionModal(true)
    }
  }

  const handlePauseConfirm = () => {
    setIsSubscriptionPaused(true)
    setShowSubscriptionModal(false)
    console.log('Subscription paused')
  }

  // Toggle handlers for preferences
  const handleNotificationToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications]
      }
    }))
    console.log(`${key} notifications toggled`)
  }

  const handlePrivacyToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key as keyof typeof prev.privacy]
      }
    }))
    console.log(`${key} privacy setting toggled`)
  }

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Manage user profiles, preferences, and account settings
          </p>
        </div>
        <button className="btn-primary flex items-center px-6 py-3">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-6 sm:space-x-10 overflow-x-auto">
          {[
            { id: 'profile', name: 'Profile', icon: User },
            { id: 'payments', name: 'Payment Methods', icon: CreditCard },
            { id: 'subscription', name: 'Subscription', icon: Calendar },
            { id: 'usage', name: 'Usage Analytics', icon: BarChart3 },
            { id: 'sessions', name: 'Session History', icon: History },
            { id: 'preferences', name: 'Preferences', icon: Settings }
          ].map((tabItem) => (
            <Link
              key={tabItem.id}
              to={`/user-management/${tabItem.id}`}
              className={`flex items-center py-3 px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === tabItem.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tabItem.icon className="h-4 w-4 mr-2 sm:mr-3" />
              <span className="hidden sm:inline">{tabItem.name}</span>
              <span className="sm:hidden">{tabItem.name.split(' ')[0]}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'profile' && (
        <div className="space-y-10">
          {/* Profile Overview */}
          <div className="card p-8">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className="h-20 w-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{userProfile.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{userProfile.email}</p>
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const TierIcon = getTierIcon(userProfile.tier)
                      return (
                        <>
                          <TierIcon className={`h-5 w-5 ${getTierColor(userProfile.tier)}`} />
                          <span className={`text-sm font-medium ${getTierColor(userProfile.tier)}`}>
                            {userProfile.tier.charAt(0).toUpperCase() + userProfile.tier.slice(1)} Tier
                          </span>
                        </>
                      )
                    })()}
                  </div>
                </div>
              </div>
              <button className="btn-primary flex items-center px-6 py-3">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Tooltip content="Total number of scans performed across all sessions">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-help">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {usageStats.totalScans.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Scans</div>
                </div>
              </Tooltip>
              <Tooltip content="Average accuracy percentage across all scan sessions">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg cursor-help">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {usageStats.averageAccuracy}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average Accuracy</div>
                </div>
              </Tooltip>
              <Tooltip content="Total time saved compared to manual inventory processes">
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg cursor-help">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {usageStats.timeSaved}h
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Time Saved</div>
                </div>
              </Tooltip>
            </div>
          </div>

          {/* Payment Mode Selection */}
          <div className="card p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Payment Preference</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Tooltip content="Pay only for the scans you use - perfect for occasional users">
                <div 
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                    userProfile.preferences.paymentMode === 'pay-per-scan'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => handlePaymentModeChange('pay-per-scan')}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Pay-per-Scan</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pay only for what you use</p>
                      </div>
                    </div>
                    {userProfile.preferences.paymentMode === 'pay-per-scan' && (
                      <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Cost per scan:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">$0.10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">No monthly fees</span>
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Flexible usage</span>
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                  </div>
                </div>
              </Tooltip>

              <Tooltip content="Fixed monthly billing with included scans - ideal for regular users">
                <div 
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                    userProfile.preferences.paymentMode === 'subscription'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => handlePaymentModeChange('subscription')}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Subscription</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Fixed monthly billing</p>
                      </div>
                    </div>
                    {userProfile.preferences.paymentMode === 'subscription' && (
                      <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Monthly cost:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">${subscription.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Scans included:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{subscription.usage.scansLimit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Premium features</span>
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                  </div>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="space-y-10">
          {/* Payment Methods */}
          <div className="card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Payment Methods</h3>
              <button 
                className="btn-primary flex items-center px-6 py-3"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {paymentMethods.map((method) => {
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
                          {method.last4 && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">•••• {method.last4}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Default
                          </span>
                        )}
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {method.balance && (
                      <div className="mb-4">
                        <Tooltip content={`Current balance in your ${method.name} account`}>
                          <div className="flex items-center justify-between text-sm cursor-help">
                            <span className="text-gray-600 dark:text-gray-400">Balance</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              ${method.balance.toFixed(2)}
                            </span>
                          </div>
                        </Tooltip>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      {!method.isDefault && (
                        <Tooltip content="Set this payment method as your default for automatic billing">
                          <button className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            Set as Default
                          </button>
                        </Tooltip>
                      )}
                      <Tooltip content="Remove this payment method from your account">
                        <button className="px-3 py-2 text-sm border border-red-300 dark:border-red-600 rounded-lg text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'subscription' && (
        <div className="space-y-10">
          {/* Current Subscription */}
          <div className="card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Current Subscription</h3>
              <div className="flex space-x-4">
                <button 
                  onClick={handleSubscriptionPause}
                  className={`px-6 py-3 text-sm border rounded-lg flex items-center ${
                    isSubscriptionPaused
                      ? 'border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20'
                      : 'border-yellow-300 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                  }`}
                >
                  {isSubscriptionPaused ? (
                    <Play className="h-4 w-4 mr-2" />
                  ) : (
                    <Pause className="h-4 w-4 mr-2" />
                  )}
                  {isSubscriptionPaused ? 'Continue' : 'Pause'}
                </button>
                <Link to="/integration/subscriptions">
                  <button className="btn-primary flex items-center px-6 py-3">
                    <Edit className="h-4 w-4 mr-2" />
                    Manage
                  </button>
                </Link>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                    {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {subscription.startDate.toLocaleDateString()} - {subscription.endDate.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${subscription.price}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">per month</div>
                </div>
              </div>

              {/* Usage Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Usage Progress</span>
                  <Tooltip content={`${subscription.usage.scansUsed.toLocaleString()} scans used out of ${subscription.usage.scansLimit.toLocaleString()} included in your plan`}>
                    <span className="text-gray-900 dark:text-gray-100 cursor-help">
                      {Math.round((subscription.usage.scansUsed / subscription.usage.scansLimit) * 100)}%
                    </span>
                  </Tooltip>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min((subscription.usage.scansUsed / subscription.usage.scansLimit) * 100, 100)}%` 
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    {subscription.usage.scansUsed.toLocaleString()} used
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {subscription.usage.scansLimit.toLocaleString()} limit
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Plan Features</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {subscription.features.map((feature, index) => (
                    <Tooltip key={index} content={`Included in your ${subscription.plan} plan`}>
                      <div className="flex items-center space-x-2 cursor-help">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>

              {/* Auto-Renewal */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-gray-100">Auto-Renewal</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {subscription.autoRenewal ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <Tooltip content={subscription.autoRenewal ? "Disable automatic renewal of your subscription" : "Enable automatic renewal to avoid service interruption"}>
                  <button
                    onClick={handleAutoRenewalToggle}
                    className={`px-4 py-2 text-sm rounded-lg ${
                      subscription.autoRenewal
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {subscription.autoRenewal ? 'Disable' : 'Enable'}
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="space-y-10">
          {/* Usage Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Tooltip content="Total number of scans performed across all sessions">
              <div className="card cursor-help">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Scans</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {usageStats.totalScans.toLocaleString()}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </Tooltip>
            <Tooltip content="Total cost incurred for all scan sessions">
              <div className="card cursor-help">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Cost</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      ${usageStats.totalCost.toFixed(2)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </Tooltip>
            <Tooltip content="Average accuracy percentage across all scan sessions">
              <div className="card cursor-help">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accuracy</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {usageStats.averageAccuracy}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </Tooltip>
            <Tooltip content="Total time saved compared to manual inventory processes">
              <div className="card cursor-help">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Saved</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {usageStats.timeSaved}h
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </Tooltip>
          </div>

          {/* Favorite Categories */}
          <div className="card p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Favorite Categories</h3>
            <div className="space-y-6">
              {usageStats.favoriteCategories.map((category, index) => (
                <Tooltip key={index} content={`${category.count.toLocaleString()} scans in ${category.name} category`}>
                  <div className="flex items-center justify-between cursor-help py-3">
                    <div className="flex items-center space-x-4 mr-4">
                      <div className="w-4 h-4 rounded-full" style={{ 
                        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4] 
                      }} />
                      <span className="font-medium text-gray-900 dark:text-gray-100">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-40 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mr-4">
                        <div
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(category.count / Math.max(...usageStats.favoriteCategories.map(c => c.count))) * 100}%`,
                            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4]
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {category.count.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-10">
          {/* Session History */}
          <div className="card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Session History</h3>
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
                      Scans
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Accuracy
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {sessionHistory.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {session.date.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {session.scans.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        ${session.cost.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {session.duration}min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {session.accuracy}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {session.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Tooltip content="View detailed session information">
                            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                              <Eye className="h-4 w-4" />
                            </button>
                          </Tooltip>
                          <Tooltip content="Download session report">
                            <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                              <Download className="h-4 w-4" />
                            </button>
                          </Tooltip>
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

      {activeTab === 'preferences' && (
        <div className="space-y-10">
          {/* Notification Preferences */}
          <div className="card p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Notification Preferences</h3>
            <div className="space-y-6">
              {Object.entries(preferences.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive notifications via {key}
                    </p>
                  </div>
                  <Tooltip content={value ? `Disable ${key} notifications` : `Enable ${key} notifications`}>
                    <button
                      onClick={() => handleNotificationToggle(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        value ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="card p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Privacy Settings</h3>
            <div className="space-y-6">
              {Object.entries(preferences.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Allow {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </p>
                  </div>
                  <Tooltip content={value ? `Disable ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}` : `Enable ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}>
                    <button
                      onClick={() => handlePrivacyToggle(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        value ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Pause Subscription</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Your subscription will be paused and you won't be charged until you resume it.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handlePauseConfirm}
                className="flex-1 px-4 py-2 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Pause Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
