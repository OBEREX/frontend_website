import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle, AlertCircle, Key } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../services/authService'

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ''
  })
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [isCheckingToken, setIsCheckingToken] = useState(true)
  
  const navigate = useNavigate()
  const location = useLocation()
  const token = location.state?.token || ''
  const email = location.state?.email || ''

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate('/forgot-password')
        return
      }

      try {
        const { valid } = await authService.verifyResetToken(token)
        setIsTokenValid(valid)
        
        if (!valid) {
          setMessage('Your password reset link has expired. Please request a new one.')
          setMessageType('error')
        }
      } catch (error) {
        setMessage('Invalid reset link. Please request a new password reset.')
        setMessageType('error')
      } finally {
        setIsCheckingToken(false)
      }
    }

    verifyToken()
  }, [token, navigate])

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let score = 0
    let feedback = ''

    if (password.length === 0) {
      return { score: 0, feedback: '' }
    }

    if (password.length < 8) {
      return { score: 1, feedback: 'Password must be at least 8 characters long' }
    }

    score += 1

    if (password.length >= 12) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    switch (score) {
      case 1:
      case 2:
        feedback = 'Weak password'
        break
      case 3:
      case 4:
        feedback = 'Fair password'
        break
      case 5:
        feedback = 'Good password'
        break
      case 6:
        feedback = 'Strong password'
        break
      default:
        feedback = 'Very weak password'
    }

    return { score, feedback }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Check password strength for password field
    if (name === 'password') {
      const strength = checkPasswordStrength(value)
      setPasswordStrength(strength)
    }

    // Clear messages when user starts typing
    if (message) {
      setMessage('')
      setMessageType('')
    }
  }

  const validateForm = () => {
    if (!formData.password) {
      setMessage('Password is required.')
      setMessageType('error')
      return false
    }

    if (formData.password.length < 8) {
      setMessage('Password must be at least 8 characters long.')
      setMessageType('error')
      return false
    }

    if (!formData.confirmPassword) {
      setMessage('Please confirm your password.')
      setMessageType('error')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.')
      setMessageType('error')
      return false
    }

    if (passwordStrength.score < 3) {
      setMessage('Please choose a stronger password.')
      setMessageType('error')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setMessage('')
    setMessageType('')

    try {
      const result = await authService.resetPassword(token, formData.password)
      
      setMessage(result.message)
      setMessageType(result.success ? 'success' : 'error')
      
      if (result.success) {
        // Redirect to login page after successful reset
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Password reset successfully! You can now sign in with your new password.',
              messageType: 'success'
            }
          })
        }, 2000)
      }
    } catch (error) {
      setMessage('An error occurred while resetting your password. Please try again.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  const getStrengthColor = (score: number) => {
    if (score <= 2) return 'bg-red-500'
    if (score <= 4) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthWidth = (score: number) => {
    return `${(score / 6) * 100}%`
  }

  if (isCheckingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verifying reset link...</p>
        </div>
      </div>
    )
  }

  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Invalid Reset Link
            </h2>
            {message && (
              <p className="text-red-600 dark:text-red-400 mb-6">{message}</p>
            )}
            <Link
              to="/forgot-password"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Key className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create a new password for your account
          </p>
          {email && (
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1">
              {email}
            </p>
          )}
        </div>

        {/* Form */}
        <div className="card p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Password strength</span>
                    <span className={`font-medium ${
                      passwordStrength.score <= 2 ? 'text-red-600 dark:text-red-400' :
                      passwordStrength.score <= 4 ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-green-600 dark:text-green-400'
                    }`}>
                      {passwordStrength.feedback}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength.score)}`}
                      style={{ width: getStrengthWidth(passwordStrength.score) }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm your new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-2">
                  {formData.password === formData.confirmPassword ? (
                    <div className="flex items-center text-green-600 dark:text-green-400 text-xs">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Passwords match
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600 dark:text-red-400 text-xs">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Passwords do not match
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Password Requirements:
              </h4>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li className="flex items-center">
                  {formData.password.length >= 8 ? (
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                  ) : (
                    <div className="w-3 h-3 border border-gray-300 rounded-full mr-2"></div>
                  )}
                  At least 8 characters long
                </li>
                <li className="flex items-center">
                  {/[A-Z]/.test(formData.password) ? (
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                  ) : (
                    <div className="w-3 h-3 border border-gray-300 rounded-full mr-2"></div>
                  )}
                  Contains uppercase letter
                </li>
                <li className="flex items-center">
                  {/[a-z]/.test(formData.password) ? (
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                  ) : (
                    <div className="w-3 h-3 border border-gray-300 rounded-full mr-2"></div>
                  )}
                  Contains lowercase letter
                </li>
                <li className="flex items-center">
                  {/[0-9]/.test(formData.password) ? (
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                  ) : (
                    <div className="w-3 h-3 border border-gray-300 rounded-full mr-2"></div>
                  )}
                  Contains number
                </li>
              </ul>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-lg flex items-start space-x-3 ${
                messageType === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}>
                {messageType === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <p className={`text-sm ${
                  messageType === 'success' 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading || passwordStrength.score < 3 || formData.password !== formData.confirmPassword}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Resetting password...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Key className="h-4 w-4 mr-2" />
                    Reset Password
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to log in
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Having trouble? Contact our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              support team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
