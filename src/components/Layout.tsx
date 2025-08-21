import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  BarChart3, 
  TrendingUp, 
  Settings, 
  Home,
  Smartphone,
  DollarSign,
  Clock,
  Target,
  Package,
  Camera,
  CreditCard
} from 'lucide-react'
import { cn } from '../utils/cn'
import { useTheme } from '../contexts/ThemeContext'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Analytics & Reporting', href: '/analytics', icon: BarChart3 },
  { name: 'Business Intelligence', href: '/business-intelligence', icon: TrendingUp },
  { name: 'Inventory Management', href: '/inventory', icon: Camera },
  { name: 'Integration Management', href: '/integration', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { isDark } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-700">
        <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Pefoma</span>
          </div>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-r-2 border-primary-600'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Quick Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick Stats</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Today's Scans</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">1,247</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Time Saved</span>
              <span className="font-medium text-green-600 dark:text-green-400">8.5 hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-8 px-8">
          {children}
        </main>
      </div>
    </div>
  )
}

