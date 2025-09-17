// Authentication service with user database simulation and OTP functionality

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  businessType: string
  password: string // In real app, this would be hashed
  fullName: string
  joinedDate: string
  isActive: boolean
}

export interface OTPRecord {
  email: string
  otp: string
  expiresAt: Date
  attempts: number
  maxAttempts: number
}

class AuthService {
  // Mock user database - In real app, this would be in a database
  private users: User[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corporation',
      businessType: 'retail',
      password: 'password123', // In real app, this would be hashed
      fullName: 'John Doe',
      joinedDate: new Date('2024-01-15').toISOString(),
      isActive: true
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      company: 'Tech Solutions Inc',
      businessType: 'technology',
      password: 'securepass456', // In real app, this would be hashed
      fullName: 'Jane Smith',
      joinedDate: new Date('2024-02-10').toISOString(),
      isActive: true
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 456-7890',
      company: 'Digital Innovations',
      businessType: 'manufacturing',
      password: 'mypassword789', // In real app, this would be hashed
      fullName: 'Mike Johnson',
      joinedDate: new Date('2024-01-20').toISOString(),
      isActive: true
    }
  ]

  // OTP storage - In real app, this would be in Redis or database with TTL
  private otpRecords: Map<string, OTPRecord> = new Map()

  // Check if email exists in user database
  async checkEmailExists(email: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.isActive)
    return !!user
  }

  // Generate secure 6-digit OTP
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // Send OTP to email (simulated)
  async sendPasswordResetOTP(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Check if email exists
      const emailExists = await this.checkEmailExists(email)
      
      if (!emailExists) {
        // For security, don't reveal if email exists or not
        return {
          success: true,
          message: 'If this email is registered, you will receive a password reset code shortly.'
        }
      }

      // Generate OTP
      const otp = this.generateOTP()
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now

      // Store OTP record
      this.otpRecords.set(email.toLowerCase(), {
        email: email.toLowerCase(),
        otp,
        expiresAt,
        attempts: 0,
        maxAttempts: 3
      })

      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 1200))

      // In real app, you would use an email service like SendGrid, AWS SES, etc.
      console.log(`🔐 Password Reset OTP for ${email}: ${otp} (expires in 10 minutes)`)
      
      // For demo purposes, we'll also store it in localStorage so user can see it
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo_otp', otp)
        localStorage.setItem('demo_otp_email', email)
      }

      return {
        success: true,
        message: 'If this email is registered, you will receive a password reset code shortly.'
      }
    } catch (error) {
      console.error('Error sending OTP:', error)
      return {
        success: false,
        message: 'Failed to send password reset code. Please try again.'
      }
    }
  }

  // Verify OTP
  async verifyPasswordResetOTP(email: string, otp: string): Promise<{ success: boolean; message: string; token?: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600))

      const otpRecord = this.otpRecords.get(email.toLowerCase())
      
      if (!otpRecord) {
        return {
          success: false,
          message: 'Invalid or expired verification code. Please request a new one.'
        }
      }

      // Check if OTP has expired
      if (new Date() > otpRecord.expiresAt) {
        this.otpRecords.delete(email.toLowerCase())
        return {
          success: false,
          message: 'Verification code has expired. Please request a new one.'
        }
      }

      // Check if max attempts exceeded
      if (otpRecord.attempts >= otpRecord.maxAttempts) {
        this.otpRecords.delete(email.toLowerCase())
        return {
          success: false,
          message: 'Too many failed attempts. Please request a new verification code.'
        }
      }

      // Verify OTP
      if (otpRecord.otp !== otp) {
        otpRecord.attempts++
        const remainingAttempts = otpRecord.maxAttempts - otpRecord.attempts
        
        if (remainingAttempts <= 0) {
          this.otpRecords.delete(email.toLowerCase())
          return {
            success: false,
            message: 'Too many failed attempts. Please request a new verification code.'
          }
        }
        
        return {
          success: false,
          message: `Invalid verification code. ${remainingAttempts} attempt${remainingAttempts > 1 ? 's' : ''} remaining.`
        }
      }

      // OTP is valid - generate reset token
      const resetToken = this.generateResetToken(email)
      
      // Clean up OTP record
      this.otpRecords.delete(email.toLowerCase())

      return {
        success: true,
        message: 'Verification code confirmed. You can now reset your password.',
        token: resetToken
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
      return {
        success: false,
        message: 'Failed to verify code. Please try again.'
      }
    }
  }

  // Generate password reset token
  private generateResetToken(email: string): string {
    // In real app, this would be a JWT or secure token stored in database
    const token = btoa(`${email}:${Date.now()}:${Math.random()}`)
    
    // Store token with expiration (15 minutes)
    if (typeof window !== 'undefined') {
      const tokenData = {
        email: email.toLowerCase(),
        expiresAt: Date.now() + 15 * 60 * 1000 // 15 minutes
      }
      localStorage.setItem(`reset_token_${token}`, JSON.stringify(tokenData))
    }
    
    return token
  }

  // Verify reset token
  async verifyResetToken(token: string): Promise<{ valid: boolean; email?: string }> {
    try {
      if (typeof window === 'undefined') return { valid: false }
      
      const tokenData = localStorage.getItem(`reset_token_${token}`)
      if (!tokenData) return { valid: false }
      
      const { email, expiresAt } = JSON.parse(tokenData)
      
      if (Date.now() > expiresAt) {
        localStorage.removeItem(`reset_token_${token}`)
        return { valid: false }
      }
      
      return { valid: true, email }
    } catch (error) {
      return { valid: false }
    }
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Verify token
      const { valid, email } = await this.verifyResetToken(token)
      if (!valid || !email) {
        return {
          success: false,
          message: 'Invalid or expired reset token. Please request a new password reset.'
        }
      }

      // Find user
      const userIndex = this.users.findIndex(u => u.email.toLowerCase() === email.toLowerCase())
      if (userIndex === -1) {
        return {
          success: false,
          message: 'User not found. Please contact support.'
        }
      }

      // Validate password
      if (newPassword.length < 8) {
        return {
          success: false,
          message: 'Password must be at least 8 characters long.'
        }
      }

      // Update password (in real app, this would be hashed)
      this.users[userIndex].password = newPassword

      // Clean up reset token
      if (typeof window !== 'undefined') {
        localStorage.removeItem(`reset_token_${token}`)
        localStorage.removeItem('demo_otp')
        localStorage.removeItem('demo_otp_email')
      }

      return {
        success: true,
        message: 'Password has been successfully reset. You can now sign in with your new password.'
      }
    } catch (error) {
      console.error('Error resetting password:', error)
      return {
        success: false,
        message: 'Failed to reset password. Please try again.'
      }
    }
  }

  // Login user
  async login(email: string, password: string): Promise<{ success: boolean; user?: Omit<User, 'password'>; message: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const user = this.users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password && 
        u.isActive
      )

      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password.'
        }
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user
      
      return {
        success: true,
        user: userWithoutPassword,
        message: 'Login successful.'
      }
    } catch (error) {
      console.error('Error during login:', error)
      return {
        success: false,
        message: 'Login failed. Please try again.'
      }
    }
  }

  // Register new user
  async register(userData: Omit<User, 'id' | 'fullName' | 'joinedDate' | 'isActive'>): Promise<{ success: boolean; user?: Omit<User, 'password'>; message: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Check if email already exists
      const existingUser = this.users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())
      if (existingUser) {
        return {
          success: false,
          message: 'An account with this email already exists.'
        }
      }

      // Create new user
      const newUser: User = {
        id: (this.users.length + 1).toString(),
        ...userData,
        fullName: `${userData.firstName} ${userData.lastName}`,
        joinedDate: new Date().toISOString(),
        isActive: true
      }

      this.users.push(newUser)

      // Return user without password
      const { password: _, ...userWithoutPassword } = newUser
      
      return {
        success: true,
        user: userWithoutPassword,
        message: 'Account created successfully.'
      }
    } catch (error) {
      console.error('Error during registration:', error)
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      }
    }
  }

  // Get demo OTP (for development purposes)
  getDemoOTP(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('demo_otp')
  }

  // Get all users (for admin purposes - remove in production)
  getAllUsers(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...user }) => user)
  }
}

// Export singleton instance
export const authService = new AuthService()
