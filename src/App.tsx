import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import BusinessIntelligence from './pages/BusinessIntelligence'
import InventoryManagement from './pages/InventoryManagement'
import IntegrationManagement from './pages/IntegrationManagement'
import UserManagement from './pages/UserManagement'
import Settings from './pages/Settings'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/business-intelligence" element={<BusinessIntelligence />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/integration" element={<IntegrationManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App

