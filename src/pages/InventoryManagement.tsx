import React, { useState } from 'react'
import { 
  Camera, 
  Tag, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  BarChart3,
  Settings,
  Save,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import InventoryAnalytics from '../components/InventoryAnalytics'

// Types
interface InventoryObject {
  id: string
  imageUrl: string
  confidence: number
  suggestedLabel: string
  userLabel: string
  category: string
  quantity: number
  timestamp: Date
  sessionId: string
  scanType: 'basic' | 'standard' | 'premium'
}

interface ScanSession {
  id: string
  name: string
  startTime: Date
  endTime?: Date
  scanType: 'basic' | 'standard' | 'premium'
  totalScans: number
  totalCost: number
  objects: InventoryObject[]
  status: 'active' | 'completed' | 'paused'
}

interface LabelTemplate {
  id: string
  name: string
  category: string
  shortcuts: string[]
  color: string
}

// Mock data
const mockObjects: InventoryObject[] = [
  {
    id: '1',
    imageUrl: '/api/mock-image/1',
    confidence: 0.95,
    suggestedLabel: 'Red cylindrical object',
    userLabel: 'Coca-Cola 330ml',
    category: 'Beverages',
    quantity: 20,
    timestamp: new Date(),
    sessionId: 'session-1',
    scanType: 'premium'
  },
  {
    id: '2',
    imageUrl: '/api/mock-image/2',
    confidence: 0.87,
    suggestedLabel: 'Blue rectangular object',
    userLabel: 'Pepsi Max 500ml',
    category: 'Beverages',
    quantity: 15,
    timestamp: new Date(),
    sessionId: 'session-1',
    scanType: 'premium'
  },
  {
    id: '3',
    imageUrl: '/api/mock-image/3',
    confidence: 0.92,
    suggestedLabel: 'Orange cylindrical object',
    userLabel: 'Fanta Orange 330ml',
    category: 'Beverages',
    quantity: 12,
    timestamp: new Date(),
    sessionId: 'session-1',
    scanType: 'premium'
  }
]

const mockSessions: ScanSession[] = [
  {
    id: 'session-1',
    name: 'Morning Inventory Check',
    startTime: new Date('2024-01-15T08:00:00'),
    endTime: new Date('2024-01-15T09:30:00'),
    scanType: 'premium',
    totalScans: 47,
    totalCost: 2.35,
    objects: mockObjects,
    status: 'completed'
  },
  {
    id: 'session-2',
    name: 'Afternoon Restock',
    startTime: new Date('2024-01-15T14:00:00'),
    scanType: 'standard',
    totalScans: 23,
    totalCost: 1.15,
    objects: [],
    status: 'active'
  }
]

const labelTemplates: LabelTemplate[] = [
  {
    id: '1',
    name: 'Coca-Cola',
    category: 'Beverages',
    shortcuts: ['cc', 'coke', 'cola'],
    color: '#DC2626'
  },
  {
    id: '2',
    name: 'Pepsi',
    category: 'Beverages',
    shortcuts: ['pepsi', 'p'],
    color: '#2563EB'
  },
  {
    id: '3',
    name: 'Fanta',
    category: 'Beverages',
    shortcuts: ['fanta', 'f'],
    color: '#EA580C'
  }
]

const scanPricing = {
  basic: 0.02,
  standard: 0.04,
  premium: 0.05
}

export default function InventoryManagement() {
  const { isDark } = useTheme()
  const [objects, setObjects] = useState<InventoryObject[]>(mockObjects)
  const [sessions, setSessions] = useState<ScanSession[]>(mockSessions)
  const [templates, setTemplates] = useState<LabelTemplate[]>(labelTemplates)
  const [selectedSession, setSelectedSession] = useState<string>('session-1')
  const [groupedObjects, setGroupedObjects] = useState<{[key: string]: InventoryObject[]}>({})
  const [editingObject, setEditingObject] = useState<InventoryObject | null>(null)
  const [showLabelingModal, setShowLabelingModal] = useState(false)
  const [showTemplatesModal, setShowTemplatesModal] = useState(false)
  const [newTemplate, setNewTemplate] = useState<Partial<LabelTemplate>>({})
  const [activeTab, setActiveTab] = useState<'management' | 'analytics'>('management')

  // Group objects by similarity
  React.useEffect(() => {
    const grouped = objects.reduce((acc, obj) => {
      const key = obj.suggestedLabel
      if (!acc[key]) acc[key] = []
      acc[key].push(obj)
      return acc
    }, {} as {[key: string]: InventoryObject[]})
    setGroupedObjects(grouped)
  }, [objects])

  const handleLabelUpdate = (objectId: string, newLabel: string, category: string) => {
    setObjects(prev => prev.map(obj => 
      obj.id === objectId 
        ? { ...obj, userLabel: newLabel, category }
        : obj
    ))
  }

  const handleTemplateCreate = () => {
    if (newTemplate.name && newTemplate.category) {
      const template: LabelTemplate = {
        id: Date.now().toString(),
        name: newTemplate.name,
        category: newTemplate.category,
        shortcuts: newTemplate.shortcuts || [],
        color: newTemplate.color || '#6B7280'
      }
      setTemplates(prev => [...prev, template])
      setNewTemplate({})
      setShowTemplatesModal(false)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 dark:text-green-400'
    if (confidence >= 0.7) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.9) return <CheckCircle className="h-4 w-4 text-green-500" />
    if (confidence >= 0.7) return <AlertCircle className="h-4 w-4 text-yellow-500" />
    return <AlertCircle className="h-4 w-4 text-red-500" />
  }

  const currentSession = sessions.find(s => s.id === selectedSession)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Inventory Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Visual object grouping, labeling, and session tracking
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowTemplatesModal(true)}
            className="btn-secondary flex items-center"
          >
            <Settings className="h-4 w-4 mr-2" />
            Label Templates
          </button>
          <button className="btn-primary flex items-center">
            <Camera className="h-4 w-4 mr-2" />
            Start New Scan
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('management')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'management'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Management</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Usage Analytics</span>
            </div>
          </button>
        </nav>
      </div>

      {activeTab === 'management' ? (
        <>
          {/* Session Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Sessions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {sessions.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Objects</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{objects.length}</p>
                </div>
                <Tag className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Cost</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${sessions.reduce((sum, s) => sum + s.totalCost, 0).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Labeled Objects</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {objects.filter(o => o.userLabel).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Session Selection and Controls */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Scan Sessions</h3>
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {sessions.map(session => (
                    <option key={session.id} value={session.id}>
                      {session.name} ({session.scanType})
                    </option>
                  ))}
                </select>
                <button className="btn-secondary flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>
            </div>

            {currentSession && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Session Details</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                    <strong>Type:</strong> {currentSession.scanType.charAt(0).toUpperCase() + currentSession.scanType.slice(1)}
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Scans:</strong> {currentSession.totalScans}
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Cost:</strong> ${currentSession.totalCost}
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-900 dark:text-green-100">Pricing</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                    <strong>Per Scan:</strong> ${scanPricing[currentSession.scanType]}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>Total Cost:</strong> ${currentSession.totalCost}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-medium text-purple-900 dark:text-purple-100">Status</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">
                    <strong>Status:</strong> {currentSession.status.charAt(0).toUpperCase() + currentSession.status.slice(1)}
                  </p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    <strong>Duration:</strong> {currentSession.endTime 
                      ? Math.round((currentSession.endTime.getTime() - currentSession.startTime.getTime()) / 60000)
                      : Math.round((Date.now() - currentSession.startTime.getTime()) / 60000)
                    } min
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Visual Object Grouping */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Visual Object Grouping</h3>
              <div className="flex items-center space-x-2">
                <button className="btn-secondary flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <button className="btn-secondary flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedObjects).map(([suggestedLabel, objectGroup]) => (
                <div key={suggestedLabel} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getConfidenceIcon(objectGroup[0].confidence)}
                        <span className={`font-medium ${getConfidenceColor(objectGroup[0].confidence)}`}>
                          {Math.round(objectGroup[0].confidence * 100)}% confidence
                        </span>
                      </div>
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        AI found {objectGroup.length} similar {suggestedLabel.toLowerCase()}
                      </span>
                    </div>
                    <button 
                      onClick={() => setShowLabelingModal(true)}
                      className="btn-primary flex items-center"
                    >
                      <Tag className="h-4 w-4 mr-2" />
                      Label Group
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {objectGroup.map((obj) => (
                      <div key={obj.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                          <Camera className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {obj.userLabel || 'Unlabeled'}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Qty: {obj.quantity}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {obj.category || 'Uncategorized'}
                            </span>
                            <span className={`text-xs ${getConfidenceColor(obj.confidence)}`}>
                              {Math.round(obj.confidence * 100)}%
                            </span>
                          </div>
                          <button 
                            onClick={() => setEditingObject(obj)}
                            className="w-full btn-secondary flex items-center justify-center text-sm"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit Label
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <InventoryAnalytics sessions={sessions} />
      )}

      {/* Labeling Modal */}
      {showLabelingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Label Object Group
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Name
                </label>
                <input 
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="e.g., Coca-Cola 330ml"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <option>Beverages</option>
                  <option>Snacks</option>
                  <option>Dairy</option>
                  <option>Frozen Foods</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quantity
                </label>
                <input 
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="20"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowLabelingModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button className="btn-primary">
                Save Label
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {showTemplatesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Label Templates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Existing Templates</h4>
                <div className="space-y-2">
                  {templates.map(template => (
                    <div key={template.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: template.color }}
                          />
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {template.name}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {template.category} • {template.shortcuts.join(', ')}
                        </p>
                      </div>
                      <button className="text-red-600 hover:text-red-700 dark:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Create New Template</h4>
                <div className="space-y-3">
                  <input 
                    type="text"
                    placeholder="Template name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={newTemplate.name || ''}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <input 
                    type="text"
                    placeholder="Category"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={newTemplate.category || ''}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                  />
                  <input 
                    type="text"
                    placeholder="Shortcuts (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={newTemplate.shortcuts?.join(', ') || ''}
                    onChange={(e) => setNewTemplate(prev => ({ 
                      ...prev, 
                      shortcuts: e.target.value.split(',').map(s => s.trim())
                    }))}
                  />
                  <input 
                    type="color"
                    className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg"
                    value={newTemplate.color || '#6B7280'}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, color: e.target.value }))}
                  />
                  <button 
                    onClick={handleTemplateCreate}
                    className="w-full btn-primary"
                  >
                    Create Template
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-6">
              <button 
                onClick={() => setShowTemplatesModal(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
