
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import BusinessIntelligence from './pages/BusinessIntelligence'
import IntegrationManagement from './pages/IntegrationManagement'
import UserManagement from './pages/UserManagement'
import Settings from './pages/Settings'
import { ThemeProvider } from './contexts/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/business-intelligence" element={<BusinessIntelligence />} />
            <Route path="/integration" element={<IntegrationManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Redirect routes for better UX */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics-reporting" element={<Analytics />} />
            <Route path="/business-intel" element={<BusinessIntelligence />} />
            <Route path="/integration-management" element={<IntegrationManagement />} />
            <Route path="/user" element={<UserManagement />} />
            <Route path="/user-management/:tab" element={<UserManagement />} />
            <Route path="/integration/:tab" element={<IntegrationManagement />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

