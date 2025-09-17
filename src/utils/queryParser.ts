// Query parser to understand user requests and extract relevant information

export interface ParsedQuery {
  intent: string
  entity?: string
  timeframe?: 'today' | 'week' | 'month' | 'year'
  category?: string
  metric?: string
  specificItem?: string
}

export class QueryParser {
  // Intent patterns
  private intentPatterns = {
    totalScans: [
      'total scans', 'how many scans', 'number of scans', 'scan count', 
      'scans today', 'scans this week', 'scans this month', 'total scanning'
    ],
    accuracy: [
      'accuracy', 'scan accuracy', 'accuracy rate', 'how accurate', 
      'accuracy percentage', 'scanning accuracy'
    ],
    inventory: [
      'inventory', 'stock', 'items', 'products', 'how many items',
      'stock count', 'inventory count', 'total items'
    ],
    lowStock: [
      'low stock', 'reorder', 'running low', 'need to restock',
      'low inventory', 'stock alert'
    ],
    category: [
      'category', 'electronics', 'clothing', 'food', 'beverage',
      'home', 'garden', 'automotive'
    ],
    cost: [
      'cost', 'price', 'expense', 'savings', 'money saved',
      'cost savings', 'how much saved'
    ],
    time: [
      'time saved', 'hours saved', 'time efficiency', 'how much time'
    ],
    trends: [
      'trends', 'pattern', 'analytics', 'performance', 'growth',
      'improvement', 'decline'
    ],
    payment: [
      'payment', 'balance', 'subscription', 'billing', 'cost per scan'
    ],
    specific: [
      'iphone', 'samsung', 'nike', 'coffee', 'hose', 'phone', 'shoe'
    ]
  }

  // Timeframe patterns
  private timeframePatterns = {
    today: ['today', 'this day', 'current day'],
    week: ['this week', 'weekly', 'past week', 'current week'],
    month: ['this month', 'monthly', 'past month', 'current month'],
    year: ['this year', 'yearly', 'past year', 'annual']
  }

  // Category patterns
  private categoryPatterns = {
    electronics: ['electronics', 'electronic', 'phone', 'iphone', 'samsung', 'laptop', 'computer'],
    clothing: ['clothing', 'clothes', 'apparel', 'nike', 'shoe', 'shirt', 'pants'],
    'food & beverage': ['food', 'beverage', 'drink', 'coffee', 'tea', 'snack'],
    'home & garden': ['home', 'garden', 'hose', 'furniture', 'decor'],
    automotive: ['automotive', 'car', 'vehicle', 'auto']
  }

  // Metric patterns
  private metricPatterns = {
    count: ['how many', 'number of', 'count', 'total'],
    percentage: ['percentage', 'percent', '%', 'rate'],
    currency: ['cost', 'price', 'savings', '$', 'dollar'],
    time: ['hours', 'minutes', 'time', 'hrs']
  }

  parse(query: string): ParsedQuery {
    const normalizedQuery = query.toLowerCase().trim()
    
    // Determine intent
    const intent = this.detectIntent(normalizedQuery)
    
    // Extract timeframe
    const timeframe = this.detectTimeframe(normalizedQuery)
    
    // Extract category
    const category = this.detectCategory(normalizedQuery)
    
    // Extract metric type
    const metric = this.detectMetric(normalizedQuery)
    
    // Extract specific item
    const specificItem = this.detectSpecificItem(normalizedQuery)

    return {
      intent,
      timeframe,
      category,
      metric,
      specificItem
    }
  }

  private detectIntent(query: string): string {
    for (const [intent, patterns] of Object.entries(this.intentPatterns)) {
      for (const pattern of patterns) {
        if (query.includes(pattern)) {
          return intent
        }
      }
    }
    return 'general'
  }

  private detectTimeframe(query: string): 'today' | 'week' | 'month' | 'year' | undefined {
    for (const [timeframe, patterns] of Object.entries(this.timeframePatterns)) {
      for (const pattern of patterns) {
        if (query.includes(pattern)) {
          return timeframe as 'today' | 'week' | 'month' | 'year'
        }
      }
    }
    return undefined
  }

  private detectCategory(query: string): string | undefined {
    for (const [category, patterns] of Object.entries(this.categoryPatterns)) {
      for (const pattern of patterns) {
        if (query.includes(pattern)) {
          return category
        }
      }
    }
    return undefined
  }

  private detectMetric(query: string): string | undefined {
    for (const [metric, patterns] of Object.entries(this.metricPatterns)) {
      for (const pattern of patterns) {
        if (query.includes(pattern)) {
          return metric
        }
      }
    }
    return undefined
  }

  private detectSpecificItem(query: string): string | undefined {
    // Look for specific product names
    const specificItems = [
      'iphone 15 pro', 'iphone', 'samsung galaxy s24', 'samsung',
      'nike air max', 'nike', 'organic coffee beans', 'coffee',
      'garden hose', 'hose'
    ]
    
    for (const item of specificItems) {
      if (query.includes(item)) {
        return item
      }
    }
    
    return undefined
  }

  // Generate response based on parsed query
  generateResponse(parsedQuery: ParsedQuery, data: any): string {
    const { intent, timeframe, category, specificItem } = parsedQuery

    switch (intent) {
      case 'totalScans':
        return this.generateScanResponse(timeframe, data)
      case 'accuracy':
        return this.generateAccuracyResponse(timeframe, category, data)
      case 'inventory':
        return this.generateInventoryResponse(category, specificItem, data)
      case 'lowStock':
        return this.generateLowStockResponse(data)
      case 'category':
        return this.generateCategoryResponse(category, data)
      case 'cost':
        return this.generateCostResponse(timeframe, data)
      case 'time':
        return this.generateTimeResponse(timeframe, data)
      case 'trends':
        return this.generateTrendsResponse(data)
      case 'payment':
        return this.generatePaymentResponse(data)
      case 'specific':
        return this.generateSpecificItemResponse(specificItem, data)
      default:
        return this.generateGeneralResponse(data)
    }
  }

  private generateScanResponse(timeframe: string | undefined, data: any): string {
    const period = timeframe || 'today'
    const stats = data.scanStats[period]
    
    return `Based on your ${period}'s data, you've completed ${stats.totalScans.toLocaleString()} scans with an accuracy rate of ${stats.accuracy}%. This has saved you ${stats.timeSaved} and resulted in cost savings of ${stats.costSavings}.`
  }

  private generateAccuracyResponse(timeframe: string | undefined, category: string | undefined, data: any): string {
    if (category) {
      const categoryData = data.categoryAccuracy.find((c: any) => 
        c.category.toLowerCase().includes(category.toLowerCase())
      )
      if (categoryData) {
        return `The accuracy rate for ${categoryData.category} is ${categoryData.accuracy}% based on ${categoryData.scans.toLocaleString()} scans. This category is performing ${categoryData.accuracy > 98 ? 'excellently' : 'well'}.`
      }
    }
    
    const period = timeframe || 'today'
    const stats = data.scanStats[period]
    return `Your overall scan accuracy for ${period} is ${stats.accuracy}%. This is ${stats.accuracy > 98 ? 'excellent' : 'good'} performance!`
  }

  private generateInventoryResponse(category: string | undefined, specificItem: string | undefined, data: any): string {
    if (specificItem) {
      const item = data.inventoryItems.find((i: any) => 
        i.name.toLowerCase().includes(specificItem.toLowerCase())
      )
      if (item) {
        const stockStatus = item.currentStock <= item.reorderPoint ? '⚠️ Low stock' : '✅ Good stock'
        return `📱 Found ${item.name}!\n• Current stock: ${item.currentStock} units (${stockStatus})\n• Reorder point: ${item.reorderPoint} units\n• Category: ${item.category}\n• Last scanned: ${item.lastScanned.toLocaleDateString()}\n• Accuracy: ${item.accuracy}%`
      }
      return `❌ I couldn't find "${specificItem}" in your current inventory. Would you like me to search for similar items?`
    }
    
    if (category) {
      const categoryItems = data.inventoryItems.filter((i: any) => 
        i.category.toLowerCase().includes(category.toLowerCase())
      )
      const totalStock = categoryItems.reduce((sum: number, item: any) => sum + item.currentStock, 0)
      const itemList = categoryItems.map((item: any) => `• ${item.name}: ${item.currentStock} units`).join('\n')
      return `📦 ${category} category overview:\n• ${categoryItems.length} different items\n• Total stock: ${totalStock} units\n\nItems:\n${itemList}`
    }
    
    return `📊 Your total inventory:\n• ${data.totalItems} items across ${Object.keys(data.categoryDistribution).length} categories\n• Total stock count: ${data.totalStock.toLocaleString()} units\n• Average accuracy: ${data.averageAccuracy}%`
  }

  private generateLowStockResponse(data: any): string {
    const lowStockItems = data.lowStockItems
    if (lowStockItems.length === 0) {
      return "Great news! All your items are currently above their reorder points. No immediate restocking needed."
    }
    
    const itemDetails = lowStockItems.map((item: any) => 
      `• ${item.name}: ${item.currentStock} units (reorder at ${item.reorderPoint})`
    ).join('\n')
    
    return `⚠️ You have ${lowStockItems.length} item(s) running low on stock:\n\n${itemDetails}\n\n💡 Consider restocking these items soon to avoid stockouts.`
  }

  private generateCategoryResponse(category: string | undefined, data: any): string {
    if (!category) {
      const categories = Object.keys(data.categoryDistribution)
      return `Your inventory is organized into ${categories.length} categories: ${categories.join(', ')}.`
    }
    
    const distribution = data.categoryDistribution[category] || 
                        data.categoryDistribution[Object.keys(data.categoryDistribution).find(key => 
                          key.toLowerCase().includes(category.toLowerCase())
                        ) || '']
    
    if (distribution) {
      return `The ${category} category has ${distribution} units in stock across multiple items.`
    }
    
    return `I couldn't find specific data for the ${category} category. Available categories are: ${Object.keys(data.categoryDistribution).join(', ')}.`
  }

  private generateCostResponse(timeframe: string | undefined, data: any): string {
    const period = timeframe || 'today'
    const stats = data.scanStats[period]
    return `Your cost savings for ${period} amount to ${stats.costSavings}. The current cost per scan is $0.05, and you're saving significant money compared to manual inventory processes.`
  }

  private generateTimeResponse(timeframe: string | undefined, data: any): string {
    const period = timeframe || 'today'
    const stats = data.scanStats[period]
    return `You've saved ${stats.timeSaved} ${period} through automated scanning. This represents a 70.8% reduction in inventory counting time compared to manual methods.`
  }

  private generateTrendsResponse(data: any): string {
    return `Your scanning trends show consistent growth with ${data.dashboardData.scansChange} increase in scans, ${data.dashboardData.accuracyChange} improvement in accuracy, and ${data.dashboardData.costSavingsChange} additional cost savings compared to last month.`
  }

  private generatePaymentResponse(data: any): string {
    const integration = data.integrationData
    return `Your account shows a total balance of $${integration.totalBalance.toFixed(2)} across ${integration.paymentMethods.length} payment methods. You have ${integration.activeSubscriptions} active subscription(s) with ${integration.scansRemaining.toLocaleString()} scans remaining.`
  }

  private generateSpecificItemResponse(specificItem: string | undefined, data: any): string {
    if (!specificItem) return this.generateGeneralResponse(data)
    
    const item = data.inventoryItems.find((i: any) => 
      i.name.toLowerCase().includes(specificItem.toLowerCase())
    )
    
    if (item) {
      const stockStatus = item.currentStock <= item.reorderPoint ? 'low stock' : 'good stock level'
      return `${item.name}: Current stock is ${item.currentStock} units (${stockStatus}). Reorder point: ${item.reorderPoint} units. Category: ${item.category}. Last scanned: ${item.lastScanned.toLocaleDateString()} with ${item.accuracy}% accuracy.`
    }
    
    return `I couldn't find "${specificItem}" in your inventory. Would you like me to search for similar items or show you what's available in related categories?`
  }

  private generateGeneralResponse(data: any): string {
    const responses = [
      `Your inventory system is performing well with ${data.dashboardData.totalScansToday} scans completed today at ${data.dashboardData.accuracyRateToday} accuracy.`,
      `You have ${data.totalItems} items in inventory across ${Object.keys(data.categoryDistribution).length} categories. Would you like specific details about any category?`,
      `Current system status: ${data.dashboardData.systemStatus}. Last sync: ${data.dashboardData.lastSyncTime}. How can I help you with your inventory management?`,
      `Your scanning efficiency has saved you ${data.dashboardData.timeSavedToday} today. What specific information would you like to know?`
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }
}

export const queryParser = new QueryParser()
