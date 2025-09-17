// Data service to centralize data fetching logic for the AI chatbot
// This service provides a unified interface to access data from various pages

export interface DashboardData {
  totalScansToday: string
  timeSavedToday: string
  costSavingsToday: string
  accuracyRateToday: string
  scansChange: string
  timeSavedChange: string
  costSavingsChange: string
  accuracyChange: string
  scanData: Array<{
    day: string
    scans: number
    accuracy: number
  }>
  categoryData: Array<{
    name: string
    value: number
    color: string
  }>
  systemStatus: string
  lastSyncTime: string
  aiAssistantStatus: string
}

export interface AnalyticsData {
  monthlyScans: string
  costPerScan: string
  timeSaved: string
  roi: string
  monthlyData: Array<{
    month: string
    scans: number
    cost: number
    savings: number
    accuracy: number
  }>
  dailyData: Array<{
    day: string
    scans: number
    accuracy: number
  }>
  hourlyData: Array<{
    hour: string
    scans: number
    accuracy: number
  }>
  categoryAccuracy: Array<{
    category: string
    accuracy: number
    scans: number
  }>
  paymentData: Array<{
    method: string
    usage: number
    cost: number
  }>
}

export interface BusinessIntelligenceData {
  scanEfficiency: string
  costOptimization: string
  accuracyTrend: string
  roi: string
  dailyPatterns: Array<{
    day: string
    scans: number
    accuracy: number
    cost: number
  }>
  weeklyPatterns: Array<{
    week: string
    scans: number
    accuracy: number
    cost: number
  }>
  monthlyPatterns: Array<{
    month: string
    scans: number
    accuracy: number
    cost: number
  }>
  optimizationSuggestions: Array<{
    type: string
    title: string
    description: string
    impact: string
    savings: string
  }>
}

export interface IntegrationData {
  totalBalance: number
  activeSubscriptions: number
  scansRemaining: number
  offlinePayments: number
  paymentMethods: Array<{
    id: string
    name: string
    type: string
    status: string
    balance: number
    isOnline: boolean
  }>
  subscriptions: Array<{
    id: string
    name: string
    type: string
    status: string
    scansIncluded: number
    scansUsed: number
    dailyLimit: number
    cost: number
  }>
  usageStats: {
    scansRemaining: number
    dailyScansUsed: number
    dailyLimit: number
    monthlyScansUsed: number
    monthlyLimit: number
    costProjection: number
    nextBillingDate: Date
  }
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  reorderPoint: number
  lastScanned: Date
  accuracy: number
}

class DataService {
  // Dashboard data
  getDashboardData(): DashboardData {
    return {
      totalScansToday: '1,247',
      timeSavedToday: '8.5 hrs',
      costSavingsToday: '$1,247',
      accuracyRateToday: '98.7%',
      scansChange: '+12.5%',
      timeSavedChange: '+2.3 hrs',
      costSavingsChange: '+$156',
      accuracyChange: '+0.3%',
      scanData: [
        { day: 'Mon', scans: 1200, accuracy: 98.5 },
        { day: 'Tue', scans: 1350, accuracy: 98.8 },
        { day: 'Wed', scans: 1100, accuracy: 97.9 },
        { day: 'Thu', scans: 1600, accuracy: 99.1 },
        { day: 'Fri', scans: 1800, accuracy: 99.3 },
        { day: 'Sat', scans: 1400, accuracy: 98.7 },
        { day: 'Sun', scans: 900, accuracy: 98.2 },
      ],
      categoryData: [
        { name: 'Electronics', value: 35, color: '#3b82f6' },
        { name: 'Clothing', value: 25, color: '#10b981' },
        { name: 'Food & Beverage', value: 20, color: '#f59e0b' },
        { name: 'Home & Garden', value: 15, color: '#ef4444' },
        { name: 'Other', value: 5, color: '#8b5cf6' },
      ],
      systemStatus: 'Online',
      lastSyncTime: '2 minutes ago',
      aiAssistantStatus: 'Available'
    }
  }

  // Analytics data
  getAnalyticsData(): AnalyticsData {
    return {
      monthlyScans: '67,000',
      costPerScan: '$0.05',
      timeSaved: '156 hrs',
      roi: '401%',
      monthlyData: [
        { month: 'Jan', scans: 45000, cost: 2250, savings: 6750, accuracy: 97.2 },
        { month: 'Feb', scans: 52000, cost: 2600, savings: 7800, accuracy: 97.8 },
        { month: 'Mar', scans: 48000, cost: 2400, savings: 7200, accuracy: 98.1 },
        { month: 'Apr', scans: 61000, cost: 3050, savings: 9150, accuracy: 98.3 },
        { month: 'May', scans: 58000, cost: 2900, savings: 8700, accuracy: 98.5 },
        { month: 'Jun', scans: 67000, cost: 3350, savings: 10050, accuracy: 98.7 },
      ],
      dailyData: [
        { day: 'Monday', scans: 8500, accuracy: 98.2 },
        { day: 'Tuesday', scans: 9200, accuracy: 98.5 },
        { day: 'Wednesday', scans: 9800, accuracy: 98.7 },
        { day: 'Thursday', scans: 9500, accuracy: 98.4 },
        { day: 'Friday', scans: 10200, accuracy: 98.9 },
        { day: 'Saturday', scans: 7800, accuracy: 97.8 },
        { day: 'Sunday', scans: 6200, accuracy: 97.5 },
      ],
      hourlyData: [
        { hour: '6AM', scans: 120, accuracy: 97.5 },
        { hour: '8AM', scans: 450, accuracy: 98.1 },
        { hour: '10AM', scans: 890, accuracy: 98.3 },
        { hour: '12PM', scans: 1200, accuracy: 98.7 },
        { hour: '2PM', scans: 1100, accuracy: 98.5 },
        { hour: '4PM', scans: 950, accuracy: 98.2 },
        { hour: '6PM', scans: 680, accuracy: 97.9 },
        { hour: '8PM', scans: 320, accuracy: 97.6 },
      ],
      categoryAccuracy: [
        { category: 'Electronics', accuracy: 99.2, scans: 25000 },
        { category: 'Clothing', accuracy: 98.8, scans: 18000 },
        { category: 'Food & Beverage', accuracy: 97.5, scans: 15000 },
        { category: 'Home & Garden', accuracy: 98.1, scans: 12000 },
        { category: 'Automotive', accuracy: 96.8, scans: 8000 },
      ],
      paymentData: [
        { method: 'M-Pesa', usage: 65, cost: 0.15 },
        { method: 'Card', usage: 25, cost: 0.25 },
        { method: 'Bank Transfer', usage: 8, cost: 0.10 },
        { method: 'Other', usage: 2, cost: 0.30 },
      ]
    }
  }

  // Business Intelligence data
  getBusinessIntelligenceData(): BusinessIntelligenceData {
    return {
      scanEfficiency: '94.2%',
      costOptimization: '$2,850',
      accuracyTrend: '+0.4%',
      roi: '401%',
      dailyPatterns: [
        { day: 'Mon', scans: 1200, accuracy: 98.2, cost: 60.0 },
        { day: 'Tue', scans: 1350, accuracy: 98.5, cost: 67.5 },
        { day: 'Wed', scans: 1100, accuracy: 97.8, cost: 55.0 },
        { day: 'Thu', scans: 1600, accuracy: 98.7, cost: 80.0 },
        { day: 'Fri', scans: 1800, accuracy: 98.9, cost: 90.0 },
        { day: 'Sat', scans: 1400, accuracy: 98.1, cost: 70.0 },
        { day: 'Sun', scans: 1700, accuracy: 98.3, cost: 85.0 },
      ],
      weeklyPatterns: [
        { week: 'Week 1', scans: 8400, accuracy: 98.2, cost: 420.0 },
        { week: 'Week 2', scans: 9450, accuracy: 98.5, cost: 472.5 },
        { week: 'Week 3', scans: 7700, accuracy: 97.8, cost: 385.0 },
        { week: 'Week 4', scans: 11200, accuracy: 98.7, cost: 560.0 },
      ],
      monthlyPatterns: [
        { month: 'Jan', scans: 36000, accuracy: 97.5, cost: 1800 },
        { month: 'Feb', scans: 37800, accuracy: 97.8, cost: 1890 },
        { month: 'Mar', scans: 39200, accuracy: 98.1, cost: 1960 },
        { month: 'Apr', scans: 44800, accuracy: 98.3, cost: 2240 },
        { month: 'May', scans: 50400, accuracy: 98.5, cost: 2520 },
        { month: 'Jun', scans: 47600, accuracy: 98.7, cost: 2380 },
      ],
      optimizationSuggestions: [
        {
          type: 'cost',
          title: 'Switch to Subscription Plan',
          description: 'Based on your usage patterns, switching to the monthly subscription could save you $2,850/month.',
          impact: 'High',
          savings: '$2,850/month'
        },
        {
          type: 'time',
          title: 'Optimize Scan Times',
          description: 'Peak usage is between 10AM-2PM. Consider scheduling non-urgent scans outside these hours.',
          impact: 'Medium',
          savings: '2.5 hrs/week'
        },
        {
          type: 'accuracy',
          title: 'Focus on Electronics Category',
          description: 'Electronics show the highest accuracy improvement. Consider expanding this category.',
          impact: 'High',
          savings: '+1.5% accuracy'
        }
      ]
    }
  }

  // Integration data
  getIntegrationData(): IntegrationData {
    return {
      totalBalance: 4640.75,
      activeSubscriptions: 1,
      scansRemaining: 2755,
      offlinePayments: 1,
      paymentMethods: [
        {
          id: '1',
          name: 'M-Pesa',
          type: 'mpesa',
          status: 'active',
          balance: 1250.50,
          isOnline: true
        },
        {
          id: '2',
          name: 'MTN Mobile Money',
          type: 'mtn',
          status: 'active',
          balance: 890.25,
          isOnline: true
        },
        {
          id: '3',
          name: 'Airtel Money',
          type: 'airtel',
          status: 'inactive',
          balance: 0,
          isOnline: false
        },
        {
          id: '4',
          name: 'Credit Card',
          type: 'card',
          status: 'active',
          balance: 2500.00,
          isOnline: true
        }
      ],
      subscriptions: [
        {
          id: '1',
          name: 'Premium Plan',
          type: 'premium',
          status: 'active',
          scansIncluded: 10000,
          scansUsed: 7245,
          dailyLimit: 500,
          cost: 500.00
        }
      ],
      usageStats: {
        scansRemaining: 2755,
        dailyScansUsed: 245,
        dailyLimit: 500,
        monthlyScansUsed: 7245,
        monthlyLimit: 10000,
        costProjection: 275.50,
        nextBillingDate: new Date('2024-02-01')
      }
    }
  }

  // Inventory items (mock data)
  getInventoryItems(): InventoryItem[] {
    return [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        category: 'Electronics',
        currentStock: 45,
        reorderPoint: 20,
        lastScanned: new Date(),
        accuracy: 99.2
      },
      {
        id: '2',
        name: 'Samsung Galaxy S24',
        category: 'Electronics',
        currentStock: 12,
        reorderPoint: 15,
        lastScanned: new Date(Date.now() - 3600000),
        accuracy: 98.8
      },
      {
        id: '3',
        name: 'Nike Air Max',
        category: 'Clothing',
        currentStock: 78,
        reorderPoint: 30,
        lastScanned: new Date(Date.now() - 7200000),
        accuracy: 97.5
      },
      {
        id: '4',
        name: 'Organic Coffee Beans',
        category: 'Food & Beverage',
        currentStock: 35,
        reorderPoint: 50,
        lastScanned: new Date(Date.now() - 1800000),
        accuracy: 96.8
      },
      {
        id: '5',
        name: 'Garden Hose',
        category: 'Home & Garden',
        currentStock: 8,
        reorderPoint: 10,
        lastScanned: new Date(Date.now() - 5400000),
        accuracy: 98.1
      },
      {
        id: '6',
        name: 'Wireless Headphones',
        category: 'Electronics',
        currentStock: 25,
        reorderPoint: 30,
        lastScanned: new Date(Date.now() - 2700000),
        accuracy: 97.9
      },
      {
        id: '7',
        name: 'Protein Powder',
        category: 'Food & Beverage',
        currentStock: 67,
        reorderPoint: 25,
        lastScanned: new Date(Date.now() - 900000),
        accuracy: 98.3
      }
    ]
  }

  // Search inventory items by name or category
  searchInventoryItems(query: string): InventoryItem[] {
    const items = this.getInventoryItems()
    const searchTerm = query.toLowerCase()
    
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    )
  }

  // Get specific inventory item by name
  getInventoryItemByName(name: string): InventoryItem | null {
    const items = this.getInventoryItems()
    return items.find(item => 
      item.name.toLowerCase().includes(name.toLowerCase())
    ) || null
  }

  // Get items by category
  getItemsByCategory(category: string): InventoryItem[] {
    const items = this.getInventoryItems()
    return items.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Get low stock items
  getLowStockItems(): InventoryItem[] {
    const items = this.getInventoryItems()
    return items.filter(item => item.currentStock <= item.reorderPoint)
  }

  // Get total stock count
  getTotalStockCount(): number {
    const items = this.getInventoryItems()
    return items.reduce((total, item) => total + item.currentStock, 0)
  }

  // Get average accuracy across all items
  getAverageAccuracy(): number {
    const items = this.getInventoryItems()
    const totalAccuracy = items.reduce((total, item) => total + item.accuracy, 0)
    return Math.round((totalAccuracy / items.length) * 100) / 100
  }

  // Get category distribution
  getCategoryDistribution(): { [category: string]: number } {
    const items = this.getInventoryItems()
    const distribution: { [category: string]: number } = {}
    
    items.forEach(item => {
      if (distribution[item.category]) {
        distribution[item.category] += item.currentStock
      } else {
        distribution[item.category] = item.currentStock
      }
    })
    
    return distribution
  }

  // Get scan statistics for specific time periods
  getScanStatistics(period: 'today' | 'week' | 'month' | 'year') {
    const dashboardData = this.getDashboardData()
    const analyticsData = this.getAnalyticsData()
    
    switch (period) {
      case 'today':
        return {
          totalScans: parseInt(dashboardData.totalScansToday.replace(',', '')),
          accuracy: parseFloat(dashboardData.accuracyRateToday.replace('%', '')),
          timeSaved: dashboardData.timeSavedToday,
          costSavings: dashboardData.costSavingsToday
        }
      case 'week':
        const weeklyScans = dashboardData.scanData.reduce((total, day) => total + day.scans, 0)
        const weeklyAccuracy = dashboardData.scanData.reduce((total, day) => total + day.accuracy, 0) / dashboardData.scanData.length
        return {
          totalScans: weeklyScans,
          accuracy: Math.round(weeklyAccuracy * 100) / 100,
          timeSaved: '59.5 hrs',
          costSavings: '$8,729'
        }
      case 'month':
        return {
          totalScans: parseInt(analyticsData.monthlyScans.replace(',', '')),
          accuracy: 98.7,
          timeSaved: analyticsData.timeSaved,
          costSavings: '$10,050'
        }
      case 'year':
        const yearlyScans = analyticsData.monthlyData.reduce((total, month) => total + month.scans, 0)
        const yearlyAccuracy = analyticsData.monthlyData.reduce((total, month) => total + month.accuracy, 0) / analyticsData.monthlyData.length
        return {
          totalScans: yearlyScans,
          accuracy: Math.round(yearlyAccuracy * 100) / 100,
          timeSaved: '936 hrs',
          costSavings: '$48,450'
        }
      default:
        return this.getScanStatistics('today')
    }
  }
}

// Export singleton instance
export const dataService = new DataService()
