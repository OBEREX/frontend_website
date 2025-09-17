
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Dashboard from './pages/Dashboard'
import AiAssistant from './pages/Ai-Assistant'
import Analytics from './pages/Analytics'
import BusinessIntelligence from './pages/BusinessIntelligence'
import IntegrationManagement from './pages/IntegrationManagement'
import UserManagement from './pages/UserManagement'
import Settings from './pages/Settings'
import Login from './pages/Log-in'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'
import ResetPassword from './pages/ResetPassword'
import { ThemeProvider } from './contexts/ThemeContext'
import { UserProvider } from './contexts/UserContext'

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } />
            <Route path="/forgot-password" element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            } />
            <Route path="/verify-otp" element={
              <PublicRoute>
                <VerifyOTP />
              </PublicRoute>
            } />
            <Route path="/reset-password" element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            } />
            <Route path="*" element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<AiAssistant />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/business-intelligence" element={<BusinessIntelligence />} />
                    <Route path="/integration" element={<IntegrationManagement />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/settings" element={<Settings />} />
                    
                    {/* Redirect routes for better UX */}
                    <Route path="/ai-assistant" element={<AiAssistant />} />
                    <Route path="/ai" element={<AiAssistant />} />
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
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}

